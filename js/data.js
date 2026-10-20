// ============================================================================
// 1. MASTER DATA (تُضبط من شاشة المزيد -> الإدارة وتغذي جميع القوائم المنسدلة)
// ============================================================================
const MASTER_DATA = {
  departments: [
    { id: 'DEP-01', code: 'AFL', name: 'الإنارة الملاحية (AFL)', manager: 'م. مازن الغامدي', badge: 0, icon: ICON_PATHS.AFL, desc: 'صيانة وتشغيل أنظمة الإنارة الملاحية للمدرج الرئيسي وممرات الطائرات.' },
    { id: 'DEP-02', code: 'Building', name: 'المباني والمدني (Building)', manager: 'م. وليد الحربي', badge: 0, icon: ICON_PATHS.Building, desc: 'صيانة مرافق الصالات، الأبواب الأوتوماتيكية، الأسقف، والأعمال المدنية.' },
    { id: 'DEP-03', code: 'Communication', name: 'الاتصالات (Communication)', manager: 'م. فيصل العتيبي', badge: 0, icon: ICON_PATHS.Communication, desc: 'شاشات الرحلات FIDS، السنترال الشبكي، النداء الآلي، وأجهزة التفتيش الأمني.' },
    { id: 'DEP-04', code: 'Electrical', name: 'الكهرباء (Electrical)', manager: 'م. طارق عبد الرحمن', badge: 0, icon: ICON_PATHS.Electrical, desc: 'شبكات الجهد المنخفض والمتوسط، اللوحات الفرعية، وإنارة الصالات.' },
    { id: 'DEP-05', code: 'HVAC', name: 'التكييف والتبريد (HVAC)', manager: 'م. سامي الدوسري', badge: 5, icon: ICON_PATHS.HVAC, desc: 'وحدات التبريد المركزي (Chillers) ووحدات مناولة الهواء (AHU).' },
    { id: 'DEP-06', code: 'Janitorial', name: 'النظافة (Janitorial)', manager: 'أ. فهد الشمري', badge: 1, icon: ICON_PATHS.Janitorial, desc: 'نظافة وتعقيم صالات الركاب الدولية والداخلية والمرافق العامة.' },
    { id: 'DEP-07', code: 'Landscaping', name: 'التشجير (Landscaping)', manager: 'أ. بدر العنزي', badge: 0, icon: ICON_PATHS.Landscaping, desc: 'المسطحات الخضراء، شبكات الري، وتنسيق الحدائق الخارجية للمطار.' },
    { id: 'DEP-08', code: 'Mechanical', name: 'الميكانيكا (Mechanical)', manager: 'م. خالد المنصور', badge: 0, icon: ICON_PATHS.Mechanical, desc: 'سيور الأمتعة (BHS)، جسور الإركاب، المصاعد، ومضخات الحريق.' },
    { id: 'DEP-09', code: 'Motor Pool', name: 'المركبات (Motor Pool)', manager: 'أ. سلطان الحربي', badge: 1, icon: ICON_PATHS.MotorPool, desc: 'صيانة أسطول السيارات والآليات والمعدات الأرضية وصهاريج السحب.' },
    { id: 'DEP-10', code: 'P&G', name: 'الدهانات والزجاج (P&G)', manager: 'أ. رائد الشمري', badge: 0, icon: ICON_PATHS.PG, desc: 'أعمال الدهانات، العلامات الأرضية الملاحية، والواجهات الزجاجية.' },
    { id: 'DEP-11', code: 'Pest Control', name: 'مكافحة الآفات (Pest Control)', manager: 'أ. نواف الرشيدي', badge: 1, icon: ICON_PATHS.PestControl, desc: 'الرش الوقائي ومكافحة الحشرات والقوارض في محيط المطار.' },
    { id: 'DEP-12', code: 'Power Plant', name: 'محطة القوى (Power Plant)', manager: 'م. عمر الزهراني', badge: 0, icon: ICON_PATHS.PowerPlant, desc: 'تشغيل المولدات الاحتياطية، لوحات التحويل الآلي ATS، وخزانات الوقود.' }
  ],
  systems: [
    { id: 'SYS-01', name: 'نظام الإنارة الملاحية للمدرج (AGL)', department: 'الإنارة الملاحية (AFL)' },
    { id: 'SYS-02', name: 'نظام المولدات الاحتياطية ولوحات ATS', department: 'محطة القوى (Power Plant)' },
    { id: 'SYS-03', name: 'نظام التبريد المركزي (Chillers & AHU)', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-04', name: 'نظام مناولة وسيور الأمتعة (BHS)', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-05', name: 'نظام جسور إركاب المسافرين (PBB)', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-06', name: 'نظام شاشات الرحلات والنداء الآلي (FIDS)', department: 'الاتصالات (Communication)' },
    { id: 'SYS-07', name: 'نظام السنترال والهاتف الشبكي (IP-PBX)', department: 'الاتصالات (Communication)' },
    { id: 'SYS-08', name: 'نظام مضخات وخزانات إطفاء الحريق', department: 'الميكانيكا (Mechanical)' }
  ],
  locations: [
    { id: 'LOC-01', name: 'صالة الركاب الدولية 1', type: 'مرفق تشغيلي' },
    { id: 'LOC-02', name: 'صالة الركاب الداخلية 2', type: 'مرفق تشغيلي' },
    { id: 'LOC-03', name: 'برج المراقبة الجوية (ATC)', type: 'مرفق ملاحي حرج' },
    { id: 'LOC-04', name: 'المدرج الرئيسي 18L/36R وممرات الطائرات', type: 'موقع ملاحي' },
    { id: 'LOC-05', name: 'محطة الكهرباء الرئيسية والمولدات', type: 'محطة مرافق' },
    { id: 'LOC-06', name: 'صالة التشريفات وكبار الشخصيات (VIP)', type: 'مرفق رئاسي' },
    { id: 'LOC-07', name: 'مبنى الشحن الجوي والجمارك', type: 'مرفق تشغيلي' }
  ],
  employees: [
    { id: 'EMP-101', name: 'أحمد محمود الشمراني', job: 'فني كهرباء مدرج', shift: 'وردية A', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-102', name: 'محمد عبد الله القحطاني', job: 'فني تبريد مركزي', shift: 'وردية A', department: 'التكييف والتبريد (HVAC)' },
    { id: 'EMP-103', name: 'سعيد عوض المالكي', job: 'فني ميكانيكا سيور', shift: 'وردية B', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-104', name: 'ياسر فهد السبيعي', job: 'فني إلكترونيات', shift: 'وردية B', department: 'الاتصالات (Communication)' },
    { id: 'EMP-105', name: 'عبد العزيز صالح الشهري', job: 'مشغل محطة توليد', shift: 'وردية C', department: 'محطة القوى (Power Plant)' },
    { id: 'EMP-106', name: 'نايف حسن العمري', job: 'فني صيانة مدنية', shift: 'وردية C', department: 'المباني والمدني (Building)' },
    { id: 'EMP-107', name: 'رامي كمال النجار', job: 'فني إنارة ملاحية', shift: 'وردية A', department: 'الإنارة الملاحية (AFL)' },
    { id: 'EMP-108', name: 'حسام الدين مصطفى', job: 'فني جسور إركاب', shift: 'وردية B', department: 'الميكانيكا (Mechanical)' }
  ],
  tanksConfig: [
    { id: 'TNK-F1', station: 'محطة الوقود', category: 'وقود', name: 'خزان الديزل الرئيسي', capacity: 100000, currentLiters: 82500, locked: true, lastSupplyDate: '2026-10-15' },
    { id: 'TNK-F2', station: 'محطة الوقود', category: 'وقود', name: 'خزان البنزين', capacity: 50000, currentLiters: 39900, locked: true, lastSupplyDate: '2026-10-14' },
    { id: 'TNK-F3', station: 'محطة الوقود', category: 'وقود', name: 'خزان ديزل أبو سرهد', capacity: 60000, currentLiters: 48000, locked: true, lastSupplyDate: '2026-10-16' },
    { id: 'TNK-P1', station: 'محطة الكهرباء', category: 'وقود', name: 'خزان محطة الكهرباء 1', capacity: 80000, currentLiters: 68200, locked: true, lastSupplyDate: '2026-10-12' },
    { id: 'TNK-P2', station: 'محطة الكهرباء', category: 'وقود', name: 'خزان محطة الكهرباء 2', capacity: 80000, currentLiters: 59500, locked: true, lastSupplyDate: '2026-10-12' },
    { id: 'TNK-P3', station: 'محطة الكهرباء', category: 'وقود', name: 'خزان محطة الكهرباء 3', capacity: 80000, currentLiters: 68800, locked: true, lastSupplyDate: '2026-10-12' },
    { id: 'TNK-W1', station: 'شبكة المياه', category: 'مياه', name: 'الخزان الرئيسي للمياه', capacity: 500000, currentLiters: 410000, locked: true, lastSupplyDate: '2026-10-18' },
    { id: 'TNK-W2', station: 'شبكة المياه', category: 'مياه', name: 'الخزان الاحتياطي للمياه', capacity: 300000, currentLiters: 285000, locked: true, lastSupplyDate: '2026-10-18' },
    { id: 'TNK-W3', station: 'شبكة المياه', category: 'مياه', name: 'خزان نظام إطفاء الحريق', capacity: 250000, currentLiters: 250000, locked: true, lastSupplyDate: '2026-10-18' }
  ],
  catalog: [
    { id: 'CAT-01', type: 'صنف مخزني', name: 'كشاف إنارة مدرج LED متكامل 200W' },
    { id: 'CAT-02', type: 'صنف مخزني', name: 'ضاغط تبريد ترددي (Compressor 25HP)' },
    { id: 'CAT-03', type: 'صنف مخزني', name: 'سير مطاطي مقوى لخط العفش (BHS Belt)' },
    { id: 'CAT-04', type: 'أصل تشغيلي', name: 'مولد كهرباء احتياطي CAT 2000KVA' },
    { id: 'CAT-05', type: 'أصل تشغيلي', name: 'وحدة تبريد مركزي Chiller York #2' },
    { id: 'CAT-06', type: 'مقاول خارجي', name: 'شركة الرواسي للمقاولات الملاحية' },
    { id: 'CAT-07', type: 'مقاول خارجي', name: 'مؤسسة التقنية المتقدمة للأنظمة' }
  ],
  entities: [
    'الشرطة الجوية',
    'الجوازات',
    'الجمارك',
    'المباحث',
    'المدير المناوب',
    'العمليات',
    'الشرطة المدنية',
    'شرطة المرور',
    'إدارة المطار',
    'الإطفاء',
    'METCO',
    'الأرصاد الجوي',
    'سانس',
    'العيادة',
    'الصيانة السعودية',
    'التشغيل التجاري'
  ],
  priorities: [
    'P1',
    'P2',
    'R4',
    'P3a',
    'P3b',
    'P3c',
    'R1h',
    'R2h',
    'R3h',
    'P3e',
    'R1e',
    'R2e',
    'R3e',
    'P3f',
    'P3s',
    'R1s',
    'R2s',
    'R3s',
    'R1L',
    'R2L',
    'R3L'
  ]
};

// ============================================================================
// INSPECTION TOURS & TICKETS DATA (موجودة داخل قسم الجولات وداخل محطة العمل)
// ============================================================================
const INSPECTION_TICKETS = [
  { id: 'TKT-101', title: 'فحص ومعايرة ميزان العفش', department: 'HVAC', location: 'صالة القدوم', status: 'مفتوحة', timeAgo: 'منذ يومين', responseTime: '1 دقيقة', totalDuration: '12 دقيقة', maintDuration: '11 دقيقة', reporter: 'Mazen (Inspector)', cmNumber: '309', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'تم معايرة الميزان واستبدال الحساس بنجاح.' },
  { id: 'TKT-102', title: 'صيانة وتنظيف وحدة التكييف في مصلى النساء', department: 'HVAC', location: 'مصلى النساء - الصالة', status: 'مغلقة', timeAgo: 'منذ يومين', responseTime: '1 دقيقة', totalDuration: '12 دقيقة', maintDuration: '11 دقيقة', reporter: 'Mazen (Inspector)', cmNumber: '309', thumb: ICON_PATHS.photoAfter, afterPhoto: ICON_PATHS.photoBefore, closingNotes: 'تم غسيل الفلاتر وضبط التبريد وإغلاق التذكرة.' },
  { id: 'TKT-103', title: 'إصلاح كسر باب منطقة البوابات', department: 'Motor Pool', location: 'بوابة المغادرة 3', status: 'مفتوحة', timeAgo: 'منذ 5 أيام', responseTime: '3 دقائق', totalDuration: '20 دقيقة', maintDuration: '17 دقيقة', reporter: 'Mazen (Inspector)', cmNumber: '312', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'جاري استكمال تثبيت المفصلات الهيدروليكية.' },
  { id: 'TKT-104', title: 'رش ومكافحة الحشرات بالمنطقة الخارجية', department: 'Pest Control', location: 'الساحة الخارجية', status: 'مفتوحة', timeAgo: 'منذ 5 أيام', responseTime: '2 دقائق', totalDuration: '15 دقيقة', maintDuration: '13 دقيقة', reporter: 'Mazen (Inspector)', cmNumber: '315', thumb: ICON_PATHS.photoAfter, afterPhoto: ICON_PATHS.photoBefore, closingNotes: 'تم تنفيذ الرش الوقائي الدوري.' },
  { id: 'TKT-105', title: 'تنظيف وتعقيم صالة القدوم الدولية', department: 'Janitorial', location: 'صالة الركاب الدولية 1', status: 'مفتوحة', timeAgo: 'منذ 3 أيام', responseTime: '2 دقائق', totalDuration: '25 دقيقة', maintDuration: '23 دقيقة', reporter: 'Mazen (Inspector)', cmNumber: '318', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'تم التعقيم بالكامل.' }
];

// ============================================================================
// 2. EXACT EXCEL HIERARCHY MODULES (الأيقونات الرئيسية في الشاشة الرئيسية وتفرعاتها)
// ============================================================================
const SYSTEM_MODULES = [
  // --------------------------------------------------------------------------
  // 1. محطة العمل (WORK CONTROL) - يحتوي البلاغات اليومية + أوامر العمل + التقارير
  // --------------------------------------------------------------------------
  {
    id: 'mod_work_control',
    textIcon: '🎛️',
    shortTitle: 'محطة العمل',
    excelName: 'WORK CONTROL',
    fullTitle: 'محطة العمل (Work Control)',
    helpText: 'إدارة ومتابعة البلاغات التشغيلية اليومية، أوامر العمل التصحيحية، والتقارير الدورية للمطار.',
    icon: ICON_PATHS.WorkControl,
    badge: 2,
    showTicketsAndDeptsInside: false,
    subSections: [
      {
        id: 'sub_daily_reports',
        textIcon: '📢',
        shortTitle: 'البلاغات اليومية',
        helpText: 'تسجيل ومتابعة البلاغات الواردة من الجهات وتوجيه الفنيين المبتعثين وإغلاق البلاغات.',
        icon: '📢',
        filterPills: { field: 'status', options: ['الكل', 'مفتوح', 'مغلق'] },
        branchByDept: true,
        summaryKeys: [
          { key: 'reportDateTime', label: 'التاريخ والزمن' },
          { key: 'entity', label: 'الجهة المبلغة' },
          { key: 'reporterName', label: 'المُبلّغ' },
          { key: 'department', label: 'القسم' },
          { key: 'technician', label: 'الفني المبتعث' },
          { key: 'status', label: 'حالة البلاغ' },
          { key: 'problemDesc', label: 'وصف المشكلة' }
        ],
        fields: [
          { key: 'entity', label: 'الجهة المبلغة', type: 'master_entity' },
          { key: 'reporterName', label: 'اسم المُبلّغ', type: 'text' },
          { key: 'department', label: 'القسم', type: 'master_dept' },
          { key: 'technician', label: 'الفني المبتعث', type: 'master_employee' },
          { key: 'problemDesc', label: 'وصف مختصر للمشكلة', type: 'textarea' },
          { key: 'status', label: 'حالة البلاغ', type: 'select', options: ['مفتوح', 'مغلق'] },
          { key: 'reportDate', label: 'تاريخ البلاغ', type: 'date' },
          { key: 'timeOnly', label: 'وقت البلاغ', type: 'time' },
          { key: 'closeDateTime', label: 'تاريخ ووقت إغلاق البلاغ', type: 'datetime-local' },
          { key: 'materialsUsed', label: 'القطع / المواد المستخدمة', type: 'text' }
        ],
        records: [
          {
            id: 'BLG-101',
            entity: 'الجوازات',
            reporterName: 'وليد الشهري',
            department: 'الميكانيكا (Mechanical)',
            technician: 'سعيد عوض المالكي',
            problemDesc: 'توقف جزئي في سير الأمتعة رقم 2 بصالة القدوم',
            status: 'مغلق',
            reportDate: '2026-10-18',
            timeOnly: '08:30',
            reportDateTime: '2026-10-18 08:30',
            closeDateTime: '2026-10-18 10:15',
            materialsUsed: 'رولمان بلي + سير فرعي'
          },
          {
            id: 'BLG-102',
            entity: 'العمليات',
            reporterName: 'فهد العتيبي',
            department: 'التكييف والتبريد (HVAC)',
            technician: 'محمد عبد الله القحطاني',
            problemDesc: 'انخفاض تبريد وحدة التكييف في غرفة الرادار',
            status: 'مفتوح',
            reportDate: '2026-10-18',
            timeOnly: '11:20',
            reportDateTime: '2026-10-18 11:20',
            closeDateTime: '',
            materialsUsed: 'شحن فريون + تنظيف فلاتر'
          },
          {
            id: 'BLG-103',
            entity: 'إدارة المطار',
            reporterName: 'سلطان الحربي',
            department: 'الإنارة الملاحية (AFL)',
            technician: 'رامي كمال النجار',
            problemDesc: 'عطل في كشاف الإنارة الإرشادي عند مدخل الممر C',
            status: 'مفتوح',
            reportDate: '2026-10-19',
            timeOnly: '14:15',
            reportDateTime: '2026-10-19 14:15',
            closeDateTime: '',
            materialsUsed: 'كشاف بديل + قاعدة تثبيت'
          }
        ]
      },
      {
        id: 'sub_work_orders',
        textIcon: '🔧',
        shortTitle: 'أوامر العمل التصحيحية',
        helpText: 'إصدار ومتابعة أوامر العمل التصحيحية للأقسام والأنظمة وتوثيق أزمنة الاستجابة والتصحيح.',
        icon: '🔧',
        filterPills: { field: 'status', options: ['الكل', 'مفتوح', 'مغلق'] },
        branchByDept: true,
        summaryKeys: [
          { key: 'woNo', label: 'رقم أمر العمل' },
          { key: 'priority', label: 'الأولوية' },
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' },
          { key: 'status', label: 'الحالة' },
          { key: 'responseTime', label: 'زمن الاستجابة' },
          { key: 'correctionDuration', label: 'زمن التصحيح' },
          { key: 'closeDateTime', label: 'تاريخ الإغلاق' }
        ],
        fields: [
          { key: 'woNo', label: 'رقم أمر العمل', type: 'text' },
          { key: 'priority', label: 'أولوية أمر العمل', type: 'master_priority', options: MASTER_DATA.priorities },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'status', label: 'الحالة', type: 'select', options: ['مفتوح', 'مغلق'] },
          { key: 'technician', label: 'الفني المكلف', type: 'master_employee' },
          { key: 'problemDesc', label: 'وصف المشكلة', type: 'textarea' },
          { key: 'woDateTime', label: 'تاريخ ووقت استلام البلاغ', type: 'text' },
          { key: 'responseTime', label: 'زمن الاستجابة (الفرق بين استلام البلاغ وبدء الفني في حل المشكلة)', type: 'text' },
          { key: 'correctionDuration', label: 'زمن التصحيح (من بدء حل المشكلة إلى التصحيح الكامل)', type: 'text' },
          { key: 'closeDateTime', label: 'تاريخ ووقت الإغلاق', type: 'datetime-local' },
          { key: 'materialsUsed', label: 'القطع / المواد المستخدمة', type: 'text' }
        ],
        records: [
          {
            id: 'WO-501',
            woNo: 'WO-2026-501',
            priority: 'P2',
            department: 'الميكانيكا (Mechanical)',
            system: 'نظام مناولة وسيور الأمتعة (BHS)',
            technician: 'سعيد عوض المالكي',
            status: 'مغلق',
            woDateTime: '2026-10-18 08:35',
            responseTime: '12 دقيقة',
            correctionDuration: '1 ساعة و28 دقيقة',
            closeDateTime: '2026-10-18 10:15',
            problemDesc: 'استبدال رولمان بلي وضبط شد سير الأمتعة رقم 2',
            materialsUsed: 'رولمان بلي محوري (2 قطعة)'
          },
          {
            id: 'WO-502',
            woNo: 'WO-2026-502',
            priority: 'P1',
            department: 'الإنارة الملاحية (AFL)',
            system: 'نظام الإنارة الملاحية للمدرج (AGL)',
            technician: 'رامي كمال النجار',
            status: 'مفتوح',
            woDateTime: '2026-10-18 13:00',
            responseTime: '8 دقائق',
            correctionDuration: 'جاري العمل',
            closeDateTime: '',
            problemDesc: 'فحص واستبدال 3 كشافات حافة مدرج بالقطاع الغربي',
            materialsUsed: 'كشاف إنارة مدرج LED 200W'
          }
        ]
      },
      {
        id: 'sub_rm_work_orders',
        textIcon: '⚡',
        shortTitle: 'أوامر العمل التفاعلية (RM)',
        helpText: 'إصدار ومتابعة أوامر العمل التفاعلية الفورية (Reactive Maintenance) للتعامل السريع مع الأعطال والملاحظات الطارئة.',
        icon: '⚡',
        filterPills: { field: 'status', options: ['الكل', 'مفتوح', 'مغلق'] },
        branchByDept: true,
        summaryKeys: [
          { key: 'woNo', label: 'رقم أمر العمل (RM)' },
          { key: 'priority', label: 'الأولوية' },
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' },
          { key: 'status', label: 'الحالة' },
          { key: 'responseTime', label: 'زمن الاستجابة' },
          { key: 'correctionDuration', label: 'زمن المعالجة' },
          { key: 'closeDateTime', label: 'تاريخ الإغلاق' }
        ],
        fields: [
          { key: 'woNo', label: 'رقم أمر العمل (RM)', type: 'text' },
          { key: 'priority', label: 'أولوية أمر العمل (RM)', type: 'master_priority', options: MASTER_DATA.priorities },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'status', label: 'الحالة', type: 'select', options: ['مفتوح', 'مغلق'] },
          { key: 'technician', label: 'الفني المكلف', type: 'master_employee' },
          { key: 'problemDesc', label: 'وصف العطل التفاعلي', type: 'textarea' },
          { key: 'woDateTime', label: 'تاريخ ووقت استلام البلاغ', type: 'text' },
          { key: 'responseTime', label: 'زمن الاستجابة (من استلام البلاغ إلى مباشرة العمل)', type: 'text' },
          { key: 'correctionDuration', label: 'زمن المعالجة (من مباشرة العمل إلى إتمام الإصلاح)', type: 'text' },
          { key: 'closeDateTime', label: 'تاريخ ووقت الإغلاق', type: 'datetime-local' },
          { key: 'materialsUsed', label: 'القطع / المواد المستخدمة', type: 'text' }
        ],
        records: [
          {
            id: 'RM-601',
            woNo: 'RM-2026-601',
            priority: 'P1',
            department: 'الكهرباء (Electrical)',
            system: 'لوحات التوزيع الرئيسية والفرعية',
            technician: 'محمد عبد الله القحطاني',
            status: 'مغلق',
            woDateTime: '2026-10-19 09:10',
            responseTime: '5 دقائق',
            correctionDuration: '35 دقيقة',
            closeDateTime: '2026-10-19 09:50',
            problemDesc: 'انقطاع مفاجئ في تغذية صالة القدوم 2 - تم التحويل الفوري لقاطع الدعم وعزل الخلل',
            materialsUsed: 'فيوز ضغط منخفض 250A + مفتاح تحويل'
          },
          {
            id: 'RM-602',
            woNo: 'RM-2026-602',
            priority: 'P2',
            department: 'الميكانيكا (Mechanical)',
            system: 'نظام ضخ وتوزيع المياه (Plumbing & Pumps)',
            technician: 'سعيد عوض المالكي',
            status: 'مفتوح',
            woDateTime: '2026-10-19 13:45',
            responseTime: '7 دقائق',
            correctionDuration: 'جاري المعالجة',
            closeDateTime: '',
            problemDesc: 'كسر مفاجئ في أنبوب خط تغذية دورات مياه المغادرة الدولية - جاري الإغلاق المؤقت واستبدال الوصلة',
            materialsUsed: 'وصلة ضغط عالي 2 بوصة + محبس فراشة'
          },
          {
            id: 'RM-603',
            woNo: 'RM-2026-603',
            priority: 'P3a',
            department: 'الأنظمة والاتصالات (Telecom)',
            system: 'نظام شاشات عرض معلومات الرحلات (FIDS)',
            technician: 'عبد الله صالح الشمري',
            status: 'مفتوح',
            woDateTime: '2026-10-19 15:20',
            responseTime: '10 دقائق',
            correctionDuration: 'جاري المعالجة',
            closeDateTime: '',
            problemDesc: 'توقف مفاجئ في 3 شاشات عرض رحلات بصالة المغادرة الداخلية - إعادة تشغيل السيرفر الفرعي وبرمجة المنفذ',
            materialsUsed: 'كابل HDMI نشط + محول شبكة LAN'
          }
        ]
      },
      {
        id: 'sub_pdf_reports',
        textIcon: '📄',
        shortTitle: 'التقارير (PDF)',
        helpText: 'أرشيف التقارير التشغيلية مصنفة تحت القسم ثم النظام ثم اسم التقرير.',
        icon: '📄',
        hasChildSubIcons: true,
        childSubField: 'reportType',
        childSubOptions: [
          {
            code: 'الصيانة الوقائية',
            title: 'الصيانة الوقائية (Preventive maintenance)',
            icon: '🛠️',
            textIcon: '🛠️',
            isGroup: true,
            children: [
              { code: 'يومي', title: 'اليومية', icon: '📅', textIcon: '📅' },
              { code: 'أسبوعي', title: 'الأسبوعية', icon: '📆', textIcon: '📆' },
              { code: 'شهري', title: 'الشهرية', icon: '🗓️', textIcon: '🗓️' },
              { code: 'ربع سنوي', title: 'الربع سنوية', icon: '📊', textIcon: '📊' },
              { code: 'نصف سنوي', title: 'النصف سنوية', icon: '📈', textIcon: '📈' },
              { code: 'سنوي', title: 'السنوية', icon: '📑', textIcon: '📑' }
            ]
          },
          { code: 'INCIDENT REPORT', title: 'INCIDENT REPORT', icon: '⚠️', textIcon: '⚠️' },
          { code: 'MAJOR WORK', title: 'MAJOR WORK', icon: '🏗️', textIcon: '🏗️' },
          { code: 'TRAINING', title: 'TRAINING', icon: '🎓', textIcon: '🎓' },
          { code: 'تقارير السلامة', title: 'تقارير السلامة', icon: '🛡️', textIcon: '🛡️' },
          { code: 'التقارير الفنية', title: 'التقارير الفنية', icon: '📐', textIcon: '📐' }
        ],
        branchByDept: true,
        summaryKeys: [
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' },
          { key: 'reportTitle', label: 'اسم التقرير' },
          { key: 'reportType', label: 'الفترة/التصنيف' },
          { key: 'fileName', label: 'المستند' }
        ],
        fields: [
          { key: 'department', label: 'القسم', type: 'master_dept' },
          { key: 'system', label: 'النظام', type: 'master_system' },
          { key: 'reportTitle', label: 'اسم التقرير', type: 'text' },
          { key: 'reportType', label: 'فئة/نوع التقرير', type: 'select', options: ['يومي', 'أسبوعي', 'شهري', 'ربع سنوي', 'نصف سنوي', 'سنوي', 'INCIDENT REPORT', 'MAJOR WORK', 'TRAINING', 'تقارير السلامة', 'التقارير الفنية'] },
          { key: 'uploadDate', label: 'تاريخ الرفع', type: 'date' },
          { key: 'fileName', label: 'مستند الـ PDF المرفق', type: 'text' }
        ],
        records: [
          {
            id: 'REP-01',
            department: 'الكهرباء (Electrical)',
            system: 'لوحات التوزيع الرئيسية والفرعية',
            reportTitle: 'التقرير التشغيلي اليومي لشبكة الجهد المنخفض',
            reportType: 'يومي',
            uploadDate: '2026-10-18',
            fileName: 'Daily_Electrical_Ops_2026_10_18.pdf'
          },
          {
            id: 'REP-02',
            department: 'الميكانيكا (Mechanical)',
            system: 'نظام مناولة وسيور الأمتعة (BHS)',
            reportTitle: 'تقرير الصيانة الوقائية الأسبوعي لسيور العفش',
            reportType: 'أسبوعي',
            uploadDate: '2026-10-17',
            fileName: 'Weekly_BHS_PM_Report.pdf'
          },
          {
            id: 'REP-03',
            department: 'التكييف والتبريد (HVAC)',
            system: 'نظام التبريد المركزي (Chillers & AHU)',
            reportTitle: 'التقرير الشهري لكفاءة واستهلاك الشلرات المركزية',
            reportType: 'شهري',
            uploadDate: '2026-10-01',
            fileName: 'Monthly_Chillers_Efficiency.pdf'
          },
          {
            id: 'REP-04',
            department: 'الإنارة الملاحية (AFL)',
            system: 'نظام الإنارة الملاحية للمدرج (AGL)',
            reportTitle: 'تقرير عطل إنارة الممر التكتيكي الغربي',
            reportType: 'INCIDENT REPORT',
            uploadDate: '2026-10-14',
            fileName: 'Incident_Taxiway_Light.pdf'
          },
          {
            id: 'REP-05',
            department: 'التكييف والتبريد (HVAC)',
            system: 'نظام التبريد المركزي (Chillers & AHU)',
            reportTitle: 'تقرير العمرة الشاملة للضاغط رقم 2 بشلر الصالة',
            reportType: 'MAJOR WORK',
            uploadDate: '2026-10-10',
            fileName: 'Chiller_Major_Overhaul_02.pdf'
          },
          {
            id: 'REP-06',
            department: 'الإنارة الملاحية (AFL)',
            system: 'نظام الإنارة الملاحية للمدرج (AGL)',
            reportTitle: 'تقرير تدريب الفنيين الميداني على معايرة الإشارات',
            reportType: 'TRAINING',
            uploadDate: '2026-10-12',
            fileName: 'AFL_Field_Calibration_Training.pdf'
          },
          {
            id: 'REP-07',
            department: 'الميكانيكا (Mechanical)',
            system: 'نظام مكافحة الحريق والإنذار (Fire Fighting)',
            reportTitle: 'تقرير السلامة التشغيلية وفحص شبكات الإطفاء بمبنى الركاب',
            reportType: 'تقارير السلامة',
            uploadDate: '2026-10-18',
            fileName: 'Safety_Audit_Terminal_Fire_System.pdf'
          },
          {
            id: 'REP-08',
            department: 'الإنارة الملاحية (AFL)',
            system: 'نظام الإنارة الملاحية للمدرج (AGL)',
            reportTitle: 'تقرير تقييم السلامة الميدانية لحركة الطائرات والممرات الملاحية',
            reportType: 'تقارير السلامة',
            uploadDate: '2026-10-16',
            fileName: 'Airside_Safety_Inspection_AFL.pdf'
          },
          {
            id: 'REP-09',
            department: 'الكهرباء (Electrical)',
            system: 'المولدات الاحتياطية ومحطات التحويل',
            reportTitle: 'التقرير الفني لتقييم كفاءة العوازل وتحليل الأحمال للقطاع الجنوبي',
            reportType: 'التقارير الفنية',
            uploadDate: '2026-10-17',
            fileName: 'Technical_Assessment_Substation_Loads.pdf'
          },
          {
            id: 'REP-10',
            department: 'التكييف والتبريد (HVAC)',
            system: 'نظام التبريد المركزي (Chillers & AHU)',
            reportTitle: 'التقرير الفني لاختبار كفاءة ضواغط الشلرات رقم 3 و 4',
            reportType: 'التقارير الفنية',
            uploadDate: '2026-10-15',
            fileName: 'HVAC_Technical_Audit_Chillers.pdf'
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. قسم الجولات (ملاحظات الجولات اليومية) - بداخله إحصاءات التذاكر + الـ 12 قسماً كأيقونات فرعية!
  // --------------------------------------------------------------------------
  {
    id: 'mod_inspection_tours',
    textIcon: '📋',
    shortTitle: 'قسم الجولات',
    excelName: 'ملاحظات الجولات اليوميه',
    fullTitle: 'ملاحظات الجولات اليومية (التذاكر والأقسام الـ 12)',
    helpText: 'متابعة مؤشرات أداء التذاكر الميدانية، أزمنة الاستجابة والصيانة، وتوزيع الملاحظات على الأقسام الفنية الـ 12.',
    icon: ICON_PATHS.Janitorial,
    badge: 5,
    isInspectionToursHub: true,
    subSections: []
  },

  // --------------------------------------------------------------------------
  // 3. المستودع (Warehouse: SPR, MRF, CASH PURCHASE, STOCK)
  // --------------------------------------------------------------------------
  {
    id: 'mod_warehouse',
    textIcon: '📦',
    shortTitle: 'المستودع',
    excelName: 'المستودع',
    fullTitle: 'المستودع (SPR | MRF | CASH PURCHASE | STOCK)',
    helpText: 'إدارة طلبات الشراء (SPR)، طلبات صرف المواد (MRF)، المشتريات النقدية، ومراقبة أرصدة المخزون.',
    icon: ICON_PATHS.Warehouse,
    badge: 0,
    subSections: [
      {
        id: 'sub_spr',
        textIcon: '🛒',
        shortTitle: 'طلبات الشراء SPR',
        helpText: 'متابعة طلبات الشراء لقطع الغيار والمواد التشغيلية وحالة استلامها بالمستودع.',
        icon: ICON_PATHS.Warehouse,
        summaryKeys: [
          { key: 'sprNo', label: 'SPR NO' },
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' }
        ],
        fields: [
          { key: 'sprNo', label: 'رقم SPR (SPR NO)', type: 'text' },
          { key: 'createdDate', label: 'تاريخ الإنشاء', type: 'date' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'attachmentNo', label: 'رقم المرفق', type: 'text' },
          { key: 'partName', label: 'القطعة المطلوبة', type: 'text' },
          { key: 'reqQty', label: 'العدد المطلوب', type: 'number' },
          { key: 'recQty', label: 'العدد المستلم', type: 'number' },
          { key: 'recDate', label: 'تاريخ الاستلام', type: 'date' }
        ],
        records: [
          { id: 'SPR-01', sprNo: 'SPR-2026-0041', createdDate: '2026-10-12', department: 'الإنارة الملاحية (AFL)', system: 'نظام الإنارة الملاحية للمدرج (AGL)', partName: 'كشاف إنارة مدرج LED متكامل 200W', reqQty: 20, recQty: 20, recDate: '2026-10-16', attachmentNo: 'ATT-881' }
        ]
      },
      {
        id: 'sub_mrf',
        textIcon: '📤',
        shortTitle: 'صرف المواد MRF',
        helpText: 'تسجيل طلبات صرف المواد وقطع الغيار للأقسام والأنظمة الفنية بالمطار.',
        icon: ICON_PATHS.Warehouse,
        summaryKeys: [
          { key: 'mrfNo', label: 'MRF NO' },
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' }
        ],
        fields: [
          { key: 'mrfNo', label: 'رقم MRF (MRF NO)', type: 'text' },
          { key: 'createdDate', label: 'تاريخ الإنشاء', type: 'date' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'attachmentNo', label: 'رقم المرفق', type: 'text' },
          { key: 'partName', label: 'القطعة المطلوبة', type: 'text' },
          { key: 'reqQty', label: 'العدد المطلوب', type: 'number' },
          { key: 'recQty', label: 'العدد المستلم', type: 'number' },
          { key: 'recDate', label: 'تاريخ الاستلام', type: 'date' },
          { key: 'notes', label: 'ملاحظات', type: 'textarea' }
        ],
        records: [
          { id: 'MRF-01', mrfNo: 'MRF-2026-0118', createdDate: '2026-10-14', department: 'الميكانيكا (Mechanical)', system: 'نظام مناولة وسيور الأمتعة (BHS)', partName: 'رولمان بلي محوري لسيور العفش', reqQty: 12, recQty: 12, recDate: '2026-10-15', attachmentNo: 'ATT-502', notes: 'صرف عاجل لصيانة سير صالة القدوم' }
        ]
      },
      {
        id: 'sub_cash',
        textIcon: '💵',
        shortTitle: 'CASH PURCHASE',
        helpText: 'توثيق المشتريات النقدية العاجلة لتأمين احتياجات الصيانة والتشغيل.',
        icon: ICON_PATHS.Warehouse,
        summaryKeys: [
          { key: 'orderNo', label: 'رقم الطلب' },
          { key: 'department', label: 'القسم' },
          { key: 'date', label: 'التاريخ' }
        ],
        fields: [
          { key: 'orderNo', label: 'رقم الطلب', type: 'text' },
          { key: 'date', label: 'تاريخ الطلب', type: 'date' },
          { key: 'itemName', label: 'اسم القطعة / المادة', type: 'text' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'amount', label: 'المبلغ (ريال)', type: 'number' },
          { key: 'purchaseDate', label: 'تاريخ الشراء', type: 'date' }
        ],
        records: [
          { id: 'CP-01', orderNo: 'CP-2026-089', date: '2026-10-16', itemName: 'قاطع فرعي 63A Schneider', department: 'الكهرباء (Electrical)', system: 'نظام المولدات الاحتياطية ولوحات ATS', purchaseDate: '2026-10-16', amount: 1450 }
        ]
      },
      {
        id: 'sub_stock',
        textIcon: '📊',
        shortTitle: 'المخزون STOCK',
        helpText: 'مراقبة أرصدة الأصناف المخزنية وحساب الكمية المتوفرة تلقائياً بناءً على الوارد والمنصرف.',
        icon: ICON_PATHS.Warehouse,
        isAutoStock: true,
        branchByDept: true,
        summaryKeys: [
          { key: 'department', label: 'القسم' },
          { key: 'itemName', label: 'اسم الصنف' },
          { key: 'availableQty', label: 'الكمية المتوفرة' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'itemName', label: 'اسم الصنف', type: 'master_catalog_item' },
          { key: 'prevQty', label: 'الرصيد السابق', type: 'number' },
          { key: 'incomingQty', label: 'الكمية الواردة (+)', type: 'number' },
          { key: 'issuedQty', label: 'الكمية المصروفة (-)', type: 'number' },
          { key: 'availableQty', label: 'الكمية المتوفرة (=)', type: 'readonly_calc' }
        ],
        records: [
          { id: 'STK-01', itemName: 'كشاف إنارة مدرج LED متكامل 200W', department: 'الإنارة الملاحية (AFL)', prevQty: 45, incomingQty: 20, issuedQty: 8, availableQty: 57 },
          { id: 'STK-02', itemName: 'ضاغط تبريد ترددي (Compressor 25HP)', department: 'التكييف والتبريد (HVAC)', prevQty: 6, incomingQty: 2, issuedQty: 1, availableQty: 7 },
          { id: 'STK-03', itemName: 'سير مطاطي مقوى لخط العفش (BHS Belt)', department: 'الميكانيكا (Mechanical)', prevQty: 12, incomingQty: 5, issuedQty: 3, availableQty: 14 }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. شؤون العمال (HR: 7 تفرعات رئيسية + الحضور يتفرع إلى وردية A, B, C)
  // --------------------------------------------------------------------------
  {
    id: 'mod_hr',
    textIcon: '👥',
    shortTitle: 'شؤون العمال',
    excelName: 'شئون العمال',
    fullTitle: 'شؤون العمال والورديات والإجازات',
    helpText: 'إدارة جداول الورديات اليومية (A, B, C)، الإجازات الدورية والمرضية، حالات الغياب، والاحتياج الوظيفي.',
    icon: ICON_PATHS.MotorPool,
    badge: 0,
    subSections: [
      {
        id: 'sub_leaves_scheduled',
        textIcon: '📅',
        shortTitle: 'الإجازات المجدولة',
        helpText: 'سجل متابعة إجازات الموظفين والفنيين وتواريخ البدء والمباشرة.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'startDate', label: 'تاريخ البدء' },
          { key: 'endDate', label: 'تاريخ النهاية' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'startDate', label: 'تاريخ بدء الإجازة', type: 'date' },
          { key: 'endDate', label: 'تاريخ نهاية الإجازة', type: 'date' }
        ],
        records: [
          { id: 'LVS-01', employee: 'حسام الدين مصطفى', startDate: '2026-11-01', endDate: '2026-11-20' }
        ]
      },
      {
        id: 'sub_leaves_active',
        textIcon: '🏖️',
        shortTitle: 'الإجازات النشطة',
        helpText: 'سجل متابعة إجازات الموظفين والفنيين وتواريخ البدء والمباشرة.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'startDate', label: 'تاريخ البدء' },
          { key: 'endDate', label: 'تاريخ النهاية' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'startDate', label: 'تاريخ بدء الإجازة', type: 'date' },
          { key: 'endDate', label: 'تاريخ نهاية الإجازة', type: 'date' }
        ],
        records: [
          { id: 'LVA-01', employee: 'ياسر فهد السبيعي', startDate: '2026-10-10', endDate: '2026-10-25' }
        ]
      },
      {
        id: 'sub_leaves_sick',
        textIcon: '🏥',
        shortTitle: 'الإجازات المرضية',
        helpText: 'سجل متابعة إجازات الموظفين والفنيين وتواريخ البدء والمباشرة.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'startDate', label: 'تاريخ البدء' },
          { key: 'endDate', label: 'تاريخ النهاية' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'startDate', label: 'تاريخ بدء الإجازة', type: 'date' },
          { key: 'endDate', label: 'تاريخ نهاية الإجازة', type: 'date' }
        ],
        records: [
          { id: 'LVK-01', employee: 'رامي كمال النجار', startDate: '2026-10-16', endDate: '2026-10-20' }
        ]
      },
      {
        id: 'sub_attendance',
        textIcon: '🕒',
        shortTitle: 'الحضور (الورديات)',
        helpText: 'متابعة كشوف الحضور وتوزيع الفنيين على الأقسام حسب الورديات التشغيلية (A, B, C).',
        icon: ICON_PATHS.MotorPool,
        hasChildSubIcons: true, // يعرض أيقونات (وردية A، وردية B، وردية C) كفرع داخلي!
        childSubField: 'shift',
        childSubOptions: [
          { code: 'وردية A', title: 'وردية A', icon: ICON_PATHS.MotorPool },
          { code: 'وردية B', title: 'وردية B', icon: ICON_PATHS.MotorPool },
          { code: 'وردية C', title: 'وردية C', icon: ICON_PATHS.MotorPool }
        ],
        summaryKeys: [
          { key: 'shift', label: 'الوردية' },
          { key: 'department', label: 'القسم' },
          { key: 'technician', label: 'اسم الفني' }
        ],
        fields: [
          { key: 'shift', label: 'الوردية', type: 'select', options: ['وردية A', 'وردية B', 'وردية C'] },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'technician', label: 'اسم الفني', type: 'master_employee' }
        ],
        records: [
          { id: 'ATT-01', shift: 'وردية A', department: 'الكهرباء (Electrical)', technician: 'أحمد محمود الشمراني' },
          { id: 'ATT-02', shift: 'وردية A', department: 'التكييف والتبريد (HVAC)', technician: 'محمد عبد الله القحطاني' },
          { id: 'ATT-03', shift: 'وردية B', department: 'الميكانيكا (Mechanical)', technician: 'سعيد عوض المالكي' },
          { id: 'ATT-04', shift: 'وردية C', department: 'محطة القوى (Power Plant)', technician: 'عبد العزيز صالح الشهري' }
        ]
      },
      {
        id: 'sub_absence',
        textIcon: '❌',
        shortTitle: 'الغياب',
        helpText: 'توثيق حالات الغياب اليومي ومتابعة الإجراءات الإدارية.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'absenceDate', label: 'تاريخ الغياب' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'absenceDate', label: 'تاريخ الغياب', type: 'date' }
        ],
        records: [
          { id: 'ABS-01', employee: 'سعيد عوض المالكي', absenceDate: '2026-10-11' }
        ]
      },
      {
        id: 'sub_final_exit',
        textIcon: '🛫',
        shortTitle: 'الخروج النهائي',
        helpText: 'متابعة إجراءات الخروج النهائي وإخلاء الطرف وتاريخ آخر يوم عمل.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'lastDayDate', label: 'تاريخ آخر دوام' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'lastDayDate', label: 'تاريخ آخر دوام', type: 'date' }
        ],
        records: [
          { id: 'EXT-01', employee: 'نايف حسن العمري', lastDayDate: '2026-10-31' }
        ]
      },
      {
        id: 'sub_staffing_shortage',
        textIcon: '📉',
        shortTitle: 'النقص في العمالة',
        helpText: 'رصد الوظائف الفنية الشاغرة واحتياجات الدعم في الأقسام التشغيلية.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'vacancyTitle', label: 'اسم الوظيفة الشاغرة' },
          { key: 'department', label: 'القسم' }
        ],
        fields: [
          { key: 'vacancyTitle', label: 'اسم الوظيفة الشاغرة', type: 'text' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' }
        ],
        records: [
          { id: 'VAC-01', vacancyTitle: 'فني أول أنظمة إنارة مدرج (AGL)', department: 'الإنارة الملاحية (AFL)' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. سجل الأصول (Assets Register - يتفرع حسب القسم -> النظام -> الأصل)
  // --------------------------------------------------------------------------
  {
    id: 'mod_assets',
    textIcon: '🏛️',
    shortTitle: 'سجل الأصول',
    excelName: 'سجل الاصول',
    fullTitle: 'سجل الأصول والمعدات الفنية',
    helpText: 'قاعدة بيانات الأصول والمعدات التشغيلية بالمطار مصنفة حسب الأقسام والأنظمة والمواقع.',
    icon: ICON_PATHS.Building,
    badge: 0,
    subSections: [
      {
        id: 'sub_assets_register',
        textIcon: '🏛️',
        shortTitle: 'سجل الأصول',
        helpText: 'اختر القسم لاستعراض أو إضافة الأصول التابعة له (النظام، اسم الأصل، العدد، الموديل، الشركة المصنعة، الموقع، والصورة).',
        icon: ICON_PATHS.Building,
        branchByDept: true,
        summaryKeys: [
          { key: 'department', label: 'القسم' },
          { key: 'system', label: 'النظام' },
          { key: 'assetName', label: 'اسم الأصل' },
          { key: 'count', label: 'العدد' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'assetName', label: 'اسم الأصل', type: 'master_catalog_asset' },
          { key: 'count', label: 'الكمية / العدد', type: 'number' },
          { key: 'model', label: 'الموديل', type: 'text' },
          { key: 'manufacturer', label: 'الشركة المصنعة', type: 'text' },
          { key: 'location', label: 'الموقع', type: 'master_location' },
          { key: 'imageNote', label: 'الصورة', type: 'select', options: ['صورة الأصل مرفقة ✅', 'بانتظار التصوير'] }
        ],
        records: [
          { id: 'AST-01', assetName: 'مولد كهرباء احتياطي CAT 2000KVA', department: 'محطة القوى (Power Plant)', system: 'نظام المولدات الاحتياطية ولوحات ATS', location: 'محطة الكهرباء الرئيسية والمولدات', model: 'CAT 3516B', manufacturer: 'Caterpillar', count: 3, imageNote: 'صورة الأصل مرفقة ✅' },
          { id: 'AST-02', assetName: 'وحدة تبريد مركزي Chiller York #2', department: 'التكييف والتبريد (HVAC)', system: 'نظام التبريد المركزي (Chillers & AHU)', location: 'صالة الركاب الدولية 1', model: 'YK-Centrifugal 600TR', manufacturer: 'York', count: 4, imageNote: 'صورة الأصل مرفقة ✅' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. الوقود (Fuel: يتفرع إلى المخزون والصرف + التوريد -> محطة الوقود + محطة الكهرباء)
  // --------------------------------------------------------------------------
  {
    id: 'mod_fuel',
    textIcon: '⛽',
    shortTitle: 'الوقود',
    excelName: 'الوقود',
    fullTitle: 'الوقود (المخزون والصرف | التوريد)',
    helpText: 'مراقبة أرصدة الوقود، الصرف اليومي، وعمليات التوريد في محطة الوقود ومحطة الكهرباء.',
    icon: ICON_PATHS.PowerPlant,
    badge: 0,
    subSections: [
      {
        id: 'sub_fuel_stock_dispense',
        textIcon: '⛽',
        shortTitle: 'المخزون والصرف',
        helpText: 'متابعة السعات والأرصدة المتوفرة وتسجيل كميات الصرف اليومي لخزانات محطة الوقود ومحطة الكهرباء.',
        icon: ICON_PATHS.PowerPlant,
        isInteractiveTanks: true,
        tankMode: 'dispense',
        tankCategoryFilter: 'وقود',
        stationFilterOptions: ['الكل', 'محطة الوقود', 'محطة الكهرباء']
      },
      {
        id: 'sub_fuel_supply',
        textIcon: '🛢️',
        shortTitle: 'التوريد',
        helpText: 'توثيق دفعات توريد الوقود باللتر وتحديث أرصدة الخزانات فور الاستلام.',
        icon: ICON_PATHS.PowerPlant,
        isInteractiveTanks: true,
        tankMode: 'supply',
        tankCategoryFilter: 'وقود',
        stationFilterOptions: ['الكل', 'محطة الوقود', 'محطة الكهرباء']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 7. الأعمال اليومية (Daily Works - تتفرع حسب القسم)
  // --------------------------------------------------------------------------
  {
    id: 'mod_daily_works',
    textIcon: '🛠️',
    shortTitle: 'الأعمال اليومية',
    excelName: 'الاعمال اليوميه',
    fullTitle: 'الأعمال اليومية للأقسام',
    helpText: 'توثيق أعمال الصيانة الوقائية والمهام التشغيلية اليومية للأقسام الفنية بالمطار.',
    icon: ICON_PATHS.AFL,
    badge: 0,
    subSections: [
      {
        id: 'sub_daily_works_log',
        textIcon: '🛠️',
        shortTitle: 'الأعمال اليومية',
        helpText: 'توثيق الأعمال اليومية لكل قسم وموقع العمل وزمن البدء والانتهاء وهل تم إيقاف أي خدمة بالمطار.',
        icon: ICON_PATHS.AFL,
        branchByDept: true,
        summaryKeys: [
          { key: 'department', label: 'القسم' },
          { key: 'workDesc', label: 'وصف العمل' },
          { key: 'serviceStopped', label: 'إيقاف خدمة؟' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'workDesc', label: 'وصف العمل', type: 'textarea' },
          { key: 'workLocation', label: 'موقع العمل', type: 'master_location' },
          { key: 'technician', label: 'الفنيين المشاركين', type: 'master_employee' },
          { key: 'startTime', label: 'زمن البدء', type: 'time' },
          { key: 'endTime', label: 'زمن الانتهاء', type: 'time' },
          { key: 'serviceStopped', label: 'تأثر خدمات المطار', type: 'select', options: ['لا', 'نعم'] }
        ],
        records: [
          { id: 'DW-01', department: 'الإنارة الملاحية (AFL)', workLocation: 'المدرج الرئيسي 18L/36R وممرات الطائرات', workDesc: 'فحص الجهد وتنظيف عدسات الإنارة الملاحية للممر الموازي', startTime: '06:00', endTime: '08:00', serviceStopped: 'لا' },
          { id: 'DW-02', department: 'التكييف والتبريد (HVAC)', workLocation: 'صالة الركاب الدولية 1', workDesc: 'غسيل وتعقيم فلاتر وحدات مناولة الهواء AHU-04', startTime: '09:00', endTime: '11:30', serviceStopped: 'لا' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 8. المياه (التوريد اليومي) (Water Tanks: الرئيسي، الاحتياطي، إطفاء الحريق، التوريد اليومي)
  // --------------------------------------------------------------------------
  {
    id: 'mod_water',
    textIcon: '💧',
    shortTitle: 'المياه',
    excelName: 'المياه ( التوريد اليومي)',
    fullTitle: 'المياه (الخزانات والتوريد اليومي)',
    helpText: 'متابعة منسوب الخزان الرئيسي، الخزان الاحتياطي، وخزان إطفاء الحريق وتسجيل التوريد والاستهلاك اليومي.',
    icon: ICON_PATHS.PowerPlant,
    badge: 0,
    subSections: [
      {
        id: 'sub_water_tanks',
        textIcon: '💧',
        shortTitle: 'خزانات المياه والتوريد',
        helpText: 'متابعة الخزان الرئيسي، الاحتياطي، وخزان إطفاء الحريق (السعة ثابتة بقفل) مع إدخال التوريد اليومي باللتر.',
        icon: ICON_PATHS.PowerPlant,
        isInteractiveTanks: true,
        tankMode: 'both',
        tankCategoryFilter: 'مياه',
        stationFilterOptions: []
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 9. الصرف الصحي (السحب اليومي) (Sewage: السيارة الأولى، الثانية، الثالثة، الرابعة)
  // --------------------------------------------------------------------------
  {
    id: 'mod_sewage',
    textIcon: '🚛',
    shortTitle: 'الصرف الصحي',
    excelName: 'الصرف الصحي (السحب اليومي)',
    fullTitle: 'الصرف الصحي (السحب اليومي للسيارات 1 - 4)',
    helpText: 'متابعة عمليات السحب اليومي لصهاريج الصرف الصحي (السيارات 1 إلى 4) والكميات المسحوبة.',
    icon: ICON_PATHS.PestControl,
    badge: 0,
    subSections: [
      {
        id: 'sub_sewage_cars',
        textIcon: '🚛',
        shortTitle: 'سحب الصرف الصحي',
        helpText: 'تسجيل نقلات السحب اليومي حسب رقم السيارة ونوع الصهريج (ضاغط / ترلة) والكمية المسحوبة باللتر.',
        icon: ICON_PATHS.PestControl,
        hasChildSubIcons: true,
        childSubField: 'vehicleNo',
        childSubOptions: [
          { code: 'السيارة الأولى', title: 'السيارة الأولى', icon: ICON_PATHS.MotorPool },
          { code: 'السيارة الثانية', title: 'السيارة الثانية', icon: ICON_PATHS.MotorPool },
          { code: 'السيارة الثالثة', title: 'السيارة الثالثة', icon: ICON_PATHS.MotorPool },
          { code: 'السيارة الرابعة', title: 'السيارة الرابعة', icon: ICON_PATHS.MotorPool }
        ],
        summaryKeys: [
          { key: 'vehicleNo', label: 'السيارة' },
          { key: 'pullTime', label: 'الزمن' },
          { key: 'tankerType', label: 'النوع' },
          { key: 'pulledQty', label: 'الكمية (لتر)' }
        ],
        fields: [
          { key: 'vehicleNo', label: 'السيارة', type: 'select', options: ['السيارة الأولى', 'السيارة الثانية', 'السيارة الثالثة', 'السيارة الرابعة'] },
          { key: 'pullTime', label: 'الزمن', type: 'datetime-local' },
          { key: 'tankerType', label: 'نوع الصهريج', type: 'select', options: ['ضاغط', 'ترلة'] },
          { key: 'pulledQty', label: 'الكمية المسحوبة (لتر)', type: 'number' }
        ],
        records: [
          { id: 'SWG-01', vehicleNo: 'السيارة الأولى', tankerType: 'ضاغط', pulledQty: 12000, pullTime: '2026-10-18T07:30' },
          { id: 'SWG-02', vehicleNo: 'السيارة الثانية', tankerType: 'ترلة', pulledQty: 22000, pullTime: '2026-10-18T09:45' },
          { id: 'SWG-03', vehicleNo: 'السيارة الثالثة', tankerType: 'ضاغط', pulledQty: 12000, pullTime: '2026-10-18T11:15' },
          { id: 'SWG-04', vehicleNo: 'السيارة الرابعة', tankerType: 'ترلة', pulledQty: 24000, pullTime: '2026-10-18T14:00' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 10. النظام / المعدات المتعطلة (Faulty Equipment - تتفرع حسب القسم)
  // --------------------------------------------------------------------------
  {
    id: 'mod_faulty',
    textIcon: '⚠️',
    shortTitle: 'المعدات المتعطلة',
    excelName: 'النظام/المعدات المتعطله',
    fullTitle: 'سجل الأنظمة والمعدات المتعطلة',
    helpText: 'متابعة الأعطال الفنية القائمة وحالة الإصلاح وتوفر قطع الغيار حسب كل قسم.',
    icon: ICON_PATHS.Mechanical,
    badge: 2,
    subSections: [
      {
        id: 'sub_faulty_equip',
        textIcon: '⚠️',
        shortTitle: 'المعدات المتعطلة',
        helpText: 'رصد الأنظمة والمعدات المتعطلة مصنفة حسب القسم المختص.',
        icon: ICON_PATHS.Mechanical,
        branchByDept: true,
        summaryKeys: [
          { key: 'department', label: 'القسم' },
          { key: 'equipmentName', label: 'النظام/المعدة' },
          { key: 'faultStatus', label: 'حالة العطل' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'equipmentName', label: 'اسم النظام / المعدة', type: 'text' },
          { key: 'faultDate', label: 'تاريخ العطل', type: 'date' },
          { key: 'faultDesc', label: 'وصف العطل', type: 'textarea' },
          { key: 'faultStatus', label: 'حالة العطل', type: 'select', options: ['تحت الصيانة', 'بانتظار قطعة غيار', 'تم الإصلاح والتشغيل'] },
          { key: 'notes', label: 'ملاحظات', type: 'textarea' }
        ],
        records: [
          { id: 'FEQ-01', department: 'الميكانيكا (Mechanical)', equipmentName: 'ميزان عفش كاونتر رقم 14', faultDate: '2026-10-17', faultDesc: 'عطل في خلية الوزن الإلكترونية', faultStatus: 'بانتظار قطعة غيار', notes: 'تم تحويل المسافرين للكاونتر 15' },
          { id: 'FEQ-02', department: 'الاتصالات (Communication)', equipmentName: 'بوابة تفتيش أمني X-Ray رقم 3', faultDate: '2026-10-18', faultDesc: 'توقف سير التغذية الداخلي', faultStatus: 'تحت الصيانة', notes: 'الفني متواجد في الموقع' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 11. انقطاعات الخدمات (Service Outages: الكهرباء، المياه، الهاتف)
  // --------------------------------------------------------------------------
  {
    id: 'mod_outages',
    textIcon: '🔌',
    shortTitle: 'انقطاع الخدمات',
    excelName: 'انقطاعات الخدمات',
    fullTitle: 'انقطاعات الخدمات (الكهرباء | المياه | الهاتف)',
    helpText: 'توثيق حالات انقطاع أو تذبذب خدمات الكهرباء والمياه والهاتف والمرافق المتأثرة وزمن استعادة الخدمة.',
    icon: ICON_PATHS.Electrical,
    badge: 0,
    subSections: [
      {
        id: 'sub_service_outages',
        textIcon: '🔌',
        shortTitle: 'انقطاعات الخدمات',
        helpText: 'اختر الخدمة (الكهرباء، المياه، الهاتف) لعرض أو تسجيل الانقطاعات والتذبذب.',
        icon: ICON_PATHS.Electrical,
        hasChildSubIcons: true,
        childSubField: 'serviceType',
        childSubOptions: [
          { code: 'الكهرباء', title: 'الكهرباء', icon: ICON_PATHS.Electrical },
          { code: 'المياه', title: 'المياه', icon: ICON_PATHS.PowerPlant },
          { code: 'الهاتف', title: 'الهاتف', icon: ICON_PATHS.Communication }
        ],
        summaryKeys: [
          { key: 'serviceType', label: 'الخدمة' },
          { key: 'affectedFacility', label: 'المرفق المتأثر' },
          { key: 'scheduled', label: 'مجدول؟' }
        ],
        fields: [
          { key: 'serviceType', label: 'نوع الخدمة', type: 'select', options: ['الكهرباء', 'المياه', 'الهاتف'] },
          { key: 'affectedFacility', label: 'المرفق المتأثر', type: 'master_location' },
          { key: 'outageStart', label: 'زمن الانقطاع', type: 'datetime-local' },
          { key: 'outageEnd', label: 'زمن عودة الخدمة', type: 'datetime-local' },
          { key: 'scheduled', label: 'مجدول مسبقاً', type: 'select', options: ['لا', 'نعم'] },
          { key: 'fluctuation', label: 'تذبذب التيار الكهربائي', type: 'select', options: ['لا', 'نعم'] },
          { key: 'fluctuationTime', label: 'زمن التذبذب', type: 'text' }
        ],
        records: [
          { id: 'OUT-01', serviceType: 'الكهرباء', affectedFacility: 'صالة الركاب الداخلية 2', outageStart: '2026-10-15T03:10', outageEnd: '2026-10-15T03:12', scheduled: 'لا', fluctuation: 'نعم', fluctuationTime: '03:10 (لمدة 8 ثوانٍ حتى دخول المولد)' },
          { id: 'OUT-02', serviceType: 'المياه', affectedFacility: 'مبنى الشحن الجوي والجمارك', outageStart: '2026-10-16T01:00', outageEnd: '2026-10-16T03:00', scheduled: 'نعم', fluctuation: 'لا', fluctuationTime: '—' },
          { id: 'OUT-03', serviceType: 'الهاتف', affectedFacility: 'صالة التشريفات وكبار الشخصيات (VIP)', outageStart: '2026-10-14T10:00', outageEnd: '2026-10-14T10:25', scheduled: 'نعم', fluctuation: 'لا', fluctuationTime: '—' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 12. الأعمال تحت الإنشاء بواسطة مقاولين خارجيين (Contractors)
  // --------------------------------------------------------------------------
  {
    id: 'mod_contractors',
    textIcon: '🏗️',
    shortTitle: 'أعمال المقاولين',
    excelName: 'الاعمال تحت الانشاء بواسطة مقاولين خارجيين',
    fullTitle: 'الأعمال تحت الإنشاء بواسطة مقاولين خارجيين',
    helpText: 'إدارة الأعمال الإنشائية الجارية بواسطة المقاولين الخارجيين وجدولة فترات فصل الخدمات.',
    icon: ICON_PATHS.PG,
    badge: 0,
    subSections: [
      {
        id: 'sub_contractors',
        textIcon: '🏗️',
        shortTitle: 'مشاريع المقاولين',
        helpText: 'سجل أعمال المقاولين الخارجيين وفترات قطع الخدمات المجدولة للمشاريع.',
        icon: ICON_PATHS.PG,
        summaryKeys: [
          { key: 'contractorName', label: 'اسم الشركة/المقاول' },
          { key: 'workLocation', label: 'موقع العمل' },
          { key: 'systemWorkType', label: 'النظام/نوع العمل' }
        ],
        fields: [
          { key: 'contractorName', label: 'اسم الشركة / المقاول', type: 'master_catalog_contractor' },
          { key: 'workLocation', label: 'موقع العمل', type: 'master_location' },
          { key: 'systemWorkType', label: 'النظام / نوع العمل', type: 'text' },
          { key: 'startDate', label: 'تاريخ بدء العمل', type: 'date' },
          { key: 'endDate', label: 'تاريخ انتهاء العمل', type: 'date' },
          { key: 'serviceCut', label: 'قطع خدمات', type: 'select', options: ['لا يوجد', 'يوجد قطع خدمة'] },
          { key: 'cutStartTime', label: 'زمن بدء قطع الخدمة', type: 'datetime-local' },
          { key: 'cutEndTime', label: 'زمن انتهاء قطع الخدمة', type: 'datetime-local' },
          { key: 'affectedEntity', label: 'الجهة المتأثرة من قطع الخدمة', type: 'master_location' }
        ],
        records: [
          { id: 'PRJ-01', contractorName: 'شركة الرواسي للمقاولات الملاحية', workLocation: 'المدرج الرئيسي 18L/36R وممرات الطائرات', systemWorkType: 'تأهيل أكتاف الممر الفرعي Bravo', startDate: '2026-09-01', endDate: '2026-12-30', serviceCut: 'يوجد قطع خدمة', cutStartTime: '2026-10-20T01:00', cutEndTime: '2026-10-20T04:00', affectedEntity: 'المدرج الرئيسي 18L/36R وممرات الطائرات' }
        ]
      }
    ]
  }
];

// RBAC ROLES & PERMISSIONS MATRIX STATE (متاحة في تبويب المزيد)
// ============================================================================
const RBAC_ROLES = [
  { id: 'role_admin', name: 'مدير النظام (الوضع الحالي)', badge: 'كامل الصلاحيات', active: true, modules: 'جميع الوحدات الـ 12 + الإعدادات والبيانات الأساسية' },
  { id: 'role_control', name: 'مهندس محطة العمل (Work Control)', badge: 'تشغيلي', active: false, modules: 'محطة العمل، البلاغات، أوامر العمل، التقارير، انقطاع الخدمات' },
  { id: 'role_inspector', name: 'مفتش الجولات الميدانية (Inspector)', badge: 'ميداني', active: false, modules: 'قسم الجولات والتذاكر، الأعمال اليومية، المعدات المتعطلة' },
  { id: 'role_shift_sup', name: 'مشرف الوردية وشؤون العمال (HR)', badge: 'إشرافي', active: false, modules: 'شؤون العمال، الورديات (A, B, C)، الإجازات، الغياب' },
  { id: 'role_store', name: 'أمين المستودع والوقود (Warehouse)', badge: 'مخزني', active: false, modules: 'المستودع (SPR, MRF, STOCK)، الوقود، المياه' },
  { id: 'role_tech', name: 'فني صيانة (Technician)', badge: 'مقيد مستقبلاً', active: false, modules: 'تنفيذ وإغلاق التذاكر وأوامر العمل المسندة لقسمه فقط' }
];
