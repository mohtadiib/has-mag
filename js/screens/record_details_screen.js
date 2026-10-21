// ============================================================================
// HAS MAG IFMT - RECORD DETAILS & EDIT SCREEN (شاشة تفاصيل وتعديل السجل الكاملة)
// Flutter Equivalent: lib/presentation/screens/records/record_details_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/records/record_details_screen.dart
 * LEVEL 4: تفاصيل السجل، الحقول الديناميكية، أزرار التبديل، والإجراءات السياقية المباشرة
 */
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

      ${(sub.id === 'sub_work_orders' || sub.id === 'sub_rm_work_orders') && existing.id ? `
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
              <span class="text-[#15803d] block font-bold text-[9px] mb-0.5">${sub.id === 'sub_rm_work_orders' ? '⚡ زمن المعالجة:' : '🛠️ زمن التصحيح:'}</span>
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
          const val = existing[f.key] !== undefined ? existing[f.key] : '';
          return renderDynamicFormField(f, val, { isQuickEdit: true });
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

window.renderRecordDetailsView = renderRecordDetailsView;
