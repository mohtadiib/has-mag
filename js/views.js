// REUSABLE COMPONENT: TICKETS STATS + 12 DEPARTMENTS GRID (مبسطة ومباشرة)
// ============================================================================
function renderTicketsAndDepartmentsWidget() {
  const totalCount = 387 + INSPECTION_TICKETS.length;
  const openCount = INSPECTION_TICKETS.filter(t => t.status === 'مفتوحة').length;
  const closedCount = 382 + INSPECTION_TICKETS.filter(t => t.status === 'مغلقة').length;

  return `
    <div class="space-y-4">
      <!-- 1. Ticket Statistics -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-extrabold text-[#111827]">إحصاءات التذاكر</h2>
          <div class="flex items-center gap-2">
            <button type="button" onclick="openNewInspectionSheet()" class="px-2.5 py-1 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs transition active:scale-95">
              <span>+ تذكرة جديدة</span>
            </button>
            <button type="button" onclick="openDeptTickets('الكل')" class="text-xs font-bold text-[#db6b49] hover:underline">
              عرض كل التذاكر ←
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center">
          <div onclick="openDeptTickets('الكل')" class="cursor-pointer bg-white rounded-2xl py-2.5 px-2 border border-[#ede7e2] shadow-2xs hover:border-[#db6b49] transition">
            <div class="text-[11px] text-[#6b7280] font-medium">الإجمالي</div>
            <div class="text-lg font-extrabold text-[#111827] mt-0.5">${totalCount}</div>
          </div>
          <div onclick="openDeptTickets('الكل')" class="cursor-pointer bg-white rounded-2xl py-2.5 px-2 border border-[#ede7e2] shadow-2xs hover:border-[#db6b49] transition">
            <div class="text-[11px] text-[#6b7280] font-medium">مفتوحة</div>
            <div class="text-lg font-extrabold text-[#db6b49] mt-0.5">${openCount}</div>
          </div>
          <div onclick="openDeptTickets('الكل')" class="cursor-pointer bg-white rounded-2xl py-2.5 px-2 border border-[#ede7e2] shadow-2xs hover:border-[#db6b49] transition">
            <div class="text-[11px] text-[#6b7280] font-medium">مغلقة</div>
            <div class="text-lg font-extrabold text-[#00a63e] mt-0.5">${closedCount}</div>
          </div>
        </div>
      </div>

      <!-- 2. The 12 Technical Departments Grid -->
      <div class="space-y-2.5 pt-1">
        <h2 class="text-sm font-extrabold text-[#111827]">الأقسام الفنية (12)</h2>
        <div class="grid grid-cols-4 gap-y-4 gap-x-2 text-center pt-1">
          ${MASTER_DATA.departments.map(dep => `
            <div onclick="openDeptTickets('${dep.code}')" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-2xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
              <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                ${dep.badge > 0 ? `<span class="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-white leading-none z-10">${dep.badge}</span>` : ''}
                <img src="${dep.icon}" alt="${dep.code}" class="w-11 h-11 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
              </div>
              <span class="text-[11px] font-bold text-[#1f2937] group-hover:text-[#db6b49] mt-2 leading-tight truncate max-w-full px-0.5 transition tracking-tight">${dep.code}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================

// LEVEL 1: HOME SCREEN (نظيفة ومباشرة تعرض الوحدات الـ 12 فقط بدون تشتيت)
// ============================================================================
function renderHomeScreen() {
  return `
    <div class="p-4 space-y-3 fade-in">
      <div class="flex items-center justify-between px-0.5">
        <h2 class="text-sm font-extrabold text-[#111827]">الوحدات التشغيلية</h2>
        <span class="text-[11px] text-[#6b7280] font-medium">اختر الوحدة للمتابعة</span>
      </div>

      <div class="grid grid-cols-3 gap-y-4 gap-x-2 text-center pt-2">
        ${SYSTEM_MODULES.map(mod => `
          <div onclick="openModule('${mod.id}')" class="cursor-pointer flex flex-col items-center justify-start group relative py-2.5 px-1 rounded-2xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
            <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              ${mod.badge > 0 ? `<span class="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-white leading-none z-10">${mod.badge}</span>` : ''}
              <span class="text-4xl leading-none select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.07)]" role="img" aria-label="${mod.shortTitle}">${mod.textIcon}</span>
            </div>
            <span class="text-[11.5px] font-extrabold text-[#1f2937] group-hover:text-[#db6b49] mt-2.5 leading-snug text-center transition tracking-tight">${mod.shortTitle}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================================

// LEVEL 2: MODULE SUB-SECTIONS (أيقونات التفرعات فقط دون أزرار مكررة)
// ============================================================================
function renderModuleSubSections() {
  const mod = getModule();

  if (mod.isInspectionToursHub) {
    return `
      <div class="p-3.5 space-y-4 fade-in">
        ${renderTicketsAndDepartmentsWidget()}
      </div>
    `;
  }

  return `
    <div class="p-4 space-y-3 fade-in">
      <div class="text-xs font-extrabold text-[#6b7280] px-0.5">اختر القسم الفرعي:</div>
      <div class="grid grid-cols-2 gap-y-4 gap-x-3 text-center pt-2">
        ${mod.subSections.map(sub => {
          const recCount = sub.records ? sub.records.length : (sub.isInteractiveTanks ? MASTER_DATA.tanksConfig.filter(t => t.category === sub.tankCategoryFilter).length : 0);
          return `
            <div onclick="openSubSection('${mod.id}', '${sub.id}')" class="cursor-pointer flex flex-col items-center justify-start group relative py-3 px-2 rounded-2xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
              <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <span class="absolute -top-1.5 -right-2 px-2 py-0.5 rounded-full bg-[#47525e] text-white text-[10px] font-extrabold shadow-xs leading-none border border-white z-10">${recCount}</span>
                <img src="${sub.icon}" alt="${sub.shortTitle}" class="w-12 h-12 object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.08)]" />
              </div>
              <span class="text-xs font-bold text-[#1f2937] group-hover:text-[#db6b49] mt-2.5 leading-tight text-center transition tracking-tight">${sub.shortTitle}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============================================================================

// LEVEL 3: SUB-SECTION RECORDS / 3RD-LEVEL CHILD SUB-ICONS / TANKS
// ============================================================================
function renderSubSectionRecords() {
  const mod = getModule();
  const sub = getSubSection();

  const subTabsHtml = mod.subSections.length > 1 ? `
    <div class="bg-white px-3 pt-2 border-b border-[#e5dfd9] flex items-end gap-1.5 overflow-x-auto no-scrollbar shadow-2xs">
      ${mod.subSections.map(s => {
        const isSubActive = s.id === sub.id;
        return `
          <button type="button" onclick="openSubSection('${mod.id}', '${s.id}')" class="fit-tab shrink-0 px-3 py-2 rounded-t-xl text-xs font-extrabold whitespace-nowrap transition-all border-b-[3px] ${isSubActive ? 'bg-[#fdece6]/70 text-[#db6b49] border-[#db6b49]' : 'text-[#64748b] border-transparent hover:text-[#1f2937]'}">
            <span>${s.shortTitle}</span>
          </button>
        `;
      }).join('')}
    </div>
  ` : '';

  // Case A1: 3rd-Level Child Sub-Icons (Top Level: Group Icons & Direct Options)
  if (sub.hasChildSubIcons && state.activeChildSubCode === 'الكل') {
    return `
      <div class="fade-in">
        ${subTabsHtml}
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
              return `
                <div onclick="state.activeChildSubCode='${c.code}'; renderApp();" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
                  <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <span class="absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full bg-[#47525e] text-white text-[9px] font-extrabold shadow-xs leading-none border border-white z-10">${cnt}</span>
                    <img src="${c.icon}" alt="${c.title}" class="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                  </div>
                  <span class="text-[11px] font-bold text-[#111827] group-hover:text-[#db6b49] mt-2 leading-tight text-center transition tracking-tight">${c.title}</span>
                </div>
              `;
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
        ${subTabsHtml}
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
              return `
                <div onclick="state.activeChildSubCode='${c.code}'; renderApp();" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
                  <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <span class="absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full bg-[#47525e] text-white text-[9px] font-extrabold shadow-xs leading-none border border-white z-10">${cnt}</span>
                    <img src="${c.icon}" alt="${c.title}" class="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                  </div>
                  <span class="text-[11px] font-bold text-[#111827] group-hover:text-[#db6b49] mt-2 leading-tight text-center transition tracking-tight">${c.title}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Case B: Interactive Fuel or Water Tanks
  if (sub.isInteractiveTanks) {
    const stations = sub.stationFilterOptions || [];
    const tanks = MASTER_DATA.tanksConfig.filter(t => {
      const matchCat = t.category === sub.tankCategoryFilter;
      const matchSt = !stations.length || state.activeFilterPill === 'الكل' || t.station === state.activeFilterPill;
      return matchCat && matchSt;
    });

    return `
      <div class="fade-in">
        ${subTabsHtml}
        <div class="p-3.5 space-y-3">
          ${stations.length > 0 ? `
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              ${stations.map(st => `
                <button type="button" onclick="state.activeFilterPill='${st}'; renderApp();" class="fit-tab shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition ${state.activeFilterPill === st ? 'bg-[#47525e] text-white border-[#47525e]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
                  ${st}
                </button>
              `).join('')}
            </div>
          ` : ''}

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
        </div>
      </div>
    `;
  }

  // Case C: Standard Records List (بطاقات نظيفة وموضوعية، والعمليات تتم عند فتح السجل)
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
      ${subTabsHtml}
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

        <!-- Clean Objective Summary Cards (اضغط على السجل لعرض التفاصيل أو الإجراءات) -->
        <div class="space-y-2.5">
          ${filteredRecords.length === 0 ? `
            <div class="bg-white rounded-2xl border border-[#ede7e2] p-6 text-center text-xs text-[#6b7280]">
              لا توجد سجلات حالياً في هذا التصنيف. استخدم زر (+ إضافة) في الأعلى.
            </div>
          ` : filteredRecords.map(rec => {
            // Case 1: البلاغات اليومية (Daily Reports) - بطاقة مختصرة وأنيقة
            if (sub.id === 'sub_daily_reports') {
              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="font-extrabold text-xs text-[#111827] truncate flex items-center gap-1.5 min-w-0">
                      <span class="truncate">${rec.entity || 'الجهة غير محددة'}</span>
                      ${rec.reporterName ? `<span class="text-[10px] font-normal text-[#6b7280] shrink-0">(${rec.reporterName})</span>` : ''}
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${rec.status === 'مغلق' ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]'}">
                      ${rec.status || 'مفتوح'}
                    </span>
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

            // Case 2: أوامر العمل (Work Orders) - بطاقة مختصرة وأنيقة
            if (sub.id === 'sub_work_orders') {
              const pClass = !rec.priority ? 'bg-slate-500 text-white' :
                rec.priority.includes('طارئة') ? 'bg-red-500 text-white' :
                rec.priority.includes('عالية') ? 'bg-[#ea580c] text-white' :
                rec.priority.includes('متوسطة') ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white';

              return `
                <div onclick="openRecordDetails('${rec.id}', false)" class="cursor-pointer bg-white hover:border-[#db6b49] rounded-2xl border border-[#ede7e2] p-3 shadow-2xs transition space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="text-xs font-black text-[#111827]">${rec.woNo || rec.id}</span>
                      ${rec.priority ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-extrabold ${pClass}">${rec.priority}</span>` : ''}
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${rec.status === 'مغلق' ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]'}">
                      ${rec.status || 'مفتوح'}
                    </span>
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

            // Case 3: التقارير (PDF Reports) - بطاقة مختصرة وأنيقة
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

            // Case 4: القاعدة العامة لجميع الوحدات والأقسام الأخرى - بطاقة مختصرة وموحدة
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
                    ${statusVal ? `
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${statusVal === 'مغلق' || statusVal === 'مكتمل' || statusVal === 'منتظم' || statusVal === 'يعمل' ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]'}">
                        ${statusVal}
                      </span>
                    ` : ''}
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
      </div>
    </div>
  `;
}

// ============================================================================

// INSPECTION TOURS & TICKETS VIEW (قسم الجولات والتذاكر)
// ============================================================================
function renderInspectionToursHubView() {
  if (state.navLevel === 2 && !state.viewingTicketsListInHub) {
    return `
      <div class="p-3.5 space-y-4 fade-in">
        ${renderTicketsAndDepartmentsWidget()}
      </div>
    `;
  }

  if (state.navLevel === 4) {
    const tkt = INSPECTION_TICKETS.find(r => r.id === state.selectedRecordId) || INSPECTION_TICKETS[0];
    return `
      <div class="p-4 space-y-3.5 fade-in text-xs">
        <div class="flex items-center justify-between">
          <span class="px-3.5 py-1 rounded-full font-bold text-white ${tkt.status === 'مغلقة' ? 'bg-[#00a63e]' : 'bg-[#db6b49]'}">${tkt.status}</span>
          <span class="text-[#6b7280] font-medium">${tkt.timeAgo}</span>
        </div>

        <h3 class="text-sm font-extrabold text-[#111827] leading-snug">${tkt.title}</h3>

        <div class="flex flex-wrap gap-1.5">
          <span class="px-2.5 py-1 rounded-lg bg-[#fff7ed] text-[#ea580c] font-bold text-[11px]">الاستجابة: ${tkt.responseTime}</span>
          <span class="px-2.5 py-1 rounded-lg bg-[#f0fdf4] text-[#16a34a] font-bold text-[11px]">مدة الصيانة: ${tkt.maintDuration}</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="space-y-1">
            <span class="text-[11px] font-bold text-[#6b7280] block">قبل الصيانة</span>
            <img src="${tkt.thumb}" alt="قبل" class="w-full h-32 rounded-xl object-cover border border-[#e5dfd9]" />
          </div>
          <div class="space-y-1">
            <span class="text-[11px] font-bold text-[#6b7280] block">بعد الصيانة</span>
            <img src="${tkt.afterPhoto}" alt="بعد" class="w-full h-32 rounded-xl object-cover border border-[#e5dfd9]" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 space-y-2">
          <div class="flex justify-between"><span class="text-[#6b7280]">القسم:</span> <strong>${tkt.department}</strong></div>
          <div class="flex justify-between"><span class="text-[#6b7280]">الموقع:</span> <strong>${tkt.location}</strong></div>
          <div class="flex justify-between"><span class="text-[#6b7280]">المُبلّغ:</span> <strong>${tkt.reporter}</strong></div>
          <div class="flex justify-between"><span class="text-[#6b7280]">رقم CM:</span> <strong class="text-[#db6b49]">${tkt.cmNumber}</strong></div>
          <div class="pt-2 border-t border-[#f3ece6]">
            <span class="text-[#6b7280] block mb-0.5">ملاحظات الإغلاق:</span>
            <p class="font-bold text-[#111827]">${tkt.closingNotes}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button type="button" onclick="toggleTicketStatus('${tkt.id}')" class="py-2.5 rounded-xl bg-[#47525e] text-white font-extrabold">
            ${tkt.status === 'مغلقة' ? 'إعادة فتح التذكرة' : 'إغلاق التذكرة'}
          </button>
          <button type="button" onclick="convertTicketToWorkOrder('${tkt.id}')" class="py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">
            تحويل لأمر عمل
          </button>
        </div>
      </div>
    `;
  }

  const list = INSPECTION_TICKETS.filter(r => {
    const matchDept = state.ticketFilterDept === 'الكل' || r.department === state.ticketFilterDept;
    const matchQ = !state.ticketSearchQuery || r.title.includes(state.ticketSearchQuery) || r.department.includes(state.ticketSearchQuery);
    return matchDept && matchQ;
  });

  return `
    <div class="p-3.5 space-y-3 fade-in">
      <!-- Department Filter Pills + Search -->
      <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        <button type="button" onclick="state.ticketFilterDept='الكل'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${state.ticketFilterDept === 'الكل' ? 'bg-[#47525e] text-white' : 'bg-white border border-[#dcd4cc] text-[#374151]'}">
          الكل (${INSPECTION_TICKETS.length})
        </button>
        ${MASTER_DATA.departments.map(d => `
          <button type="button" onclick="state.ticketFilterDept='${d.code}'; renderApp();" class="fit-tab shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition ${state.ticketFilterDept === d.code ? 'bg-[#db6b49] text-white' : 'bg-white border border-[#dcd4cc] text-[#374151]'}">
            ${d.code}
          </button>
        `).join('')}
      </div>

      <input type="text" value="${state.ticketSearchQuery}" oninput="state.ticketSearchQuery=this.value; renderApp();" placeholder="بحث في التذاكر..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-[#ede7e2] text-xs font-medium" />

      <!-- Tickets Cards List -->
      <div class="space-y-2.5">
        ${list.map(t => `
          <div onclick="openTicketRecordDetails('${t.id}')" class="cursor-pointer bg-white rounded-2xl border border-[#ede7e2] p-3 shadow-2xs hover:border-[#db6b49] transition flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <img src="${t.thumb}" alt="ticket" class="w-12 h-12 rounded-xl object-cover border border-[#e5dfd9] shrink-0" />
              <div class="min-w-0 flex-1">
                <div class="text-[10px] text-[#6b7280] mb-0.5">${t.timeAgo} • CM #${t.cmNumber}</div>
                <div class="font-bold text-xs text-[#111827] truncate mb-1">${t.title}</div>
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded-md bg-[#f3ece6] text-[#374151] text-[10px] font-bold">${t.department}</span>
                  <span class="px-2 py-0.5 rounded-md ${t.status === 'مغلقة' ? 'bg-[#00a63e] text-white' : 'bg-[#db6b49] text-white'} text-[10px] font-bold">${t.status}</span>
                </div>
              </div>
            </div>
            <span class="text-[#9ca3af] text-sm font-bold shrink-0">←</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================================

// LEVEL 4: RECORD DETAILS & ACTIONS VIEW (تعديل السجل والإجراءات الموضوعية في مكان واحد)
// ============================================================================
function renderRecordDetailsView() {
  const mod = getModule();
  const sub = getSubSection();

  const existing = (!state.isCreatingNew && sub.records)
    ? (sub.records.find(r => r.id === state.selectedRecordId) || sub.records[0])
    : {};

  return `
    <div class="p-3.5 space-y-3 fade-in">
      ${sub.id === 'sub_pdf_reports' && existing.fileName ? `
        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-[#111827]">مستند التقرير المعتمد (PDF)</span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#fdece6] text-[#db6b49]">${existing.reportType || 'تقرير'}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-[#faf7f5] border border-[#f3ece6] flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-red-500 font-extrabold text-sm">📄</span>
              <span class="text-xs font-semibold text-[#111827] truncate">${existing.fileName}</span>
            </div>
            <button type="button" onclick="showToast('جاري فتح مستند: ' + '${existing.fileName}')" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-bold shrink-0">
              استعراض PDF
            </button>
          </div>
        </div>
      ` : ''}

      ${sub.id === 'sub_work_orders' && existing.id ? `
        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-[#111827]">مؤشرات أمر العمل (${existing.woNo || existing.id})</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${existing.status === 'مغلق' ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]'}">${existing.status || 'مفتوح'}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[10px]">
            <div class="p-2 rounded-xl bg-[#fff7ed] border border-[#fed7aa]">
              <span class="text-[#c2410c] block font-bold text-[9px] mb-0.5">⏱️ زمن الاستجابة:</span>
              <strong class="text-[#9a3412] font-black text-xs block">${existing.responseTime || '—'}</strong>
            </div>
            <div class="p-2 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
              <span class="text-[#15803d] block font-bold text-[9px] mb-0.5">🛠️ زمن التصحيح:</span>
              <strong class="text-[#166534] font-black text-xs block">${existing.correctionDuration || '—'}</strong>
            </div>
          </div>
        </div>
      ` : ''}

      <form id="recordDetailForm" class="bg-white rounded-2xl border border-[#ede7e2] p-4 shadow-2xs space-y-3 text-xs">
        <div class="pb-2 border-b border-[#f3ece6] flex items-center justify-between">
          <span class="font-extrabold text-[#111827]">بيانات السجل الكاملة</span>
          <span class="text-[10px] text-[#db6b49] font-bold">${sub.shortTitle}</span>
        </div>

        ${(sub.fields || []).map(f => {
          let val = existing[f.key] !== undefined ? existing[f.key] : '';
          let inputHtml = '';

          if (f.type === 'master_entity') {
            const entities = MASTER_DATA.entities || [];
            const opts = entities.map(e => `<option value="${e}" ${val === e ? 'selected' : ''}>${e}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_dept') {
            const opts = MASTER_DATA.departments.map(d => `<option value="${d.name}" ${val === d.name ? 'selected' : ''}>${d.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_system') {
            const opts = MASTER_DATA.systems.map(s => `<option value="${s.name}" ${val === s.name ? 'selected' : ''}>${s.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_location') {
            const opts = MASTER_DATA.locations.map(l => `<option value="${l.name}" ${val === l.name ? 'selected' : ''}>${l.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_employee') {
            const opts = MASTER_DATA.employees.map(e => `<option value="${e.name}" ${val === e.name ? 'selected' : ''}>${e.name} (${e.shift})</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_catalog_item') {
            const items = MASTER_DATA.catalog.filter(c => c.type === 'صنف مخزني');
            const opts = items.map(c => `<option value="${c.name}" ${val === c.name ? 'selected' : ''}>${c.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_catalog_asset') {
            const assets = MASTER_DATA.catalog.filter(c => c.type === 'أصل تشغيلي');
            const opts = assets.map(c => `<option value="${c.name}" ${val === c.name ? 'selected' : ''}>${c.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'master_catalog_contractor') {
            const contractors = MASTER_DATA.catalog.filter(c => c.type === 'مقاول خارجي');
            const opts = contractors.map(c => `<option value="${c.name}" ${val === c.name ? 'selected' : ''}>${c.name}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'select') {
            const opts = (f.options || []).map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('');
            inputHtml = `<select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${opts}</select>`;
          } else if (f.type === 'textarea') {
            inputHtml = `<textarea name="${f.key}" rows="2" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold">${val}</textarea>`;
          } else if (f.type === 'readonly_calc') {
            inputHtml = `<input type="number" name="${f.key}" id="calcField_${f.key}" value="${val || 0}" readonly class="w-full px-3 py-2 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d] font-extrabold text-sm" />`;
          } else {
            inputHtml = `<input type="${f.type || 'text'}" name="${f.key}" value="${val}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-semibold" />`;
          }

          return `
            <div class="space-y-1">
              <label class="font-bold text-[#1f2937] block">${f.label}</label>
              ${inputHtml}
            </div>
          `;
        }).join('')}

        <div class="pt-2 flex items-center gap-2">
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs">حفظ التعديلات</button>
          <button type="button" onclick="deleteRecord('${mod.id}', '${sub.id}', '${existing.id}')" class="px-3.5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs">حذف</button>
        </div>
      </form>

      <!-- Contextual Workflow Actions (تظهر فقط عند الحاجة داخل صفحة تفاصيل السجل) -->
      ${sub.id === 'sub_daily_reports' && existing.id ? `
        <button type="button" onclick="convertReportToWorkOrder('${existing.id}')" class="w-full py-2.5 rounded-2xl bg-[#47525e] text-white font-extrabold text-xs shadow-xs">
          تحويل البلاغ إلى أمر عمل تصحيحي
        </button>
      ` : ''}

      ${sub.id === 'sub_faulty_equip' && existing.id ? `
        <div class="grid grid-cols-2 gap-2">
          <button type="button" onclick="convertFaultToWorkOrder('${existing.id}')" class="py-2.5 rounded-xl bg-[#47525e] text-white font-extrabold text-xs">
            إصدار أمر عمل
          </button>
          <button type="button" onclick="convertFaultToSpr('${existing.id}')" class="py-2.5 rounded-xl bg-white border border-[#dfd8d0] text-[#1f2937] font-extrabold text-xs">
            طلب شراء قطعة (SPR)
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// ============================================================================

// TAB 3: TANKS QUICK VIEW (الخزانات)
// ============================================================================
function renderTanksQuickTab() {
  return `
    <div class="p-3.5 space-y-3 fade-in text-xs">
      <div class="flex items-center justify-between px-0.5">
        <h2 class="text-sm font-extrabold text-[#111827]">مناسيب خزانات الوقود والمياه</h2>
        <span class="text-[11px] text-[#6b7280]">${MASTER_DATA.tanksConfig.length} خزانات</span>
      </div>

      <div class="space-y-2.5">
        ${MASTER_DATA.tanksConfig.map(t => {
          const pct = Math.min(100, Math.round((t.currentLiters / t.capacity) * 100));
          const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-amber-500' : 'bg-[#00a63e]';
          return `
            <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-extrabold text-[#111827] block">${t.name}</span>
                  <span class="text-[10px] text-[#6b7280]">${t.station} • آخر توريد: ${t.lastSupplyDate}</span>
                </div>
                <span class="text-[11px] font-extrabold text-[#00a63e]">${t.currentLiters.toLocaleString()} / ${t.capacity.toLocaleString()} لتر (${pct}%)</span>
              </div>
              <div class="w-full h-2 bg-[#f3ece6] rounded-full overflow-hidden">
                <div class="h-full ${barColor}" style="width: ${pct}%"></div>
              </div>
              <div class="grid grid-cols-2 gap-2 pt-0.5">
                <button type="button" onclick="openTankSheet('${t.id}', 'supply')" class="py-1.5 rounded-lg bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] text-[11px] font-bold">+ توريد</button>
                <button type="button" onclick="openTankSheet('${t.id}', 'dispense')" class="py-1.5 rounded-lg bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] text-[11px] font-bold">- صرف يومي</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============================================================================

// TAB 4: MORE / SETTINGS & MASTER DATA (مبسطة ومباشرة)
// ============================================================================
function renderMoreSettingsTab() {
  if (state.masterEditorCat) {
    return renderMasterDataEditor(state.masterEditorCat);
  }

  const masterLinks = [
    { id: 'departments', icon: '📁', title: 'الأقسام الفنية', count: MASTER_DATA.departments.length },
    { id: 'systems', icon: '⚙️', title: 'الأنظمة الفنية', count: MASTER_DATA.systems.length },
    { id: 'locations', icon: '📍', title: 'المواقع والمرافق', count: MASTER_DATA.locations.length },
    { id: 'employees', icon: '👥', title: 'الموظفين والورديات', count: MASTER_DATA.employees.length },
    { id: 'tanksConfig', icon: '🛢️', title: 'سعات الخزانات', count: MASTER_DATA.tanksConfig.length },
    { id: 'catalog', icon: '📦', title: 'الأصناف والأصول والمقاولين', count: MASTER_DATA.catalog.length }
  ];

  return `
    <div class="p-3.5 space-y-3.5 fade-in text-xs">
      <!-- 1. User Profile & Permissions -->
      <div class="bg-white rounded-2xl border border-[#ede7e2] p-4 shadow-2xs flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-[#fdece6] text-[#db6b49] flex items-center justify-center font-extrabold text-sm shrink-0">م</div>
          <div>
            <div class="font-extrabold text-sm text-[#111827]">مدير النظام</div>
            <div class="text-[11px] text-[#00a63e] font-bold">وضع المدير (كامل الصلاحيات)</div>
          </div>
        </div>
        <button type="button" onclick="openRbacModal()" class="px-3 py-1.5 rounded-xl bg-[#f3ece6] hover:bg-[#e5dfd9] text-[#374151] text-[11px] font-extrabold transition">
          الصلاحيات
        </button>
      </div>

      <!-- 2. Master Data List (طريق واحد واضح لكل إعداد) -->
      <div class="bg-white rounded-2xl border border-[#ede7e2] p-4 shadow-2xs space-y-2">
        <div class="font-extrabold text-sm text-[#111827] pb-1">البيانات الأساسية للنظام (Master Data)</div>
        <div class="space-y-1.5">
          ${masterLinks.map(item => `
            <button type="button" onclick="openMasterCategory('${item.id}')" class="w-full py-2.5 px-3 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] flex items-center justify-between font-bold text-[#1f2937] transition">
              <span class="flex items-center gap-2">
                <span>${item.icon}</span>
                <span>${item.title} (${item.count})</span>
              </span>
              <span class="text-[#9ca3af]">←</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================

// MASTER DATA EDITOR SUB-VIEW
// ============================================================================
function renderMasterDataEditor(cat) {
  if (cat === 'departments') {
    return `
      <div class="p-3.5 space-y-2 fade-in text-xs">
        ${MASTER_DATA.departments.map((d, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img src="${d.icon}" class="w-7 h-7 object-contain" />
              <div>
                <div class="font-bold text-[#111827]">${d.name}</div>
                <div class="text-[10px] text-[#6b7280]">المسؤول: ${d.manager}</div>
              </div>
            </div>
            <button type="button" onclick="MASTER_DATA.departments.splice(${idx},1); renderApp();" class="text-red-600 font-bold text-[11px]">حذف</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (cat === 'systems') {
    return `
      <div class="p-3.5 space-y-2 fade-in text-xs">
        ${MASTER_DATA.systems.map((s, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
            <div>
              <div class="font-bold text-[#111827]">${s.name}</div>
              <div class="text-[10px] text-[#db6b49]">${s.department}</div>
            </div>
            <button type="button" onclick="MASTER_DATA.systems.splice(${idx},1); renderApp();" class="text-red-600 font-bold text-[11px]">حذف</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (cat === 'locations') {
    return `
      <div class="p-3.5 space-y-2 fade-in text-xs">
        ${MASTER_DATA.locations.map((l, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
            <div>
              <span class="font-bold text-[#111827] block">${l.name}</span>
              <span class="text-[10px] text-[#6b7280]">${l.type || 'مرفق تشغيلي'}</span>
            </div>
            <button type="button" onclick="MASTER_DATA.locations.splice(${idx},1); renderApp();" class="text-red-600 font-bold text-[11px]">حذف</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (cat === 'employees') {
    return `
      <div class="p-3.5 space-y-2 fade-in text-xs">
        ${MASTER_DATA.employees.map((e, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
            <div>
              <div class="font-bold text-[#111827]">${e.name} <span class="px-2 py-0.5 rounded-md bg-[#fdece6] text-[#db6b49] text-[10px]">${e.shift}</span></div>
              <div class="text-[10px] text-[#6b7280] mt-0.5">${e.job} • ${e.department}</div>
            </div>
            <button type="button" onclick="MASTER_DATA.employees.splice(${idx},1); renderApp();" class="text-red-600 font-bold text-[11px]">حذف</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (cat === 'tanksConfig') {
    return `
      <div class="p-3.5 space-y-2.5 fade-in text-xs">
        ${MASTER_DATA.tanksConfig.map((t, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-[#111827]">${t.name}</span>
              <button type="button" onclick="toggleTankLock(${idx})" class="px-2.5 py-1 rounded-lg text-[10px] font-bold ${t.locked ? 'bg-[#47525e] text-white' : 'bg-[#00a63e] text-white'}">
                ${t.locked ? '🔒 السعة مقفلة' : '🔓 السعة قابلة للتعديل'}
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-[10px] text-[#6b7280] block">السعة الثابتة (لتر)</span>
                <input type="number" value="${t.capacity}" ${t.locked ? 'readonly' : ''} onchange="MASTER_DATA.tanksConfig[${idx}].capacity=parseFloat(this.value||0); showToast('تم التحديث');" class="w-full px-2.5 py-1.5 rounded-xl border ${t.locked ? 'bg-[#f3ece6]' : 'bg-white border-[#db6b49]'} font-bold" />
              </div>
              <div>
                <span class="text-[10px] text-[#6b7280] block">الرصيد المتوفر (لتر)</span>
                <input type="number" value="${t.currentLiters}" onchange="MASTER_DATA.tanksConfig[${idx}].currentLiters=parseFloat(this.value||0); showToast('تم التحديث');" class="w-full px-2.5 py-1.5 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-bold text-[#00a63e]" />
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="p-3.5 space-y-2 fade-in text-xs">
      ${MASTER_DATA.catalog.map((c, idx) => `
        <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
          <div>
            <span class="text-[10px] text-[#db6b49] font-bold">${c.type}</span>
            <div class="font-bold text-[#111827]">${c.name}</div>
          </div>
          <button type="button" onclick="MASTER_DATA.catalog.splice(${idx},1); renderApp();" class="text-red-600 font-bold text-[11px]">حذف</button>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================================
