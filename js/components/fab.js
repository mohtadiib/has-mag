// ============================================================================
// HAS MAG IFMT - GLOBAL FLOATING ACTION BUTTON (مكون زر الإضافة العائم الدائري FAB)
// Flutter Equivalent: lib/presentation/widgets/global_fab.dart
// ============================================================================

/**
 * التحقق مما إذا كانت الصفحة والشاشة الحالية تدعم عملية إضافة حقيقية
 * @returns {boolean}
 */
function shouldShowAddButton() {
  // 1. عند استعراض وتعديل تفاصيل سجل أو تذكرة (Level 4) -> لا توجد إضافة
  if (state.navLevel === 4) {
    return false;
  }

  // 2. تبويب الجولات والتذاكر (tours_hub) -> يدعم إضافة تذكرة فحص جديدة
  if (state.activeTab === 'tours_hub') {
    return true;
  }

  // 3. تبويب الخزانات (tanks_dash) -> شاشة مراقبة ومناسيب فقط، والتوريد/الصرف يتم عبر بطاقات الخزانات مباشرة
  if (state.activeTab === 'tanks_dash') {
    return false;
  }

  // 4. تبويب الإعدادات والماستر داتا (more)
  if (state.activeTab === 'more') {
    // الشاشة الرئيسية للإعدادات أو سعات الخزانات (التي تعدل مباشرة في بطاقاتها) -> لا توجد إضافة
    if (!state.masterEditorCat || state.masterEditorCat === 'tanksConfig') {
      return false;
    }
    // صفحات محرر عناصر الماستر داتا (الأقسام، الأنظمة، المواقع، الموظفين، الجهات، الأولويات، الأصناف) -> تدعم الإضافة الحقيقية
    return true;
  }

  // 5. تبويب الرئيسية والوحدات التشغيلية (home)
  if (state.activeTab === 'home') {
    // المستوى 1 (شبكة الوحدات التشغيلية الـ 12) -> لا توجد إضافة
    if (state.navLevel === 1) {
      return false;
    }

    // المستوى 2 (استعراض وتحديد الأقسام والتفريعات) -> لا توجد إضافة
    if (state.navLevel === 2) {
      return false;
    }

    // المستوى 3 (السجلات التشغيلية داخل القسم الفرعي)
    if (state.navLevel === 3) {
      const sub = getSubSection();
      if (!sub) return false;

      // الخزانات التفاعلية (المخزون والصرف، التوريد، المياه) -> التوريد والصرف يتم عبر أزرار كل خزان مباشرة
      if (sub.isInteractiveTanks) {
        return false;
      }

      // إذا كان القسم يحتوي على تصنيفات فرعية ثلاثية المستويات وكان في شاشة اختيار الأيقونة
      if (sub.hasChildSubIcons && state.activeChildSubCode === 'الكل') {
        return false;
      }

      // إذا كانت مجموعة فرعية منتقاة وما زال يختار من أيقوناتها (مثل اختيار فترة الصيانة الوقائية)
      const activeGroup = sub.hasChildSubIcons 
        ? (sub.childSubOptions || []).find(o => o.isGroup && o.code === state.activeChildSubCode) 
        : null;
      if (activeGroup) {
        return false;
      }

      // باقي الأقسام الفرعية التشغيلية التي تحتوي على نماذج وسجلات حقيقية -> إظهار زر الإضافة
      return true;
    }
  }

  return false;
}

/**
 * معالج النقر على زر الإضافة العائم الدائري حسب الصفحة والشاشة الحالية
 */
function handleGlobalFabClick() {
  if (!shouldShowAddButton()) return;

  // 1. إذا كان المستخدم في تبويب الجولات والتذاكر -> إضافة تذكرة فحص جديدة
  if (state.activeTab === 'tours_hub') {
    if (typeof openNewInspectionSheet === 'function') {
      openNewInspectionSheet();
    }
    return;
  }

  // 2. إذا كان المستخدم في محرر الماستر داتا (الأقسام، الأنظمة، المواقع، الموظفين، الجهات، الأولويات، الأصناف)
  if (state.activeTab === 'more' && state.masterEditorCat && state.masterEditorCat !== 'tanksConfig') {
    if (typeof openMasterAddModal === 'function') {
      openMasterAddModal(state.masterEditorCat);
    }
    return;
  }

  // 3. إذا كان في مستوى استعراض السجلات التشغيلية (Level 3)
  if (state.activeTab === 'home' && state.navLevel === 3) {
    const mod = getModule();
    const sub = getSubSection();
    if (!sub || sub.isInteractiveTanks) return;

    if (sub.id === 'sub_attendance') {
      const targetShift = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') 
        ? state.activeChildSubCode 
        : 'وردية A';
      if (typeof openBulkShiftModal === 'function') {
        openBulkShiftModal(targetShift);
      }
      return;
    }

    if (typeof openAddModal === 'function') {
      openAddModal(mod.id, sub.id);
    }
    return;
  }
}

/**
 * نافذة الإجراءات السريعة للإضافة (متاحة كدالة مساعدة)
 */
function openQuickAddSheet() {
  const actions = [
    {
      title: 'إضافة بلاغ تشغيلي يومي',
      desc: 'تسجيل بلاغ صيانة أو عطل فوري في المطار',
      icon: '⚡',
      badge: 'بلاغ جديد',
      onClick: "closeBottomSheet(); openAddModal('mod_work_control', 'sub_daily_reports');"
    },
    {
      title: 'تسجيل تذكرة جولة ميدانية',
      desc: 'إضافة ملاحظة فحص مع صورة قبل/بعد الصيانة',
      icon: '🔍',
      badge: 'جولة تفتيش',
      onClick: "closeBottomSheet(); openNewInspectionSheet();"
    },
    {
      title: 'تسجيل توريد وقود خزان',
      desc: 'إضافة كمية ديزل جديدة وتحديث رصيد المحروقات',
      icon: '⛽',
      badge: 'محروقات',
      onClick: "closeBottomSheet(); openTankSheet('tank_diesel_main', 'supply');"
    },
    {
      title: 'إضافة أمر عمل صيانة تصحيحية',
      desc: 'إصدار أمر عمل معتمد ومتابع مع المقاول',
      icon: '📋',
      badge: 'أمر عمل',
      onClick: "closeBottomSheet(); openAddModal('mod_work_control', 'sub_cm_orders');"
    }
  ];

  const html = `
    <div class="space-y-3">
      <p class="text-xs text-[#6b7280] font-medium leading-relaxed">
        اختر نوع الإجراء السريع لإضافة سجل جديد مباشرة:
      </p>
      <div class="grid grid-cols-1 gap-2.5">
        ${actions.map(act => `
          <button type="button" onclick="${act.onClick}"
            class="w-full text-right p-3 rounded-2xl bg-white hover:bg-[#faf7f5] border border-[#ede7e2] hover:border-[#db6b49] transition flex items-center justify-between gap-3 shadow-2xs group active:scale-[0.99]">
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-10 h-10 rounded-xl bg-[#fdece6] text-[#db6b49] text-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                ${act.icon}
              </span>
              <div class="min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-extrabold text-xs text-[#111827]">${act.title}</span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#f3ece6] text-[#4b5563]">${act.badge}</span>
                </div>
                <p class="text-[11px] text-[#6b7280] truncate">${act.desc}</p>
              </div>
            </div>
            <span class="text-[#db6b49] text-sm font-black shrink-0">←</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  openBottomSheet('إضافة جديد • إجراء سريع', html);
}

/**
 * تحديث ظهور الزر العائم ونصه التوضيحي حسب الشاشة المعروضة فقط إذا كانت تدعم إضافة حقيقية
 */
function updateFabVisibility() {
  const fab = document.getElementById('globalFabBtn');
  if (!fab) return;

  const show = shouldShowAddButton();
  if (!show) {
    fab.classList.add('hidden');
    return;
  }

  // إظهار الزر العائم فقط في الصفحات التي بها إضافة حقيقية
  fab.classList.remove('hidden');

  // تحديث التلميح المناسب حسب الصفحة والشاشة
  if (state.activeTab === 'tours_hub') {
    fab.setAttribute('title', 'إضافة تذكرة جولة جديدة');
    fab.setAttribute('aria-label', 'إضافة تذكرة جولة جديدة');
  } else if (state.activeTab === 'more' && state.masterEditorCat) {
    const catTitles = {
      departments: 'قسم فني جديد',
      systems: 'نظام فني جديد',
      locations: 'موقع جديد',
      employees: 'موظف جديد',
      entities: 'جهة مُبلّغة جديدة',
      priorities: 'أولوية جديدة',
      catalog: 'صنف / أصل جديد'
    };
    const title = catTitles[state.masterEditorCat] ? `إضافة ${catTitles[state.masterEditorCat]}` : 'إضافة عنصر ماستر داتا';
    fab.setAttribute('title', title);
    fab.setAttribute('aria-label', title);
  } else if (state.activeTab === 'home' && state.navLevel === 3) {
    const sub = getSubSection();
    if (sub && sub.id === 'sub_attendance') {
      const shiftName = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل')
        ? ` (${state.activeChildSubCode})`
        : '';
      fab.setAttribute('title', `تحديد موظفي الوردية${shiftName}`);
      fab.setAttribute('aria-label', `تحديد موظفي الوردية${shiftName}`);
    } else {
      const title = sub ? `إضافة سجل جديد في ${sub.shortTitle}` : 'إضافة جديد';
      fab.setAttribute('title', title);
      fab.setAttribute('aria-label', title);
    }
  } else {
    fab.setAttribute('title', 'إضافة جديد');
    fab.setAttribute('aria-label', 'إضافة جديد');
  }
}

window.shouldShowAddButton = shouldShowAddButton;
window.handleGlobalFabClick = handleGlobalFabClick;
window.openQuickAddSheet = openQuickAddSheet;
window.updateFabVisibility = updateFabVisibility;
