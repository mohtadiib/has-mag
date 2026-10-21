// ============================================================================
// HAS MAG IFMT - RECORD SERVICE (خدمة إدارة السجلات التشغيلية وحسابات المخزون)
// Flutter Equivalent: lib/domain/services/record_service.dart
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/record_service.dart
 * حذف سجل تشغيلي من أي قسم فرعي
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class RecordService {
 *   Future<void> deleteRecord(String modId, String subId, String recId) async {
 *     // Remove from state / repository
 *     ref.read(recordsProvider(subId).notifier).removeRecord(recId);
 *   }
 * }
 * ```
 */
function deleteRecord(modId, subId, recId) {
  const mod = SYSTEM_MODULES.find(m => m.id === modId) || getModule();
  const sub = (mod.subSections || []).find(s => s.id === subId) || getSubSection();
  if (!sub || !sub.records) return;

  const idx = sub.records.findIndex(r => r.id === recId);
  if (idx !== -1) {
    sub.records.splice(idx, 1);
    state.selectedRecordId = null;
    state.activeModalType = null;
    showToast('تم حذف السجل');
    renderApp();
  }
}

/**
 * Flutter Service Equivalent: lib/domain/services/stock_calc_service.dart
 * حساب المخزون التلقائي اللحظي
 */
function updateModalAutoStockCalc(form) {
  if (!form) return;
  const prev = parseFloat(form.querySelector('[name="prevQty"]')?.value || '0');
  const inc = parseFloat(form.querySelector('[name="incomingQty"]')?.value || '0');
  const iss = parseFloat(form.querySelector('[name="issuedQty"]')?.value || '0');
  const out = document.getElementById('modalCalcAvailableQty');
  if (out) out.value = prev + inc - iss;
}

/**
 * Flutter Service Equivalent: lib/domain/services/record_service.dart
 * حفظ السجل الجديد المضاف
 */
function submitAddModalForm(e, modId, subId) {
  e.preventDefault();
  const form = e.target;
  const mod = SYSTEM_MODULES.find(m => m.id === modId) || getModule();
  const sub = (mod.subSections || []).find(s => s.id === subId) || getSubSection();
  if (!sub) return;

  const fd = new FormData(form);
  const obj = { id: 'REC-' + Math.floor(100 + Math.random() * 900) };
  for (const [k, v] of fd.entries()) {
    obj[k] = v;
  }

  if (sub.isAutoStock) {
    obj.prevQty = parseFloat(obj.prevQty || '0');
    obj.incomingQty = parseFloat(obj.incomingQty || '0');
    obj.issuedQty = parseFloat(obj.issuedQty || '0');
    obj.availableQty = obj.prevQty + obj.incomingQty - obj.issuedQty;
  }

  if (!sub.records) sub.records = [];
  sub.records.unshift(obj);
  closeBottomSheet();
  showToast(`تمت الإضافة في ${sub.shortTitle}`);
  openSubSection(mod.id, sub.id, state.activeChildSubCode);
}

window.deleteRecord = deleteRecord;
window.updateModalAutoStockCalc = updateModalAutoStockCalc;
window.submitAddModalForm = submitAddModalForm;
