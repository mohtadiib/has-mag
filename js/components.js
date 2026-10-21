// ============================================================================
// HAS MAG IFMT - REUSABLE UI COMPONENTS (مكونات الواجهة العامة القابلة لإعادة الاستخدام)
// Flutter Equivalent: lib/presentation/widgets/
// ============================================================================

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/status_badge.dart
 * شارة حالة السجل (مفتوح / مغلق / منجز / منتظم)
 */
function renderStatusBadge(status) {
  const isClosed = status === 'مغلق' || status === 'مغلقة' || status === 'منجز';
  const bgClass = isClosed ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]';
  return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${bgClass}">${status || 'مفتوح'}</span>`;
}

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/priority_badge.dart
 * شارة أولوية أمر العمل (SLA Priority Badge)
 */
function renderPriorityBadge(p) {
  if (!p) return '';
  const pClass = (p === 'P1' || p.startsWith('R1') || p.includes('حرجة') || p.includes('فورية')) ? 'bg-red-600 text-white' :
    (p === 'P2' || p.startsWith('R2') || p.includes('طارئة')) ? 'bg-red-500 text-white' :
    (p.startsWith('P3') || p.startsWith('R3') || p.includes('عالية')) ? 'bg-[#ea580c] text-white' :
    (p === 'R4' || p.includes('متوسطة')) ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white';
  return `<span class="px-1.5 py-0.5 rounded text-[9px] font-extrabold ${pClass}">${p}</span>`;
}

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/sub_icon_card.dart
 * بطاقة التصنيف الفرعي الموحدة في شبكة الأيقونات
 */
function renderChildSubIconCard(c, cnt, onClickCode) {
  const isImg = c.icon && (c.icon.startsWith('data:') || c.icon.startsWith('http') || c.icon.includes('/'));
  return `
    <div onclick="state.activeChildSubCode='${onClickCode}'; renderApp();" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
      <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        <span class="absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full bg-[#47525e] text-white text-[9px] font-extrabold shadow-xs leading-none border border-white z-10">${cnt}</span>
        ${isImg ? `
          <img src="${c.icon}" alt="${c.title}" class="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
        ` : `
          <span class="text-3xl leading-none select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.07)]" role="img" aria-label="${c.title}">${c.textIcon || c.icon || '📄'}</span>
        `}
      </div>
      <span class="text-[11px] font-bold text-[#111827] group-hover:text-[#db6b49] mt-2 leading-tight text-center transition tracking-tight">${c.title}</span>
    </div>
  `;
}

/**
 * Flutter Configuration: lib/presentation/widgets/switch_option_config.dart
 * إعدادات الألوان والأيقونات لأزرار التبديل السريع
 */
function getSwitchOptionConfig(fKey, opt) {
  if (opt === 'مفتوح') {
    return {
      activeClass: 'bg-[#ea580c] text-white shadow-xs font-black',
      inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
      icon: '🟠'
    };
  }
  if (opt === 'مغلق') {
    return {
      activeClass: 'bg-[#47525e] text-white shadow-xs font-black',
      inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
      icon: '🔒'
    };
  }
  if (opt === 'نعم') {
    return {
      activeClass: 'bg-amber-600 text-white shadow-xs font-black',
      inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
      icon: '⚠️'
    };
  }
  if (opt === 'لا' || opt === 'لا يوجد') {
    return {
      activeClass: 'bg-[#00a63e] text-white shadow-xs font-black',
      inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
      icon: '✅'
    };
  }
  if (opt === 'يوجد قطع خدمة') {
    return {
      activeClass: 'bg-red-600 text-white shadow-xs font-black',
      inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
      icon: '🚨'
    };
  }
  return {
    activeClass: 'bg-[#db6b49] text-white shadow-xs font-black',
    inactiveClass: 'text-[#6b7280] hover:text-[#111827] font-bold',
    icon: ''
  };
}

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/segmented_switch_button.dart
 * مكون أزرار التبديل السريع كبديل للقوائم المنسدلة للخيارات الثنائية والثلاثية
 */
function renderSwitchComponent(f, currentVal) {
  const options = f.options || [];
  const selected = (currentVal !== undefined && currentVal !== '') ? currentVal : (options[0] || '');
  const cols = options.length === 2 ? 'grid-cols-2' : (options.length === 3 ? 'grid-cols-3' : 'grid-cols-2');

  const btns = options.map(opt => {
    const isSel = (opt === selected);
    const cfg = getSwitchOptionConfig(f.key, opt);
    const currentClass = isSel ? cfg.activeClass : cfg.inactiveClass;

    return `
      <button type="button"
        data-switch-val="${opt}"
        data-active-class="${cfg.activeClass}"
        data-inactive-class="${cfg.inactiveClass}"
        onclick="setFormSwitchValue(this, '${f.key}', '${opt}')"
        class="switch-btn py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${currentClass}">
        ${cfg.icon ? `<span class="text-xs shrink-0">${cfg.icon}</span>` : ''}
        <span>${opt}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="space-y-1.5" data-field-group="${f.key}">
      <div class="flex items-center justify-between">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <span class="text-[10px] text-[#db6b49] font-bold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-[#db6b49]"></span>
          زر تبديل سريع
        </span>
      </div>
      <div class="switch-button-group grid ${cols} p-1 bg-[#ede7e2] rounded-2xl gap-1 border border-[#dfd8d0] shadow-inner select-none" data-name="${f.key}">
        ${btns}
        <input type="hidden" name="${f.key}" value="${selected}" />
      </div>
    </div>
  `;
}

/**
 * Flutter Controller / Event Handler: lib/presentation/widgets/segmented_switch_button.dart
 * تحديث حالة زر التبديل والارتباط التفاعلي مع الحقول المرتبطة (مثل وقت الإغلاق)
 */
function setFormSwitchValue(btn, fieldName, optValue) {
  const group = btn.closest('.switch-button-group');
  if (!group) return;
  const input = group.querySelector(`input[name="${fieldName}"]`);
  if (input) {
    input.value = optValue;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const buttons = group.querySelectorAll('button[data-switch-val]');
  buttons.forEach(b => {
    const val = b.getAttribute('data-switch-val');
    const isSelected = (val === optValue);
    const activeClass = b.getAttribute('data-active-class') || '';
    const inactiveClass = b.getAttribute('data-inactive-class') || '';

    const activeList = activeClass.split(' ').filter(Boolean);
    const inactiveList = inactiveClass.split(' ').filter(Boolean);

    if (isSelected) {
      inactiveList.forEach(c => b.classList.remove(c));
      activeList.forEach(c => b.classList.add(c));
    } else {
      activeList.forEach(c => b.classList.remove(c));
      inactiveList.forEach(c => b.classList.add(c));
    }
  });

  if (fieldName === 'status') {
    const form = btn.closest('form');
    if (form) {
      const closeDateTimeInput = form.querySelector('[name="closeDateTime"]');
      if (closeDateTimeInput) {
        if (optValue === 'مغلق') {
          if (!closeDateTimeInput.value) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            closeDateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
          }
          closeDateTimeInput.classList.remove('opacity-60');
        } else if (optValue === 'مفتوح') {
          closeDateTimeInput.value = '';
          closeDateTimeInput.classList.add('opacity-60');
        }
      }
    }
  }
}

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/dynamic_form_field.dart
 * المكون العام الموحد لتوليد كافة حقول النماذج بديناميكية (Master Data & Inputs)
 */
function renderDynamicFormField(f, val = '', opts = {}) {
  const isQuickEdit = opts.isQuickEdit || false;
  const isAutoStock = opts.isAutoStock || false;
  const bgClass = isQuickEdit ? 'bg-[#faf7f5]' : 'bg-white';
  const borderClass = 'border-[#dfd8d0]';
  const baseInputClass = `w-full px-3 py-2 rounded-xl border ${borderClass} ${bgClass} font-semibold`;

  if (f.type === 'master_entity') {
    const entities = MASTER_DATA.entities || [];
    const optionsHtml = entities.map(e => `<option value="${e}" ${val === e ? 'selected' : ''}>${e}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'master_priority') {
    const priorities = MASTER_DATA.priorities || [];
    const optionsHtml = priorities.map(p => `<option value="${p}" ${val === p ? 'selected' : ''}>${p}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'master_dept') {
    const depts = MASTER_DATA.departments || [];
    const optionsHtml = depts.map(d => `<option value="${d.name}" ${val === d.name ? 'selected' : ''}>${d.name}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'master_system') {
    const depts = MASTER_DATA.departments || [];
    const groupedOpts = depts.map(d => {
      const sysInDept = MASTER_DATA.systems.filter(s => s.department === d.name);
      if (sysInDept.length === 0) return '';
      return `<optgroup label="${d.name}">${sysInDept.map(s => `<option value="${s.name}" ${val === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}</optgroup>`;
    }).join('');
    const knownDepts = depts.map(d => d.name);
    const otherSys = MASTER_DATA.systems.filter(s => !knownDepts.includes(s.department));
    const otherOpts = otherSys.length > 0 ? `<optgroup label="أخرى">${otherSys.map(s => `<option value="${s.name}" ${val === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}</optgroup>` : '';

    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${groupedOpts + otherOpts}</select>
      </div>
    `;
  }

  if (f.type === 'master_location') {
    const optionsHtml = MASTER_DATA.locations.map(l => `<option value="${l.name}" ${val === l.name ? 'selected' : ''}>${l.name}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'master_employee') {
    const depts = MASTER_DATA.departments || [];
    const groupedOpts = depts.map(d => {
      const empInDept = MASTER_DATA.employees.filter(e => e.department === d.name);
      if (empInDept.length === 0) return '';
      return `<optgroup label="${d.name}">${empInDept.map(e => `<option value="${e.name}" ${val === e.name ? 'selected' : ''}>${e.name} (${e.job} - ${e.shift})</option>`).join('')}</optgroup>`;
    }).join('');
    const knownDepts = depts.map(d => d.name);
    const otherEmp = MASTER_DATA.employees.filter(e => !knownDepts.includes(e.department));
    const otherOpts = otherEmp.length > 0 ? `<optgroup label="أخرى">${otherEmp.map(e => `<option value="${e.name}" ${val === e.name ? 'selected' : ''}>${e.name} (${e.job} - ${e.shift})</option>`).join('')}</optgroup>` : '';

    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${groupedOpts + otherOpts}</select>
      </div>
    `;
  }

  if (f.type === 'master_catalog_item' || f.type === 'master_catalog_asset' || f.type === 'master_catalog_contractor') {
    const filterType = f.type === 'master_catalog_item' ? 'صنف مخزني' : f.type === 'master_catalog_asset' ? 'أصل تشغيلي' : 'مقاول خارجي';
    const items = MASTER_DATA.catalog.filter(c => c.type === filterType);
    const optionsHtml = items.map(c => `<option value="${c.name}" ${val === c.name ? 'selected' : ''}>${c.name}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'select') {
    if (f.options && f.options.length >= 2 && f.options.length <= 3) {
      return renderSwitchComponent(f, val || f.options[0]);
    }
    const optionsHtml = (f.options || []).map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('');
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <select name="${f.key}" class="${baseInputClass}">${optionsHtml}</select>
      </div>
    `;
  }

  if (f.type === 'textarea') {
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#1f2937] block text-xs">${f.label}</label>
        <textarea name="${f.key}" rows="2" ${isQuickEdit ? '' : 'required'} class="${baseInputClass}">${val}</textarea>
      </div>
    `;
  }

  if (f.type === 'readonly_calc') {
    const calcId = isQuickEdit ? `calcField_${f.key}` : 'modalCalcAvailableQty';
    return `
      <div class="space-y-1">
        <label class="font-bold text-[#15803d] block text-xs">${f.label}</label>
        <input type="number" name="${f.key}" id="${calcId}" value="${val || 0}" readonly class="w-full px-3 py-2 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d] font-extrabold text-sm" />
      </div>
    `;
  }

  const liveCalcAttr = (isAutoStock && ['prevQty', 'incomingQty', 'issuedQty'].includes(f.key))
    ? 'oninput="updateModalAutoStockCalc(this.form)"'
    : '';

  const isOptional = isQuickEdit || ['closeDateTime', 'materialsUsed'].includes(f.key);
  const opacityClass = (f.key === 'closeDateTime' && !val && !isQuickEdit) ? 'opacity-60 transition-opacity' : '';

  return `
    <div class="space-y-1">
      <label class="font-bold text-[#1f2937] block text-xs">${f.label} ${(!isQuickEdit && isOptional) ? '<span class="text-[10px] text-[#9ca3af] font-normal">(اختياري)</span>' : ''}</label>
      <input type="${f.type || 'text'}" name="${f.key}" value="${val}" ${liveCalcAttr} ${isOptional ? '' : 'required'} class="${baseInputClass} ${opacityClass}" />
    </div>
  `;
}

// Global window exposure for modular execution
window.renderStatusBadge = renderStatusBadge;
window.renderPriorityBadge = renderPriorityBadge;
window.renderChildSubIconCard = renderChildSubIconCard;
window.getSwitchOptionConfig = getSwitchOptionConfig;
window.renderSwitchComponent = renderSwitchComponent;
window.setFormSwitchValue = setFormSwitchValue;
window.renderDynamicFormField = renderDynamicFormField;
