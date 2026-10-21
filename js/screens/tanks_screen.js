// ============================================================================
// HAS MAG IFMT - TANKS DASHBOARD SCREEN (شاشة مناسيب الخزانات السريعة)
// Flutter Equivalent: lib/presentation/screens/tanks/tanks_dashboard_screen.dart
// ============================================================================

/**
 * Flutter Screen Equivalent: lib/presentation/screens/tanks/tanks_dashboard_screen.dart
 * TAB 3: شاشة مراقبة مناسيب خزانات الوقود والمياه مع مؤشرات بصرية ونسب مئوية
 */
function renderTanksQuickTab() {
  return `
    <div class="p-3.5 space-y-3 fade-in text-xs">
      <div class="flex items-center justify-between px-0.5">
        <h2 class="text-sm font-extrabold text-[#111827]">مناسيب خزانات الوقود والمياه</h2>
        <span class="text-[11px] text-[#6b7280]">${MASTER_DATA.tanksConfig.length} خزانات</span>
      </div>

      <div class="space-y-2.5">
        ${MASTER_DATA.tanksConfig.map(t => {
          const pct = Math.min(100, Math.round((t.currentLiters / t.capacity) * 100));
          const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-amber-500' : 'bg-[#00a63e]';
          return `
            <div class="bg-white rounded-2xl border border-[#ede7e2] p-3.5 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-extrabold text-[#111827] block">${t.name}</span>
                  <span class="text-[10px] text-[#6b7280]">${t.station} • آخر توريد: ${t.lastSupplyDate}</span>
                </div>
                <span class="text-[11px] font-extrabold text-[#00a63e]">${t.currentLiters.toLocaleString()} / ${t.capacity.toLocaleString()} لتر (${pct}%)</span>
              </div>
              <div class="w-full h-2 bg-[#f3ece6] rounded-full overflow-hidden">
                <div class="h-full ${barColor}" style="width: ${pct}%"></div>
              </div>
              <div class="grid grid-cols-2 gap-2 pt-0.5">
                <button type="button" onclick="openTankSheet('${t.id}', 'supply')" class="py-1.5 rounded-lg bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] text-[11px] font-bold">+ توريد</button>
                <button type="button" onclick="openTankSheet('${t.id}', 'dispense')" class="py-1.5 rounded-lg bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] text-[11px] font-bold">- صرف يومي</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

window.renderTanksQuickTab = renderTanksQuickTab;
