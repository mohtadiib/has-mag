// ============================================================================
// HAS MAG IFMT - GLOBAL FLOATING ACTION BUTTON (مكون زر الإضافة العائم الدائري FAB)
// Flutter Equivalent: lib/presentation/widgets/global_fab.dart
// ============================================================================

/**
 * معالج النقر على زر الإضافة العائم الدائري حسب الصفحة والشاشة الحالية
 */
function handleGlobalFabClick() {
  // 1. إذا كان المستخدم في تبويب الجولات والتذاكر
  if (state.activeTab === 'tours_hub') {
    if (typeof openNewInspectionSheet === 'function') {
      openNewInspectionSheet();
    }
    return;
  }

  // 2. إذا كان المستخدم في تبويب الخزانات والمحروقات
  if (state.activeTab === 'tanks_dash') {
    if (typeof openTankSheet === 'function') {
      openTankSheet('tank_diesel_main', 'supply');
    }
    return;
  }

  // 3. إذا كان المستخدم في تبويب الإعدادات والماستر داتا
  if (state.activeTab === 'more') {
    if (state.masterEditorCat) {
      if (state.masterEditorCat === 'tanksConfig') {
        showToast('سعات الخزانات تُعدل مباشرة من حقول البطاقات');
        return;
      }
      if (typeof openMasterAddModal === 'function') {
        openMasterAddModal(state.masterEditorCat);
      }
    } else {
      openQuickAddSheet();
    }
    return;
  }

  // 4. إذا كان في مستوى استعراض السجلات التشغيلية (Level 3)
  if (state.navLevel === 3) {
    const mod = getModule();
    const sub = getSubSection();
    if (!sub) return;

    if (sub.id === 'sub_attendance') {
      const targetShift = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') 
        ? state.activeChildSubCode 
        : 'وردية A';
      if (typeof openBulkShiftModal === 'function') {
        openBulkShiftModal(targetShift);
      }
      return;
    }

    if (sub.isInteractiveTanks) {
      if (typeof openTankSheet === 'function') {
        openTankSheet(state.tanksData?.[0]?.id || 'tank_diesel_main', 'supply');
      }
      return;
    }

    if (typeof openAddModal === 'function') {
      openAddModal(mod.id, sub.id);
    }
    return;
  }

  // 5. إذا كان في مستوى تفريعات الوحدة (Level 2)
  if (state.navLevel === 2) {
    const mod = getModule();
    if (mod && mod.subSections.length === 1) {
      openAddModal(mod.id, mod.subSections[0].id);
      return;
    }
    openQuickAddSheet();
    return;
  }

  // 6. شاشة الرئيسية (Level 1) - نافذة الإجراءات السريعة
  openQuickAddSheet();
}

/**
 * نافذة الإجراءات السريعة للإضافة عند النقر على الزر العائم في الصفحة الرئيسية
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
 * تحديث ظهور الزر العائم ونصه التوضيحي حسب الشاشة المعروضة
 */
function updateFabVisibility() {
  const fab = document.getElementById('globalFabBtn');
  if (!fab) return;

  // إخفاء الزر العائم عند عرض تفاصيل السجل وتعديله (Level 4) لتجنب التشتيت
  if (state.navLevel === 4) {
    fab.classList.add('hidden');
    return;
  }

  // إظهار الزر العائم في جميع الشاشات الأخرى
  fab.classList.remove('hidden');

  // تحديث التلميح المناسب
  if (state.activeTab === 'tours_hub') {
    fab.setAttribute('title', 'إضافة تذكرة جولة جديدة');
    fab.setAttribute('aria-label', 'إضافة تذكرة جولة جديدة');
  } else if (state.activeTab === 'tanks_dash') {
    fab.setAttribute('title', 'تسجيل توريد وقود خزان');
    fab.setAttribute('aria-label', 'تسجيل توريد وقود خزان');
  } else if (state.activeTab === 'more' && state.masterEditorCat) {
    fab.setAttribute('title', 'إضافة عنصر ماستر داتا');
    fab.setAttribute('aria-label', 'إضافة عنصر ماستر داتا');
  } else if (state.navLevel === 3) {
    const sub = getSubSection();
    if (sub && sub.id === 'sub_attendance') {
      fab.setAttribute('title', 'تحديد موظفي الوردية');
      fab.setAttribute('aria-label', 'تحديد موظفي الوردية');
    } else {
      fab.setAttribute('title', `إضافة سجل جديد في ${sub ? sub.shortTitle : ''}`);
      fab.setAttribute('aria-label', `إضافة سجل جديد في ${sub ? sub.shortTitle : ''}`);
    }
  } else {
    fab.setAttribute('title', 'إضافة جديد');
    fab.setAttribute('aria-label', 'إضافة جديد');
  }
}

window.handleGlobalFabClick = handleGlobalFabClick;
window.openQuickAddSheet = openQuickAddSheet;
window.updateFabVisibility = updateFabVisibility;
