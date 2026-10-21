// ============================================================================
// HAS MAG IFMT - SWITCH BUTTON COMPONENT (أزرار التبديل السريع التفاعلية)
// Flutter Equivalent: lib/presentation/widgets/inputs/segmented_switch_button.dart
// ============================================================================

/**
 * Flutter Configuration: lib/presentation/widgets/inputs/switch_option_config.dart
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
 * Flutter Widget Equivalent: lib/presentation/widgets/inputs/segmented_switch_button.dart
 * مكون أزرار التبديل السريع كبديل للقوائم المنسدلة للخيارات الثنائية والثلاثية
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class SegmentedSwitchButton extends StatelessWidget {
 *   final String label;
 *   final List<String> options;
 *   final String selectedValue;
 *   final ValueChanged<String> onChanged;
 * 
 *   const SegmentedSwitchButton({
 *     required this.label,
 *     required this.options,
 *     required this.selectedValue,
 *     required this.onChanged,
 *   });
 * 
 *   @override
 *   Widget build(BuildContext context) {
 *     return Column(
 *       crossAxisAlignment: CrossAxisAlignment.start,
 *       children: [
 *         Row(
 *           mainAxisAlignment: MainAxisAlignment.spaceBetween,
 *           children: [
 *             Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
 *             const Text('زر تبديل سريع', style: TextStyle(color: Color(0xFFDB6B49), fontSize: 10)),
 *           ],
 *         ),
 *         const SizedBox(height: 6),
 *         Container(
 *           padding: const EdgeInsets.all(4),
 *           decoration: BoxDecoration(
 *             color: const Color(0xFFEDE7E2),
 *             borderRadius: BorderRadius.circular(16),
 *           ),
 *           child: Row(
 *             children: options.map((opt) {
 *               final isSel = opt == selectedValue;
 *               return Expanded(
 *                 child: GestureDetector(
 *                   onTap: () => onChanged(opt),
 *                   child: Container(
 *                     padding: const EdgeInsets.symmetric(vertical: 8),
 *                     decoration: BoxDecoration(
 *                       color: isSel ? const Color(0xFFDB6B49) : Colors.transparent,
 *                       borderRadius: BorderRadius.circular(12),
 *                     ),
 *                     child: Center(
 *                       child: Text(
 *                         opt,
 *                         style: TextStyle(
 *                           color: isSel ? Colors.white : const Color(0xFF6B7280),
 *                           fontWeight: isSel ? FontWeight.w900 : FontWeight.bold,
 *                           fontSize: 12,
 *                         ),
 *                       ),
 *                     ),
 *                   ),
 *                 ),
 *               );
 *             }).toList(),
 *           ),
 *         ),
 *       ],
 *     );
 *   }
 * }
 * ```
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
 * Flutter Controller / Event Handler: lib/presentation/widgets/inputs/segmented_switch_button.dart
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

  // الارتباط الذكي لحقل حالة البلاغ/أمر العمل
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

window.getSwitchOptionConfig = getSwitchOptionConfig;
window.renderSwitchComponent = renderSwitchComponent;
window.setFormSwitchValue = setFormSwitchValue;
