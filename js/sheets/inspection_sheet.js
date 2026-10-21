// ============================================================================
// HAS MAG IFMT - NEW INSPECTION BOTTOM SHEET (نافذة فتح تذكرة جولة ميدانية)
// Flutter Equivalent: lib/presentation/sheets/new_inspection_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/new_inspection_sheet.dart
 * نافذة فتح تذكرة جولة تفتيش ميدانية جديدة
 */
function openNewInspectionSheet() {
  const deptOpts = MASTER_DATA.departments.map(d => `<option value="${d.code}" ${state.ticketFilterDept === d.code ? 'selected' : ''}>${d.code} - ${d.name}</option>`).join('');
  const locOpts = MASTER_DATA.locations.map(l => `<option value="${l.name}">${l.name}</option>`).join('');
  openBottomSheet('إضافة تذكرة جولة ميدانية', `
    <form onsubmit="submitNewInspection(event)" class="space-y-2.5 text-xs">
      <div>
        <label class="font-bold block mb-1">وصف الملاحظة</label>
        <input type="text" name="title" required placeholder="أدخل وصف الملاحظة..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="font-bold block mb-1">القسم المختص</label>
          <select name="department" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${deptOpts}</select>
        </div>
        <div>
          <label class="font-bold block mb-1">الموقع</label>
          <select name="location" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${locOpts}</select>
        </div>
      </div>
      <div>
        <label class="font-bold block mb-1">رقم البلاغ (CM)</label>
        <input type="text" name="cmNumber" value="${Math.floor(320 + Math.random() * 90)}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
      </div>
      <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ التذكرة</button>
    </form>
  `, '➕');
}

window.openNewInspectionSheet = openNewInspectionSheet;
