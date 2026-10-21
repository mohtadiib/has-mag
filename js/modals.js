// ============================================================================
// HAS MAG IFMT - MODAL DIALOGS & BOTTOM SHEETS (النوافذ السفلية والحوارية التفاعلية)
// Flutter Equivalent: lib/presentation/sheets/ & lib/presentation/dialogs/
// (Equivalent to showModalBottomSheet() and showDialog() in Flutter)
// ============================================================================

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/base_bottom_sheet.dart
 * عرض نافذة سفلية عامة مع مسار التوجيه (Breadcrumbs)
 * Flutter: showModalBottomSheet(context: context, isScrollControlled: true, builder: ...)
 */
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

/**
 * Flutter Navigation Equivalent: Navigator.of(context).pop();
 * إغلاق النافذة السفلية الحالية
 */
function closeBottomSheet() {
  document.getElementById('bottomSheetBackdrop').classList.add('hidden');
}

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/help_bottom_sheet.dart
 * نافذة شرح الوحدات التشغيلية وشجرة النظام
 */
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

/**
 * Flutter Sheet Equivalent: lib/presentation/sheets/add_record_bottom_sheet.dart
 * نافذة إضافة سجل تشغيلي جديد بنموذج ديناميكي
 */
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
    } else if (f.key === 'status') {
      val = 'مفتوح';
    } else if (f.key === 'closeDateTime') {
      val = '';
    } else if (f.type === 'date') {
      val = '2026-10-19';
    } else if (f.type === 'time') {
      val = '16:00';
    } else if (f.type === 'datetime-local') {
      val = '2026-10-19T16:00';
    } else if (f.key === 'woDateTime') {
      val = '2026-10-19 16:00';
    }

    return renderDynamicFormField(f, val, { isQuickEdit: false, isAutoStock: sub.isAutoStock });
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

/**
 * Flutter Dialog Equivalent: lib/presentation/sheets/rbac_sheet.dart
 * نافذة أدوار وصلاحيات النظام
 */
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

// Global browser window exports
window.openBottomSheet = openBottomSheet;
window.closeBottomSheet = closeBottomSheet;
window.openHelpSheet = openHelpSheet;
window.openAddModal = openAddModal;
window.openBulkShiftModal = openBulkShiftModal;
window.renderBulkShiftModalContent = renderBulkShiftModalContent;
window.toggleBulkEmpSelection = toggleBulkEmpSelection;
window.bulkSelectEmps = bulkSelectEmps;
window.confirmBulkShiftAssignment = confirmBulkShiftAssignment;
window.openMasterAddModal = openMasterAddModal;
window.openRbacModal = openRbacModal;
window.openTankSheet = openTankSheet;
window.openNewInspectionSheet = openNewInspectionSheet;
