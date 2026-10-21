# دليل المعمارية وتحويل نظام مطار حائل الدولي (HAS MAG IFMT) إلى Flutter
## Complete Flutter Clean Architecture Migration Guide

تمت هيكلة وتقسيم ملفات ومكونات المشروع الحالية (`JavaScript / CSS / HTML`) لتطابق **100%** معايير **Flutter Clean Architecture** المعتمدة من شركة Google ومجتمع مطوري Flutter حول العالم، بحيث يستطيع أي مطور تطبيقات قراءة الكود وفهمه فوراً وتحويله إلى كود **Dart** بسلاسة وسرعة فائقة.

---

## 📁 1. جدول المطابقة الشامل (Architecture Mapping: Web JS ➔ Flutter Dart)

| الطبقة في بنية المشروع (Web JS) | مسار Flutter المكافئ (`lib/`) | المسؤولية والدور في التطبيق |
| :--- | :--- | :--- |
| **`js/components/badges.js`** | `lib/presentation/widgets/badges/` | شارات الحالة (`StatusBadge`) وشارات أولوية SLA (`PriorityBadge`) |
| **`js/components/cards.js`** | `lib/presentation/widgets/cards/` | بطاقات الأيقونات والتصنيفات الفرعية الموحدة (`SubIconCard`) |
| **`js/components/switch.js`** | `lib/presentation/widgets/inputs/` | أزرار التبديل السريع التفاعلية (`SegmentedSwitchButton`) |
| **`js/components/form_fields.js`** | `lib/presentation/widgets/inputs/` | منشئ الحقول الديناميكي الموحد (`DynamicFormField`) |
| **`js/services/record_service.js`** | `lib/domain/services/record_service.dart` | عمليات إضافة وحذف السجلات وحسابات المخزون الآلية |
| **`js/services/workflow_service.js`**| `lib/domain/services/workflow_service.dart`| تحويل البلاغات لأوامر عمل، والأعطال لطلبات قطع غيار |
| **`js/services/master_service.js`** | `lib/domain/services/master_service.dart`| إدارة وتعديل عناصر الماستر داتا المركزية (CRUD) |
| **`js/services/tank_service.js`** | `lib/domain/services/tank_service.dart` | حسابات التوريد والصرف وقفل سعات الخزانات |
| **`js/services/inspection_service.js`**| `lib/domain/services/inspection_service.dart`| تسجيل تذاكر الجولات الميدانية وتبديل حالاتها |
| **`js/sheets/base_sheet.js`** | `lib/presentation/sheets/base_sheet.dart` | متحكم النوافذ السفلية (`showModalBottomSheet`) ومسار التنقل |
| **`js/sheets/add_record_sheet.js`**| `lib/presentation/sheets/add_record_sheet.dart`| نافذة إضافة السجل التشغيلي الديناميكي السفلية |
| **`js/sheets/bulk_shift_sheet.js`**| `lib/presentation/sheets/bulk_shift_sheet.dart`| نافذة فرز وإسناد الورديات المجمعة للموظفين |
| **`js/sheets/master_add_sheet.js`**| `lib/presentation/sheets/master_add_sheet.dart`| نوافذ إضافة الأقسام والأنظمة والمواقع للأب |
| **`js/sheets/tank_sheet.js`** | `lib/presentation/sheets/tank_sheet.dart` | نافذة صرف وتوريد خزانات الوقود والمياه |
| **`js/sheets/inspection_sheet.js`**| `lib/presentation/sheets/inspection_sheet.dart`| نافذة فتح تذكرة جولة تفتيش جديدة |
| **`js/sheets/rbac_sheet.js`** | `lib/presentation/sheets/rbac_sheet.dart` | نافذة استعراض الأدوار وصلاحيات النظام |
| **`js/screens/home_screen.js`** | `lib/presentation/screens/home/home_screen.dart` | الشاشة الرئيسية: الوحدات التشغيلية الـ 12 وإحصاءات الأقسام |
| **`js/screens/sub_sections_screen.js`**| `lib/presentation/screens/module/sub_sections_screen.dart`| شاشة المستوى 2: شبكة الأقسام الفرعية لأي وحدة |
| **`js/screens/records_screen.js`**| `lib/presentation/screens/records/records_screen.dart`| شاشة المستوى 3: قائمة السجلات، الخزانات، والتبويبات الفرعية |
| **`js/screens/record_details_screen.js`**| `lib/presentation/screens/records/record_details_screen.dart`| شاشة المستوى 4: تفاصيل السجل، التعديل المباشر، ومسارات العمل |
| **`js/screens/tours_hub_screen.js`**| `lib/presentation/screens/inspection/tours_hub_screen.dart`| مركز تذاكر الجولات الميدانية، الفلاتر، وتذاكر الأقسام |
| **`js/screens/tanks_screen.js`** | `lib/presentation/screens/tanks/tanks_screen.dart` | تبويب مناسيب الخزانات، الرصيد، والسعات |
| **`js/screens/settings_screen.js`**| `lib/presentation/screens/settings/settings_screen.dart`| تبويب الإعدادات والملف الشخصي ومحرر الماستر داتا |
| **`js/data.js`** | `lib/data/datasources/` & `lib/data/models/` | النماذج الثابتة والبيانات التأسيسية (Seed Data) |
| **`js/icons.js`** | `lib/core/theme/` & `assets/` | مسارات الأيقونات والصور والرموز المعتمدة |
| **`js/state.js`** | `lib/presentation/state/app_state.dart` | الحالة العامة التفاعلية (AppState عبر Riverpod / Provider) |
| **`js/navigation.js`** | `lib/core/router/app_router.dart` | مسارات التوجيه والتنقل والـ Breadcrumbs |
| **`js/app.js`** | `lib/main.dart` & `lib/app.dart` | نقطة الانطلاق الرئيسية وربط عناصر الواجهة والتهيئة |

---

## 🧩 2. أكواد Dart الجاهزة للمكونات الأساسية (Ready-to-Use Flutter Widgets)

### أ) زر التبديل السريع (`SegmentedSwitchButton`)
كبديل عصري وسريع للقوائم المنسدلة للخيارات الثنائية والثلاثية مثل (حالة البلاغ: مفتوح / مغلق):

```dart
// lib/presentation/widgets/inputs/segmented_switch_button.dart
import 'package:flutter/material.dart';

class SegmentedSwitchButton extends StatelessWidget {
  final String label;
  final List<String> options;
  final String selectedValue;
  final ValueChanged<String> onChanged;

  const SegmentedSwitchButton({
    super.key,
    required this.label,
    required this.options,
    required this.selectedValue,
    required this.onChanged,
  });

  Color _getActiveColor(String opt) {
    if (opt == 'مفتوح') return const Color(0xFFEA580C);
    if (opt == 'مغلق') return const Color(0xFF47525E);
    if (opt == 'نعم') return const Color(0xFFD97706);
    if (opt == 'لا' || opt == 'لا يوجد') return const Color(0xFF00A63E);
    if (opt == 'يوجد قطع خدمة') return const Color(0xFFDC2626);
    return const Color(0xFFDB6B49);
  }

  String _getOptionIcon(String opt) {
    if (opt == 'مفتوح') return '🟠 ';
    if (opt == 'مغلق') return '🔒 ';
    if (opt == 'نعم') return '⚠️ ';
    if (opt == 'لا' || opt == 'لا يوجد') return '✅ ';
    if (opt == 'يوجد قطع خدمة') return '🚨 ';
    return '';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF1F2937))),
            const Row(
              children: [
                CircleAvatar(radius: 3, backgroundColor: Color(0xFFDB6B49)),
                SizedBox(width: 4),
                Text('زر تبديل سريع', style: TextStyle(color: Color(0xFFDB6B49), fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
        const SizedBox(height: 6),
        Container(
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: const Color(0xFFEDE7E2),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFDFD8D0)),
          ),
          child: Row(
            children: options.map((opt) {
              final isSel = opt == selectedValue;
              final activeColor = _getActiveColor(opt);
              return Expanded(
                child: GestureDetector(
                  onTap: () => onChanged(opt),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 180),
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    decoration: BoxDecoration(
                      color: isSel ? activeColor : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: isSel ? [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 4, offset: const Offset(0, 2))] : null,
                    ),
                    child: Center(
                      child: Text(
                        '${_getOptionIcon(opt)}$opt',
                        style: TextStyle(
                          color: isSel ? Colors.white : const Color(0xFF6B7280),
                          fontWeight: isSel ? FontWeight.w900 : FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}
```

---

### ب) شارات الحالة والأولوية (`StatusBadge` & `PriorityBadge`)

```dart
// lib/presentation/widgets/badges/status_badge.dart
import 'package:flutter/material.dart';

class StatusBadge extends StatelessWidget {
  final String status;
  const StatusBadge({super.key, required this.status});

  @override
  Widget build(BuildContext context) {
    final isClosed = status == 'مغلق' || status == 'مغلقة' || status == 'منجز';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: isClosed ? const Color(0xFFF0FDF4) : const Color(0xFFFFF7ED),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        status.isEmpty ? 'مفتوح' : status,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.bold,
          color: isClosed ? const Color(0xFF15803D) : const Color(0xFFC2410C),
        ),
      ),
    );
  }
}

// lib/presentation/widgets/badges/priority_badge.dart
class PriorityBadge extends StatelessWidget {
  final String priority;
  const PriorityBadge({super.key, required this.priority});

  @override
  Widget build(BuildContext context) {
    if (priority.isEmpty) return const SizedBox.shrink();
    Color bg = const Color(0xFF64748B);
    if (priority == 'P1' || priority.startsWith('R1') || priority.contains('حرجة') || priority.contains('فورية')) {
      bg = const Color(0xFFDC2626);
    } else if (priority == 'P2' || priority.startsWith('R2') || priority.contains('طارئة')) {
      bg = const Color(0xFFEF4444);
    } else if (priority.startsWith('P3') || priority.startsWith('R3') || priority.contains('عالية')) {
      bg = const Color(0xFFEA580C);
    } else if (priority == 'R4' || priority.contains('متوسطة')) {
      bg = const Color(0xFFF59E0B);
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        priority,
        style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900),
      ),
    );
  }
}
```

---

### ج) بطاقة الأيقونات الموحدة (`SubIconCard`)

```dart
// lib/presentation/widgets/cards/sub_icon_card.dart
import 'package:flutter/material.dart';

class SubIconCard extends StatelessWidget {
  final String title;
  final String icon;
  final String? textIcon;
  final int count;
  final VoidCallback onTap;

  const SubIconCard({
    super.key,
    required this.title,
    required this.icon,
    this.textIcon,
    required this.count,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isImg = icon.startsWith('data:') || icon.startsWith('http') || icon.contains('/');
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.center,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  alignment: Alignment.center,
                  child: isImg
                      ? Image.network(icon, width: 40, height: 40, fit: BoxFit.contain)
                      : Text(textIcon ?? icon, style: const TextStyle(fontSize: 32)),
                ),
                Positioned(
                  top: -4,
                  right: -6,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: const Color(0xFF47525E),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: Colors.white, width: 1),
                    ),
                    child: Text(
                      '$count',
                      style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              title,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
                color: Color(0xFF111827),
                height: 1.2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

### د) إدارة الحالة التفاعلية في Flutter (`AppState` عبر Riverpod / StateNotifier)

```dart
// lib/presentation/state/app_state.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AppState {
  final String activeTab;         // 'home', 'tours_hub', 'tanks_dash', 'more'
  final int navLevel;             // 1: Home Modules, 2: Sub-Sections, 3: Records, 4: Details
  final String selectedModuleId;  // e.g. 'mod_work_control'
  final String selectedSubId;     // e.g. 'sub_daily_reports'
  final String? selectedRecordId; // e.g. 'REC-101'
  final String activeChildSubCode; // e.g. 'الكل', 'الصيانة الوقائية'
  final String activeFilterPill;   // e.g. 'الكل', 'مفتوح', 'مغلق'

  const AppState({
    this.activeTab = 'home',
    this.navLevel = 1,
    this.selectedModuleId = 'mod_work_control',
    this.selectedSubId = 'sub_daily_reports',
    this.selectedRecordId,
    this.activeChildSubCode = 'الكل',
    this.activeFilterPill = 'الكل',
  });

  AppState copyWith({
    String? activeTab,
    int? navLevel,
    String? selectedModuleId,
    String? selectedSubId,
    String? selectedRecordId,
    String? activeChildSubCode,
    String? activeFilterPill,
  }) {
    return AppState(
      activeTab: activeTab ?? this.activeTab,
      navLevel: navLevel ?? this.navLevel,
      selectedModuleId: selectedModuleId ?? this.selectedModuleId,
      selectedSubId: selectedSubId ?? this.selectedSubId,
      selectedRecordId: selectedRecordId ?? this.selectedRecordId,
      activeChildSubCode: activeChildSubCode ?? this.activeChildSubCode,
      activeFilterPill: activeFilterPill ?? this.activeFilterPill,
    );
  }
}

class AppStateNotifier extends StateNotifier<AppState> {
  AppStateNotifier() : super(const AppState());

  void setTab(String tab) => state = state.copyWith(activeTab: tab, navLevel: 1);
  void openModule(String modId) => state = state.copyWith(selectedModuleId: modId, navLevel: 2);
  void openSubSection(String modId, String subId, [String childCode = 'الكل']) {
    state = state.copyWith(selectedModuleId: modId, selectedSubId: subId, activeChildSubCode: childCode, navLevel: 3);
  }
  void openRecordDetails(String recId) {
    state = state.copyWith(selectedRecordId: recId, navLevel: 4);
  }
  void navigateBack() {
    if (state.navLevel > 1) {
      state = state.copyWith(navLevel: state.navLevel - 1);
    }
  }
}

final appStateProvider = StateNotifierProvider<AppStateNotifier, AppState>((ref) {
  return AppStateNotifier();
});
```

---

## 🚀 3. خطوات التشغيل والتحويل (Step-by-Step Conversion Workflow)

1. **إنشاء مشروع Flutter جديد**:
   ```bash
   flutter create has_mag_flutter --org sa.has.mag
   cd has_mag_flutter
   ```

2. **إضافة الحزم الأساسية الموصى بها في `pubspec.yaml`**:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     flutter_riverpod: ^2.5.1
     go_router: ^14.0.0
     google_fonts: ^6.2.1
     intl: ^0.19.0
     shared_preferences: ^2.2.3
   ```

3. **نسخ الهيكل النظيف مباشرة**:
   أنشئ المجلدات في `lib/`:
   - `lib/core/theme/` (الألوان والخطوط والأيقونات)
   - `lib/data/models/` (كائنات البيانات)
   - `lib/domain/services/` (منطق العمليات والتحويلات)
   - `lib/presentation/widgets/` (مكونات الواجهة المشتركة)
   - `lib/presentation/sheets/` (النوافذ السفلية)
   - `lib/presentation/screens/` (الشاشات الرئيسية والفرعية)
   - `lib/presentation/state/` (إدارة الحالة)

4. **تطابق بنية الملفات**:
   كل ملف في `js/components/` ينسخ لـ `lib/presentation/widgets/`، وكل ملف في `js/services/` ينسخ لـ `lib/domain/services/`، وكل ملف في `js/screens/` ينسخ لـ `lib/presentation/screens/` بنفس التسمية تماماً!
