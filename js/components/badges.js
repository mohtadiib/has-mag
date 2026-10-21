// ============================================================================
// HAS MAG IFMT - BADGE COMPONENTS (شارات الحالة والأولوية)
// Flutter Equivalent: lib/presentation/widgets/badges/
// ============================================================================

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/badges/status_badge.dart
 * شارة حالة السجل (مفتوح / مغلق / منجز / منتظم)
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class StatusBadge extends StatelessWidget {
 *   final String status;
 *   const StatusBadge({required this.status});
 *   @override
 *   Widget build(BuildContext context) {
 *     final isClosed = status == 'مغلق' || status == 'مغلقة' || status == 'منجز';
 *     return Container(
 *       padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
 *       decoration: BoxDecoration(
 *         color: isClosed ? const Color(0xFFF0FDF4) : const Color(0xFFFFF7ED),
 *         borderRadius: BorderRadius.circular(999),
 *       ),
 *       child: Text(
 *         status.isEmpty ? 'مفتوح' : status,
 *         style: TextStyle(
 *           fontSize: 10,
 *           fontWeight: FontWeight.bold,
 *           color: isClosed ? const Color(0xFF15803D) : const Color(0xFFC2410C),
 *         ),
 *       ),
 *     );
 *   }
 * }
 * ```
 */
function renderStatusBadge(status) {
  const isClosed = status === 'مغلق' || status === 'مغلقة' || status === 'منجز';
  const bgClass = isClosed ? 'bg-[#f0fdf4] text-[#15803d]' : 'bg-[#fff7ed] text-[#c2410c]';
  return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${bgClass}">${status || 'مفتوح'}</span>`;
}

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/badges/priority_badge.dart
 * شارة أولوية أمر العمل (SLA Priority Badge)
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class PriorityBadge extends StatelessWidget {
 *   final String priority;
 *   const PriorityBadge({required this.priority});
 *   @override
 *   Widget build(BuildContext context) {
 *     Color bg = Colors.blueGrey;
 *     if (priority == 'P1' || priority.startsWith('R1') || priority.contains('حرجة')) {
 *       bg = Colors.red.shade700;
 *     } else if (priority == 'P2' || priority.startsWith('R2') || priority.contains('طارئة')) {
 *       bg = Colors.red.shade500;
 *     } else if (priority.startsWith('P3') || priority.startsWith('R3') || priority.contains('عالية')) {
 *       bg = const Color(0xFFEA580C);
 *     } else if (priority == 'R4' || priority.contains('متوسطة')) {
 *       bg = Colors.amber.shade600;
 *     }
 *     return Container(
 *       padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
 *       decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(4)),
 *       child: Text(priority, style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900)),
 *     );
 *   }
 * }
 * ```
 */
function renderPriorityBadge(p) {
  if (!p) return '';
  const pClass = (p === 'P1' || p.startsWith('R1') || p.includes('حرجة') || p.includes('فورية')) ? 'bg-red-600 text-white' :
    (p === 'P2' || p.startsWith('R2') || p.includes('طارئة')) ? 'bg-red-500 text-white' :
    (p.startsWith('P3') || p.startsWith('R3') || p.includes('عالية')) ? 'bg-[#ea580c] text-white' :
    (p === 'R4' || p.includes('متوسطة')) ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white';
  return `<span class="px-1.5 py-0.5 rounded text-[9px] font-extrabold ${pClass}">${p}</span>`;
}

window.renderStatusBadge = renderStatusBadge;
window.renderPriorityBadge = renderPriorityBadge;
