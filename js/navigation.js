// NAVIGATION CONTROLLER
// ============================================================================
function goHome() {
  state.activeTab = 'home';
  state.navLevel = 1;
  state.masterEditorCat = null;
  state.viewingTicketsListInHub = false;
  state.toursOriginModuleId = null;
  renderApp();
}

function switchTab(tabName) {
  state.activeTab = tabName;
  if (tabName === 'more') state.masterEditorCat = null;
  if (tabName === 'tours_hub') {
    state.toursOriginModuleId = null;
    state.viewingTicketsListInHub = false;
    state.navLevel = 2;
  }
  renderApp();
}

function openInspectionHubRoot() {
  state.selectedModuleId = 'mod_inspection_tours';
  state.activeTab = 'tours_hub';
  state.viewingTicketsListInHub = false;
  state.navLevel = 2;
  renderApp();
}

function openModule(modId) {
  const prevModId = state.selectedModuleId;
  const wasInWorkControl = (state.activeTab === 'home' && prevModId === 'mod_work_control' && state.navLevel >= 2);
  state.selectedModuleId = modId;
  state.activeChildSubCode = 'الكل';
  state.activeFilterPill = 'الكل';
  state.viewingTicketsListInHub = false;

  if (modId === 'mod_inspection_tours') {
    state.toursOriginModuleId = wasInWorkControl ? 'mod_work_control' : null;
    state.activeTab = 'tours_hub';
    state.navLevel = 2;
    renderApp();
    return;
  }

  state.toursOriginModuleId = null;
  state.activeTab = 'home';
  const mod = getModule();
  if (mod.subSections && mod.subSections.length > 0) {
    state.selectedSubId = mod.subSections[0].id;
  }
  if (mod.subSections.length === 1 && !mod.showTicketsAndDeptsInside) {
    state.navLevel = 3;
  } else {
    state.navLevel = 2;
  }
  renderApp();
}

function openSubSection(modId, subId, childCode = 'الكل') {
  const mod = SYSTEM_MODULES.find(m => m.id === modId);
  const sub = mod?.subSections.find(s => s.id === subId);
  if (sub && sub.isInspectionHubLink) {
    state.toursOriginModuleId = modId;
    state.selectedModuleId = 'mod_inspection_tours';
    state.activeTab = 'tours_hub';
    state.viewingTicketsListInHub = false;
    state.navLevel = 2;
    renderApp();
    return;
  }
  state.activeTab = 'home';
  state.selectedModuleId = modId;
  state.selectedSubId = subId;
  state.activeChildSubCode = childCode;
  state.activeDeptSubCode = 'الكل';
  state.activeFilterPill = 'الكل';
  state.navLevel = 3;
  renderApp();
}

function openDeptTickets(deptCode) {
  if (state.activeTab === 'home' && state.selectedModuleId === 'mod_work_control') {
    state.toursOriginModuleId = 'mod_work_control';
  }
  state.ticketFilterDept = deptCode;
  state.viewingTicketsListInHub = true;
  state.selectedModuleId = 'mod_inspection_tours';
  state.activeTab = 'tours_hub';
  state.navLevel = 3;
  renderApp();
}

function openTicketRecordDetails(tktId) {
  state.selectedRecordId = tktId;
  state.selectedModuleId = 'mod_inspection_tours';
  state.activeTab = 'tours_hub';
  state.navLevel = 4;
  renderApp();
}

function openRecordDetails(recId, isNew = false) {
  state.activeTab = 'home';
  state.selectedRecordId = recId;
  state.isCreatingNew = isNew;
  state.navLevel = 4;
  renderApp();
}

function openMasterCategory(catId) {
  state.activeTab = 'more';
  state.masterEditorCat = catId;
  renderApp();
}

// HEADER & BOTTOM NAV VISIBILITY CONTROLLER (خيار واحد فقط لكل عملية في الهيدر)
// ============================================================================
function renderSubHeader() {
  const brandHeader = document.getElementById('mainBrandHeader');
  const bar = document.getElementById('subHeaderBar');
  const peach = document.getElementById('peachBanner');
  const bottomNav = document.getElementById('bottomNav');
  const mainScroll = document.getElementById('mainScrollArea');

  // Sub-screen header (shows subHeaderBar with back button instead of brandHeader + peachBanner)
  const isSubScreen =
    (state.activeTab === 'home' && state.navLevel > 1) ||
    (state.activeTab === 'tours_hub' && (state.navLevel > 2 || state.viewingTicketsListInHub)) ||
    (state.activeTab === 'more' && Boolean(state.masterEditorCat));

  // Bottom Navigation visibility:
  // Never hide bottomNav when in tours_hub tab, because tours_hub is a main tab in the app!
  const shouldHideBottomNav =
    (state.activeTab === 'home' && state.navLevel > 1) ||
    (state.activeTab === 'more' && Boolean(state.masterEditorCat));

  if (shouldHideBottomNav) {
    bottomNav.classList.add('hidden');
    mainScroll.classList.remove('pb-20');
    mainScroll.classList.add('pb-10');
  } else {
    bottomNav.classList.remove('hidden');
    mainScroll.classList.remove('pb-10');
    mainScroll.classList.add('pb-20');
  }

  if (isSubScreen) {
    brandHeader.classList.add('hidden');
    peach.classList.add('hidden');
    bar.classList.remove('hidden');
  } else {
    brandHeader.classList.remove('hidden');
    if (state.activeTab === 'tours_hub') {
      peach.textContent = 'قسم الجولات الميدانية والتذاكر • مطار حائل الدولي';
    } else if (state.activeTab === 'tanks_dash') {
      peach.textContent = 'مراقبة أرصدة وسعات الخزانات (الوقود والمياه)';
    } else if (state.activeTab === 'more') {
      peach.textContent = 'إعدادات النظام والبيانات الأساسية والصلاحيات';
    } else {
      peach.textContent = 'نظام إدارة وتشغيل وصيانة مطار حائل الدولي';
    }
    peach.classList.remove('hidden');
    bar.classList.add('hidden');
    return;
  }

  const backIconSvg = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  `;

  // Case 1: Inside Inspection Tours & Tickets Hub (قسم الجولات)
  if (state.activeTab === 'tours_hub') {
    if (state.navLevel === 2 && !state.viewingTicketsListInHub) {
      const backToOrigin = state.toursOriginModuleId === 'mod_work_control'
        ? "openModule('mod_work_control')"
        : "goHome()";
      bar.innerHTML = `
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <button type="button" onclick="${backToOrigin}" class="w-8 h-8 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] text-[#111827] flex items-center justify-center shrink-0 active:scale-95 transition" title="رجوع">
            ${backIconSvg}
          </button>
          <h2 class="font-extrabold text-xs sm:text-sm text-[#111827] truncate">قسم الجولات والأقسام</h2>
        </div>
        <button type="button" onclick="openNewInspectionSheet()" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
          <span>+ تذكرة جديدة</span>
        </button>
      `;
    } else if (state.navLevel === 3 || state.viewingTicketsListInHub) {
      bar.innerHTML = `
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <button type="button" onclick="state.viewingTicketsListInHub=false; state.navLevel=2; renderApp();" class="w-8 h-8 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] text-[#111827] flex items-center justify-center shrink-0 active:scale-95 transition" title="رجوع">
            ${backIconSvg}
          </button>
          <h2 class="font-extrabold text-xs sm:text-sm text-[#111827] truncate">التذاكر (${state.ticketFilterDept})</h2>
        </div>
        <button type="button" onclick="openNewInspectionSheet()" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
          <span>+ تذكرة جديدة</span>
        </button>
      `;
    } else if (state.navLevel === 4) {
      bar.innerHTML = `
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <button type="button" onclick="state.viewingTicketsListInHub=true; state.navLevel=3; renderApp();" class="w-8 h-8 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] text-[#111827] flex items-center justify-center shrink-0 active:scale-95 transition" title="رجوع">
            ${backIconSvg}
          </button>
          <h2 class="font-extrabold text-xs sm:text-sm text-[#111827] truncate">تفاصيل التذكرة</h2>
        </div>
      `;
    }
    return;
  }

  // Case 2: Inside a Home Module
  if (state.activeTab === 'home' && state.navLevel > 1) {
    const mod = getModule();
    const sub = getSubSection();
    const pmGroup = (sub?.hasChildSubIcons) ? (sub.childSubOptions || []).find(o => o.isGroup && (o.code === state.activeChildSubCode || (o.children || []).some(ch => ch.code === state.activeChildSubCode) || state.activeChildSubCode === 'عرض كل الصيانة الوقائية')) : null;

    let titleText = mod.shortTitle;
    if (state.navLevel === 2) {
      titleText = mod.shortTitle;
    } else if (state.navLevel === 3) {
      if (state.activeChildSubCode === 'الكل' || state.activeChildSubCode === 'عرض الكل') {
        titleText = sub.shortTitle;
      } else if (pmGroup && state.activeChildSubCode === pmGroup.code) {
        titleText = `${sub.shortTitle} • الصيانة الوقائية`;
      } else if (pmGroup && state.activeChildSubCode === 'عرض كل الصيانة الوقائية') {
        titleText = `${sub.shortTitle} • كل الصيانة الوقائية`;
      } else {
        const childOpt = pmGroup
          ? (pmGroup.children || []).find(ch => ch.code === state.activeChildSubCode)
          : (sub.childSubOptions || []).find(o => o.code === state.activeChildSubCode);
        titleText = `${sub.shortTitle} • ${childOpt ? childOpt.title : state.activeChildSubCode}`;
      }
    } else {
      titleText = 'تفاصيل السجل';
    }

    let backAction = 'goHome()';
    if (state.navLevel === 4) {
      backAction = `openSubSection('${mod.id}', '${sub.id}', '${state.activeChildSubCode}')`;
    } else if (state.navLevel === 3) {
      if (pmGroup && state.activeChildSubCode !== pmGroup.code && state.activeChildSubCode !== 'الكل') {
        backAction = `state.activeChildSubCode='${pmGroup.code}'; renderApp();`;
      } else if (state.activeChildSubCode !== 'الكل') {
        backAction = `openSubSection('${mod.id}', '${sub.id}', 'الكل')`;
      } else if (mod.subSections.length > 1) {
        backAction = `openModule('${mod.id}')`;
      }
    }

    // Single Action Button in Header when on Level 3 (No duplicate buttons!)
    let rightActionHtml = `
      <button type="button" onclick="openHelpSheet('${state.navLevel === 2 ? 'module' : 'subSection'}', '${mod.id}', '${sub?.id || ''}')" class="w-7 h-7 rounded-full bg-[#fdece6] text-[#db6b49] text-xs font-extrabold flex items-center justify-center shrink-0">؟</button>
    `;

    if (state.navLevel === 3 && sub && !sub.isInteractiveTanks) {
      if (sub.id === 'sub_attendance') {
        const targetShift = (state.activeChildSubCode !== 'الكل' && state.activeChildSubCode !== 'عرض الكل') ? state.activeChildSubCode : 'وردية A';
        rightActionHtml = `
          <button type="button" onclick="openBulkShiftModal('${targetShift}')" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
            <span>+ تحديد موظفي الوردية</span>
          </button>
        `;
      } else {
        rightActionHtml = `
          <button type="button" onclick="openAddModal('${mod.id}', '${sub.id}')" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
            <span>+ إضافة</span>
          </button>
        `;
      }
    }

    bar.innerHTML = `
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <button type="button" onclick="${backAction}" class="w-8 h-8 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] text-[#111827] flex items-center justify-center shrink-0 active:scale-95 transition" title="رجوع">
          ${backIconSvg}
        </button>
        <h2 class="font-extrabold text-xs sm:text-sm text-[#111827] truncate">${titleText}</h2>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        ${rightActionHtml}
      </div>
    `;
    return;
  }

  // Case 3: Inside Master Data Editor
  if (state.activeTab === 'more' && state.masterEditorCat) {
    const catTitles = {
      departments: 'الأقسام الفنية',
      systems: 'الأنظمة الفنية',
      locations: 'المواقع والمرافق',
      employees: 'الموظفين والورديات',
      entities: 'الجهات المبلغة',
      priorities: 'أولويات أوامر العمل',
      tanksConfig: 'سعات الخزانات',
      catalog: 'الأصناف والأصول والمقاولين'
    };
    bar.innerHTML = `
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <button type="button" onclick="state.masterEditorCat=null; renderApp();" class="w-8 h-8 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] text-[#111827] flex items-center justify-center shrink-0 active:scale-95 transition" title="رجوع">
          ${backIconSvg}
        </button>
        <h2 class="font-extrabold text-xs sm:text-sm text-[#111827] truncate">${catTitles[state.masterEditorCat] || 'البيانات الأساسية'}</h2>
      </div>
      ${state.masterEditorCat !== 'tanksConfig' ? `
        <button type="button" onclick="openMasterAddModal('${state.masterEditorCat}')" class="px-3 py-1.5 rounded-xl bg-[#db6b49] hover:bg-[#c65635] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs shrink-0">
          <span>+ إضافة</span>
        </button>
      ` : ''}
    `;
    return;
  }
}

// ============================================================================

// INTERACTIVE BREADCRUMBS GENERATOR & RENDERER (شريط المسار للتنقل بين التفريعات)
// ============================================================================
function getBreadcrumbsTrail() {
  const crumbs = [
    { label: 'الرئيسية', action: 'goHome()' }
  ];

  if (state.activeTab === 'tours_hub') {
    if (state.toursOriginModuleId === 'mod_work_control') {
      crumbs.push({ label: 'محطة العمل', action: "openModule('mod_work_control')" });
    }
    crumbs.push({ label: 'قسم الجولات', action: 'openInspectionHubRoot()' });

    if (state.navLevel >= 3 || state.viewingTicketsListInHub) {
      const deptLabel = state.ticketFilterDept === 'الكل' ? 'جميع التذاكر' : `تذاكر (${state.ticketFilterDept})`;
      crumbs.push({ label: deptLabel, action: `openDeptTickets('${state.ticketFilterDept}')` });
    }

    if (state.navLevel === 4) {
      const tkt = INSPECTION_TICKETS.find(r => r.id === state.selectedRecordId) || INSPECTION_TICKETS[0];
      crumbs.push({ label: tkt ? `تذكرة #${tkt.cmNumber || tkt.id}` : 'تفاصيل التذكرة', action: '' });
    }
    return crumbs;
  }

  if (state.activeTab === 'tanks_dash') {
    crumbs.push({ label: 'الخزانات', action: "switchTab('tanks_dash')" });
    return crumbs;
  }

  if (state.activeTab === 'more') {
    crumbs.push({ label: 'المزيد', action: "switchTab('more')" });
    if (state.masterEditorCat) {
      const catMap = {
        departments: 'الأقسام الفنية',
        systems: 'الأنظمة الفنية',
        locations: 'المواقع والمرافق',
        employees: 'الموظفين والورديات',
        tanksConfig: 'سعات الخزانات',
        catalog: 'الأصناف والأصول والمقاولين'
      };
      crumbs.push({ label: catMap[state.masterEditorCat] || 'البيانات الأساسية', action: '' });
    }
    return crumbs;
  }

  if (state.activeTab === 'home') {
    if (state.navLevel === 1) return crumbs;
    const mod = getModule();
    const sub = getSubSection();

    crumbs.push({ label: mod.shortTitle, action: `openModule('${mod.id}')` });

    if (state.navLevel >= 3 && sub) {
      const hasMultipleSubs = (mod.subSections && mod.subSections.length > 1) || (sub.shortTitle !== mod.shortTitle);
      if (hasMultipleSubs) {
        crumbs.push({ label: sub.shortTitle, action: `openSubSection('${mod.id}', '${sub.id}', 'الكل')` });
      } else {
        crumbs[crumbs.length - 1].action = `openSubSection('${mod.id}', '${sub.id}', 'الكل')`;
      }

      if (sub.hasChildSubIcons && state.activeChildSubCode !== 'الكل') {
        const pmGroup = (sub.childSubOptions || []).find(o => o.isGroup && (o.code === state.activeChildSubCode || (o.children || []).some(ch => ch.code === state.activeChildSubCode) || state.activeChildSubCode === 'عرض كل الصيانة الوقائية'));
        if (pmGroup) {
          crumbs.push({
            label: 'الصيانة الوقائية',
            action: `state.activeChildSubCode='${pmGroup.code}'; renderApp();`
          });
          if (state.activeChildSubCode !== pmGroup.code) {
            const childOpt = (pmGroup.children || []).find(ch => ch.code === state.activeChildSubCode);
            crumbs.push({
              label: childOpt ? childOpt.title : (state.activeChildSubCode === 'عرض كل الصيانة الوقائية' ? 'كل الصيانة' : state.activeChildSubCode),
              action: `openSubSection('${mod.id}', '${sub.id}', '${state.activeChildSubCode}')`
            });
          }
        } else {
          const childOpt = (sub.childSubOptions || []).find(o => o.code === state.activeChildSubCode);
          crumbs.push({
            label: childOpt ? childOpt.title : state.activeChildSubCode,
            action: `openSubSection('${mod.id}', '${sub.id}', '${state.activeChildSubCode}')`
          });
        }
      } else if (sub.branchByDept && state.activeChildSubCode !== 'الكل') {
        crumbs.push({
          label: state.activeChildSubCode,
          action: `openSubSection('${mod.id}', '${sub.id}', '${state.activeChildSubCode}')`
        });
      }
    }

    if (state.navLevel === 4 && sub) {
      const rec = (sub.records || []).find(r => r.id === state.selectedRecordId);
      const recTitle = rec ? (rec.woNo || rec.sprNo || rec.mrfNo || rec.orderNo || rec.reporterName || rec.reportTitle || rec.employee || rec.assetName || rec.equipmentName || rec.vehicleNo || rec.serviceType || rec.contractorName || rec.vacancyTitle || rec.itemName || rec.id) : 'تفاصيل السجل';
      crumbs.push({ label: recTitle, action: '' });
    }
  }

  return crumbs;
}

function renderBreadcrumbs() {
  const navEl = document.getElementById('breadcrumbBar');
  if (!navEl) return;

  if (state.activeTab === 'home' && state.navLevel === 1) {
    navEl.classList.add('hidden');
    navEl.innerHTML = '';
    return;
  }
  navEl.classList.remove('hidden');

  const crumbs = getBreadcrumbsTrail();
  navEl.innerHTML = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1;
    if (isLast) {
      return `<span class="fit-tab shrink-0 text-[#db6b49] font-extrabold whitespace-nowrap">${crumb.label}</span>`;
    }
    return `
      <button type="button" onclick="${crumb.action}" class="fit-tab shrink-0 text-[#6b7280] hover:text-[#db6b49] font-semibold whitespace-nowrap transition cursor-pointer bg-transparent border-0 p-0">
        ${crumb.label}
      </button>
      <span class="shrink-0 text-[#9ca3af] font-bold text-xs px-1 select-none">←</span>
    `;
  }).join('');
}

// ============================================================================
