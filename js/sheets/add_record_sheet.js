// ============================================================================
// HAS MAG IFMT - ADD RECORD BOTTOM SHEET (نافذة إضافة السجلات التشغيلية الديناميكية)
// Flutter Equivalent: lib/presentation/sheets/add_record_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/add_record_sheet.dart
 * نافذة إضافة سجل تشغيلي جديد بنموذج ديناميكي
 */
function openAddModal(modId, subId) {
  const mod = SYSTEM_MODULES.find(m => m.id === (modId || state.selectedModuleId)) || getModule();
  const sub = (mod.subSections || []).find(s => s.id === (subId || state.selectedSubId)) || mod.subSections[0];
  if (!sub) return;

  if (sub.id === 'sub_attendance') {
    const targetShift = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') ? state.activeChildSubCode : 'وردية A';
    openBulkShiftModal(targetShift);
    return;
  }

  const fieldsHtml = (sub.fields || []).map(f => {
    let val = '';
    if (sub.hasChildSubIcons && f.key === sub.childSubField && state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') {
      val = state.activeChildSubCode;
    } else if (f.key === 'woNo') {
      val = (sub.id === 'sub_rm_work_orders' ? 'RM-2026-' : 'WO-2026-') + Math.floor(503 + Math.random() * 400);
    } else if (f.key === 'sprNo') {
      val = 'SPR-2026-0' + Math.floor(100 + Math.random() * 800);
    } else if (f.key === 'mrfNo') {
      val = 'MRF-2026-0' + Math.floor(120 + Math.random() * 800);
    } else if (f.key === 'orderNo') {
      val = 'CP-2026-0' + Math.floor(90 + Math.random() * 800);
    } else if (f.key === 'status') {
      val = 'مفتوح';
    } else if (f.key === 'closeDateTime') {
      val = '';
    } else if (f.type === 'date') {
      val = '2026-10-19';
    } else if (f.type === 'time') {
      val = '16:00';
    } else if (f.type === 'datetime-local') {
      val = '2026-10-19T16:00';
    } else if (f.key === 'woDateTime') {
      val = '2026-10-19 16:00';
    }

    return renderDynamicFormField(f, val, { isQuickEdit: false, isAutoStock: sub.isAutoStock });
  }).join('');

  openBottomSheet(
    `إضافة: ${sub.shortTitle}`,
    `
      <form onsubmit="submitAddModalForm(event, '${mod.id}', '${sub.id}')" class="space-y-2.5 text-xs">
        ${fieldsHtml}
        <div class="pt-2 flex items-center gap-2">
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs">
            حفظ
          </button>
          <button type="button" onclick="closeBottomSheet()" class="px-4 py-2.5 rounded-xl bg-[#f3ece6] text-[#374151] font-bold text-xs">
            إلغاء
          </button>
        </div>
      </form>
    `,
    '➕'
  );
}

window.openAddModal = openAddModal;
