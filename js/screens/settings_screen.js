// ============================================================================
// HAS MAG IFMT - SETTINGS & MASTER DATA SCREEN (شاشة الإعدادات وإدارة الماستر داتا)
// Flutter Equivalent: lib/presentation/screens/settings/settings_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/settings/settings_screen.dart
 * TAB 4: شاشة الإعدادات، الصلاحيات، واستعراض فئات الماستر داتا الـ 8
 */
function renderMoreSettingsTab() {
  if (state.masterEditorCat) {
    return renderMasterDataEditor(state.masterEditorCat);
  }

  const masterLinks = [
    { id: 'departments', icon: '📁', title: 'الأقسام الفنية', count: MASTER_DATA.departments.length },
    { id: 'systems', icon: '⚙️', title: 'الأنظمة الفنية', count: MASTER_DATA.systems.length },
    { id: 'locations', icon: '📍', title: 'المواقع والمرافق', count: MASTER_DATA.locations.length },
    { id: 'employees', icon: '👥', title: 'الموظفين والورديات', count: MASTER_DATA.employees.length },
    { id: 'entities', icon: '🏢', title: 'الجهات المبلغة', count: MASTER_DATA.entities.length },
    { id: 'priorities', icon: '⚡', title: 'أولويات أوامر العمل', count: MASTER_DATA.priorities.length },
    { id: 'tanksConfig', icon: '🛢️', title: 'سعات الخزانات', count: MASTER_DATA.tanksConfig.length },
    { id: 'catalog', icon: '📦', title: 'الأصناف والأصول والمقاولين', count: MASTER_DATA.catalog.length }
  ];

  return `
    <div class="p-3.5 space-y-3.5 fade-in text-xs">
      <!-- 1. User Profile & Permissions -->
      <div class="bg-white rounded-2xl border border-[#ede7e2] p-4 shadow-2xs flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-[#fdece6] text-[#db6b49] flex items-center justify-center font-extrabold text-sm shrink-0">م</div>
          <div>
            <div class="font-extrabold text-sm text-[#111827]">مدير النظام</div>
            <div class="text-[11px] text-[#00a63e] font-bold">وضع المدير (كامل الصلاحيات)</div>
          </div>
        </div>
        <button type="button" onclick="openRbacModal()" class="px-3 py-1.5 rounded-xl bg-[#f3ece6] hover:bg-[#e5dfd9] text-[#374151] text-[11px] font-extrabold transition">
          الصلاحيات
        </button>
      </div>

      <!-- 2. Master Data List (طريق واحد واضح لكل إعداد) -->
      <div class="bg-white rounded-2xl border border-[#ede7e2] p-4 shadow-2xs space-y-2">
        <div class="font-extrabold text-sm text-[#111827] pb-1">البيانات الأساسية للنظام (Master Data)</div>
        <div class="space-y-1.5">
          ${masterLinks.map(item => `
            <button type="button" onclick="openMasterCategory('${item.id}')" class="w-full py-2.5 px-3 rounded-xl bg-[#faf7f5] hover:bg-[#f3ece6] border border-[#e5dfd9] flex items-center justify-between font-bold text-[#1f2937] transition">
              <span class="flex items-center gap-2">
                <span>${item.icon}</span>
                <span>${item.title} (${item.count})</span>
              </span>
              <span class="text-[#9ca3af]">←</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Flutter Screen Equivalent: lib/presentation/screens/settings/master_editor_screen.dart
 * شاشة محرر قائمة الماستر داتا مع شريط بحث حي وزر إضافة وحذف
 */
function renderMasterDataEditor(cat) {
  const q = (state.masterSearchQuery || '').toLowerCase().trim();
  const searchBar = `
    <div class="mb-2">
      <input type="text" value="${state.masterSearchQuery || ''}" oninput="state.masterSearchQuery=this.value; renderApp();" placeholder="بحث سريع في العناصر..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-[#ede7e2] text-xs font-semibold focus:outline-none focus:border-[#db6b49]" />
    </div>
  `;

  if (cat === 'tanksConfig') {
    return `
      <div class="p-3.5 space-y-2.5 fade-in text-xs">
        ${MASTER_DATA.tanksConfig.map((t, idx) => `
          <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-[#111827]">${t.name}</span>
              <button type="button" onclick="toggleTankLock(${idx})" class="px-2.5 py-1 rounded-lg text-[10px] font-bold ${t.locked ? 'bg-[#47525e] text-white' : 'bg-[#00a63e] text-white'}">
                ${t.locked ? '🔒 السعة مقفلة' : '🔓 السعة قابلة للتعديل'}
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <span class="text-[10px] text-[#6b7280] block">السعة الثابتة (لتر)</span>
                <input type="number" value="${t.capacity}" ${t.locked ? 'readonly' : ''} onchange="MASTER_DATA.tanksConfig[${idx}].capacity=parseFloat(this.value||0); showToast('تم التحديث');" class="w-full px-2.5 py-1.5 rounded-xl border ${t.locked ? 'bg-[#f3ece6]' : 'bg-white border-[#db6b49]'} font-bold" />
              </div>
              <div>
                <span class="text-[10px] text-[#6b7280] block">الرصيد المتوفر (لتر)</span>
                <input type="number" value="${t.currentLiters}" onchange="MASTER_DATA.tanksConfig[${idx}].currentLiters=parseFloat(this.value||0); showToast('تم التحديث');" class="w-full px-2.5 py-1.5 rounded-xl border border-[#dfd8d0] bg-[#faf7f5] font-bold text-[#00a63e]" />
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  const configs = {
    departments: {
      label: 'الأقسام',
      total: MASTER_DATA.departments.length,
      list: MASTER_DATA.departments.filter(d => !q || d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.manager.toLowerCase().includes(q)),
      render: d => `
        <div class="flex items-center gap-2.5">
          <img src="${d.icon}" class="w-7 h-7 object-contain" />
          <div>
            <div class="font-bold text-[#111827]">${d.name}</div>
            <div class="text-[10px] text-[#6b7280]">المسؤول / المشرف: ${d.manager}</div>
          </div>
        </div>
      `,
      delId: d => d.id
    },
    systems: {
      label: 'الأنظمة',
      total: MASTER_DATA.systems.length,
      list: MASTER_DATA.systems.filter(s => !q || s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q)),
      render: s => `
        <div>
          <div class="font-bold text-[#111827]">${s.name}</div>
          <div class="text-[10px] text-[#db6b49] font-semibold">${s.department}</div>
        </div>
      `,
      delId: s => s.id
    },
    locations: {
      label: 'المواقع',
      total: MASTER_DATA.locations.length,
      list: MASTER_DATA.locations.filter(l => !q || l.name.toLowerCase().includes(q) || (l.code && l.code.toLowerCase().includes(q))),
      render: l => `
        <div>
          <span class="font-bold text-[#111827] block">${l.name}</span>
          <span class="text-[10px] text-[#6b7280]">${l.type || 'مرفق تشغيلي'}${l.code ? ' • ' + l.code : ''}</span>
        </div>
      `,
      delId: l => l.id
    },
    employees: {
      label: 'الموظفين',
      total: MASTER_DATA.employees.length,
      list: MASTER_DATA.employees.filter(e => !q || e.name.toLowerCase().includes(q) || e.job.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)),
      render: e => `
        <div>
          <div class="font-bold text-[#111827]">${e.name} <span class="px-2 py-0.5 rounded-md bg-[#fdece6] text-[#db6b49] text-[10px] font-bold">${e.shift}</span></div>
          <div class="text-[10px] text-[#6b7280] mt-0.5">${e.job} • ${e.department}</div>
        </div>
      `,
      delId: e => e.id
    },
    entities: {
      label: 'الجهات',
      total: MASTER_DATA.entities.length,
      list: MASTER_DATA.entities.map((e, idx) => ({ e, originalIdx: idx })).filter(item => !q || item.e.toLowerCase().includes(q)),
      render: item => `
        <div class="font-bold text-[#111827] flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg bg-[#fdece6] text-[#db6b49] flex items-center justify-center font-bold text-xs">${item.originalIdx + 1}</span>
          <span>${item.e}</span>
        </div>
      `,
      delId: item => item.originalIdx
    },
    priorities: {
      label: 'الأولويات',
      total: MASTER_DATA.priorities.length,
      list: MASTER_DATA.priorities.map((p, idx) => ({ p, originalIdx: idx })).filter(item => !q || item.p.toLowerCase().includes(q)),
      render: item => `
        <div class="font-bold text-[#111827] flex items-center gap-2">
          ${renderPriorityBadge(item.p)}
          <span class="text-xs text-[#4b5563]">أولوية معتمدة SLA</span>
        </div>
      `,
      delId: item => item.originalIdx
    },
    catalog: {
      label: 'الأصناف',
      total: MASTER_DATA.catalog.length,
      list: MASTER_DATA.catalog.filter(c => !q || c.name.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)),
      render: c => `
        <div>
          <span class="text-[10px] text-[#db6b49] font-bold">${c.type}</span>
          <div class="font-bold text-[#111827]">${c.name}</div>
        </div>
      `,
      delId: c => c.id
    }
  };

  const cfg = configs[cat] || configs.departments;

  return `
    <div class="p-3.5 space-y-2 fade-in text-xs">
      ${searchBar}
      <div class="text-[11px] text-[#6b7280] font-bold px-1">عدد ${cfg.label}: ${cfg.list.length} من ${cfg.total}</div>
      ${cfg.list.map(item => `
        <div class="bg-white rounded-2xl p-3 border border-[#ede7e2] flex items-center justify-between">
          ${cfg.render(item)}
          <button type="button" onclick="deleteMasterItem('${cat}', '${cfg.delId(item)}')" class="text-red-600 font-bold text-[11px]">حذف</button>
        </div>
      `).join('')}
    </div>
  `;
}

window.renderMoreSettingsTab = renderMoreSettingsTab;
window.renderMasterDataEditor = renderMasterDataEditor;
