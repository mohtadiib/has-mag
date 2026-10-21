// ============================================================================
// HAS MAG IFMT - TANK SUPPLY & DISPENSE BOTTOM SHEET (نافذة توريد وصرف الخزانات)
// Flutter Equivalent: lib/presentation/sheets/tank_transaction_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/tank_transaction_sheet.dart
 * نافذة توريد أو صرف خزانات الوقود والمياه
 */
function openTankSheet(tankId, mode) {
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;
  const isSupply = mode === 'supply';
  openBottomSheet(
    isSupply ? `توريد: ${tank.name}` : `صرف يومي: ${tank.name}`,
    `
      <form onsubmit="submitTankTx(event, '${tankId}', '${mode}')" class="space-y-3">
        <div class="p-3 rounded-xl bg-white border border-[#ede7e2] flex justify-between">
          <span class="text-[#6b7280]">المتوفر حالياً:</span>
          <strong class="text-[#111827]">${tank.currentLiters.toLocaleString()} / ${tank.capacity.toLocaleString()} لتر</strong>
        </div>
        <div>
          <label class="font-bold block mb-1">${isSupply ? 'الكمية الموردة باللتر (+)' : 'الكمية المصروفة باللتر (-)'}</label>
          <input type="number" name="liters" min="1" required placeholder="أدخل الكمية باللتر..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        </div>
        <button type="submit" class="w-full py-2.5 rounded-xl ${isSupply ? 'bg-[#00a63e]' : 'bg-[#db6b49]'} text-white font-extrabold">
          حفظ وتحديث الرصيد
        </button>
      </form>
    `,
    isSupply ? '➕' : '➖'
  );
}

window.openTankSheet = openTankSheet;
