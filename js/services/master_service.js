// ============================================================================
// HAS MAG IFMT - MASTER DATA SERVICE (خدمة إدارة وتعديل الماستر داتا المركزية)
// Flutter Equivalent: lib/domain/services/master_data_service.dart
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

window.deleteMasterItem = deleteMasterItem;
window.addMasterDepartment = addMasterDepartment;
window.addMasterSystem = addMasterSystem;
window.addMasterLocation = addMasterLocation;
window.addMasterEmployee = addMasterEmployee;
window.addMasterCatalog = addMasterCatalog;
window.addMasterEntity = addMasterEntity;
window.addMasterPriority = addMasterPriority;
