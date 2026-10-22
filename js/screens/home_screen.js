// ============================================================================
// HAS MAG IFMT - HOME & DEPARTMENTS SCREEN (شاشة الرئيسية والوحدات التشغيلية)
// Flutter Equivalent: lib/presentation/screens/home/home_screen.dart
// ============================================================================

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/tickets_departments_widget.dart
 * ودجت إحصاءات التذاكر وشبكة الأقسام الفنية الـ 12
 */
function renderTicketsAndDepartmentsWidget() {
  const totalCount = INSPECTION_TICKETS.length;
  const openCount = INSPECTION_TICKETS.filter(t => t.status === 'مفتوحة').length;
  const closedCount = INSPECTION_TICKETS.filter(t => t.status === 'مغلقة').length;

  return `
    <div class="space-y-4">
      <!-- 1. Ticket Statistics -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-extrabold text-[#111827]">إحصاءات التذاكر</h2>
          <button type="button" onclick="openDeptTickets('الكل')" class="text-xs font-bold text-[#db6b49] hover:underline">
            عرض كل التذاكر ←
          </button>
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

      <!-- 2. The Technical Departments Grid -->
      <div class="space-y-2.5 pt-1">
        <h2 class="text-sm font-extrabold text-[#111827]">الأقسام الفنية (${MASTER_DATA.departments.length})</h2>
        <div class="grid grid-cols-4 gap-y-4 gap-x-2 text-center pt-1">
          ${MASTER_DATA.departments.map(dep => `
            <div onclick="openDeptTickets('${dep.code}')" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-2xl hover:bg-[#ede7e2]/30 active:scale-95 transition duration-150 select-none">
              <div class="relative w-12 h-12 flex items-center justify-center">
                <!-- المربع المنزاح الصغير خلف أيقونة القسم -->
                <span class="absolute w-9 h-9 rounded-xl bg-[#eee4db] border border-[#dfd2c6] shadow-2xs translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:bg-[#fdece6] group-hover:border-[#f9d8cc] group-hover:translate-x-2 group-hover:translate-y-2 -z-0"></span>
                ${dep.badge > 0 ? `<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-white leading-none z-20">${dep.badge}</span>` : ''}
                <img src="${dep.icon}" alt="${dep.code}" class="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] relative z-10 transition-transform duration-200 group-hover:scale-110" />
              </div>
              <span class="text-[11px] font-bold text-[#1f2937] group-hover:text-[#db6b49] mt-2.5 leading-tight truncate max-w-full px-0.5 transition tracking-tight">${dep.code}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Flutter Screen Equivalent: lib/presentation/screens/home/home_screen.dart
 * LEVEL 1: الشاشة الرئيسية لعرض الوحدات التشغيلية الـ 12
 */
function renderHomeScreen() {
  return `
    <div class="p-4 space-y-3 fade-in">
      <div class="flex items-center justify-between px-0.5">
        <h2 class="text-sm font-extrabold text-[#111827]">الوحدات التشغيلية</h2>
        <span class="text-[11px] text-[#6b7280] font-medium">اختر الوحدة للمتابعة</span>
      </div>

      <div class="grid grid-cols-3 gap-y-4 gap-x-2 text-center pt-2">
        ${SYSTEM_MODULES.map(mod => `
          <div onclick="openModule('${mod.id}')" class="cursor-pointer flex flex-col items-center justify-start group relative py-2.5 px-1 rounded-2xl hover:bg-[#ede7e2]/30 active:scale-95 transition duration-150 select-none">
            <div class="relative w-14 h-14 flex items-center justify-center">
              <!-- المربع المنزاح الصغير خلف أيقونة الوحدة -->
              <span class="absolute w-11 h-11 rounded-2xl bg-[#eee4db] border border-[#dfd2c6] shadow-2xs translate-x-1.5 translate-y-2 transition-all duration-200 group-hover:bg-[#fdece6] group-hover:border-[#f9d8cc] group-hover:translate-x-2 group-hover:translate-y-2.5 -z-0"></span>
              ${mod.badge > 0 ? `<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ef4444] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-white leading-none z-20">${mod.badge}</span>` : ''}
              <span class="text-4xl leading-none select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.07)] relative z-10 transition-transform duration-200 group-hover:scale-110" role="img" aria-label="${mod.shortTitle}">${mod.textIcon}</span>
            </div>
            <span class="text-[11.5px] font-extrabold text-[#1f2937] group-hover:text-[#db6b49] mt-3 leading-snug text-center transition tracking-tight">${mod.shortTitle}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.renderTicketsAndDepartmentsWidget = renderTicketsAndDepartmentsWidget;
window.renderHomeScreen = renderHomeScreen;
