// ============================================================================
// HAS MAG IFMT - TANK OPERATIONS SERVICE (خدمة إدارة وحسابات خزانات الوقود والمياه)
// Flutter Equivalent: lib/domain/services/tank_service.dart
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/tank_service.dart
 * تنفيذ عمليات التوريد والصرف وتوثيقها في سجلات الوقود والمياه
 */
function submitTankTx(e, tankId, mode) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const liters = parseFloat(fd.get('liters') || '0');
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;

  const now = new Date();
  const dateStr = fd.get('date') || now.toISOString().split('T')[0];
  const timeStr = fd.get('time') || now.toTimeString().split(' ')[0].substring(0, 5);

  if (mode === 'supply' || mode === 'تعبئة') {
    tank.currentLiters = Math.min(tank.capacity, tank.currentLiters + liters);
    tank.lastSupplyDate = dateStr;

    if (tank.category === 'وقود') {
      if (typeof FUEL_SUPPLY_LOGS !== 'undefined') {
        FUEL_SUPPLY_LOGS.unshift({
          id: 'FSL-' + Math.floor(100 + Math.random() * 900),
          date: dateStr,
          time: timeStr,
          station: tank.station,
          tankId: tank.id,
          fuelType: fd.get('fuelType') || (tank.name.includes('بنزين') ? 'بنزين 91' : 'ديزل'),
          liters: liters,
          supplier: fd.get('supplier') || 'شركة أرامكو السعودية',
          note: `توريد خزان ${tank.name}`
        });
      }
    } else {
      if (typeof WATER_SUPPLY_LOGS !== 'undefined') {
        const tankers = parseInt(fd.get('tankersCount') || '1', 10);
        WATER_SUPPLY_LOGS.unshift({
          id: 'WSL-' + Math.floor(100 + Math.random() * 900),
          date: dateStr,
          time: timeStr,
          liters: liters,
          tankersCount: tankers,
          tankId: tank.id,
          tankName: tank.name,
          note: fd.get('notes') || `توريد ${tankers} تنكر لخزان ${tank.name}`
        });
      }
    }

    showToast(`تم توريد ${liters.toLocaleString()} لتر بنجاح ✅`);
  } else {
    // صرف
    tank.currentLiters = Math.max(0, tank.currentLiters - liters);

    if (tank.category === 'وقود') {
      if (typeof FUEL_DISPENSE_LOGS !== 'undefined') {
        FUEL_DISPENSE_LOGS.unshift({
          id: 'FDL-' + Math.floor(100 + Math.random() * 900),
          date: dateStr,
          time: timeStr,
          carType: fd.get('carType') || 'سيارة تشغيلية',
          plateNo: fd.get('plateNo') || '—',
          entity: fd.get('entity') || 'إدارة العمليات',
          fuelType: fd.get('fuelType') || 'ديزل',
          liters: liters,
          driverName: fd.get('driverName') || '—',
          note: `صرف من خزان ${tank.name}`
        });
      }
    }

    showToast(`تم خصم وصرف ${liters.toLocaleString()} لتر بنجاح`);
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
