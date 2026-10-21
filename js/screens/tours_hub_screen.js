// ============================================================================
// HAS MAG IFMT - INSPECTION TOURS & TICKETS HUB SCREEN (شاشة تذاكر الجولات الميدانية)
// Flutter Equivalent: lib/presentation/screens/inspection/tours_hub_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/inspection/tours_hub_screen.dart
 * شاشة استعراض الجولات الميدانية، التذاكر حسب الأقسام، وبطاقات قبل/بعد الصيانة
 */
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

window.renderInspectionToursHubView = renderInspectionToursHubView;
