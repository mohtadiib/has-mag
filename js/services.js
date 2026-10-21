// ============================================================================
// HAS MAG IFMT - APPLICATION SERVICES & WORKFLOW ACTIONS (منطق وسير العمل والبيانات)
// Flutter Equivalent: lib/domain/services/ & lib/data/repositories/
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/master_data_service.dart
 * حذف عنصر من الماستر داتا
 */
function deleteMasterItem(cat, idOrIdx) {
  if (cat === 'entities') {
    MASTER_DATA.entities.splice(Number(idOrIdx), 1);
  } else if (cat === 'priorities') {
    MASTER_DATA.priorities.splice(Number(idOrIdx), 1);
  } else {
    const list = MASTER_DATA[cat];
    if (list) {
      const idx = list.findIndex(x => String(x.id) === String(idOrIdx));
      if (idx !== -1) list.splice(idx, 1);
    }
  }
  showToast('تم الحذف بنجاح');
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/record_service.dart
 * حذف سجل تشغيلي من أي قسم فرعي
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

/**
 * Flutter Service Equivalent: lib/domain/services/tank_service.dart
 * تنفيذ عمليات السحب والتعبئة في خزانات الوقود والمياه
 */
function submitTankTx(e, tankId, mode) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const qty = parseFloat(fd.get('qty') || '0');
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;

  if (mode === 'تعبئة') {
    tank.currentLiters = Math.min(tank.capacity, tank.currentLiters + qty);
  } else {
    tank.currentLiters = Math.max(0, tank.currentLiters - qty);
  }

  closeBottomSheet();
  showToast(`تم تسجيل ${mode} بمقدار ${qty} لتر بنجاح`);
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/inspection_service.dart
 * تسجيل تذكرة تفتيش جديدة
 */
function submitNewInspection(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const newId = 'TKT-' + (INSPECTION_TICKETS.length + 101);

  INSPECTION_TICKETS.unshift({
    id: newId,
    dateTime: '2026-10-19 14:30',
    department: fd.get('department'),
    location: fd.get('location'),
    problemDesc: fd.get('problemDesc'),
    technician: fd.get('technician'),
    status: 'مفتوحة',
    priority: 'P2'
  });

  closeBottomSheet();
  showToast(`تم فتح تذكرة التفتيش بنجاح (${newId})`);
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/inspection_service.dart
 * تبديل حالة تذكرة التفتيش (مفتوحة / مغلقة)
 */
function toggleTicketStatus(tktId) {
  const tkt = INSPECTION_TICKETS.find(t => t.id === tktId);
  if (!tkt) return;
  tkt.status = tkt.status === 'مفتوحة' ? 'مغلقة' : 'مفتوحة';
  showToast(tkt.status === 'مغلقة' ? 'تم إغلاق التذكرة بنجاح' : 'تم إعادة فتح التذكرة');
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/tank_service.dart
 * قفل أو فتح سعة الخزان
 */
function toggleTankLock(idx) {
  MASTER_DATA.tanksConfig[idx].locked = !MASTER_DATA.tanksConfig[idx].locked;
  showToast(MASTER_DATA.tanksConfig[idx].locked ? 'تم قفل السعة 🔒' : 'تم فك القفل 🔓');
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/master_data_service.dart
 * دوال إضافة عناصر الماستر داتا
 */
function addMasterDepartment(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  MASTER_DATA.departments.push({
    id: 'DEP-' + (MASTER_DATA.departments.length + 1),
    code: fd.get('name').slice(0, 10),
    name: fd.get('name'),
    manager: fd.get('manager'),
    badge: 0,
    icon: ICON_PATHS.Building,
    desc: 'قسم فني معتمد في النظام.'
  });
  showToast('تمت إضافة القسم');
  renderApp();
}

function addMasterSystem(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  MASTER_DATA.systems.unshift({ id: 'SYS-' + Date.now(), name: fd.get('name'), department: fd.get('department') });
  showToast('تمت إضافة النظام');
  renderApp();
}

function addMasterLocation(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const arName = (fd.get('name') || '').trim();
  const code = (fd.get('code') || '').trim();
  const fullName = code ? `${arName} (${code})` : arName;
  MASTER_DATA.locations.unshift({
    id: 'LOC-' + Date.now(),
    name: fullName,
    code: code,
    type: 'مرفق تشغيلي'
  });
  showToast('تمت إضافة الموقع');
  renderApp();
}

function addMasterEmployee(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  MASTER_DATA.employees.unshift({ id: 'EMP-' + Date.now(), name: fd.get('name'), job: fd.get('job'), shift: fd.get('shift'), department: fd.get('department') });
  showToast('تمت إضافة الموظف');
  renderApp();
}

function addMasterCatalog(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  MASTER_DATA.catalog.unshift({ id: 'CAT-' + Date.now(), type: fd.get('type'), name: fd.get('name') });
  showToast('تمت الإضافة');
  renderApp();
}

function addMasterEntity(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = (fd.get('name') || '').trim();
  if (name && !MASTER_DATA.entities.includes(name)) {
    MASTER_DATA.entities.push(name);
    showToast('تمت إضافة الجهة المبلغة');
    renderApp();
  }
}

function addMasterPriority(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = (fd.get('name') || '').trim();
  if (name && !MASTER_DATA.priorities.includes(name)) {
    MASTER_DATA.priorities.push(name);
    showToast('تمت إضافة الأولوية');
    renderApp();
  }
}

// Global window exposure
window.deleteMasterItem = deleteMasterItem;
window.deleteRecord = deleteRecord;
window.updateModalAutoStockCalc = updateModalAutoStockCalc;
window.submitAddModalForm = submitAddModalForm;
window.convertReportToWorkOrder = convertReportToWorkOrder;
window.convertFaultToWorkOrder = convertFaultToWorkOrder;
window.convertFaultToSpr = convertFaultToSpr;
window.convertTicketToWorkOrder = convertTicketToWorkOrder;
window.submitTankTx = submitTankTx;
window.submitNewInspection = submitNewInspection;
window.toggleTicketStatus = toggleTicketStatus;
window.toggleTankLock = toggleTankLock;
window.addMasterDepartment = addMasterDepartment;
window.addMasterSystem = addMasterSystem;
window.addMasterLocation = addMasterLocation;
window.addMasterEmployee = addMasterEmployee;
window.addMasterCatalog = addMasterCatalog;
window.addMasterEntity = addMasterEntity;
window.addMasterPriority = addMasterPriority;
