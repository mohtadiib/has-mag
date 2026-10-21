// ============================================================================
// HAS MAG IFMT - CARD COMPONENTS (بطاقات الأيقونات والتصنيفات)
// Flutter Equivalent: lib/presentation/widgets/cards/
// ============================================================================

/**
 * Flutter Widget Equivalent: lib/presentation/widgets/cards/sub_icon_card.dart
 * بطاقة التصنيف الفرعي الموحدة في شبكة الأيقونات
 * 
 * Dart/Flutter Implementation:
 * ```dart
 * class SubIconCard extends StatelessWidget {
 *   final String title;
 *   final String icon;
 *   final String? textIcon;
 *   final int count;
 *   final VoidCallback onTap;
 * 
 *   const SubIconCard({
 *     required this.title,
 *     required this.icon,
 *     this.textIcon,
 *     required this.count,
 *     required this.onTap,
 *   });
 * 
 *   @override
 *   Widget build(BuildContext context) {
 *     final isImg = icon.startsWith('data:') || icon.startsWith('http') || icon.contains('/');
 *     return InkWell(
 *       onTap: onTap,
 *       borderRadius: BorderRadius.circular(12),
 *       child: Padding(
 *         padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
 *         child: Column(
 *           mainAxisSize: MainAxisSize.min,
 *           children: [
 *             Stack(
 *               clipBehavior: Clip.none,
 *               children: [
 *                 isImg
 *                     ? Image.network(icon, width: 40, height: 40, fit: BoxFit.contain)
 *                     : Text(textIcon ?? icon, style: const TextStyle(fontSize: 28)),
 *                 Positioned(
 *                   top: -4,
 *                   right: -8,
 *                   child: Container(
 *                     padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
 *                     decoration: BoxDecoration(
 *                       color: const Color(0xFF47525E),
 *                       borderRadius: BorderRadius.circular(999),
 *                       border: Border.all(color: Colors.white, width: 1),
 *                     ),
 *                     child: Text('$count', style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
 *                   ),
 *                 ),
 *               ],
 *             ),
 *             const SizedBox(height: 8),
 *             Text(
 *               title,
 *               textAlign: TextAlign.center,
 *               style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF111827)),
 *               maxLines: 2,
 *               overflow: TextOverflow.ellipsis,
 *             ),
 *           ],
 *         ),
 *       ),
 *     );
 *   }
 * }
 * ```
 */
function renderChildSubIconCard(c, cnt, onClickCode) {
  const isImg = c.icon && (c.icon.startsWith('data:') || c.icon.startsWith('http') || c.icon.includes('/'));
  return `
    <div onclick="state.activeChildSubCode='${onClickCode}'; renderApp();" class="cursor-pointer flex flex-col items-center justify-start group relative py-2 px-1 rounded-xl hover:bg-[#ede7e2]/40 active:scale-95 transition duration-150 select-none">
      <div class="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        <span class="absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full bg-[#47525e] text-white text-[9px] font-extrabold shadow-xs leading-none border border-white z-10">${cnt}</span>
        ${isImg ? `
          <img src="${c.icon}" alt="${c.title}" class="w-10 h-10 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
        ` : `
          <span class="text-3xl leading-none select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.07)]" role="img" aria-label="${c.title}">${c.textIcon || c.icon || '📄'}</span>
        `}
      </div>
      <span class="text-[11px] font-bold text-[#111827] group-hover:text-[#db6b49] mt-2 leading-tight text-center transition tracking-tight">${c.title}</span>
    </div>
  `;
}

window.renderChildSubIconCard = renderChildSubIconCard;
