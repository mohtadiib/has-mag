// ============================================================================
// HAS MAG IFMT - BULK SHIFT BOTTOM SHEET (نافذة الإسناد الجماعي لموظفي الورديات)
// Flutter Equivalent: lib/presentation/sheets/bulk_shift_sheet.dart
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/bulk_shift_sheet.dart
 * نافذة الإسناد وتعيين موظفي الورديات مع تصفية الفنيين حسب القسم
 */
function openBulkShiftModal(defaultShift = 'وردية A') {
  if (defaultShift && defaultShift !== 'الكل' && defaultShift !== 'عرض الكل') {
    uxState.bulkShift = defaultShift;
  }
  if (!uxState.bulkDept) {
    uxState.bulkDept = (state.activeDeptSubCode && state.activeDeptSubCode !== 'الكل') ? state.activeDeptSubCode : 'الكل';
  }
  renderBulkShiftModalContent();
}

function renderBulkShiftModalContent() {
  const currentDept = uxState.bulkDept || 'الكل';
  const filteredEmps = MASTER_DATA.employees.filter(e => {
    const matchDept = currentDept === 'الكل' || (e.department && e.department.includes(currentDept));
    const matchSearch = !uxState.bulkSearch || e.name.toLowerCase().includes(uxState.bulkSearch.toLowerCase()) || (e.department && e.department.includes(uxState.bulkSearch));
    return matchDept && matchSearch;
  });

  const selectedCount = uxState.bulkSelectedEmpIds.size;

  const html = `
    <div class="space-y-3 text-xs">
      <!-- 1. Shift Selector -->
      <div>
        <label class="font-bold text-[#1f2937] block mb-1">الوردية المستهدفة:</label>
        <div class="grid grid-cols-3 gap-2">
          ${['وردية A', 'وردية B', 'وردية C'].map(sh => `
            <button type="button" onclick="uxState.bulkShift='${sh}'; renderBulkShiftModalContent();" class="py-2 rounded-xl font-extrabold text-xs border transition ${uxState.bulkShift === sh ? 'bg-[#db6b49] text-white border-[#db6b49]' : 'bg-white text-[#374151] border-[#dfd8d0]'}">
              ${sh}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 2. Department Selector Filter (فلترة الفنيين بحسب القسم) -->
      <div>
        <label class="font-bold text-[#1f2937] block mb-1">تحديد القسم لعرض فنييه فقط:</label>
        <select onchange="uxState.bulkDept=this.value; renderBulkShiftModalContent();" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold text-xs">
          <option value="الكل" ${currentDept === 'الكل' ? 'selected' : ''}>جميع الأقسام (${MASTER_DATA.employees.length} فني)</option>
          ${MASTER_DATA.departments.map(d => {
            const countInDept = MASTER_DATA.employees.filter(e => e.department && e.department.includes(d.name)).length;
            return `<option value="${d.name}" ${currentDept === d.name ? 'selected' : ''}>${d.name} (${countInDept} فني)</option>`;
          }).join('')}
        </select>
      </div>

      <!-- 3. Search & Quick Select / Clear -->
      <div class="flex items-center gap-2">
        <input type="text" value="${uxState.bulkSearch || ''}" oninput="uxState.bulkSearch=this.value; renderBulkShiftModalContent();" placeholder="بحث باسم الفني أو المسمى..." class="flex-1 px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
        <button type="button" onclick="bulkSelectFilteredEmps('all')" class="px-2.5 py-2 rounded-xl bg-white border border-[#dfd8d0] text-[#374151] font-bold text-[11px] shrink-0">تحديد القسم</button>
        <button type="button" onclick="bulkSelectFilteredEmps('none')" class="px-2.5 py-2 rounded-xl bg-white border border-[#dfd8d0] text-[#6b7280] font-bold text-[11px] shrink-0">إلغاء</button>
      </div>

      <!-- 4. Technicians Multi-Select Checklist -->
      <div class="max-h-56 overflow-y-auto custom-scroll space-y-1.5 bg-white p-2 rounded-2xl border border-[#ede7e2]">
        ${filteredEmps.length === 0 ? `
          <div class="p-4 text-center text-[#6b7280] text-xs">لا يوجد فنيين مسجلين في هذا القسم حالياً.</div>
        ` : filteredEmps.map(emp => {
          const isSelected = uxState.bulkSelectedEmpIds.has(emp.id);
          return `
            <div onclick="toggleBulkEmpSelection('${emp.id}')" class="cursor-pointer p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${isSelected ? 'bg-[#fdece6]/60 border-[#db6b49]' : 'bg-[#faf7f5] border-transparent hover:border-[#e5dfd9]'}">
              <div class="flex items-center gap-2.5 min-w-0">
                <input type="checkbox" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleBulkEmpSelection('${emp.id}');" class="w-4 h-4 accent-[#db6b49] rounded shrink-0 cursor-pointer" />
                <div class="min-w-0">
                  <div class="font-extrabold text-[#111827] truncate">${emp.name}</div>
                  <div class="text-[10px] text-[#6b7280] truncate">${emp.job} • ${emp.department}</div>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-white border border-[#dfd8d0] text-[#374151] text-[10px] font-bold shrink-0">
                ${emp.shift}
              </span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 5. Confirm Button -->
      <button type="button" onclick="confirmBulkShiftAssignment()" class="w-full py-2.5 rounded-xl bg-[#db6b49] hover:bg-[#c55a3a] text-white font-extrabold text-xs shadow-sm transition">
        اعتماد (${selectedCount}) فنيين في ${uxState.bulkShift}
      </button>
    </div>
  `;

  openBottomSheet(`تحديد فنيي ${uxState.bulkShift}`, html, '👥');
}

function toggleBulkEmpSelection(empId) {
  if (uxState.bulkSelectedEmpIds.has(empId)) {
    uxState.bulkSelectedEmpIds.delete(empId);
  } else {
    uxState.bulkSelectedEmpIds.add(empId);
  }
  renderBulkShiftModalContent();
}

function bulkSelectFilteredEmps(mode) {
  const currentDept = uxState.bulkDept || 'الكل';
  const filteredEmps = MASTER_DATA.employees.filter(e => {
    const matchDept = currentDept === 'الكل' || (e.department && e.department.includes(currentDept));
    return matchDept;
  });

  if (mode === 'none') {
    filteredEmps.forEach(e => uxState.bulkSelectedEmpIds.delete(e.id));
  } else {
    filteredEmps.forEach(e => uxState.bulkSelectedEmpIds.add(e.id));
  }
  renderBulkShiftModalContent();
}

function confirmBulkShiftAssignment() {
  if (uxState.bulkSelectedEmpIds.size === 0) {
    showToast('يرجى تحديد فني واحد على الأقل', '⚠️');
    return;
  }
  const hrMod = SYSTEM_MODULES.find(m => m.id === 'mod_hr');
  const attSub = hrMod?.subSections.find(s => s.id === 'sub_attendance');
  let addedCount = 0;

  MASTER_DATA.employees.forEach(emp => {
    if (uxState.bulkSelectedEmpIds.has(emp.id)) {
      emp.shift = uxState.bulkShift;
      if (attSub) {
        // إذا لم يكن مسجلاً في هذه الوردية، أضفه
        const existing = (attSub.records || []).find(r => r.technician === emp.name && r.shift === uxState.bulkShift);
        if (!existing) {
          attSub.records.unshift({
            id: 'ATT-' + Math.floor(100 + Math.random() * 9000),
            shift: uxState.bulkShift,
            department: emp.department,
            technician: emp.name
          });
        }
      }
      addedCount++;
    }
  });

  closeBottomSheet();
  showToast(`تم اعتماد ${addedCount} فنيين في ${uxState.bulkShift}`);
  openSubSection('mod_hr', 'sub_attendance', uxState.bulkShift);
}

window.openBulkShiftModal = openBulkShiftModal;
window.renderBulkShiftModalContent = renderBulkShiftModalContent;
window.toggleBulkEmpSelection = toggleBulkEmpSelection;
window.bulkSelectFilteredEmps = bulkSelectFilteredEmps;
window.confirmBulkShiftAssignment = confirmBulkShiftAssignment;
