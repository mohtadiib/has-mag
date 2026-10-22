// ============================================================================
// HAS MAG IFMT - NEW INSPECTION BOTTOM SHEET (نافذة فتح تذكرة جولة ميدانية)
// Flutter Equivalent: lib/presentation/sheets/new_inspection_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/new_inspection_sheet.dart
 * نافذة فتح تذكرة جولة تفتيش ميدانية جديدة مع حقل شرطي لأمر العمل CM
 */
function openNewInspectionSheet() {
  const deptOpts = MASTER_DATA.departments.map(d => `<option value="${d.code}" ${state.ticketFilterDept === d.code ? 'selected' : ''}>${d.code} - ${d.name}</option>`).join('');
  const locOpts = MASTER_DATA.locations.map(l => `<option value="${l.name}">${l.name}</option>`).join('');
  
  openBottomSheet('إضافة تذكرة جولة ميدانية', `
    <form onsubmit="submitNewInspection(event)" class="space-y-3 text-xs">
      <div>
        <label class="font-bold text-[#1f2937] block mb-1">وصف الملاحظة</label>
        <input type="text" name="title" required placeholder="أدخل وصف الملاحظة الميدانية..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">القسم المختص</label>
          <select name="department" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${deptOpts}</select>
        </div>
        <div>
          <label class="font-bold text-[#1f2937] block mb-1">الموقع</label>
          <select name="location" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${locOpts}</select>
        </div>
      </div>

      <!-- هل تم فتح CM؟ شرطي -->
      <div class="p-3 rounded-2xl bg-[#faf7f5] border border-[#ede7e2] space-y-2">
        <label class="font-bold text-[#111827] block text-xs">هل تم فتح أمر عمل CM للملاحظة؟</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#dfd8d0] cursor-pointer font-bold text-xs hover:border-[#db6b49]">
            <input type="radio" name="hasCM" value="نعم" checked onchange="document.getElementById('cmNumberContainer').style.display='block';" class="accent-[#db6b49]" />
            <span>نعم، تم فتح CM</span>
          </label>
          <label class="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#dfd8d0] cursor-pointer font-bold text-xs hover:border-[#db6b49]">
            <input type="radio" name="hasCM" value="لا" onchange="document.getElementById('cmNumberContainer').style.display='none';" class="accent-[#db6b49]" />
            <span>لا، لم يتم الفتح</span>
          </label>
        </div>

        <div id="cmNumberContainer" class="pt-1">
          <label class="font-bold text-[#1f2937] block mb-1">رقم أمر العمل (CM Number)</label>
          <input type="text" name="cmNumber" id="cmNumberInput" value="CM-${Math.floor(320 + Math.random() * 90)}" placeholder="أدخل رقم أمر العمل CM..." class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold text-[#db6b49]" />
        </div>
      </div>

      <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] hover:bg-[#c55a3a] text-white font-extrabold text-xs shadow-sm transition">
        حفظ تذكرة التفتيش
      </button>
    </form>
  `, '➕');
}

window.openNewInspectionSheet = openNewInspectionSheet;
