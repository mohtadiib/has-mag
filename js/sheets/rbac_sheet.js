// ============================================================================
// HAS MAG IFMT - RBAC ROLES & PERMISSIONS SHEET (نافذة أدوار وصلاحيات النظام)
// Flutter Equivalent: lib/presentation/sheets/rbac_sheet.dart
// ============================================================================

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

window.openRbacModal = openRbacModal;
