// ============================================================================
// HAS MAG IFMT - BASE BOTTOM SHEET CONTROLLER (متحكم النوافذ السفلية العامة)
// Flutter Equivalent: lib/presentation/sheets/base_bottom_sheet.dart
// (showModalBottomSheet in Flutter)
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/base_bottom_sheet.dart
 * عرض نافذة سفلية عامة مع مسار التوجيه (Breadcrumbs)
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * Future<T?> showAppBottomSheet<T>({
 *   required BuildContext context,
 *   required String title,
 *   required Widget body,
 *   String icon = '💡',
 * }) {
 *   return showModalBottomSheet<T>(
 *     context: context,
 *     isScrollControlled: true,
 *     backgroundColor: Colors.transparent,
 *     builder: (ctx) => AppBottomSheetContainer(
 *       title: title,
 *       icon: icon,
 *       child: body,
 *     ),
 *   );
 * }
 * ```
 */
function openBottomSheet(title, htmlContent, badgeIcon = '💡') {
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetBadgeIcon').textContent = badgeIcon;
  document.getElementById('sheetBody').innerHTML = htmlContent;
  const crumbs = getBreadcrumbsTrail();
  const sheetCrumbEl = document.getElementById('sheetBreadcrumb');
  if (sheetCrumbEl) {
    const trailHtml = crumbs.map(c => `<span class="whitespace-nowrap font-medium text-[#6b7280]">${c.label}</span>`).join('<span class="text-[#9ca3af] mx-1">←</span>');
    sheetCrumbEl.innerHTML = `${trailHtml} <span class="text-[#9ca3af] mx-1">←</span> <span class="whitespace-nowrap font-bold text-[#db6b49]">${title}</span>`;
  }
  document.getElementById('bottomSheetBackdrop').classList.remove('hidden');
}

/**
 * Flutter Navigation Equivalent: Navigator.of(context).pop();
 * إغلاق النافذة السفلية الحالية
 */
function closeBottomSheet() {
  document.getElementById('bottomSheetBackdrop').classList.add('hidden');
}

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/help_bottom_sheet.dart
 * نافذة شرح الوحدات التشغيلية وشجرة النظام
 */
function openHelpSheet(type, id, secondId) {
  if (event) event.stopPropagation();

  if (type === 'excel_tree') {
    openBottomSheet('دليل الوحدات التشغيلية للنظام', `
      <div class="p-3 rounded-2xl bg-[#fdece6] border border-[#f9d8cc] text-[#1f2937] font-bold leading-relaxed">
        دليل وحدات وأقسام نظام إدارة وتشغيل وصيانة مطار حائل الدولي:
      </div>
      <div class="space-y-2 pt-1">
        ${SYSTEM_MODULES.map(m => `
          <div class="p-2.5 rounded-xl bg-white border border-[#ede7e2] flex items-start gap-2.5">
            <span class="text-xl leading-none shrink-0 mt-0.5">${m.textIcon}</span>
            <div class="flex-1">
              <div class="font-extrabold text-[#111827]">${m.shortTitle} <span class="text-[10px] text-[#db6b49]">(${m.excelName})</span></div>
              <p class="text-[11px] text-[#6b7280] mt-0.5 leading-relaxed">${m.helpText}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `, '🌳');
    return;
  }

  if (type === 'module') {
    const mod = SYSTEM_MODULES.find(m => m.id === id);
    if (!mod) return;
    openBottomSheet(mod.fullTitle, `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#ede7e2]">
        <span class="text-2xl leading-none shrink-0">${mod.textIcon}</span>
        <p class="text-[#374151] leading-relaxed font-medium">${mod.helpText}</p>
      </div>
      <button type="button" onclick="closeBottomSheet(); openModule('${mod.id}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-2">
        فتح ${mod.shortTitle}
      </button>
    `, '📌');
    return;
  }

  if (type === 'subSection') {
    const mod = SYSTEM_MODULES.find(m => m.id === id);
    const sub = mod?.subSections.find(s => s.id === secondId);
    if (!sub) return;
    openBottomSheet(sub.shortTitle, `
      <p class="text-[#374151] leading-relaxed font-medium bg-white p-3 rounded-2xl border border-[#ede7e2]">
        ${sub.helpText}
      </p>
      ${sub.fields ? `
        <div class="space-y-1">
          <div class="font-extrabold text-[#111827]">البيانات المسجلة في هذا القسم:</div>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${sub.fields.map(f => `<span class="px-2.5 py-1 rounded-lg bg-white border border-[#e5dfd9] text-[#374151] text-[10px] font-bold">${f.label}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      <button type="button" onclick="closeBottomSheet(); openSubSection('${mod.id}', '${sub.id}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-2">
        استعراض ${sub.shortTitle}
      </button>
    `, '📋');
    return;
  }

  if (type === 'department') {
    const dep = MASTER_DATA.departments.find(d => d.code === id);
    if (!dep) return;
    openBottomSheet(dep.name, `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#ede7e2]">
        <img src="${dep.icon}" class="w-11 h-11 object-contain shrink-0" />
        <div>
          <div class="font-extrabold text-[#111827]">${dep.name}</div>
          <div class="text-[11px] text-[#db6b49] font-bold mt-0.5">المسؤول: ${dep.manager}</div>
        </div>
      </div>
      <p class="text-[#374151] leading-relaxed font-medium bg-white p-3 rounded-2xl border border-[#ede7e2]">
        ${dep.desc}
      </p>
      <button type="button" onclick="closeBottomSheet(); openDeptTickets('${dep.code}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-1">
        عرض تذاكر القسم (${dep.badge})
      </button>
    `, '🏢');
  }
}

window.openBottomSheet = openBottomSheet;
window.closeBottomSheet = closeBottomSheet;
window.openHelpSheet = openHelpSheet;
