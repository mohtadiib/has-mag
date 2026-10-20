// BOTTOM SHEET CONTROLLER (النوافذ السفلية لشرح التفرعات والنماذج السريعة)
// ============================================================================
function openBottomSheet(title, htmlContent, badgeIcon = '💡') {
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetBadgeIcon').textContent = badgeIcon;
  document.getElementById('sheetBody').innerHTML = htmlContent;
  const crumbs = getBreadcrumbsTrail();
  const sheetCrumbEl = document.getElementById('sheetBreadcrumb');
  if (sheetCrumbEl) {
    const trailHtml = crumbs.map(c => `<span class="whitespace-nowrap font-medium text-[#6b7280]">${c.label}</span>`).join('<span class="text-[#9ca3af] mx-1">←</span>');
    sheetCrumbEl.innerHTML = `${trailHtml} <span class="text-[#9ca3af] mx-1">←</span> <span class="whitespace-nowrap font-bold text-[#db6b49]">${title}</span>`;
  }
  document.getElementById('bottomSheetBackdrop').classList.remove('hidden');
}

function closeBottomSheet() {
  document.getElementById('bottomSheetBackdrop').classList.add('hidden');
}

function openHelpSheet(type, id, secondId) {
  if (event) event.stopPropagation();

  if (type === 'excel_tree') {
    openBottomSheet('دليل الوحدات التشغيلية للنظام', `
      <div class="p-3 rounded-2xl bg-[#fdece6] border border-[#f9d8cc] text-[#1f2937] font-bold leading-relaxed">
        دليل وحدات وأقسام نظام إدارة وتشغيل وصيانة مطار حائل الدولي:
      </div>
      <div class="space-y-2 pt-1">
        ${SYSTEM_MODULES.map(m => `
          <div class="p-2.5 rounded-xl bg-white border border-[#ede7e2] flex items-start gap-2.5">
            <span class="text-xl leading-none shrink-0 mt-0.5">${m.textIcon}</span>
            <div class="flex-1">
              <div class="font-extrabold text-[#111827]">${m.shortTitle} <span class="text-[10px] text-[#db6b49]">(${m.excelName})</span></div>
              <p class="text-[11px] text-[#6b7280] mt-0.5 leading-relaxed">${m.helpText}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `, '🌳');
    return;
  }

  if (type === 'module') {
    const mod = SYSTEM_MODULES.find(m => m.id === id);
    if (!mod) return;
    openBottomSheet(mod.fullTitle, `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#ede7e2]">
        <span class="text-2xl leading-none shrink-0">${mod.textIcon}</span>
        <p class="text-[#374151] leading-relaxed font-medium">${mod.helpText}</p>
      </div>
      <button type="button" onclick="closeBottomSheet(); openModule('${mod.id}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-2">
        فتح ${mod.shortTitle}
      </button>
    `, '📌');
    return;
  }

  if (type === 'subSection') {
    const mod = SYSTEM_MODULES.find(m => m.id === id);
    const sub = mod?.subSections.find(s => s.id === secondId);
    if (!sub) return;
    openBottomSheet(sub.shortTitle, `
      <p class="text-[#374151] leading-relaxed font-medium bg-white p-3 rounded-2xl border border-[#ede7e2]">
        ${sub.helpText}
      </p>
      ${sub.fields ? `
        <div class="space-y-1">
          <div class="font-extrabold text-[#111827]">البيانات المسجلة في هذا القسم:</div>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${sub.fields.map(f => `<span class="px-2.5 py-1 rounded-lg bg-white border border-[#e5dfd9] text-[#374151] text-[10px] font-bold">${f.label}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      <button type="button" onclick="closeBottomSheet(); openSubSection('${mod.id}', '${sub.id}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-2">
        استعراض ${sub.shortTitle}
      </button>
    `, '📋');
    return;
  }

  if (type === 'department') {
    const dep = MASTER_DATA.departments.find(d => d.code === id);
    if (!dep) return;
    openBottomSheet(dep.name, `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#ede7e2]">
        <img src="${dep.icon}" class="w-11 h-11 object-contain shrink-0" />
        <div>
          <div class="font-extrabold text-[#111827]">${dep.name}</div>
          <div class="text-[11px] text-[#db6b49] font-bold mt-0.5">المسؤول: ${dep.manager}</div>
        </div>
      </div>
      <p class="text-[#374151] leading-relaxed font-medium bg-white p-3 rounded-2xl border border-[#ede7e2]">
        ${dep.desc}
      </p>
      <button type="button" onclick="closeBottomSheet(); openDeptTickets('${dep.code}');" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs mt-1">
        عرض تذاكر القسم (${dep.badge})
      </button>
    `, '🏢');
  }
}

// ============================================================================

// CLEAN, OBJECTIVE ADD MODAL (حقول ضرورية وموضوعية فقط بدون تشعب)
// ============================================================================
function openAddModal(modId, subId) {
  const mod = SYSTEM_MODULES.find(m => m.id === (modId || state.selectedModuleId)) || getModule();
  const sub = (mod.subSections || []).find(s => s.id === (subId || state.selectedSubId)) || mod.subSections[0];
  if (!sub) return;

  if (sub.id === 'sub_attendance') {
    const targetShift = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') ? state.activeChildSubCode : 'وردية A';
    openBulkShiftModal(targetShift);
    return;
  }

  const fieldsHtml = (sub.fields || []).map(f => {
    let val = '';
    if (sub.hasChildSubIcons && f.key === sub.childSubField && state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') {
      val = state.activeChildSubCode;
    } else if (f.key === 'woNo') {
      val = (sub.id === 'sub_rm_work_orders' ? 'RM-2026-' : 'WO-2026-') + Math.floor(503 + Math.random() * 400);
    } else if (f.key === 'sprNo') {
      val = 'SPR-2026-0' + Math.floor(100 + Math.random() * 800);
    } else if (f.key === 'mrfNo') {
      val = 'MRF-2026-0' + Math.floor(120 + Math.random() * 800);
    } else if (f.key === 'orderNo') {
      val = 'CP-2026-0' + Math.floor(90 + Math.random() * 800);
    } else if (f.type === 'date') {
      val = '2026-10-19';
    } else if (f.type === 'time') {
      val = '16:00';
    } else if (f.type === 'datetime-local') {
      val = '2026-10-19T16:00';
    } else if (f.key === 'woDateTime') {
      val = '2026-10-19 16:00';
    }

    if (f.type === 'master_entity') {
      const entities = MASTER_DATA.entities || [];
      const opts = entities.map(e => `<option value="${e}">${e}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_priority') {
      const priorities = MASTER_DATA.priorities || [];
      const opts = priorities.map(p => `<option value="${p}">${p}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_dept') {
      const opts = MASTER_DATA.departments.map(d => `<option value="${d.name}" ${state.activeChildSubCode !== 'الكل' && d.name.includes(state.activeChildSubCode) ? 'selected' : ''}>${d.name}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_system') {
      const opts = MASTER_DATA.systems.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_location') {
      const opts = MASTER_DATA.locations.map(l => `<option value="${l.name}">${l.name}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_employee') {
      const opts = MASTER_DATA.employees.map(e => `<option value="${e.name}">${e.name} (${e.shift})</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'master_catalog_item' || f.type === 'master_catalog_asset' || f.type === 'master_catalog_contractor') {
      const filterType = f.type === 'master_catalog_item' ? 'صنف مخزني' : f.type === 'master_catalog_asset' ? 'أصل تشغيلي' : 'مقاول خارجي';
      const items = MASTER_DATA.catalog.filter(c => c.type === filterType);
      const opts = items.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'select') {
      const opts = (f.options || []).map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('');
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <select name="${f.key}" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${opts}</select>
        </div>
      `;
    }

    if (f.type === 'textarea') {
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#1f2937] block">${f.label}</label>
          <textarea name="${f.key}" rows="2" required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold">${val}</textarea>
        </div>
      `;
    }

    if (f.type === 'readonly_calc') {
      return `
        <div class="space-y-1">
          <label class="font-bold text-[#15803d] block">${f.label}</label>
          <input type="number" name="${f.key}" id="modalCalcAvailableQty" value="${val || 0}" readonly class="w-full px-3 py-2 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d] font-extrabold text-sm" />
        </div>
      `;
    }

    const liveCalcAttr = sub.isAutoStock && ['prevQty', 'incomingQty', 'issuedQty'].includes(f.key)
      ? 'oninput="updateModalAutoStockCalc(this.form)"'
      : '';

    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block">${f.label}</label>
        <input type="${f.type || 'text'}" name="${f.key}" value="${val}" ${liveCalcAttr} required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-semibold" />
      </div>
    `;
  }).join('');

  openBottomSheet(
    `إضافة: ${sub.shortTitle}`,
    `
      <form onsubmit="submitAddModalForm(event, '${mod.id}', '${sub.id}')" class="space-y-2.5 text-xs">
        ${fieldsHtml}
        <div class="pt-2 flex items-center gap-2">
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold text-xs">
            حفظ
          </button>
          <button type="button" onclick="closeBottomSheet()" class="px-4 py-2.5 rounded-xl bg-[#f3ece6] text-[#374151] font-bold text-xs">
            إلغاء
          </button>
        </div>
      </form>
    `,
    '➕'
  );
}

function updateModalAutoStockCalc(form) {
  if (!form) return;
  const prev = parseFloat(form.querySelector('[name="prevQty"]')?.value || '0');
  const inc = parseFloat(form.querySelector('[name="incomingQty"]')?.value || '0');
  const iss = parseFloat(form.querySelector('[name="issuedQty"]')?.value || '0');
  const out = document.getElementById('modalCalcAvailableQty');
  if (out) out.value = prev + inc - iss;
}

function submitAddModalForm(e, modId, subId) {
  e.preventDefault();
  const form = e.target;
  const mod = SYSTEM_MODULES.find(m => m.id === modId) || getModule();
  const sub = (mod.subSections || []).find(s => s.id === subId) || getSubSection();
  if (!sub) return;

  const fd = new FormData(form);
  const obj = { id: 'REC-' + Math.floor(100 + Math.random() * 900) };
  for (const [k, v] of fd.entries()) {
    obj[k] = v;
  }

  if (sub.isAutoStock) {
    obj.prevQty = parseFloat(obj.prevQty || '0');
    obj.incomingQty = parseFloat(obj.incomingQty || '0');
    obj.issuedQty = parseFloat(obj.issuedQty || '0');
    obj.availableQty = obj.prevQty + obj.incomingQty - obj.issuedQty;
  }

  if (!sub.records) sub.records = [];
  sub.records.unshift(obj);
  closeBottomSheet();
  showToast(`تمت الإضافة في ${sub.shortTitle}`);
  openSubSection(mod.id, sub.id, state.activeChildSubCode);
}

// ============================================================================

// STREAMLINED BULK SHIFT ASSIGNMENT MODAL (نافذة موحدة ومباشرة لتحديد موظفي الوردية)
// ============================================================================
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

// ============================================================================

// MASTER DATA ADD MODALS & WORKFLOW HELPERS
// ============================================================================
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
        <input type="text" name="name" placeholder="اسم الموقع أو الصالة..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '📍');
  } else if (cat === 'employees') {
    openBottomSheet('إضافة موظف', `
      <form onsubmit="addMasterEmployee(event); closeBottomSheet();" class="space-y-2.5 text-xs">
        <input type="text" name="name" placeholder="اسم الموظف..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <div class="grid grid-cols-2 gap-2">
          <input type="text" name="job" placeholder="المهنة" required class="px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
          <select name="shift" class="px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold">
            <option value="وردية A">وردية A</option>
            <option value="وردية B">وردية B</option>
            <option value="وردية C">وردية C</option>
          </select>
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
        <select name="type" class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold">
          <option value="صنف مخزني">صنف مخزني</option>
          <option value="أصل تشغيلي">أصل تشغيلي</option>
          <option value="مقاول خارجي">مقاول خارجي</option>
        </select>
        <input type="text" name="name" placeholder="الاسم..." required class="w-full px-3 py-2 rounded-xl border border-[#dfd8d0] bg-white font-bold" />
        <button type="submit" class="w-full py-2.5 rounded-xl bg-[#db6b49] text-white font-extrabold">حفظ</button>
      </form>
    `, '📦');
  }
}

function convertReportToWorkOrder(repId) {
  const wcMod = SYSTEM_MODULES.find(m => m.id === 'mod_work_control');
  const repSub = wcMod.subSections.find(s => s.id === 'sub_daily_reports');
  const woSub = wcMod.subSections.find(s => s.id === 'sub_work_orders');
  const rep = repSub.records.find(r => r.id === repId);
  if (!rep) return;

  const newWoNo = 'WO-2026-' + Math.floor(600 + Math.random() * 300);
  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: 'P2',
    department: rep.department || MASTER_DATA.departments[0].name,
    system: MASTER_DATA.systems[0].name,
    technician: rep.technician || '',
    status: 'مفتوح',
    woDateTime: rep.reportDateTime || '2026-10-19 16:05',
    responseTime: '10 دقائق',
    correctionDuration: 'جاري العمل',
    closeDateTime: '',
    problemDesc: `محول من بلاغ (${rep.reporterName || 'بلاغ'} - ${rep.entity || ''}): ${rep.problemDesc}`,
    materialsUsed: rep.materialsUsed || ''
  });
  showToast(`تم تحويل البلاغ إلى أمر عمل (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

function convertFaultToWorkOrder(faultId) {
  const faultSub = SYSTEM_MODULES.find(m => m.id === 'mod_faulty').subSections[0];
  const woSub = SYSTEM_MODULES.find(m => m.id === 'mod_work_control').subSections.find(s => s.id === 'sub_work_orders');
  const rec = faultSub.records.find(r => r.id === faultId);
  if (!rec) return;

  const newWoNo = 'WO-2026-' + Math.floor(600 + Math.random() * 300);
  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: 'P2',
    woDateTime: '2026-10-19 16:10',
    department: rec.department,
    system: rec.equipmentName,
    technician: MASTER_DATA.employees[0]?.name || '',
    status: 'مفتوح',
    problemDesc: `إصلاح عطل (${rec.equipmentName}): ${rec.faultDesc}`,
    materialsUsed: ''
  });
  showToast(`تم إصدار أمر عمل (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

function convertFaultToSpr(faultId) {
  const faultSub = SYSTEM_MODULES.find(m => m.id === 'mod_faulty').subSections[0];
  const sprSub = SYSTEM_MODULES.find(m => m.id === 'mod_warehouse').subSections.find(s => s.id === 'sub_spr');
  const rec = faultSub.records.find(r => r.id === faultId);
  if (!rec) return;

  const newSprNo = 'SPR-2026-0' + Math.floor(200 + Math.random() * 700);
  sprSub.records.unshift({
    id: 'SPR-' + Date.now(),
    sprNo: newSprNo,
    createdDate: '2026-10-19',
    department: rec.department,
    system: rec.equipmentName,
    partName: `قطعة غيار لـ ${rec.equipmentName}`,
    reqQty: 1,
    recQty: 0,
    recDate: '',
    attachmentNo: 'ATT-' + Math.floor(500 + Math.random() * 400)
  });
  showToast(`تم إنشاء طلب شراء (${newSprNo})`);
  openSubSection('mod_warehouse', 'sub_spr');
}

function convertTicketToWorkOrder(tktId) {
  const tkt = INSPECTION_TICKETS.find(t => t.id === tktId);
  if (!tkt) return;
  const woSub = SYSTEM_MODULES.find(m => m.id === 'mod_work_control').subSections.find(s => s.id === 'sub_work_orders');
  const newWoNo = 'WO-2026-' + Math.floor(700 + Math.random() * 200);
  woSub.records.unshift({
    id: 'WO-' + Date.now(),
    woNo: newWoNo,
    priority: 'P2',
    woDateTime: '2026-10-19 16:15',
    department: tkt.department,
    system: MASTER_DATA.systems[0].name,
    technician: MASTER_DATA.employees[0]?.name || '',
    status: 'مفتوح',
    problemDesc: `محول من تذكرة جولة #${tkt.cmNumber}: ${tkt.title} (${tkt.location})`,
    materialsUsed: ''
  });
  showToast(`تم تحويل التذكرة إلى أمر عمل (${newWoNo})`);
  openSubSection('mod_work_control', 'sub_work_orders');
}

function deleteRecord(modId, subId, recId) {
  const mod = SYSTEM_MODULES.find(m => m.id === modId);
  const sub = mod?.subSections.find(s => s.id === subId);
  if (!sub || !sub.records) return;
  const idx = sub.records.findIndex(r => r.id === recId);
  if (idx !== -1) {
    sub.records.splice(idx, 1);
    showToast('تم حذف السجل', '🗑️');
    openSubSection(mod.id, sub.id, state.activeChildSubCode);
  }
}

function openRbacModal() {
  openBottomSheet('أدوار وصلاحيات النظام', `
    <div class="space-y-2.5 text-xs">
      ${RBAC_ROLES.map(r => `
        <div class="bg-white rounded-xl border ${r.active ? 'border-[#00a63e]' : 'border-[#ede7e2]'} p-3">
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-[#111827]">${r.name}</span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${r.active ? 'bg-[#00a63e] text-white' : 'bg-[#f3ece6] text-[#47525e]'}">${r.badge}</span>
          </div>
          <div class="text-[10px] text-[#6b7280] mt-1">${r.modules}</div>
        </div>
      `).join('')}
    </div>
  `, '🔐');
}

// ============================================================================

// BOTTOM SHEET ACTION FORMS (TANKS & INSPECTION TICKETS)
// ============================================================================
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

function submitTankTx(e, tankId, mode) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const tank = MASTER_DATA.tanksConfig.find(t => t.id === tankId);
  if (!tank) return;
  const liters = parseFloat(fd.get('liters') || '0');
  if (mode === 'supply') {
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

function submitNewInspection(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const deptCode = fd.get('department');
  INSPECTION_TICKETS.unshift({
    id: 'TKT-' + Math.floor(200 + Math.random() * 700),
    title: fd.get('title'),
    department: deptCode,
    location: fd.get('location'),
    status: 'مفتوحة',
    timeAgo: 'الآن',
    responseTime: '1 دقيقة',
    totalDuration: '10 دقائق',
    maintDuration: '9 دقائق',
    reporter: 'Mazen (Inspector)',
    cmNumber: fd.get('cmNumber'),
    thumb: ICON_PATHS.photoBefore,
    afterPhoto: ICON_PATHS.photoAfter,
    closingNotes: 'تم فتح التذكرة وتوجيه القسم المختص.'
  });
  const depObj = MASTER_DATA.departments.find(d => d.code === deptCode);
  if (depObj) depObj.badge = (depObj.badge || 0) + 1;
  closeBottomSheet();
  showToast('تمت إضافة التذكرة');
  renderApp();
}

function toggleTicketStatus(tktId) {
  const tkt = INSPECTION_TICKETS.find(r => r.id === tktId);
  if (tkt) {
    tkt.status = tkt.status === 'مغلقة' ? 'مفتوحة' : 'مغلقة';
    showToast(`حالة التذكرة: ${tkt.status}`);
    renderApp();
  }
}

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
  MASTER_DATA.locations.unshift({ id: 'LOC-' + Date.now(), name: fd.get('name'), type: 'مرفق تشغيلي' });
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

function toggleTankLock(idx) {
  MASTER_DATA.tanksConfig[idx].locked = !MASTER_DATA.tanksConfig[idx].locked;
  showToast(MASTER_DATA.tanksConfig[idx].locked ? 'تم قفل السعة 🔒' : 'تم فك القفل 🔓');
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

// ============================================================================
