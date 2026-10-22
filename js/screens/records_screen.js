// ============================================================================
// HAS MAG IFMT - RECORDS LIST SCREEN (شاشة عرض وتصفية السجلات التشغيلية)
// Flutter Equivalent: lib/presentation/screens/records/records_screen.dart
// ============================================================================

/**
 * دالة مساعدة لحساب عمر الأصل تلقائياً من تاريخ التصنيع حتى اليوم
 */
function calculateAssetAge(dateStr) {
  if (!dateStr) return '—';
  try {
    const mDate = new Date(dateStr);
    if (isNaN(mDate.getTime())) return '—';
    const now = new Date();
    let years = now.getFullYear() - mDate.getFullYear();
    let months = now.getMonth() - mDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years <= 0) return `${Math.max(1, months)} أشهر`;
    return `${years} سنة و ${months} شهر`;
  } catch (e) {
    return '—';
  }
}

/**
 * دالة مساعدة لحساب نسبة مرور الزمن الكلي للمشروع
 */
function calculateTimeElapsed(startStr, endStr) {
  if (!startStr || !endStr) return 0;
  try {
    const start = new Date(startStr).getTime();
    const end = new Date(endStr).getTime();
    const now = new Date().getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return 0;
    if (now <= start) return 0;
    if (now >= end) return 100;
    return Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100)));
  } catch (e) {
    return 0;
  }
}

/**
 * LEVEL 3: استعراض بطاقات السجلات التشغيلية والتصنيفات الفرعية ثلاثية المستويات
 */
function renderSubSectionRecords() {
  const mod = getModule();
  const sub = getSubSection();

  // Case A1: 3rd-Level Child Sub-Icons (Top Level: Group Icons & Direct Options)
  if (sub.hasChildSubIcons && state.activeChildSubCode === 'الكل') {
    return `
      <div class="fade-in">
        <div class="p-3.5 space-y-3">
          <div class="flex items-center justify-between px-0.5">
            <span class="text-xs font-extrabold text-[#111827]">اختر التصنيف الفرعي:</span>
            <button type="button" onclick="state.activeChildSubCode='عرض الكل'; renderApp();" class="text-xs font-bold text-[#db6b49] hover:underline">
              عرض الكل (${(sub.records || []).length}) ←
            </button>
          </div>

          <div class="grid grid-cols-3 gap-y-3 gap-x-2 text-center pt-1">
            ${sub.childSubOptions.map(c => {
              const cnt = c.isGroup
                ? (sub.records || []).filter(r => (c.children || []).some(ch => ch.code === r[sub.childSubField])).length
                : (sub.records || []).filter(r => r[sub.childSubField] === c.code).length;
              return renderChildSubIconCard(c, cnt, c.code);
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Case A2: Sub-Level Icons if a Group is selected (e.g. 'الصيانة الوقائية')
  const activeGroup = sub.hasChildSubIcons ? (sub.childSubOptions || []).find(o => o.isGroup && o.code === state.activeChildSubCode) : null;
  if (activeGroup) {
    const groupRecords = (sub.records || []).filter(r => (activeGroup.children || []).some(ch => ch.code === r[sub.childSubField]));
    return `
      <div class="fade-in">
        <div class="p-3.5 space-y-3">
          <div class="flex items-center justify-between px-0.5">
            <span class="text-xs font-extrabold text-[#111827]">اختر تقرير الصيانة الوقائية:</span>
            <button type="button" onclick="state.activeChildSubCode='عرض كل الصيانة الوقائية'; renderApp();" class="text-xs font-bold text-[#db6b49] hover:underline">
              عرض كل الصيانة (${groupRecords.length}) ←
            </button>
          </div>

          <div class="grid grid-cols-3 gap-y-3 gap-x-2 text-center pt-1">
            ${activeGroup.children.map(c => {
              const cnt = (sub.records || []).filter(r => r[sub.childSubField] === c.code).length;
              return renderChildSubIconCard(c, cnt, c.code);
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Case B: Interactive Fuel or Water Tanks (خزانات الوقود والمياه مع السجلات التفصيلية)
  if (sub.isInteractiveTanks) {
    const stations = sub.stationFilterOptions || [];
    const tanks = MASTER_DATA.tanksConfig.filter(t => {
      const matchCat = t.category === sub.tankCategoryFilter;
      const matchSt = !stations.length || state.activeFilterPill === 'الكل' || t.station === state.activeFilterPill;
      return matchCat && matchSt;
    });

    const isFuel = sub.tankCategoryFilter === 'وقود';

    return `
      <div class="fade-in">
        <div class="p-3.5 space-y-3.5">
          ${stations.length > 0 ? `
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              ${stations.map(st => `
                <button type="button" onclick="state.activeFilterPill='${st}'; renderApp();" class="fit-tab shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition ${state.activeFilterPill === st ? 'bg-[#47525e] text-white border-[#47525e]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                  ${st}
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- بطاقات الخزانات -->
          <div class="space-y-2.5">
            ${tanks.map(t => {
              const pct = Math.min(100, Math.round((t.currentLiters / t.capacity) * 100));
              const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-amber-500' : 'bg-[#00a63e]';
              return `
                <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-xs font-extrabold text-[#111827] block">${t.name}</span>
                      <span class="text-[10px] text-[#6b7280]">${t.station} • آخر توريد: ${t.lastSupplyDate}</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-lg bg-[#f3ece6] text-[#374151] text-[10px] font-bold">السعة: ${t.capacity.toLocaleString()} لتر</span>
                  </div>
                  <div class="w-full h-2 bg-[#f3ece6] rounded-full overflow-hidden">
                    <div class="h-full ${barColor}" style="width: ${pct}%"></div>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-[#6b7280]">المتوفر:</span>
                    <strong class="text-[#111827] font-extrabold">${t.currentLiters.toLocaleString()} لتر (${pct}%)</strong>
                  </div>
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    <button type="button" onclick="openTankSheet('${t.id}', 'supply')" class="py-1.5 rounded-xl bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] text-[11px] font-bold">+ توريد</button>
                    <button type="button" onclick="openTankSheet('${t.id}', 'dispense')" class="py-1.5 rounded-xl bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] text-[11px] font-bold">- صرف يومي</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- تفاصيل سجلات التوريد والصرف التفصيلية بناء على الملاحظات -->
          ${isFuel ? `
            <div class="space-y-2 pt-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-[#111827]">سجل توريد الوقود الأخير:</span>
                <span class="text-[10px] text-[#db6b49] font-bold">محطة الوقود والكهرباء</span>
              </div>
              <div class="space-y-2">
                ${FUEL_SUPPLY_LOGS.slice(0, 3).map(log => `
                  <div class="p-2.5 rounded-xl bg-white border border-[#ede7e2] text-xs space-y-1">
                    <div class="flex justify-between items-center font-bold">
                      <span class="text-[#111827]">${log.station} • ${log.fuelType}</span>
                      <span class="text-[#00a63e] font-extrabold">+${log.liters.toLocaleString()} لتر</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-[#6b7280]">
                      <span>📅 ${log.date} ${log.time}</span>
                      <span>${log.supplier}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="flex items-center justify-between pt-2">
                <span class="text-xs font-black text-[#111827]">سجل صرف الوقود للمركبات:</span>
              </div>
              <div class="space-y-2">
                ${FUEL_DISPENSE_LOGS.slice(0, 3).map(log => `
                  <div class="p-2.5 rounded-xl bg-white border border-[#ede7e2] text-xs space-y-1">
                    <div class="flex justify-between items-center font-bold">
                      <span class="text-[#111827]">${log.carType} (${log.plateNo})</span>
                      <span class="text-[#ea580c] font-extrabold">-${log.liters} لتر (${log.fuelType})</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-[#6b7280]">
                      <span>الجهة: ${log.entity} • السائق: ${log.driverName}</span>
                      <span>📅 ${log.date} ${log.time}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="space-y-2 pt-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-[#111827]">سجل توريد المياه وتناكر المياه اليومية:</span>
                <span class="text-[10px] text-[#15803d] font-bold">شبكة المياه</span>
              </div>
              <div class="space-y-2">
                ${WATER_SUPPLY_LOGS.slice(0, 4).map(log => `
                  <div class="p-2.5 rounded-xl bg-white border border-[#ede7e2] text-xs space-y-1">
                    <div class="flex justify-between items-center font-bold">
                      <span class="text-[#111827]">${log.tankName}</span>
                      <span class="text-[#00a63e] font-extrabold">+${log.liters.toLocaleString()} لتر (${log.tankersCount} تنكر)</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-[#6b7280]">
                      <span>📅 ${log.date} ${log.time}</span>
                      <span>${log.note}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // Case C: Standard Records List (بطاقات دقيقة ومطابقة بنسبة 100% لملاحظات إكسل)
  const filterConfig = sub.filterPills;
  const filteredRecords = (sub.records || []).filter(rec => {
    if (sub.hasChildSubIcons && state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') {
      if (state.activeChildSubCode === 'عرض كل الصيانة الوقائية') {
        const pmGroup = (sub.childSubOptions || []).find(o => o.code === 'الصيانة الوقائية');
        if (pmGroup && !(pmGroup.children || []).some(ch => ch.code === rec[sub.childSubField])) return false;
      } else if (rec[sub.childSubField] !== state.activeChildSubCode) {
        return false;
      }
    }
    if (sub.branchByDept) {
      const deptVal = sub.hasChildSubIcons ? (state.activeDeptSubCode || 'الكل') : state.activeChildSubCode;
      if (deptVal !== 'الكل' && deptVal !== 'عرض الكل') {
        if (!rec.department || !rec.department.includes(deptVal)) return false;
      }
    }
    if (filterConfig && state.activeFilterPill !== 'الكل') {
      if (rec[filterConfig.field] !== state.activeFilterPill) return false;
    }
    return true;
  });

  return `
    <div class="fade-in">
      <div class="p-3.5 space-y-3">

        ${sub.hasChildSubIcons ? (() => {
          const pmGroup = (sub.childSubOptions || []).find(o => o.isGroup && (o.code === state.activeChildSubCode || (o.children || []).some(ch => ch.code === state.activeChildSubCode) || state.activeChildSubCode === 'عرض كل الصيانة الوقائية'));
          if (pmGroup) {
            const groupRecords = (sub.records || []).filter(r => (pmGroup.children || []).some(ch => ch.code === r[sub.childSubField]));
            return `
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                <button type="button" onclick="state.activeChildSubCode='الصيانة الوقائية'; renderApp();" class="fit-tab shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold bg-[#f3ece6] text-[#6b7280] hover:text-[#db6b49] border border-[#dfd8d0] transition">
                  ⊞ الأيقونات
                </button>
                <button type="button" onclick="state.activeChildSubCode='عرض كل الصيانة الوقائية'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition ${state.activeChildSubCode === 'عرض كل الصيانة الوقائية' ? 'bg-[#47525e] text-white border-[#47525e]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                  كل الصيانة (${groupRecords.length})
                </button>
                ${(pmGroup.children || []).map(c => `
                  <button type="button" onclick="state.activeChildSubCode='${c.code}'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition ${state.activeChildSubCode === c.code ? 'bg-[#db6b49] text-white border-[#db6b49]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                    ${c.title}
                  </button>
                `).join('')}
              </div>
            `;
          }
          return `
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              <button type="button" onclick="state.activeChildSubCode='الكل'; renderApp();" class="fit-tab shrink-0 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold bg-[#f3ece6] text-[#6b7280] hover:text-[#db6b49] border border-[#dfd8d0] transition">
                ⊞ الأيقونات
              </button>
              <button type="button" onclick="state.activeChildSubCode='عرض الكل'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition ${state.activeChildSubCode === 'عرض الكل' ? 'bg-[#47525e] text-white border-[#47525e]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                الكل (${(sub.records || []).length})
              </button>
              ${(sub.childSubOptions || []).map(c => `
                <button type="button" onclick="state.activeChildSubCode='${c.code}'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition ${state.activeChildSubCode === c.code ? 'bg-[#db6b49] text-white border-[#db6b49]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                  ${c.title}
                </button>
              `).join('')}
            </div>
          `;
        })() : ''}

        ${sub.branchByDept ? `
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            ${(() => {
              const currentDept = sub.hasChildSubIcons ? (state.activeDeptSubCode || 'الكل') : state.activeChildSubCode;
              const setDept = (code) => sub.hasChildSubIcons ? `state.activeDeptSubCode='${code}'; renderApp();` : `state.activeChildSubCode='${code}'; renderApp();`;
              return `
                <button type="button" onclick="${setDept('الكل')}" class="fit-tab shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${currentDept === 'الكل' ? 'bg-[#47525e] text-white' : 'bg-white border border-[#dcd4cc] text-[#374151]'}">
                  كل الأقسام
                </button>
                ${MASTER_DATA.departments.map(d => `
                  <button type="button" onclick="${setDept(d.code)}" class="fit-tab shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${currentDept === d.code ? 'bg-[#db6b49] text-white' : 'bg-white border border-[#dcd4cc] text-[#374151]'}">
                    ${d.code}
                  </button>
                `).join('')}
              `;
            })()}
          </div>
        ` : ''}

        ${filterConfig ? `
          <div class="bg-[#ece6e1]/70 p-1 rounded-xl inline-flex items-center gap-1">
            ${filterConfig.options.map(opt => `
              <button type="button" onclick="state.activeFilterPill='${opt}'; renderApp();" class="fit-tab shrink-0 px-3 py-1 rounded-lg text-[11px] font-bold transition ${state.activeFilterPill === opt ? 'bg-white text-[#db6b49] shadow-2xs' : 'text-[#4b5563]'}">
                ${opt}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- شاشة إجماليات الصرف الصحي الخاصة بملف الملاحظات Row 19 -->
        ${sub.id === 'sub_sewage_cars' ? (() => {
          const totalTankers = (sub.records || []).reduce((acc, r) => acc + (parseInt(r.tankersCount) || 1), 0);
          const totalPulledLiters = (sub.records || []).reduce((acc, r) => acc + (parseFloat(r.pulledQty) || 0), 0);
          return `
            <div class="p-3.5 rounded-2xl bg-gradient-to-r from-[#47525e] to-[#2c333a] text-white space-y-2 shadow-xs">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-gray-200">إجمالي السحب اليومي لجميع المحطات:</span>
                <span class="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-extrabold">مجموع المحطات</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-center pt-1">
                <div class="bg-white/10 rounded-xl p-2">
                  <span class="text-[10px] text-gray-300 block">عدد التناكر المسحوبة</span>
                  <strong class="text-base font-black text-amber-300">${totalTankers} صهريج</strong>
                </div>
                <div class="bg-white/10 rounded-xl p-2">
                  <span class="text-[10px] text-gray-300 block">إجمالي الكمية المسحوبة</span>
                  <strong class="text-base font-black text-emerald-300">${totalPulledLiters.toLocaleString()} لتر</strong>
                </div>
              </div>
            </div>
          `;
        })() : ''}

        <!-- شاشة الحضور والورديات الخاصة بالملاحظات Row 11: عرض كل قسم وعدد الفنيين وأسمائهم بوضوح -->
        ${sub.id === 'sub_attendance' ? (() => {
          const shiftFilter = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') ? state.activeChildSubCode : 'وردية A';
          const shiftRecords = (sub.records || []).filter(r => r.shift === shiftFilter);
          // تجميع الفنيين حسب القسم
          const deptMap = {};
          shiftRecords.forEach(r => {
            const dName = r.department || 'أخرى';
            if (!deptMap[dName]) deptMap[dName] = [];
            if (!deptMap[dName].includes(r.technician)) deptMap[dName].push(r.technician);
          });
          const deptsWithTechs = Object.keys(deptMap);

          return `
            <div class="space-y-3">
              <div class="flex items-center justify-between px-1">
                <span class="text-xs font-black text-[#111827]">توزيع فنيي ${shiftFilter} حسب الأقسام:</span>
                <button type="button" onclick="openBulkShiftModal('${shiftFilter}')" class="text-xs font-bold text-[#db6b49] hover:underline">
                  + تعيين فنيين للوردية
                </button>
              </div>

              ${deptsWithTechs.length === 0 ? `
                <div class="bg-white rounded-2xl border border-[#ede7e2] p-6 text-center text-xs text-[#6b7280]">
                  لم يتم إضافة فنيين لهذه الوردية بعد. اضغط على (+ تعيين فنيين) لتحديد فنيي كل قسم.
                </div>
              ` : deptsWithTechs.map(dName => {
                const techs = deptMap[dName];
                return `
                  <div class="bg-white rounded-2xl border border-[#ede7e2] p-3 shadow-2xs space-y-2">
                    <div class="flex items-center justify-between border-b border-[#f3ece6] pb-1.5">
                      <span class="font-extrabold text-xs text-[#111827]">${dName}</span>
                      <span class="px-2 py-0.5 rounded-full bg-[#fdece6] text-[#db6b49] font-black text-[10px]">${techs.length} فنيين</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      ${techs.map(tName => `
                        <span class="px-2.5 py-1 rounded-xl bg-[#faf7f5] border border-[#dfd8d0] text-[#374151] font-bold text-[11px] flex items-center gap-1">
                          <span>👤</span>
                          <span>${tName}</span>
                        </span>
                      `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        })() : ''}

        <!-- Cards List (Specialized card renderers for each exact Excel requirement) -->
        ${sub.id === 'sub_attendance' ? '' : `
        <div class="space-y-2.5">
          ${filteredRecords.length === 0 ? `
            <div class="bg-white rounded-2xl border border-[#ede7e2] p-6 text-center text-xs text-[#6b7280]">
              لا توجد سجلات حالياً في هذا التصنيف. اضغط على زر (+) العائم أدناه لإضافة سجل جديد.
            </div>
          ` : filteredRecords.map(rec => {

            // 1. طلبات الشراء SPR (Row 5):
            // "عنوان الطلب من الخارج يحتوي فقط علي رقم SPR واسم النظام وتاريخ الطلب وحالة الاستلام"
            if (sub.id === 'sub_spr') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-black text-[#111827]">${rec.sprNo || rec.id}</span>
                    ${renderStatusBadge(rec.status || 'مستلم بالكامل')}
                  </div>
                  <div class="text-xs font-extrabold text-[#374151] truncate">
                    ${rec.system || 'النظام غير محدد'}
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 تاريخ الطلب: <strong class="text-[#111827]">${rec.createdDate || '—'}</strong></span>
                    <div class="flex items-center gap-1.5">
                      <span>${rec.woNumber ? `أمر عمل: ${rec.woNumber}` : ''}</span>
                      <span class="text-[#9ca3af] font-bold">←</span>
                    </div>
                  </div>
                </div>
              `;
            }

            // 2. طلبات صرف المواد MRF (Rows 6-8):
            // عطل: رقم MRF، اسم النظام، تاريخ الطلب، حالة الاستلام.
            // رصيد مستودعي: حذف النظام ورقم المرفق.
            if (sub.id === 'sub_mrf') {
              const isStockRef = rec.mrfType === 'رصيد مستودعي';
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="text-xs font-black text-[#111827]">${rec.mrfNo || rec.id}</span>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${isStockRef ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                        ${rec.mrfType || 'طلب صرف'}
                      </span>
                    </div>
                    ${renderStatusBadge(rec.status || 'مستلم')}
                  </div>

                  ${!isStockRef ? `
                    <div class="text-xs font-extrabold text-[#374151] truncate">
                      ${rec.system || 'النظام غير محدد'}
                    </div>
                  ` : ''}

                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 تاريخ الطلب: <strong class="text-[#111827]">${rec.createdDate || '—'}</strong></span>
                    <div class="flex items-center gap-1.5">
                      <span>${!isStockRef && rec.woNumber ? `أمر عمل: ${rec.woNumber}` : ''}</span>
                      <span class="text-[#9ca3af] font-bold">←</span>
                    </div>
                  </div>
                </div>
              `;
            }

            // 3. CASH PURCHASE (Row 9):
            // "عنوان الطلب من الخارج يحتوي فقط علي رقم الطلب والقسم وتاريخ الشراء والمبلغ"
            if (sub.id === 'sub_cash') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-black text-[#111827]">${rec.orderNo || rec.id}</span>
                    <span class="px-2.5 py-0.5 rounded-lg bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] font-black text-xs">
                      ${(rec.amount || 0).toLocaleString()} ريال
                    </span>
                  </div>
                  <div class="text-xs font-bold text-[#374151] truncate flex items-center justify-between">
                    <span>القسم: <strong>${rec.department || '—'}</strong></span>
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${rec.paymentType === 'نقدي' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}">${rec.paymentType || 'نقدي'}</span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 تاريخ الشراء: <strong class="text-[#111827]">${rec.purchaseDate || '—'}</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 4. المخزون الـ STOCK (Row 10):
            // "في العنوان اهمية ظهور الكميه المتوفره بوضوح" + سجل التوريد والمصروف
            if (sub.id === 'sub_stock') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs transition space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <div class="font-extrabold text-xs text-[#111827] leading-snug">${rec.itemName}</div>
                      <div class="text-[10px] text-[#6b7280] mt-0.5">${rec.department}</div>
                    </div>
                    <div class="text-left shrink-0">
                      <span class="inline-block px-3 py-1 rounded-xl bg-[#f0fdf4] text-[#15803d] border border-[#86efac] font-black text-xs shadow-2xs">
                        المتوفر: ${rec.availableQty} ${rec.unit || ''}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1.5 border-t border-[#f3ece6]">
                    <span>السابق: ${rec.prevQty} | وارد: +${rec.incomingQty} | منصرف: -${rec.issuedQty}</span>
                    <span class="text-[#db6b49] font-bold">سجل الحركات (${(rec.movements || []).length}) ←</span>
                  </div>
                </div>
              `;
            }

            // 5. الغياب (Row 12):
            // القسم والوردية واسم الفني ونوع الغياب (بعذر / بدون عذر) والتاريخ
            if (sub.id === 'sub_absence') {
              const isExcused = rec.absenceType === 'بعذر واستئذان';
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827] flex items-center gap-1.5">
                      <span>👤</span>
                      <span>${rec.employee}</span>
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${isExcused ? 'bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]' : 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]'}">
                      ${rec.absenceType || 'غياب'}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#4b5563]">
                    <span>القسم: <strong class="text-[#111827]">${rec.department || '—'}</strong></span> • <span>الوردية: <strong>${rec.shift || '—'}</strong></span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 تاريخ الغياب: ${rec.absenceDate || '—'}</span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 6. الخروج النهائي (Row 13):
            // القسم ورقم الملف
            if (sub.id === 'sub_final_exit') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827]">${rec.employee}</span>
                    <span class="px-2 py-0.5 rounded-lg bg-[#faf7f5] border border-[#dfd8d0] font-bold text-[10px] text-[#374151]">
                      ملف: ${rec.fileNumber || '—'}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#4b5563]">
                    <span>القسم: <strong>${rec.department || '—'}</strong></span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 آخر دوام: <strong class="text-[#111827]">${rec.lastDayDate || '—'}</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 7. الشواغر (Row 14):
            // العدد المطلوب والفعلي وعدد الشواغر
            if (sub.id === 'sub_staffing_shortage') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827] truncate">${rec.vacancyTitle}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-black ${rec.vacantCount > 0 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
                      الشواغر: ${rec.vacantCount}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#6b7280]">
                    القسم: <strong class="text-[#374151]">${rec.department}</strong>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>المطلوب: <strong class="text-[#111827]">${rec.requiredCount}</strong> • الفعلي: <strong class="text-[#111827]">${rec.actualCount}</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 8. سجل الأصول (Row 15):
            // "عرض مختصر وجاذب: اسم الاصل والشركه المصنعه والعدد والموقع وبقية التفاصيل بالداخل" + عمر الأصل المحسوب
            if (sub.id === 'sub_assets_register') {
              const age = calculateAssetAge(rec.manufactureDate);
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <div class="font-black text-xs text-[#111827] leading-snug">${rec.assetName}</div>
                      <div class="text-[10px] text-[#6b7280] mt-0.5">${rec.manufacturer || 'الشركة المصنعة غير محددة'} • ${rec.location || 'الموقع غير محدد'}</div>
                    </div>
                    <span class="px-2 py-0.5 rounded-lg bg-[#fdece6] text-[#db6b49] font-black text-xs shrink-0">
                      العدد: ${rec.count || 1}
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span class="px-2 py-0.5 rounded-md bg-[#faf7f5] border border-[#dfd8d0] text-[10px] font-bold text-[#374151]">
                      ⏳ عمر الأصل: <strong class="text-[#111827]">${age}</strong>
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-[#f0fdf4] text-[#15803d] text-[10px] font-bold">
                      ${rec.assetCondition || 'ممتاز'}
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">
                      ${rec.operationStatus || 'يعمل'}
                    </span>
                  </div>
                </div>
              `;
            }

            // 9. نقل الأصول (Row 15 Sub-section):
            if (sub.id === 'sub_asset_transfers') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827]">${rec.assetName}</span>
                    <span class="text-[10px] text-[#6b7280]">📅 ${rec.transferDate}</span>
                  </div>
                  <div class="text-xs text-[#374151] flex items-center gap-1 font-semibold">
                    <span class="text-gray-500">من:</span> <span>${rec.transferredFrom}</span>
                    <span class="text-[#db6b49] font-bold">←</span>
                    <span class="text-gray-500">إلى:</span> <span>${rec.transferredTo}</span>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>بتوجيهات: <strong class="text-[#111827]">${rec.directedBy || '—'}</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 10. الأعمال اليومية (Row 17):
            // اختيار أكثر من فني للعمل الواحد، صورة لكل عمل، المواد/القطع المستخدمة
            if (sub.id === 'sub_daily_works_log') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <div class="font-black text-xs text-[#111827] leading-snug">${rec.workDesc}</div>
                      <div class="text-[10px] text-[#6b7280] mt-0.5">${rec.department} • 📍 ${rec.workLocation || 'الموقع غير محدد'}</div>
                    </div>
                    <span class="px-2 py-0.5 rounded-md bg-[#faf7f5] border border-[#dfd8d0] text-[10px] font-bold text-[#6b7280] shrink-0">
                      📅 ${rec.workDate || 'اليوم'}
                    </span>
                  </div>

                  <div class="p-2 rounded-xl bg-[#faf7f5] text-[10px] space-y-1">
                    <div>👥 <strong>الفنيين المشاركين:</strong> <span class="text-[#111827] font-semibold">${rec.technicians || rec.technician || '—'}</span></div>
                    ${rec.materialsUsed ? `<div>🔧 <strong>المواد المستخدمة:</strong> <span class="text-[#374151] font-semibold">${rec.materialsUsed}</span></div>` : ''}
                  </div>

                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>⏱️ من ${rec.startTime || '—'} إلى ${rec.endTime || '—'}</span>
                    <div class="flex items-center gap-2">
                      <span class="text-[#00a63e] font-bold">${rec.photo || '✅ صورة مرفقة'}</span>
                      <span class="text-[#9ca3af] font-bold">←</span>
                    </div>
                  </div>
                </div>
              `;
            }

            // 11. المعدات المتعطلة حالياً (Row 20 Sub-section 1):
            // شاشة عرض تعرض جميع المعدات المتعطلة حالياً: القسم، النظام، تاريخ ووقت بداية العطل وملاحظات
            if (sub.id === 'sub_faulty_equip') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827]">${rec.equipmentName}</span>
                    <span class="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-extrabold text-[10px]">
                      ${rec.faultStatus || 'خارج الخدمة'}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#374151]">
                    <span>القسم: <strong>${rec.department}</strong></span> • <span>النظام: <strong>${rec.system || '—'}</strong></span>
                  </div>
                  <p class="text-xs text-[#4b5563] truncate">
                    ${rec.faultDesc || rec.notes || 'لا توجد ملاحظات إضافية'}
                  </p>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>⏱️ بداية العطل: <strong class="text-red-600 font-bold">${rec.faultDateTime || rec.faultDate}</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 12. سجل المعدات المُصلحة (Row 20 Sub-section 2):
            if (sub.id === 'sub_faulty_history') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827]">${rec.equipmentName}</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px]">
                      تم الإصلاح بنجاح ✅
                    </span>
                  </div>
                  <div class="text-[11px] text-[#374151]">
                    <span>القسم: <strong>${rec.department}</strong></span> • <span>الفني: <strong>${rec.technician || '—'}</strong></span>
                  </div>
                  <div class="text-[10px] text-[#6b7280]">
                    القطع المستبدلة: <strong>${rec.replacementParts || '—'}</strong>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>تاريخ الإصلاح: <strong class="text-[#111827]">${rec.repairDate} (المدة: ${rec.repairDuration || '—'})</strong></span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 13. المشاريع القائمة بالموقع (Row 24):
            // اسم المشروع والموقع والبداية والنهاية المجدولة + مخطط مرور الزمن المحدد % ومخطط الإنجاز الحقيقي %
            if (sub.id === 'sub_contractors') {
              const timePct = rec.timeElapsedPct || calculateTimeElapsed(rec.startDate, rec.endDate);
              const actualPct = rec.actualCompletionPct || 0;
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs transition space-y-2.5">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <div class="font-black text-xs text-[#111827] leading-snug">${rec.projectName || rec.contractorName}</div>
                      <div class="text-[10px] text-[#6b7280] mt-0.5">📍 ${rec.location || 'مطار حائل الدولي'} • المقاول: ${rec.contractorName}</div>
                    </div>
                    <span class="px-2 py-0.5 rounded-lg bg-[#faf7f5] border border-[#dfd8d0] text-[10px] font-bold text-[#374151] shrink-0">
                      ${rec.serviceCutType || 'لا يوجد قطع'}
                    </span>
                  </div>

                  <!-- التواريخ المجدولة -->
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280]">
                    <span>📅 البداية: <strong class="text-[#111827]">${rec.startDate}</strong></span>
                    <span>النهاية المجدولة: <strong class="text-[#111827]">${rec.endDate}</strong></span>
                  </div>

                  <!-- المخططات الزمنية ونسب الإنجاز المطلوبة بنص إكسل -->
                  <div class="space-y-1.5 p-2 rounded-xl bg-[#faf7f5] border border-[#ede7e2]">
                    <div>
                      <div class="flex justify-between text-[10px] font-bold mb-1">
                        <span class="text-[#4b5563]">نسبة مرور الزمن المحدد:</span>
                        <span class="text-[#111827] font-black">${timePct}%</span>
                      </div>
                      <div class="w-full h-1.5 bg-[#e5dfd9] rounded-full overflow-hidden">
                        <div class="h-full bg-slate-600 rounded-full" style="width: ${timePct}%"></div>
                      </div>
                    </div>

                    <div>
                      <div class="flex justify-between text-[10px] font-bold mb-1">
                        <span class="text-[#15803d]">نسبة الإنجاز الحقيقي:</span>
                        <span class="text-[#15803d] font-black">${actualPct}%</span>
                      </div>
                      <div class="w-full h-1.5 bg-[#e5dfd9] rounded-full overflow-hidden">
                        <div class="h-full bg-[#00a63e] rounded-full" style="width: ${actualPct}%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }

            // 14. انقطاعات الخدمات (الكهرباء، التذبذب، المياه، الهاتف) Rows 21-23
            if (sub.id === 'sub_outage_elec' || sub.id === 'sub_fluctuation_elec' || sub.id === 'sub_outage_water' || sub.id === 'sub_outage_phone') {
              const isFluct = sub.id === 'sub_fluctuation_elec';
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-black text-xs text-[#111827]">${rec.affectedFacility}</span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isFluct ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'}">
                      ${isFluct ? 'تذبذب تيار 〰️' : 'انقطاع خدمة ⚡'}
                    </span>
                  </div>
                  <div class="text-[11px] text-[#4b5563]">
                    ${isFluct ? `وقت التذبذب: <strong>${rec.fluctuationTime}</strong> (المدة: <strong>${rec.durationSeconds}</strong>)` : `المدة: <strong>${rec.duration}</strong> • مجدول: <strong>${rec.scheduled}</strong>`}
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 ${rec.outageStart || rec.fluctuationDate || '—'}</span>
                    <span class="text-[#9ca3af] font-bold">←</span>
                  </div>
                </div>
              `;
            }

            // 15. البلاغات اليومية (Daily Reports)
            if (sub.id === 'sub_daily_reports') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="font-extrabold text-xs text-[#111827] truncate flex items-center gap-1.5 min-w-0">
                      <span class="truncate">${rec.entity || 'الجهة غير محددة'}</span>
                      ${rec.reporterName ? `<span class="text-[10px] font-normal text-[#6b7280] shrink-0">(${rec.reporterName})</span>` : ''}
                    </div>
                    ${renderStatusBadge(rec.status)}
                  </div>

                  <p class="text-xs text-[#4b5563] truncate leading-normal">
                    ${rec.problemDesc || 'لا يوجد وصف للمشكلة'}
                  </p>

                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span>📅 ${rec.reportDateTime || (rec.reportDate + ' ' + (rec.timeOnly || ''))}</span>
                    <div class="flex items-center gap-2 shrink-0">
                      <span>الفني: <strong class="text-[#111827] font-semibold">${rec.technician || '—'}</strong></span>
                      <span class="text-[#9ca3af] font-bold">←</span>
                    </div>
                  </div>
                </div>
              `;
            }

            // 16. أوامر العمل (Work Orders & RM)
            if (sub.id === 'sub_work_orders' || sub.id === 'sub_rm_work_orders') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="text-xs font-black text-[#111827]">${rec.woNo || rec.id}</span>
                      ${renderPriorityBadge(rec.priority)}
                    </div>
                    ${renderStatusBadge(rec.status)}
                  </div>

                  <p class="text-xs text-[#4b5563] truncate leading-normal">
                    ${rec.problemDesc || 'لا يوجد تفاصيل لأمر العمل'}
                  </p>

                  <div class="flex items-center justify-between text-[10px] text-[#6b7280] pt-1 border-t border-[#f3ece6]">
                    <span class="truncate">${rec.department || '—'} • ${rec.system || '—'}</span>
                    <div class="flex items-center gap-2 shrink-0">
                      <span>⏱️ ${rec.responseTime || '—'}</span>
                      <span class="text-[#9ca3af] font-bold">←</span>
                    </div>
                  </div>
                </div>
              `;
            }

            // 17. التقارير (PDF Reports)
            if (sub.id === 'sub_pdf_reports') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition flex items-center justify-between gap-3">
                  <div class="min-w-0 flex-1 space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#fdece6] text-[#db6b49]">${rec.reportType || 'تقرير'}</span>
                      <span class="text-[10px] text-[#9ca3af]">${rec.uploadDate || ''}</span>
                    </div>
                    <div class="font-extrabold text-xs text-[#111827] truncate">${rec.reportTitle || 'تقرير فني'}</div>
                    <div class="text-[11px] text-[#6b7280] truncate">
                      <span>${rec.department || '—'}</span> • <span>${rec.system || '—'}</span>
                    </div>
                  </div>
                  <span class="text-[#9ca3af] text-sm font-bold shrink-0">←</span>
                </div>
              `;
            }

            // Fallback General Card
            const keys = sub.summaryKeys || [];
            const primaryKey = keys[0];
            const secondaryKey = keys[1];
            const tertiaryKey = keys[2];
            const statusKey = keys.find(k => k.key.toLowerCase().includes('status') || k.label.includes('الحالة'));
            const statusVal = statusKey ? rec[statusKey.key] : null;

            return `
              <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-extrabold text-xs text-[#111827] truncate">
                      ${primaryKey && rec[primaryKey.key] !== undefined && rec[primaryKey.key] !== '' ? rec[primaryKey.key] : rec.id}
                    </span>
                    ${statusVal ? renderStatusBadge(statusVal) : ''}
                  </div>
                  ${secondaryKey && rec[secondaryKey.key] !== undefined && rec[secondaryKey.key] !== '' ? `
                    <div class="text-[11px] text-[#6b7280] truncate">
                      <span>${secondaryKey.label}:</span> <strong class="text-[#374151] font-semibold">${rec[secondaryKey.key]}</strong>
                      ${tertiaryKey && tertiaryKey !== statusKey && rec[tertiaryKey.key] !== undefined && rec[tertiaryKey.key] !== '' ? ` • <span>${tertiaryKey.label}:</span> <strong class="text-[#374151] font-semibold">${rec[tertiaryKey.key]}</strong>` : ''}
                    </div>
                  ` : ''}
                </div>
                <span class="text-[#9ca3af] text-sm font-bold shrink-0">←</span>
              </div>
            `;
          }).join('')}
        </div>
        `}
      </div>
    </div>
  `;
}

window.calculateAssetAge = calculateAssetAge;
window.calculateTimeElapsed = calculateTimeElapsed;
window.renderSubSectionRecords = renderSubSectionRecords;
