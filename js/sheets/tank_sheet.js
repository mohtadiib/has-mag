// ============================================================================
// HAS MAG IFMT - TANK SUPPLY & DISPENSE BOTTOM SHEET (نافذة توريد وصرف الخزانات)
// Flutter Equivalent: lib/presentation/sheets/tank_transaction_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/tank_transaction_sheet.dart
 * نافذة توريد أو صرف خزانات الوقود والمياه بجميع الحقول التفصيلية الدقيقة المعتمدة
 */
function openTankSheet(tankId, mode) {
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;
  const isSupply = mode === 'supply';
  const isFuel = tank.category === 'وقود';
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

  let formFields = '';

  if (isFuel) {
    if (isSupply) {
      // تفاصيل توريد الوقود
      const defaultFuel = tank.name.includes('بنزين') ? 'بنزين 91' : 'ديزل';
      formFields = `
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">تاريخ التوريد</label>
            <input type="date" name="date" value="${dateStr}" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">وقت التوريد</label>
            <input type="time" name="time" value="${timeStr}" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">نوع الوقود</label>
            <select name="fuelType" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">
              <option value="ديزل" ${defaultFuel === 'ديزل' ? 'selected' : ''}>ديزل</option>
              <option value="بنزين 91" ${defaultFuel === 'بنزين 91' ? 'selected' : ''}>بنزين 91</option>
            </select>
          </div>
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">الكمية الموردة (لتر)</label>
            <input type="number" name="liters" min="1" max="${tank.capacity - tank.currentLiters}" required placeholder="أدخل اللترات..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold text-[#00a63e]" />
          </div>
        </div>
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">الجهة الموردة / الناقل</label>
          <input type="text" name="supplier" value="شركة أرامكو السعودية" placeholder="اسم المورد..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
        </div>
      `;
    } else {
      // تفاصيل صرف الوقود
      formFields = `
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">نوع السيارة / المعدة</label>
            <input type="text" name="carType" required placeholder="مثال: وانيت هايلوكس" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">رقم اللوحة</label>
            <input type="text" name="plateNo" required placeholder="مثال: أ ب د 1042" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold text-center uppercase" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">الجهة التابعة لها</label>
            <input type="text" name="entity" required placeholder="مثال: الإطفاء والإنقاذ" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">اسم السائق</label>
            <input type="text" name="driverName" required placeholder="اسم السائق المستلم..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">تاريخ ووقت الصرف</label>
            <input type="datetime-local" name="dateTime" value="${dateStr}T${timeStr}" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
          </div>
          <div>
            <label class="font-bold text-[#1f2937] block mb-1">نوع الوقود</label>
            <select name="fuelType" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">
              <option value="${tank.name.includes('بنزين') ? 'بنزين 91' : 'ديزل'}">${tank.name.includes('بنزين') ? 'بنزين 91' : 'ديزل'}</option>
              <option value="ديزل">ديزل</option>
              <option value="بنزين 91">بنزين 91</option>
            </select>
          </div>
        </div>
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">الكمية المصروفة (لتر)</label>
          <input type="number" name="liters" min="1" max="${tank.currentLiters}" required placeholder="أدخل اللترات..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold text-[#db6b49]" />
        </div>
      `;
    }
  } else {
    // تفاصيل توريد أو صرف المياه
    formFields = `
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">تاريخ التوريد</label>
          <input type="date" name="date" value="${dateStr}" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
        </div>
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">وقت التوريد</label>
          <input type="time" name="time" value="${timeStr}" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">عدد تناكر المياه الموردة</label>
          <input type="number" name="tankersCount" min="1" value="1" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        </div>
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">إجمالي اللترات الموردة</label>
          <input type="number" name="liters" min="1" value="32000" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold text-[#00a63e]" />
        </div>
      </div>
      <div>
        <label class="font-bold text-[#1f2937] block mb-1">ملاحظات التوريد والناقل</label>
        <input type="text" name="notes" placeholder="ملاحظات تفريغ التنكر..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
      </div>
    `;
  }

  openBottomSheet(
    isSupply ? `توريد: ${tank.name}` : `صرف وقود: ${tank.name}`,
    `
      <form onsubmit="submitTankTx(event, '${tankId}', '${mode}')" class="space-y-3 text-xs">
        <div class="p-3 rounded-2xl bg-[#faf7f5] border border-[#ede7e2] flex items-center justify-between">
          <div>
            <span class="text-[10px] text-[#6b7280] block">الرصيد والسعة الحالية:</span>
            <strong class="text-xs text-[#111827] font-extrabold">${tank.currentLiters.toLocaleString()} / ${tank.capacity.toLocaleString()} لتر</strong>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-white border border-[#dfd8d0] text-[10px] font-bold text-[#374151]">
            ${tank.station}
          </span>
        </div>

        ${formFields}

        <button type="submit" class="w-full py-2.5 rounded-xl ${isSupply ? 'bg-[#00a63e] hover:bg-[#15803d]' : 'bg-[#db6b49] hover:bg-[#c55a3a]'} text-white font-extrabold text-xs shadow-sm transition">
          ${isSupply ? 'حفظ وتحديث رصيد الخزان' : 'اعتماد الصرف وتحديث الرصيد'}
        </button>
      </form>
    `,
    isSupply ? '➕' : '➖'
  );
}

window.openTankSheet = openTankSheet;
