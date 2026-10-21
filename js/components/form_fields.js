// ============================================================================
// HAS MAG IFMT - DYNAMIC FORM FIELD COMPONENT (منشئ حقول النماذج الديناميكية)
// Flutter Equivalent: lib/presentation/widgets/inputs/dynamic_form_field.dart
// ============================================================================

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/inputs/dynamic_form_field.dart
 * المكون العام الموحد لتوليد كافة حقول النماذج بديناميكية (Master Data & Inputs)
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class DynamicFormField extends StatelessWidget {
 *   final FieldDefinition field;
 *   final String initialValue;
 *   final ValueChanged<String> onChanged;
 *   final bool isQuickEdit;
 * 
 *   const DynamicFormField({
 *     required this.field,
 *     required this.initialValue,
 *     required this.onChanged,
 *     this.isQuickEdit = false,
 *   });
 * 
 *   @override
 *   Widget build(BuildContext context) {
 *     switch (field.type) {
 *       case 'select':
 *         if (field.options != null && field.options!.length <= 3) {
 *           return SegmentedSwitchButton(
 *             label: field.label,
 *             options: field.options!,
 *             selectedValue: initialValue,
 *             onChanged: onChanged,
 *           );
 *         }
 *         return DropdownButtonFormField<String>(...);
 *       case 'master_dept':
 *         return MasterDeptDropdown(...);
 *       case 'master_employee':
 *         return MasterEmployeePicker(...);
 *       case 'textarea':
 *         return TextFormField(maxLines: 3, ...);
 *       default:
 *         return TextFormField(...);
 *     }
 *   }
 * }
 * ```
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

window.renderDynamicFormField = renderDynamicFormField;
