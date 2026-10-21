// ============================================================================
// HAS MAG IFMT - TANK OPERATIONS SERVICE (خدمة إدارة وحسابات خزانات الوقود والمياه)
// Flutter Equivalent: lib/domain/services/tank_service.dart
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/tank_service.dart
 * تنفيذ عمليات السحب والتعبئة في خزانات الوقود والمياه
 */
function submitTankTx(e, tankId, mode) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const liters = parseFloat(fd.get('liters') || fd.get('qty') || '0');
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;

  if (mode === 'supply' || mode === 'تعبئة') {
    tank.currentLiters = Math.min(tank.capacity, tank.currentLiters + liters);
    tank.lastSupplyDate = '2026-10-19';
    showToast(`تم توريد ${liters.toLocaleString()} لتر`);
  } else {
    tank.currentLiters = Math.max(0, tank.currentLiters - liters);
    showToast(`تم خصم ${liters.toLocaleString()} لتر`);
  }

  closeBottomSheet();
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

window.submitTankTx = submitTankTx;
window.toggleTankLock = toggleTankLock;
