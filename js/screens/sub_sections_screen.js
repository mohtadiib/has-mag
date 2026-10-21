// ============================================================================
// HAS MAG IFMT - MODULE SUB-SECTIONS SCREEN (شاشة الأقسام الفرعية للوحدة)
// Flutter Equivalent: lib/presentation/screens/module/sub_sections_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/module/sub_sections_screen.dart
 * LEVEL 2: استعراض تفرعات وأقسام الوحدة التشغيلية المحددة
 */
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
              <div class="relative w-14 h-14 flex items-center justify-center">
                <!-- المربع المنزاح الصغير خلف أيقونة القسم الفرعي -->
                <span class="absolute w-10 h-10 rounded-2xl bg-[#eee4db] border border-[#dfd3c6] translate-x-1.5 translate-y-1.5 transition-all duration-200 group-hover:bg-[#fdece6] group-hover:border-[#f9d8cc] group-hover:translate-x-2 group-hover:translate-y-2 -z-0"></span>
                <span class="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[#47525e] text-white text-[10px] font-extrabold shadow-xs leading-none border border-white z-20">${recCount}</span>
                ${(!sub.icon || (!sub.icon.startsWith('data:') && !sub.icon.startsWith('http') && !sub.icon.includes('/'))) ? `
                  <span class="text-4xl leading-none select-none filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.08)] relative z-10 transition-transform duration-200 group-hover:scale-110" role="img" aria-label="${sub.shortTitle}">${sub.textIcon || sub.icon || '📁'}</span>
                ` : `
                  <img src="${sub.icon}" alt="${sub.shortTitle}" class="w-11 h-11 object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.08)] relative z-10 transition-transform duration-200 group-hover:scale-110" />
                `}
              </div>
              <span class="text-xs font-bold text-[#1f2937] group-hover:text-[#db6b49] mt-2.5 leading-tight text-center transition tracking-tight">${sub.shortTitle}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

window.renderModuleSubSections = renderModuleSubSections;
