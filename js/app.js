// MAIN APP RENDERER
// ============================================================================
function renderApp() {
  renderSubHeader();
  renderBreadcrumbs();

  document.querySelectorAll('#bottomNav .nav-btn').forEach(btn => {
    const tab = btn.getAttribute('data-tab');
    const isActive = state.activeTab === tab;
    btn.className = isActive
      ? 'nav-btn flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[11px] font-bold transition text-[#db6b49]'
      : 'nav-btn flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[11px] font-medium transition text-[#64748b] hover:text-[#1f2937]';
  });

  const container = document.getElementById('viewContainer');
  if (state.activeTab === 'tours_hub') {
    container.innerHTML = renderInspectionToursHubView();
  } else if (state.activeTab === 'tanks_dash') {
    container.innerHTML = renderTanksQuickTab();
  } else if (state.activeTab === 'more') {
    container.innerHTML = renderMoreSettingsTab();
  } else {
    if (state.navLevel === 1) {
      container.innerHTML = renderHomeScreen();
    } else if (state.navLevel === 2) {
      container.innerHTML = renderModuleSubSections();
    } else if (state.navLevel === 3) {
      container.innerHTML = renderSubSectionRecords();
    } else {
      container.innerHTML = renderRecordDetailsView();
    }
  }

  bindDetailFormEvents();
  document.getElementById('mainScrollArea').scrollTop = 0;
}

function bindDetailFormEvents() {
  const form = document.getElementById('recordDetailForm');
  if (!form) return;
  const sub = getSubSection();

  form.addEventListener('input', () => {
    if (sub.isAutoStock) {
      const prev = parseFloat(form.querySelector('[name="prevQty"]')?.value || '0');
      const inc = parseFloat(form.querySelector('[name="incomingQty"]')?.value || '0');
      const iss = parseFloat(form.querySelector('[name="issuedQty"]')?.value || '0');
      const availEl = document.getElementById('calcField_availableQty');
      if (availEl) availEl.value = prev + inc - iss;
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = {};
    for (const [k, v] of fd.entries()) obj[k] = v;

    if (sub.isAutoStock) {
      obj.prevQty = parseFloat(obj.prevQty || '0');
      obj.incomingQty = parseFloat(obj.incomingQty || '0');
      obj.issuedQty = parseFloat(obj.issuedQty || '0');
      obj.availableQty = obj.prevQty + obj.incomingQty - obj.issuedQty;
    }

    const idx = sub.records.findIndex(r => r.id === state.selectedRecordId);
    if (idx !== -1) {
      obj.id = sub.records[idx].id;
      sub.records[idx] = obj;
    }
    showToast('تم حفظ التعديلات بنجاح');
    openSubSection(state.selectedModuleId, state.selectedSubId, state.activeChildSubCode);
  };
}

document.getElementById('bottomSheetBackdrop').addEventListener('click', (e) => {
  if (e.target.id === 'bottomSheetBackdrop') closeBottomSheet();
});

window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
