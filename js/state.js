// APPLICATION STATE
// ============================================================================
const state = {
  activeTab: 'home',         // 'home' | 'tours_hub' | 'tanks_dash' | 'more'
  navLevel: 1,               // 1: Home Main Icons, 2: Module Sub-Icons / Inspection Hub, 3: Records List / Dept Tickets, 4: Record/Ticket Details
  selectedModuleId: 'mod_work_control',
  selectedSubId: 'sub_daily_reports',
  activeChildSubCode: 'الكل', // For 3rd-level branches (e.g. 9 PDF reports, Shifts A/B/C, Sewage Cars 1-4, Outage Services, Fuel Stations, or Dept Filter)
  activeDeptSubCode: 'الكل',  // For department filtering when subsection already has child sub icons
  activeFilterPill: 'الكل',
  selectedRecordId: null,
  isCreatingNew: false,
  extraStatsOpen: false,
  ticketFilterDept: 'الكل',
  ticketSearchQuery: '',
  viewingTicketsListInHub: false, // Inside Inspection Hub: false = show Ticket Stats + 12 Depts Grid; true = show filtered Tickets List
  toursOriginModuleId: null,      // Tracks if Tours Hub was opened from inside Work Control
  masterEditorCat: null
};

function getModule() {
  return SYSTEM_MODULES.find(m => m.id === state.selectedModuleId) || SYSTEM_MODULES[0];
}

function getSubSection() {
  const mod = getModule();
  return mod.subSections.find(s => s.id === state.selectedSubId) || mod.subSections[0];
}

function showToast(msg, icon = '✅') {
  const box = document.getElementById('toastBox');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = msg;
  box.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => box.classList.add('hidden'), 2600);
}

const uxState = {
  bulkShift: 'وردية A',
  bulkDate: '2026-10-19',
  bulkSearch: '',
  bulkSelectedEmpIds: new Set(['EMP-101', 'EMP-102', 'EMP-107'])
};
