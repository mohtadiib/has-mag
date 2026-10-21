// ============================================================================
// HAS MAG IFMT - BULK SHIFT BOTTOM SHEET (نافذة الإسناد الجماعي لموظفي الورديات)
// Flutter Equivalent: lib/presentation/sheets/bulk_shift_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/bulk_shift_sheet.dart
 * نافذة الإسناد الجماعي لموظفي الورديات
 */
function openBulkShiftModal(defaultShift = 'وردية A') {
  if (defaultShift && defaultShift !== 'الكل' && defaultShift !== 'عرض الكل') {
    uxState.bulkShift = defaultShift;
  }
  renderBulkShiftModalContent();
}

function renderBulkShiftModalContent() {
  const filteredEmps = MASTER_DATA.employees.filter(e => {
    return !uxState.bulkSearch || e.name.includes(uxState.bulkSearch) || e.department.includes(uxState.bulkSearch);
  });

  const selectedCount = uxState.bulkSelectedEmpIds.size;

  const html = `
    <div class="space-y-3 text-xs">
      <!-- 1. Shift Selector -->
      <div class="grid grid-cols-3 gap-2">
        ${['وردية A', 'وردية B', 'وردية C'].map(sh => `
          <button type="button" onclick="uxState.bulkShift='${sh}'; renderBulkShiftModalContent();" class="py-2 rounded-xl font-extrabold text-xs border transition ${uxState.bulkShift === sh ? 'bg-[#db6b49] text-white border-[#db6b49]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
            ${sh}
          </button>
        `).join('')}
      </div>

      <!-- 2. Search & Quick Select All / Clear -->
      <div class="flex items-center gap-2">
        <input type="text" value="${uxState.bulkSearch}" oninput="uxState.bulkSearch=this.value; renderBulkShiftModalContent();" placeholder="بحث باسم الموظف أو القسم..." class="flex-1 px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
        <button type="button" onclick="bulkSelectEmps('all')" class="px-2.5 py-2 rounded-xl bg-white border border-[#dfd8d0] text-[#374151] font-bold text-[11px] shrink-0">الكل</button>
        <button type="button" onclick="bulkSelectEmps('none')" class="px-2.5 py-2 rounded-xl bg-white border border-[#dfd8d0] text-[#6b7280] font-bold text-[11px] shrink-0">مسح</button>
      </div>

      <!-- 3. Employees Checklist -->
      <div class="max-h-56 overflow-y-auto custom-scroll space-y-1.5 bg-white p-2 rounded-2xl border border-[#ede7e2]">
        ${filteredEmps.map(emp => {
          const isSelected = uxState.bulkSelectedEmpIds.has(emp.id);
          return `
            <div onclick="toggleBulkEmpSelection('${emp.id}')" class="cursor-pointer p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${isSelected ? 'bg-[#fdece6]/60 border-[#db6b49]' : 'bg-[#faf7f5] border-transparent hover:border-[#e5dfd9]'}">
              <div class="flex items-center gap-2.5 min-w-0">
                <input type="checkbox" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleBulkEmpSelection('${emp.id}');" class="w-4 h-4 accent-[#db6b49] rounded shrink-0" />
                <div class="min-w-0">
                  <div class="font-extrabold text-[#111827] truncate">${emp.name}</div>
                  <div class="text-[10px] text-[#6b7280] truncate">${emp.department}</div>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-white border border-[#dfd8d0] text-[#374151] text-[10px] font-bold shrink-0">
                ${emp.shift}
              </span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 4. Confirm Button -->
      <button type="button" onclick="confirmBulkShiftAssignment()" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs shadow-sm">
        اعتماد (${selectedCount}) موظفين في ${uxState.bulkShift}
      </button>
    </div>
  `;

  openBottomSheet(`تحديد موظفي ${uxState.bulkShift}`, html, '👥');
}

function toggleBulkEmpSelection(empId) {
  if (uxState.bulkSelectedEmpIds.has(empId)) {
    uxState.bulkSelectedEmpIds.delete(empId);
  } else {
    uxState.bulkSelectedEmpIds.add(empId);
  }
  renderBulkShiftModalContent();
}

function bulkSelectEmps(mode) {
  if (mode === 'none') {
    uxState.bulkSelectedEmpIds.clear();
  } else {
    MASTER_DATA.employees.forEach(e => uxState.bulkSelectedEmpIds.add(e.id));
  }
  renderBulkShiftModalContent();
}

function confirmBulkShiftAssignment() {
  if (uxState.bulkSelectedEmpIds.size === 0) {
    showToast('يرجى تحديد موظف واحد على الأقل', '⚠️');
    return;
  }
  const hrMod = SYSTEM_MODULES.find(m => m.id === 'mod_hr');
  const attSub = hrMod?.subSections.find(s => s.id === 'sub_attendance');
  let addedCount = 0;

  MASTER_DATA.employees.forEach(emp => {
    if (uxState.bulkSelectedEmpIds.has(emp.id)) {
      emp.shift = uxState.bulkShift;
      if (attSub) {
        attSub.records.unshift({
          id: 'ATT-' + Math.floor(100 + Math.random() * 9000),
          shift: uxState.bulkShift,
          department: emp.department,
          technician: emp.name
        });
      }
      addedCount++;
    }
  });

  closeBottomSheet();
  showToast(`تم اعتماد ${addedCount} موظفين في ${uxState.bulkShift}`);
  openSubSection('mod_hr', 'sub_attendance', uxState.bulkShift);
}

window.openBulkShiftModal = openBulkShiftModal;
window.renderBulkShiftModalContent = renderBulkShiftModalContent;
window.toggleBulkEmpSelection = toggleBulkEmpSelection;
window.bulkSelectEmps = bulkSelectEmps;
window.confirmBulkShiftAssignment = confirmBulkShiftAssignment;
