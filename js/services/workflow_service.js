// ============================================================================
// HAS MAG IFMT - WORKFLOW TRANSITIONS SERVICE (خدمة نقل وتكامل مسارات العمل التشغيلية)
// Flutter Equivalent: lib/domain/services/workflow_transition_service.dart
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/workflow_transition_service.dart
 * تحويل بلاغ يومي إلى أمر عمل تصحيحي
 */
function convertReportToWorkOrder(repId) {
  const wcMod = SYSTEM_MODULES.find(m => m.id === 'mod_work_control');
  const repSub = wcMod.subSections.find(s => s.id === 'sub_daily_reports');
  const woSub = wcMod.subSections.find(s => s.id === 'sub_work_orders');
  const rep = repSub.records.find(r => r.id === repId);
  if (!rep) return;

  const newWoNo = 'WO-2026-' + Math.floor(600 + Math.random() * 300);
  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: 'P2',
    department: rep.department || MASTER_DATA.departments[0].name,
    system: MASTER_DATA.systems[0].name,
    technician: rep.technician || '',
    status: 'مفتوح',
    woDateTime: rep.reportDateTime || '2026-10-19 16:05',
    responseTime: '10 دقائق',
    correctionDuration: 'جاري العمل',
    closeDateTime: '',
    problemDesc: `محول من بلاغ (${rep.reporterName || 'بلاغ'} - ${rep.entity || ''}): ${rep.problemDesc}`,
    materialsUsed: rep.materialsUsed || ''
  });
  showToast(`تم تحويل البلاغ إلى أمر عمل (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

/**
 * Flutter Service Equivalent: lib/domain/services/workflow_transition_service.dart
 * تحويل عطل إلى أمر عمل
 */
function convertFaultToWorkOrder(faultId) {
  const operMod = SYSTEM_MODULES.find(m => m.id === 'mod_operations');
  const fltSub = operMod.subSections.find(s => s.id === 'sub_faulty_equip');
  const wcMod = SYSTEM_MODULES.find(m => m.id === 'mod_work_control');
  const woSub = wcMod.subSections.find(s => s.id === 'sub_work_orders');
  const flt = fltSub.records.find(r => r.id === faultId);
  if (!flt) return;

  const newWoNo = 'WO-2026-' + Math.floor(700 + Math.random() * 200);
  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: 'P1',
    department: flt.department || MASTER_DATA.departments[0].name,
    system: flt.equipmentName || MASTER_DATA.systems[0].name,
    technician: 'مبتعث طوارئ',
    status: 'مفتوح',
    woDateTime: flt.faultDate ? `${flt.faultDate} 10:00` : '2026-10-19 10:00',
    responseTime: 'فوري',
    correctionDuration: 'جاري العمل',
    closeDateTime: '',
    problemDesc: `عطل طارئ: ${flt.problemDesc || flt.equipmentName}`,
    materialsUsed: ''
  });
  showToast(`تم إنشاء أمر عمل طارئ (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

/**
 * Flutter Service Equivalent: lib/domain/services/workflow_transition_service.dart
 * تحويل عطل إلى طلب قطع غيار (SPR)
 */
function convertFaultToSpr(faultId) {
  const operMod = SYSTEM_MODULES.find(m => m.id === 'mod_operations');
  const fltSub = operMod.subSections.find(s => s.id === 'sub_faulty_equip');
  const supMod = SYSTEM_MODULES.find(m => m.id === 'mod_supply_chain');
  const sprSub = supMod.subSections.find(s => s.id === 'sub_spr_requests');
  const flt = fltSub.records.find(r => r.id === faultId);
  if (!flt) return;

  const newSpr = 'SPR-2026-0' + Math.floor(200 + Math.random() * 700);
  sprSub.records.unshift({
    id: 'SPR-' + Date.now(),
    sprNo: newSpr,
    partName: `قطعة غيار لـ (${flt.equipmentName})`,
    partNumber: 'PN-' + Math.floor(1000 + Math.random() * 9000),
    department: flt.department || MASTER_DATA.departments[0].name,
    qty: 1,
    status: 'قيد الاعتماد',
    reqDate: flt.faultDate || '2026-10-19',
    justification: `مطلوبة لعلاج عطل: ${flt.problemDesc || flt.equipmentName}`
  });
  showToast(`تم رفع طلب الشراء/الصرف (${newSpr})`);
  openSubSection('mod_supply_chain', 'sub_spr_requests');
}

/**
 * Flutter Service Equivalent: lib/domain/services/workflow_transition_service.dart
 * تحويل تذكرة فحص إلى أمر عمل
 */
function convertTicketToWorkOrder(tktId) {
  const tkt = INSPECTION_TICKETS.find(t => t.id === tktId);
  if (!tkt) return;

  const wcMod = SYSTEM_MODULES.find(m => m.id === 'mod_work_control');
  const woSub = wcMod.subSections.find(s => s.id === 'sub_work_orders');
  const newWoNo = 'WO-2026-' + Math.floor(800 + Math.random() * 190);

  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: tkt.priority || 'P2',
    department: tkt.department,
    system: tkt.system || MASTER_DATA.systems[0].name,
    technician: tkt.technician || 'فني صيانة',
    status: 'مفتوح',
    woDateTime: tkt.dateTime || '2026-10-19 14:00',
    responseTime: '15 دقيقة',
    correctionDuration: 'جاري العمل',
    closeDateTime: '',
    problemDesc: `من ملاحظة تفتيش (${tkt.location}): ${tkt.problemDesc}`,
    materialsUsed: ''
  });
  showToast(`تم تحويل التذكرة إلى أمر عمل (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

window.convertReportToWorkOrder = convertReportToWorkOrder;
window.convertFaultToWorkOrder = convertFaultToWorkOrder;
window.convertFaultToSpr = convertFaultToSpr;
window.convertTicketToWorkOrder = convertTicketToWorkOrder;
