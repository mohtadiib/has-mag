// ============================================================================
// HAS MAG IFMT - RECORD DETAILS & EDIT SCREEN (شاشة تفاصيل وتعديل السجل الكاملة)
// Flutter Equivalent: lib/presentation/screens/records/record_details_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/records/record_details_screen.dart
 * LEVEL 4: تفاصيل السجل، الحقول الديناميكية، الجداول التفصيلية، وعناصر التحكم المخصصة لكل موديول
 */
function renderRecordDetailsView() {
  const mod = getModule();
  const sub = getSubSection();

  const existing = (!state.isCreatingNew && sub.records)
    ? (sub.records.find(r => r.id === state.selectedRecordId) || sub.records[0])
    : {};

  return `
    <div class="p-3.5 space-y-3 fade-in">
      
      <!-- 1. PDF Reports Viewer Header -->
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

      <!-- 2. Work Orders Metrics Banner -->
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

      <!-- 3. Asset Details Custom Banner (سجل الأصول: حساب عمر الأصل + الحالات الفنية) -->
      ${sub.id === 'sub_assets_register' && existing.id ? `
        <div class="bg-gradient-to-br from-white to-[#faf7f5] rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-black text-xs text-[#111827] block">${existing.assetName || 'الأصل الفني'}</span>
              <span class="text-[10px] text-[#6b7280] font-medium">${existing.manufacturer || 'الشركة المصنعة غير محددة'} • موديل: ${existing.model || '—'}</span>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${existing.operationStatus === 'يعمل' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}">
              ${existing.operationStatus === 'يعمل' ? '⚡ يعمل' : '⛔ لا يعمل'}
            </span>
          </div>

          <!-- Dynamic Asset Age Calculation Banner -->
          <div class="p-2.5 rounded-xl bg-[#fff7ed] border border-[#ffedd5] flex items-center justify-between gap-2">
            <div>
              <span class="text-[9px] text-[#c2410c] font-black block">⏳ عمر الأصل المحسوب حتى تاريخ اليوم:</span>
              <span class="text-xs font-black text-[#9a3412]">${calculateAssetAge ? calculateAssetAge(existing.manufactureDate) : (existing.assetAge || '—')}</span>
            </div>
            <div class="text-left text-[10px] text-[#9a3412] font-semibold">
              <span class="text-[9px] text-[#c2410c] block">تاريخ التصنيع:</span>
              ${existing.manufactureDate || '—'}
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div class="p-2 rounded-xl bg-white border border-[#ece6e1]">
              <span class="text-[#6b7280] block text-[9px] font-bold mb-0.5">الحالة الفنية:</span>
              <strong class="text-[#111827] font-black">${existing.assetCondition || 'ممتاز'}</strong>
            </div>
            <div class="p-2 rounded-xl bg-white border border-[#ece6e1]">
              <span class="text-[#6b7280] block text-[9px] font-bold mb-0.5">الاستخدام:</span>
              <strong class="text-[#111827] font-black">${existing.usageStatus || 'مستخدم'}</strong>
            </div>
            <div class="p-2 rounded-xl bg-white border border-[#ece6e1]">
              <span class="text-[#6b7280] block text-[9px] font-bold mb-0.5">الكمية بالموقع:</span>
              <strong class="text-[#db6b49] font-black text-xs">${existing.count || 1}</strong>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 4. Projects on Site Banner (المشاريع القائمة بالموقع: المخطط الزمني + نسبة الإنجاز الحقيقي + قطع الخدمة) -->
      ${sub.id === 'sub_contractors' && existing.id ? `
        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-xs text-[#111827]">${existing.projectName || 'المشروع القائم'}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${existing.status === 'قيد التنفيذ' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">${existing.status || 'قيد التنفيذ'}</span>
          </div>

          <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] flex items-center justify-between">
            <span class="font-bold text-amber-900">⚠️ نوع الخدمة المقطوعة بالموقع:</span>
            <span class="font-black px-2.5 py-0.5 rounded-lg bg-white border border-amber-300 text-amber-800">${existing.serviceCutType || 'لا يوجد'}</span>
          </div>

          <!-- Dual Progress Bars: Time Elapsed vs Actual Completion -->
          <div class="space-y-2 text-[10px]">
            <div>
              <div class="flex justify-between items-center font-bold text-[#47525e] mb-1">
                <span>⏱️ نسبة مرور المدة الزمنية المحددة:</span>
                <span class="font-mono font-black text-xs text-[#db6b49]">${existing.timeElapsedPct || (calculateTimeElapsed ? calculateTimeElapsed(existing.startDate, existing.endDate) : 0)}%</span>
              </div>
              <div class="w-full bg-[#f1ebe6] rounded-full h-2 overflow-hidden">
                <div class="bg-[#db6b49] h-2 rounded-full transition-all duration-500" style="width: ${existing.timeElapsedPct || (calculateTimeElapsed ? calculateTimeElapsed(existing.startDate, existing.endDate) : 0)}%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center font-bold text-[#15803d] mb-1">
                <span>📊 نسبة الإنجاز الحقيقي الفعلي بالموقع:</span>
                <span class="font-mono font-black text-xs text-emerald-700">${existing.completionPct || 0}%</span>
              </div>
              <div class="w-full bg-[#f1ebe6] rounded-full h-2 overflow-hidden">
                <div class="bg-emerald-600 h-2 rounded-full transition-all duration-500" style="width: ${existing.completionPct || 0}%"></div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 5. Stock Detailed Inventory & Transaction Log (المخزون STOCK: الرصيد المتوفر + سجل التوريد والصرف) -->
      ${sub.id === 'sub_stock' && existing.id ? `
        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-black text-xs text-[#111827] block">${existing.itemName || 'الصنف المخزني'}</span>
              <span class="text-[10px] text-[#6b7280] font-medium">${existing.department || ''}</span>
            </div>
            <div class="text-left">
              <span class="text-[9px] text-emerald-700 font-bold block">الكمية المتوفرة:</span>
              <span class="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-black text-sm border border-emerald-200">
                ${existing.availableQty !== undefined ? existing.availableQty : 0} ${existing.unit || 'حبة'}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div class="p-2 rounded-xl bg-[#faf7f5] border border-[#f3ece6]">
              <span class="text-[#6b7280] block text-[9px]">الرصيد السابق</span>
              <strong class="text-[#111827] font-black">${existing.prevQty || 0}</strong>
            </div>
            <div class="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <span class="text-emerald-700 block text-[9px]">الوارد (+)</span>
              <strong class="text-emerald-800 font-black">+${existing.incomingQty || 0}</strong>
            </div>
            <div class="p-2 rounded-xl bg-orange-50/60 border border-orange-100">
              <span class="text-orange-700 block text-[9px]">المنصرف (-)</span>
              <strong class="text-orange-800 font-black">-${existing.issuedQty || 0}</strong>
            </div>
          </div>

          <!-- Stock Movements Table (سجل حركات التوريد والصرف) -->
          <div class="pt-2 border-t border-[#f3ece6] space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-[11px] text-[#111827]">سجل التوريد والمصروف للصنف:</span>
              <button type="button" onclick="openAddMovementModal('${existing.id}')" class="px-2 py-1 rounded-lg bg-[#db6b49] text-white text-[10px] font-bold">
                + تسجيل حركة
              </button>
            </div>
            <div class="overflow-x-auto rounded-xl border border-[#ede7e2]">
              <table class="w-full text-right text-[10px]">
                <thead class="bg-[#faf7f5] text-[#47525e] border-b border-[#ede7e2]">
                  <tr>
                    <th class="p-2 font-bold">التاريخ</th>
                    <th class="p-2 font-bold">النوع</th>
                    <th class="p-2 font-bold">الكمية</th>
                    <th class="p-2 font-bold">رقم المرجع</th>
                    <th class="p-2 font-bold">البيان / ملاحظات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#f3ece6] bg-white">
                  ${(existing.movements && existing.movements.length > 0) ? existing.movements.map(m => `
                    <tr>
                      <td class="p-2 font-medium">${m.date || '—'}</td>
                      <td class="p-2">
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${m.type === 'توريد' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${m.type || '—'}</span>
                      </td>
                      <td class="p-2 font-black">${m.qty || 0}</td>
                      <td class="p-2 font-mono text-[#6b7280]">${m.ref || '—'}</td>
                      <td class="p-2 text-[#47525e]">${m.note || '—'}</td>
                    </tr>
                  `).join('') : `
                    <tr><td colspan="5" class="p-3 text-center text-[#9ca3af]">لا توجد حركات مسجلة حتى الآن</td></tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 6. Multi-Items Breakdown for SPR, MRF, and CASH PURCHASE (إمكانية إدراج عدة قطع غيار / مواد لكل طلب) -->
      ${(sub.id === 'sub_spr' || sub.id === 'sub_mrf' || sub.id === 'sub_cash') && existing.id ? `
        <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-xs text-[#111827]">
                ${sub.id === 'sub_spr' ? 'قائمة قطع الغيار المطلوبة بالطلب' : (sub.id === 'sub_mrf' ? 'المواد / القطع المصروفة بالطلب' : 'بنود المشتريات النقدية')}
              </span>
              <span class="px-2 py-0.5 rounded-full bg-[#fdece6] text-[#db6b49] text-[10px] font-bold">${(existing.items || []).length} صنف</span>
            </div>
            <button type="button" onclick="openAddItemToRecordModal('${sub.id}', '${existing.id}')" class="px-2.5 py-1 rounded-xl bg-[#db6b49] text-white text-[10px] font-bold">
              + إضافة صنف
            </button>
          </div>

          <!-- Items Table / Cards -->
          <div class="space-y-2">
            ${(existing.items && existing.items.length > 0) ? existing.items.map((item, idx) => `
              <div class="p-2.5 rounded-xl bg-[#faf7f5] border border-[#f3ece6] space-y-1.5 text-[11px]">
                <div class="flex items-center justify-between">
                  <span class="font-black text-[#111827]">${item.partName || 'صنف بدون اسم'}</span>
                  ${item.matching ? `
                    <span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.matching === 'مطابقة' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}">${item.matching}</span>
                  ` : ''}
                  ${item.woStatus ? `
                    <span class="px-2 py-0.5 rounded text-[9px] font-bold ${item.woStatus === 'مغلق' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">أمر العمل: ${item.woStatus}</span>
                  ` : ''}
                </div>

                <div class="grid grid-cols-2 gap-2 text-[10px] text-[#47525e]">
                  <div class="flex items-center justify-between bg-white p-1.5 rounded-lg border border-[#ece6e1]">
                    <span>الكمية المطلوبة: <strong class="text-[#111827]">${item.reqQty || 0}</strong></span>
                    <span>المستلمة: <strong class="text-emerald-700">${item.recQty || 0}</strong></span>
                  </div>
                  <div class="flex items-center justify-between bg-white p-1.5 rounded-lg border border-[#ece6e1]">
                    <span>تاريخ الاستلام:</span>
                    <strong class="text-[#111827]">${item.recDate || '—'}</strong>
                  </div>
                </div>

                ${(item.woNumber) ? `
                  <div class="text-[9px] text-[#6b7280] font-mono">
                    مرتبط بأمر عمل: <strong class="text-[#c2410c]">${item.woNumber}</strong>
                  </div>
                ` : ''}
              </div>
            `).join('') : `
              <div class="p-3 rounded-xl bg-[#faf7f5] text-center text-[10px] text-[#9ca3af]">
                لا توجد قطع غيار أو مواد مضافة لهذا الطلب بعد. اضغط على "+ إضافة صنف" بالأعلى.
              </div>
            `}
          </div>
        </div>
      ` : ''}

      <!-- 7. Main Record Form (تعديل بيانات السجل الكاملة) -->
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
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white font-extrabold text-xs shadow-xs transition">حفظ التعديلات</button>
          <button type="button" onclick="deleteRecord('${mod.id}', '${sub.id}', '${existing.id}')" class="px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition">حذف</button>
        </div>
      </form>

      <!-- 8. Contextual Workflow Actions -->
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

/**
 * نافذة سفلية لإضافة قطعة غيار أو صنف إضافي لطلبات المستودع (SPR / MRF / CASH)
 */
function openAddItemToRecordModal(subId, recordId) {
  const sub = getSubSection();
  const existing = (sub.records || []).find(r => r.id === recordId);
  if (!existing) return;

  const isSpr = subId === 'sub_spr';
  const isMrf = subId === 'sub_mrf';
  const isCash = subId === 'sub_cash';
  const isFault = isMrf && existing.mrfType === 'عطل';

  openBottomSheet(
    'إضافة صنف / مادة للطلب',
    `
      <form onsubmit="submitAddItemToRecord(event, '${subId}', '${recordId}')" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-[#374151] mb-1">اسم القطعة / المادة:</label>
          <input type="text" name="partName" required placeholder="مثال: رولمان بلي، كشاف إنارة LED، سير محرك" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-[#374151] mb-1">الكمية المطلوبة:</label>
            <input type="number" name="reqQty" required value="1" min="1" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
          </div>
          <div>
            <label class="block font-bold text-[#374151] mb-1">الكمية المستلمة:</label>
            <input type="number" name="recQty" value="1" min="0" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#374151] mb-1">تاريخ استلام الصنف:</label>
          <input type="date" name="recDate" value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
        </div>

        ${isMrf ? `
          <div>
            <label class="block font-bold text-[#374151] mb-1">حالة المطابقة للمواصفات:</label>
            <select name="matching" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
              <option value="مطابقة">مطابقة ✅</option>
              <option value="غير مطابقة">غير مطابقة ❌</option>
            </select>
          </div>
        ` : ''}

        ${(isSpr || isFault) ? `
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-bold text-[#374151] mb-1">رقم أمر العمل (CM/RM):</label>
              <input type="text" name="woNumber" placeholder="CM-2026-..." value="${existing.woNumber || ''}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
            </div>
            <div>
              <label class="block font-bold text-[#374151] mb-1">حالة أمر العمل:</label>
              <select name="woStatus" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
                <option value="مفتوح">مفتوح</option>
                <option value="مغلق">مغلق</option>
              </select>
            </div>
          </div>
        ` : ''}

        <div class="pt-2 flex items-center gap-2">
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs">إضافة للطلب</button>
          <button type="button" onclick="closeBottomSheet()" class="px-4 py-2.5 rounded-xl bg-[#f3ece6] text-[#374151] font-bold text-xs">إلغاء</button>
        </div>
      </form>
    `,
    '🛒'
  );
}

/**
 * معالجة إضافة الصنف إلى السجل
 */
function submitAddItemToRecord(e, subId, recordId) {
  e.preventDefault();
  const form = e.target;
  const sub = getSubSection();
  const existing = (sub.records || []).find(r => r.id === recordId);
  if (!existing) return;

  const fd = new FormData(form);
  const item = {};
  for (const [k, v] of fd.entries()) item[k] = v;
  item.reqQty = parseFloat(item.reqQty || '1');
  item.recQty = parseFloat(item.recQty || '0');

  if (!existing.items) existing.items = [];
  existing.items.push(item);

  closeBottomSheet();
  showToast('تمت إضافة الصنف بنجاح للطلب');
  openRecordDetail(state.selectedModuleId, state.selectedSubId, recordId);
}

/**
 * نافذة تسجيل حركة توريد أو صرف لصنف في المخزون
 */
function openAddMovementModal(recordId) {
  const sub = getSubSection();
  const existing = (sub.records || []).find(r => r.id === recordId);
  if (!existing) return;

  openBottomSheet(
    `حركة مخزنية: ${existing.itemName}`,
    `
      <form onsubmit="submitAddMovement(event, '${recordId}')" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-[#374151] mb-1">نوع الحركة:</label>
            <select name="type" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs font-bold">
              <option value="توريد">توريد وارد (+)</option>
              <option value="صرف">صرف من المخزون (-)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-[#374151] mb-1">الكمية:</label>
            <input type="number" name="qty" required value="1" min="1" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs font-bold">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-[#374151] mb-1">تاريخ الحركة:</label>
            <input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
          </div>
          <div>
            <label class="block font-bold text-[#374151] mb-1">رقم المرجع / الطلب:</label>
            <input type="text" name="ref" placeholder="SPR-2026 / MRF-2026" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
          </div>
        </div>

        <div>
          <label class="block font-bold text-[#374151] mb-1">البيان / ملاحظات الصرف والتوريد:</label>
          <input type="text" name="note" placeholder="ملاحظات تفصيلية..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] text-xs">
        </div>

        <div class="pt-2 flex items-center gap-2">
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs">تسجيل الحركة</button>
          <button type="button" onclick="closeBottomSheet()" class="px-4 py-2.5 rounded-xl bg-[#f3ece6] text-[#374151] font-bold text-xs">إلغاء</button>
        </div>
      </form>
    `,
    '📊'
  );
}

/**
 * معالجة تسجيل الحركة المخزنية وتحديث رصيد الصنف
 */
function submitAddMovement(e, recordId) {
  e.preventDefault();
  const form = e.target;
  const sub = getSubSection();
  const existing = (sub.records || []).find(r => r.id === recordId);
  if (!existing) return;

  const fd = new FormData(form);
  const mov = {};
  for (const [k, v] of fd.entries()) mov[k] = v;
  mov.qty = parseFloat(mov.qty || '1');

  if (!existing.movements) existing.movements = [];
  existing.movements.unshift(mov);

  if (mov.type === 'توريد') {
    existing.incomingQty = (parseFloat(existing.incomingQty) || 0) + mov.qty;
  } else {
    existing.issuedQty = (parseFloat(existing.issuedQty) || 0) + mov.qty;
  }
  existing.availableQty = (parseFloat(existing.prevQty) || 0) + (parseFloat(existing.incomingQty) || 0) - (parseFloat(existing.issuedQty) || 0);

  closeBottomSheet();
  showToast('تم تسجيل الحركة وتحديث رصيد المخزون');
  openRecordDetail(state.selectedModuleId, state.selectedSubId, recordId);
}

window.renderRecordDetailsView = renderRecordDetailsView;
window.openAddItemToRecordModal = openAddItemToRecordModal;
window.submitAddItemToRecord = submitAddItemToRecord;
window.openAddMovementModal = openAddMovementModal;
window.submitAddMovement = submitAddMovement;
