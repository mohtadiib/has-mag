// ============================================================================
// HAS MAG IFMT - RECORDS LIST SCREEN (شاشة عرض وتصفية السجلات التشغيلية)
// Flutter Equivalent: lib/presentation/screens/records/records_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/records/records_screen.dart
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
              لا توجد سجلات حالياً في هذا التصنيف. اضغط على زر (+) العائم أدناه لإضافة سجل جديد.
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

            // Case 2: أوامر العمل (Work Orders & RM) - بطاقة مختصرة وأنيقة
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
      </div>
    </div>
  `;
}

window.renderSubSectionRecords = renderSubSectionRecords;
