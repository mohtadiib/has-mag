// ============================================================================
// HAS MAG IFMT - MASTER DATA ADD SHEETS (نوافذ إضافة عناصر الماستر داتا)
// Flutter Equivalent: lib/presentation/sheets/master_add_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/master_add_sheet.dart
 * نوافذ إضافة عناصر جديدة في الماستر داتا
 */
function openMasterAddModal(cat) {
  const deptOpts = MASTER_DATA.departments.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
  if (cat === 'departments') {
    openBottomSheet('إضافة قسم فني', `
      <form onsubmit="addMasterDepartment(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم القسم..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <input type="text" name="manager" placeholder="اسم المسؤول..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '📁');
  } else if (cat === 'systems') {
    openBottomSheet('إضافة نظام فني', `
      <form onsubmit="addMasterSystem(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم النظام الفني..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <select name="department" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold">${deptOpts}</select>
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '⚙️');
  } else if (cat === 'locations') {
    openBottomSheet('إضافة موقع / مرفق', `
      <form onsubmit="addMasterLocation(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم الموقع بالعربية (مثال: الصالة الملكية)..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <input type="text" name="code" placeholder="الرمز أو الاسم بالإنجليزية (اختياري، مثال: Royal Terminal)..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '📍');
  } else if (cat === 'employees') {
    openBottomSheet('إضافة موظف', `
      <form onsubmit="addMasterEmployee(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم الموظف..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <input type="text" name="job" placeholder="المهنة (مثال: فني ميكانيكا)..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">الوردية</label>
          <div class="switch-button-group grid grid-cols-3 p-1 bg-[#ede7e2] rounded-2xl gap-1 border border-[#dfd8d0] shadow-inner select-none" data-name="shift">
            <button type="button" data-switch-val="وردية A" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'shift', 'وردية A')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all bg-[#db6b49] text-white shadow-xs font-black">وردية A</button>
            <button type="button" data-switch-val="وردية B" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'shift', 'وردية B')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all text-[#6b7280] hover:text-[#111827] font-bold">وردية B</button>
            <button type="button" data-switch-val="وردية C" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'shift', 'وردية C')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all text-[#6b7280] hover:text-[#111827] font-bold">وردية C</button>
            <input type="hidden" name="shift" value="وردية A" />
          </div>
        </div>
        <select name="department" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold">${deptOpts}</select>
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '👤');
  } else if (cat === 'entities') {
    openBottomSheet('إضافة جهة مبلغة', `
      <form onsubmit="addMasterEntity(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم الجهة المبلغة..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '🏢');
  } else if (cat === 'priorities') {
    openBottomSheet('إضافة أولوية أمر عمل', `
      <form onsubmit="addMasterPriority(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="رمز الأولوية (مثال: P1, R1h)..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '⚡');
  } else {
    openBottomSheet('إضافة صنف / أصل / مقاول', `
      <form onsubmit="addMasterCatalog(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">نوع البند</label>
          <div class="switch-button-group grid grid-cols-3 p-1 bg-[#ede7e2] rounded-2xl gap-1 border border-[#dfd8d0] shadow-inner select-none" data-name="type">
            <button type="button" data-switch-val="صنف مخزني" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'type', 'صنف مخزني')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all bg-[#db6b49] text-white shadow-xs font-black">صنف مخزني</button>
            <button type="button" data-switch-val="أصل تشغيلي" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'type', 'أصل تشغيلي')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all text-[#6b7280] hover:text-[#111827] font-bold">أصل تشغيلي</button>
            <button type="button" data-switch-val="مقاول خارجي" data-active-class="bg-[#db6b49] text-white shadow-xs font-black" data-inactive-class="text-[#6b7280] hover:text-[#111827] font-bold" onclick="setFormSwitchValue(this, 'type', 'مقاول خارجي')" class="switch-btn py-2 px-1 rounded-xl text-[11px] transition-all text-[#6b7280] hover:text-[#111827] font-bold">مقاول خارجي</button>
            <input type="hidden" name="type" value="صنف مخزني" />
          </div>
        </div>
        <input type="text" name="name" placeholder="الاسم..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '📦');
  }
}

window.openMasterAddModal = openMasterAddModal;
