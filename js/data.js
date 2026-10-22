// ============================================================================
// 1. MASTER DATA (تُضبط من شاشة المزيد -> الإدارة وتغذي جميع القوائم المنسدلة)
// معتمدة ومطابقة بالكامل لملف: "جميع القوائم المنسدله.xlsx"
// ============================================================================
const MASTER_DATA = {
  departments: [
    { id: 'DEP-01', code: 'AFL', name: 'الانارة الملاحية (AFL)', manager: 'AMUEL', badge: 0, icon: ICON_PATHS.AFL, desc: 'صيانة وتشغيل أنظمة الإنارة الملاحية للمدرج الرئيسي وممرات الطائرات.' },
    { id: 'DEP-02', code: 'Building', name: 'المباني (Building)', manager: 'AJEESH', badge: 0, icon: ICON_PATHS.Building, desc: 'صيانة مرافق الصالات، الأسقف المستعارة، الأعمال المدنية والإنشائية.' },
    { id: 'DEP-03', code: 'ECC', name: 'الاتصالات والالكترونيات (ECC)', manager: 'KAREEM', badge: 0, icon: ICON_PATHS.Communication, desc: 'أنظمة إنذار الحريق، كاميرات المراقبة، الشبكات، والسنترال وشاشات الرحلات.' },
    { id: 'DEP-04', code: 'Electrical', name: 'الكهرباء (Electrical)', manager: 'JAGAN', badge: 0, icon: ICON_PATHS.Electrical, desc: 'شبكات الجهد المنخفض والمتوسط، لوحات التوزيع MDP وRMU، والإنارة الداخلية والخارجية.' },
    { id: 'DEP-05', code: 'HVAC', name: 'التكييف والتبريد (HVAC)', manager: 'JAWEED', badge: 0, icon: ICON_PATHS.HVAC, desc: 'وحدات التكييف المجمعة Package Units، الوحدات الدولابية والمنفصلة ومجاري الهواء.' },
    { id: 'DEP-06', code: 'Mechanical', name: 'الميكانيكا (Mechanical)', manager: 'SHAJU', badge: 0, icon: ICON_PATHS.Mechanical, desc: 'سيور الأمتعة BHS، مضخات المياه الصالحة والصرف الصحي ومضخات مكافحة الحريق.' },
    { id: 'DEP-07', code: 'Motor Pool', name: 'المركبات والمعدات (Motor Pool)', manager: 'AMER', badge: 0, icon: ICON_PATHS.MotorPool, desc: 'صيانة أسطول المركبات والآليات والمعدات الأرضية لمطار حائل الدولي.' },
    { id: 'DEP-08', code: 'P&G', name: 'الارصفة والطرق (P&G)', manager: 'FRIYAD', badge: 0, icon: ICON_PATHS.PG, desc: 'ساحات الطيران الرصفية وغير الرصفية، قنوات تصريف الأمطار، اللوحات والأسوار.' },
    { id: 'DEP-09', code: 'Power Plant', name: 'محطة الكهرباء (Power Plant)', manager: 'ABUKHALID', badge: 0, icon: ICON_PATHS.PowerPlant, desc: 'تشغيل المولدات الكهربائية الاحتياطية، خزانات الوقود، ولوحات المزامنة وATS.' },
    { id: 'DEP-10', code: 'Store', name: 'المستودع (Store)', manager: 'JESHAN', badge: 0, icon: ICON_PATHS.Warehouse, desc: 'إدارة المخزون الفني وقطع الغيار وصرف المواد لفرق الصيانة.' },
    { id: 'DEP-11', code: 'Janitorial', name: 'النظافة (Janitorial)', manager: 'أ. فهد الشمري', badge: 0, icon: ICON_PATHS.Janitorial, desc: 'نظافة وتعقيم صالات الركاب والمرافق العامة والخدمية في المطار.' },
    { id: 'DEP-12', code: 'Landscaping', name: 'التشجير (Landscaping)', manager: 'أ. بدر العنزي', badge: 0, icon: ICON_PATHS.Landscaping, desc: 'المسطحات الخضراء، شبكات الري، وتنسيق الحدائق والمناطق الخارجية.' },
    { id: 'DEP-13', code: 'Pest Control', name: 'مكافحة الحشرات (Pest Control)', manager: 'أ. نواف الرشيدي', badge: 0, icon: ICON_PATHS.PestControl, desc: 'الرش الوقائي ومكافحة الآفات والقوارض في الصالات ومحيط المطار.' },
    { id: 'DEP-14', code: 'HSE', name: 'السلامة والصحة المهنية (HSE)', manager: 'م. خالد الصالح', badge: 0, icon: ICON_PATHS.HSE, desc: 'معايير واشتراطات السلامة المهنية ومتابعة المخاطر والبيئة التشغيلية.' }
  ],
  systems: [
    { id: 'SYS-01', name: 'BHS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-02', name: 'DOMESTICS WATER PUMPS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-03', name: 'SEWAGE PLANT', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-04', name: 'GATE BARRIER', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-05', name: 'EXHAUST FANS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-06', name: 'FIRE PUMP SYSTEM', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-07', name: 'FIRE EXTENGUISHERS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-08', name: 'FIRE HOSE REEL', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-09', name: 'LIFTING STATION AND SEWAGE MANHOLS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-10', name: 'OTHERS', department: 'الميكانيكا (Mechanical)' },
    { id: 'SYS-11', name: 'GENERATORS', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-12', name: 'POWER PLANT FUEL TANK', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-13', name: 'MV Switchgear & Earthing', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-14', name: 'Generator Control & Synchronization', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-15', name: 'UPS & Control Supply', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-16', name: 'Low Voltage Distribution', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-17', name: 'Auxiliary Systems', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-18', name: 'OTHERS', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'SYS-19', name: 'UPS UNITS LESS THAN 3KVA', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-20', name: 'PUBLIC ADRESS SYSTEM', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-21', name: 'RADIO', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-22', name: 'FIRE ALARM', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-23', name: 'VOICE RECORDER SYSTEM', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-24', name: 'Clean Agent Suppression System', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-25', name: 'PABX & Telephones', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-26', name: 'LIFEPACK UNITS', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-27', name: 'SLIDING DOORS', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-28', name: 'OTHERS', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'SYS-29', name: 'SLP', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-30', name: 'MDP', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-31', name: 'RMU', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-32', name: 'DP', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-33', name: 'INDOOR LIGHTING', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-34', name: 'OUTDOOR LIGHTING', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-35', name: 'SOCKETS', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-36', name: 'POWER SUPPLY', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-37', name: 'UPS 40KVA', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-38', name: 'ATS UNITS', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-39', name: 'OTHERS', department: 'الكهرباء (Electrical)' },
    { id: 'SYS-40', name: 'PACKAGE UNITS', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-41', name: 'STAND UNITS', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-42', name: 'SPLIT UNITS', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-43', name: 'WINDOW UNITS', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-44', name: 'AC DUCT', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-45', name: 'AC GRILLES', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-46', name: 'OTHERS', department: 'التكييف والتبريد (HVAC)' },
    { id: 'SYS-47', name: 'BUILDING', department: 'المباني (Building)' },
    { id: 'SYS-48', name: 'CAR TEND', department: 'المباني (Building)' },
    { id: 'SYS-49', name: 'EXTERNAL AREA', department: 'المباني (Building)' },
    { id: 'SYS-50', name: 'OTHERS', department: 'المباني (Building)' },
    { id: 'SYS-51', name: 'AIRSIDE PAVEMENT AREA', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-52', name: 'AIRSIDE UNPAVED AREA', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-53', name: 'LANDSIDE PAVEMENT', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-54', name: 'AIRSIDE RAIN WATER CHANNEL', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-55', name: 'LANDSIDE RAIN WATER CHANNEL', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-56', name: 'CULVERS', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-57', name: 'LANDSIDE INTERLOCK', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-58', name: 'TRAFFIC SIGNS', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-59', name: 'FENCE', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-60', name: 'FENCE GATES', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-61', name: 'OTHERS', department: 'الارصفة والطرق (P&G)' },
    { id: 'SYS-62', name: 'CLUSTER VEHICLES', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'SYS-63', name: 'CLUSTER EQUIPMENTS', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'SYS-64', name: 'ALMAJAL VEHICLES', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'SYS-65', name: 'ALMAJAL EQUIPMENTS', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'SYS-66', name: 'OTHERS', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'SYS-67', name: 'RUNWAY LIGHTS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-68', name: 'TAXIWAY LIGHTS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-69', name: 'PAPI LIGHTS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-70', name: 'BECON LIGHTS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-71', name: 'APRON HIGH MAST LIGHTS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-72', name: 'GUIDANCE SIGNS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-73', name: 'OTHERS', department: 'الانارة الملاحية (AFL)' },
    { id: 'SYS-OTH', name: 'أخرى', department: 'الكل' }
  ],
  locations: [
    { id: 'LOC-01', name: 'صالات المسافرين (terminal)', code: 'terminal', arName: 'صالات المسافرين', type: 'مرفق تشغيلي' },
    { id: 'LOC-02', name: 'مبني الاطفاء (CFR)', code: 'CFR', arName: 'مبني الاطفاء', type: 'مرفق تشغيلي' },
    { id: 'LOC-03', name: 'مبني الاداره (admin bld)', code: 'admin bld', arName: 'مبني الاداره', type: 'مرفق تشغيلي' },
    { id: 'LOC-04', name: 'الشحن الجوي (Cargo)', code: 'Cargo', arName: 'الشحن الجوي', type: 'مرفق تشغيلي' },
    { id: 'LOC-05', name: 'مباني الصيانه (maintenanace bld)', code: 'maintenanace bld', arName: 'مباني الصيانه', type: 'مرفق تشغيلي' },
    { id: 'LOC-06', name: 'الصيانه السعوديه (saudi maintenance)', code: 'saudi maintenance', arName: 'الصيانه السعوديه', type: 'مرفق تشغيلي' },
    { id: 'LOC-07', name: 'مركز المراقبه والتحكم (METCO)', code: 'METCO', arName: 'مركز المراقبه والتحكم', type: 'مرفق تشغيلي' },
    { id: 'LOC-08', name: 'التنفيذي (VIP)', code: 'VIP', arName: 'التنفيذي', type: 'مرفق تشغيلي' },
    { id: 'LOC-09', name: 'الصاله الملكية (Royal terminal)', code: 'Royal terminal', arName: 'الصاله الملكية', type: 'مرفق تشغيلي' },
    { id: 'LOC-10', name: 'مواقف التنفيذي (VIP PARKING)', code: 'VIP PARKING', arName: 'مواقف التنفيذي', type: 'مرفق تشغيلي' },
    { id: 'LOC-11', name: 'مواقف الصالة الملكية (ROYAL PARKING)', code: 'ROYAL PARKING', arName: 'مواقف الصالة الملكية', type: 'مرفق تشغيلي' },
    { id: 'LOC-12', name: 'مباني الشرطة الجويه (RSAF)', code: 'RSAF', arName: 'مباني الشرطة الجويه', type: 'مرفق تشغيلي' },
    { id: 'LOC-13', name: 'سانس (SANS)', code: 'SANS', arName: 'سانس', type: 'مرفق تشغيلي' },
    { id: 'LOC-14', name: 'العياده (CLINIC)', code: 'CLINIC', arName: 'العياده', type: 'مرفق تشغيلي' },
    { id: 'LOC-15', name: 'المسجد (mosque)', code: 'mosque', arName: 'المسجد', type: 'مرفق تشغيلي' },
    { id: 'LOC-16', name: 'مسجد الاطفاء (CFR masjid)', code: 'CFR masjid', arName: 'مسجد الاطفاء', type: 'مرفق تشغيلي' },
    { id: 'LOC-17', name: 'غرفة التحكم في انارة المدرج (AFL control room)', code: 'AFL control room', arName: 'غرفة التحكم في انارة المدرج', type: 'مرفق تشغيلي' },
    { id: 'LOC-18', name: 'المباحث مبني الاداره (ALMABHITH OFFICESIN ADMIN BLD)', code: 'ALMABHITH OFFICESIN ADMIN BLD', arName: 'المباحث مبني الاداره', type: 'مرفق تشغيلي' },
    { id: 'LOC-19', name: 'مكاتب الجوازات بجانب العياده (IMMIGRATION OFFICES NEAR CLINIC)', code: 'IMMIGRATION OFFICES NEAR CLINIC', arName: 'مكاتب الجوازات بجانب العياده', type: 'مرفق تشغيلي' },
    { id: 'LOC-20', name: 'الشرطة المدنية (CIVIL POLICE)', code: 'CIVIL POLICE', arName: 'الشرطة المدنية', type: 'مرفق تشغيلي' },
    { id: 'LOC-21', name: 'شرطة المرور (TRAFFIC POLICE)', code: 'TRAFFIC POLICE', arName: 'شرطة المرور', type: 'مرفق تشغيلي' },
    { id: 'LOC-22', name: 'الشئون الامنية والجوازات - فيلا 13 (VILLA13)', code: 'VILLA13', arName: 'الشئون الامنية والجوازات - فيلا 13', type: 'مرفق تشغيلي' },
    { id: 'LOC-23', name: 'الارصاد الجوي (METIO)', code: 'METIO', arName: 'الارصاد الجوي', type: 'مرفق تشغيلي' },
    { id: 'LOC-24', name: 'مدرج الطيران RUNWAY (RUNWAY)', code: 'RUNWAY', arName: 'مدرج الطيران RUNWAY', type: 'مرفق تشغيلي' },
    { id: 'LOC-25', name: 'TAXIWAY (TAXIWAY)', code: 'TAXIWAY', arName: 'TAXIWAY', type: 'مرفق تشغيلي' },
    { id: 'LOC-26', name: 'منطقة امان مدرج الطيران جانب 18 (RESA SIDE 18)', code: 'RESA SIDE 18', arName: 'منطقة امان مدرج الطيران جانب 18', type: 'مرفق تشغيلي' },
    { id: 'LOC-27', name: 'منطقة امان مدرج الطيران جانب 36 (RESA SIDE 36)', code: 'RESA SIDE 36', arName: 'منطقة امان مدرج الطيران جانب 36', type: 'مرفق تشغيلي' },
    { id: 'LOC-28', name: 'عتيبة المدرج جهة 18 (THRESHOLD SIDE 18)', code: 'THRESHOLD SIDE 18', arName: 'عتيبة المدرج جهة 18', type: 'مرفق تشغيلي' },
    { id: 'LOC-29', name: 'عتيبة المدرج جهة 36 (THRESHOLD SIDE 36)', code: 'THRESHOLD SIDE 36', arName: 'عتيبة المدرج جهة 36', type: 'مرفق تشغيلي' },
    { id: 'LOC-30', name: 'المساحات غير الرصفية في الساحه (UNPAVED AREA IN AIRSIDE)', code: 'UNPAVED AREA IN AIRSIDE', arName: 'المساحات غير الرصفية في الساحه', type: 'مرفق تشغيلي' },
    { id: 'LOC-31', name: 'مواقف الطائرات (APRON)', code: 'APRON', arName: 'مواقف الطائرات', type: 'مرفق تشغيلي' },
    { id: 'LOC-32', name: 'طريق خدمه في ساحة الطيران (SERVICE ROAD IN AIRSIDE)', code: 'SERVICE ROAD IN AIRSIDE', arName: 'طريق خدمه في ساحة الطيران', type: 'مرفق تشغيلي' },
    { id: 'LOC-33', name: 'طريق خدمه في الجانب الارضي (SERVICE ROAD IN LANDSIDE)', code: 'SERVICE ROAD IN LANDSIDE', arName: 'طريق خدمه في الجانب الارضي', type: 'مرفق تشغيلي' },
    { id: 'LOC-34', name: 'المنطقة الخارجية (EXTERNAL AREA)', code: 'EXTERNAL AREA', arName: 'المنطقة الخارجية', type: 'مرفق تشغيلي' },
    { id: 'LOC-35', name: 'مواقف المسافرين (PASSENGERS PARKING)', code: 'PASSENGERS PARKING', arName: 'مواقف المسافرين', type: 'مرفق تشغيلي' },
    { id: 'LOC-36', name: 'مواقف الاداره (ADMIN PARKING)', code: 'ADMIN PARKING', arName: 'مواقف الاداره', type: 'مرفق تشغيلي' },
    { id: 'LOC-37', name: 'بوابة الامن المسانده (SERVICE AREA GATE)', code: 'SERVICE AREA GATE', arName: 'بوابة الامن المسانده', type: 'مرفق تشغيلي' },
    { id: 'LOC-38', name: 'البوابه الرئيسيه مخل المطار (MAIN GATE)', code: 'MAIN GATE', arName: 'البوابه الرئيسيه مخل المطار', type: 'مرفق تشغيلي' },
    { id: 'LOC-39', name: 'بورتاكبن كلستر 2 (PORTACABIN C2)', code: 'PORTACABIN C2', arName: 'بورتاكبن كلستر 2', type: 'مرفق تشغيلي' },
    { id: 'LOC-40', name: 'ابسكو (APSCO)', code: 'APSCO', arName: 'ابسكو', type: 'مرفق تشغيلي' },
    { id: 'LOC-41', name: 'المستودع (STORE)', code: 'STORE', arName: 'المستودع', type: 'مرفق تشغيلي' },
    { id: 'LOC-42', name: 'محطة الكهرباء (POWER PLANT)', code: 'POWER PLANT', arName: 'محطة الكهرباء', type: 'مرفق تشغيلي' },
    { id: 'LOC-43', name: 'محطة المياه (WATER PLANT)', code: 'WATER PLANT', arName: 'محطة المياه', type: 'مرفق تشغيلي' },
    { id: 'LOC-44', name: 'محطة معالجة الصرف الصحي (STP)', code: 'STP', arName: 'محطة معالجة الصرف الصحي', type: 'مرفق تشغيلي' },
    { id: 'LOC-45', name: 'محطة تجميع الصرف الصحي (SEWAGE PLANT)', code: 'SEWAGE PLANT', arName: 'محطة تجميع الصرف الصحي', type: 'مرفق تشغيلي' },
    { id: 'LOC-46', name: 'الاسعاف الجوي (HELIPAD)', code: 'HELIPAD', arName: 'الاسعاف الجوي', type: 'مرفق تشغيلي' }
  ],
  employees: [
    { id: 'EMP-S01', name: 'JAGAN', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-S02', name: 'ABUKHALID', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'EMP-S03', name: 'SHAJU', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-S04', name: 'AMUEL', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'الانارة الملاحية (AFL)' },
    { id: 'EMP-S05', name: 'AMER', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'EMP-S06', name: 'JAWEED', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'التكييف والتبريد (HVAC)' },
    { id: 'EMP-S07', name: 'AJEESH', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'المباني (Building)' },
    { id: 'EMP-S08', name: 'FRIYAD', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-S09', name: 'KAREEM', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'EMP-S10', name: 'JESHAN', job: 'مشرف فني (Supervisor)', shift: 'وردية عامة', department: 'المستودع (Store)' },
    { id: 'EMP-T01', name: 'Nadeem', job: 'low voltage technician', shift: 'وردية A', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-T02', name: 'repon', job: 'low voltage technician', shift: 'وردية B', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-T03', name: 'Husnain', job: 'low voltage technician', shift: 'وردية C', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-T04', name: 'Shahil', job: 'low voltage technician', shift: 'وردية A', department: 'الكهرباء (Electrical)' },
    { id: 'EMP-T05', name: 'Inzemamul Haque', job: 'operator', shift: 'وردية B', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'EMP-T06', name: 'Md Ahtesham', job: 'operator', shift: 'وردية C', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'EMP-T07', name: 'Jiarul Islam', job: 'operator', shift: 'وردية A', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'EMP-T08', name: 'Shamsul Haque', job: 'operator', shift: 'وردية B', department: 'محطة الكهرباء (Power Plant)' },
    { id: 'EMP-T09', name: 'Sanjay', job: 'PLUMBER', shift: 'وردية C', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T10', name: 'Abdul khadir', job: 'PLUMBER', shift: 'وردية A', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T11', name: 'Najmuddin', job: 'PLUMBER', shift: 'وردية B', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T12', name: 'Nadeem Raza', job: 'Welder', shift: 'وردية C', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T13', name: 'Talib', job: 'Water plant operators', shift: 'وردية A', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T14', name: 'Naseem', job: 'Water plant operators', shift: 'وردية B', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T15', name: 'Faizan', job: 'Water plant operators', shift: 'وردية C', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T16', name: 'Zaid.', job: 'Water plant operators', shift: 'وردية A', department: 'الميكانيكا (Mechanical)' },
    { id: 'EMP-T17', name: 'Mo Nazeem', job: 'AFL  technician', shift: 'وردية B', department: 'الانارة الملاحية (AFL)' },
    { id: 'EMP-T18', name: 'Hifjur Rahman', job: 'AFL  technician', shift: 'وردية C', department: 'الانارة الملاحية (AFL)' },
    { id: 'EMP-T19', name: 'Melchor alveris', job: 'AFL  technician', shift: 'وردية A', department: 'الانارة الملاحية (AFL)' },
    { id: 'EMP-T20', name: 'Mahtab alam ansari', job: 'AFL  technician', shift: 'وردية B', department: 'الانارة الملاحية (AFL)' },
    { id: 'EMP-T21', name: 'Shafeaq', job: 'auto mechanic', shift: 'وردية C', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'EMP-T22', name: 'suhail aslam', job: 'automotive electriton', shift: 'وردية A', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'EMP-T23', name: 'depak yadav', job: 'heavy mechanic', shift: 'وردية B', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'EMP-T24', name: 'Rizwan', job: 'Motor Vehicle Mechanic', shift: 'وردية C', department: 'المركبات والمعدات (Motor Pool)' },
    { id: 'EMP-T25', name: 'Sher Khan', job: 'Hvac technician', shift: 'وردية A', department: 'التكييف والتبريد (HVAC)' },
    { id: 'EMP-T26', name: 'Md Adil', job: 'Hvac technician', shift: 'وردية B', department: 'التكييف والتبريد (HVAC)' },
    { id: 'EMP-T27', name: 'Md Faiz Anwar', job: 'Hvac technician', shift: 'وردية C', department: 'التكييف والتبريد (HVAC)' },
    { id: 'EMP-T28', name: 'IBRAR HUSAIN', job: 'PAINTER', shift: 'وردية A', department: 'المباني (Building)' },
    { id: 'EMP-T29', name: 'MD.ANIS', job: 'CARPENTER', shift: 'وردية B', department: 'المباني (Building)' },
    { id: 'EMP-T30', name: 'MD.TABREJ', job: 'PAINTER', shift: 'وردية C', department: 'المباني (Building)' },
    { id: 'EMP-T31', name: 'ANVAR', job: 'MASON', shift: 'وردية A', department: 'المباني (Building)' },
    { id: 'EMP-T32', name: 'SADIQE', job: 'ALUMINIUM CARPENTER', shift: 'وردية B', department: 'المباني (Building)' },
    { id: 'EMP-T33', name: 'SONU KUMAR', job: 'PAINTER', shift: 'وردية C', department: 'المباني (Building)' },
    { id: 'EMP-T34', name: 'DANEESH', job: 'Storekeeper Assistant', shift: 'وردية A', department: 'المستودع (Store)' },
    { id: 'EMP-T35', name: '1 MOHD. IQBAL P&G', job: 'FOREMAN 131374', shift: 'وردية B', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T36', name: '2 NURUL ISLAM', job: 'TECHNICIAN (TECH.) 131378', shift: 'وردية C', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T37', name: '3 ABDUL SATTAR', job: 'PAINTER 131377', shift: 'وردية A', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T38', name: '4 AINAL KASSIM', job: 'MASON 131376', shift: 'وردية B', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T39', name: '5 SHAHRUK KHAN', job: 'HELPER 131280', shift: 'وردية C', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T40', name: '6 SHAHJAHAN SHAIK', job: 'HELPER 131233', shift: 'وردية A', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T41', name: '7 SADDAM SAFI', job: 'HELPER 146854', shift: 'وردية B', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T42', name: '8 SABIR KHAN', job: 'HELPER 146856', shift: 'وردية C', department: 'الارصفة والطرق (P&G)' },
    { id: 'EMP-T43', name: 'Abdul kareem', job: 'Fire Alarm Technician', shift: 'وردية A', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'EMP-T44', name: 'mohamed aasif', job: 'CCTV Technician', shift: 'وردية B', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'EMP-T45', name: 'mohammed mahfuz alam', job: 'Network Technician', shift: 'وردية C', department: 'الاتصالات والالكترونيات (ECC)' },
    { id: 'EMP-T46', name: 'mohamed faiz', job: 'CCTV technician', shift: 'وردية A', department: 'الاتصالات والالكترونيات (ECC)' }
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
    { id: 'TNK-W3', station: 'شبكة المياه', category: 'مياه', name: 'خزان نظام إطفاء الحريق', capacity: 250000, currentLiters: 250000, locked: true, lastSupplyDate: '2026-10-18' },
    { id: 'TNK-W4', station: 'شبكة المياه', category: 'مياه', name: 'خزان مبنى الإطفاء', capacity: 150000, currentLiters: 135000, locked: true, lastSupplyDate: '2026-10-18' }
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
    'الشرطة الجويه',
    'الجوازات',
    'الجمارك',
    'المباحث',
    'المدير المناوب',
    'العمليات',
    'الشرطه المدنيه',
    'شرطة المرور',
    'ادارة المطار',
    'الاطفاء',
    'METCO',
    'الارصاد الجوي',
    'الملاحه الجوية',
    'العياده',
    'الصيانة السعوديه',
    'التشغيل التجاري',
    'الاسعاف الجوي',
    'الشحن الجوي',
    'مركز المراقبه والتحكم',
    'سيتا',
    'شركة تشغيل المواقف',
    'ابوسرهد',
    'SGS',
    'الخدمات الارضية',
    'IT'
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
// LOGS & TRANSACTION HISTORIES (سجلات التوريد والصرف التفصيلية بناءً على المتطلبات)
// ============================================================================
const FUEL_SUPPLY_LOGS = [
  { id: 'FSL-01', date: '2026-10-18', time: '09:30', station: 'محطة الوقود', tankId: 'TNK-G1', fuelType: 'بنزين 91', liters: 18000, supplier: 'شركة أرامكو السعودية', note: 'توريد دوري منتظم' },
  { id: 'FSL-02', date: '2026-10-17', time: '14:15', station: 'محطة الوقود', tankId: 'TNK-D1', fuelType: 'ديزل', liters: 25000, supplier: 'شركة بترومين', note: 'توريد خزان الديزل الرئيسي' },
  { id: 'FSL-03', date: '2026-10-16', time: '11:00', station: 'محطة الكهرباء', tankId: 'TNK-P1', fuelType: 'ديزل', liters: 20000, supplier: 'أرامكو - ناقلات المطار', note: 'تفريغ في خزان محطة الكهرباء 1' },
  { id: 'FSL-04', date: '2026-10-14', time: '10:30', station: 'محطة الكهرباء', tankId: 'TNK-P2', fuelType: 'ديزل', liters: 15000, supplier: 'أرامكو - ناقلات المطار', note: 'تفريغ في خزان محطة الكهرباء 2' }
];

const FUEL_DISPENSE_LOGS = [
  { id: 'FDL-01', date: '2026-10-19', time: '08:15', carType: 'وانيت تويوتا هايلوكس', plateNo: 'أ ب د 1042', entity: 'الإطفاء والإنقاذ (CFR)', fuelType: 'بنزين 91', liters: 65, driverName: 'سلطان الحربي', note: 'دورية مدرج وتفقد ساحة الطيران' },
  { id: 'FDL-02', date: '2026-10-19', time: '09:40', carType: 'شاحنة مرسيدس صهريج', plateNo: 'ح ل ط 5521', entity: 'المركبات والمعدات (Motor Pool)', fuelType: 'ديزل', liters: 180, driverName: 'محمد الشهري', note: 'تشغيل المضخات الميدانية' },
  { id: 'FDL-03', date: '2026-10-18', time: '16:20', carType: 'فورد إكسبدشن أمني', plateNo: 'ق ص ر 8890', entity: 'أمن المطار', fuelType: 'بنزين 91', liters: 85, driverName: 'خالد العنزي', note: 'دورية المحيط الخارجي' },
  { id: 'FDL-04', date: '2026-10-18', time: '18:00', carType: 'باص نقل فنيين تويوتا كوستر', plateNo: 'ع ب س 3120', entity: 'الصيانة والتشغيل (Has Mag)', fuelType: 'ديزل', liters: 90, driverName: 'أحمد الرشيدي', note: 'نقل فنيي الوردية B' }
];

const WATER_SUPPLY_LOGS = [
  { id: 'WSL-01', date: '2026-10-19', time: '07:30', liters: 64000, tankersCount: 2, tankId: 'TNK-W1', tankName: 'الخزان الرئيسي للمياه', note: 'توريد توريدتين (تريلتين) بسعة 32,000 لتر لكل تنكر' },
  { id: 'WSL-02', date: '2026-10-18', time: '10:00', liters: 96000, tankersCount: 3, tankId: 'TNK-W1', tankName: 'الخزان الرئيسي للمياه', note: 'توريد 3 تناكر مياه صالحة للشرب' },
  { id: 'WSL-03', date: '2026-10-18', time: '15:20', liters: 32000, tankersCount: 1, tankId: 'TNK-W4', tankName: 'خزان مبنى الإطفاء', note: 'توريد تنكر مياه لخزان مبنى الإطفاء' },
  { id: 'WSL-04', date: '2026-10-17', time: '11:45', liters: 64000, tankersCount: 2, tankId: 'TNK-W2', tankName: 'الخزان الاحتياطي للمياه', note: 'توريد تنكرين مياه للخزان الاحتياطي' }
];

const SEWAGE_PULL_LOGS = [
  { id: 'SPL-01', date: '2026-10-19', time: '08:00', stationName: 'محطة رفع 1', tankerType: 'ضاغط', tankersCount: 2, pulledLiters: 24000, driverName: 'سعد العلي' },
  { id: 'SPL-02', date: '2026-10-19', time: '09:30', stationName: 'محطة رفع 2', tankerType: 'ترلة', tankersCount: 1, pulledLiters: 22000, driverName: 'منصور القحطاني' },
  { id: 'SPL-03', date: '2026-10-19', time: '11:15', stationName: 'محطة رفع 3', tankerType: 'ضاغط', tankersCount: 1, pulledLiters: 12000, driverName: 'فيصل الشمري' },
  { id: 'SPL-04', date: '2026-10-19', time: '13:00', stationName: 'محطة رفع 4', tankerType: 'ضاغط', tankersCount: 1, pulledLiters: 12000, driverName: 'سعد العلي' },
  { id: 'SPL-05', date: '2026-10-19', time: '14:30', stationName: 'محطة رفع 5', tankerType: 'ضاغط', tankersCount: 1, pulledLiters: 12000, driverName: 'فيصل الشمري' },
  { id: 'SPL-06', date: '2026-10-19', time: '16:00', stationName: 'محطة الصرف sewage plant', tankerType: 'ترلة', tankersCount: 2, pulledLiters: 48000, driverName: 'منصور القحطاني' },
  { id: 'SPL-07', date: '2026-10-18', time: '08:30', stationName: 'محطة رفع 1', tankerType: 'ضاغط', tankersCount: 2, pulledLiters: 24000, driverName: 'سعد العلي' },
  { id: 'SPL-08', date: '2026-10-18', time: '10:00', stationName: 'محطة رفع 2', tankerType: 'ترلة', tankersCount: 1, pulledLiters: 22000, driverName: 'منصور القحطاني' },
  { id: 'SPL-09', date: '2026-10-18', time: '12:00', stationName: 'محطة الصرف sewage plant', tankerType: 'ترلة', tankersCount: 3, pulledLiters: 72000, driverName: 'منصور القحطاني' }
];

// ============================================================================
// INSPECTION TOURS & TICKETS DATA (موجودة داخل قسم الجولات وداخل محطة العمل)
// ============================================================================
const INSPECTION_TICKETS = [
  { id: 'TKT-101', title: 'فحص ومعايرة ميزان العفش', department: 'HVAC', location: 'صالة القدوم', status: 'مفتوحة', timeAgo: 'منذ يومين', responseTime: '1 دقيقة', totalDuration: '12 دقيقة', maintDuration: '11 دقيقة', reporter: 'Mazen (Inspector)', hasCM: 'نعم', cmNumber: '309', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'تم معايرة الميزان واستبدال الحساس بنجاح.' },
  { id: 'TKT-102', title: 'صيانة وتنظيف وحدة التكييف في مصلى النساء', department: 'HVAC', location: 'مصلى النساء - الصالة', status: 'مغلقة', timeAgo: 'منذ يومين', responseTime: '1 دقيقة', totalDuration: '12 دقيقة', maintDuration: '11 دقيقة', reporter: 'Mazen (Inspector)', hasCM: 'نعم', cmNumber: '309', thumb: ICON_PATHS.photoAfter, afterPhoto: ICON_PATHS.photoBefore, closingNotes: 'تم غسيل الفلاتر وضبط التبريد وإغلاق التذكرة.' },
  { id: 'TKT-103', title: 'إصلاح كسر باب منطقة البوابات', department: 'Motor Pool', location: 'بوابة المغادرة 3', status: 'مفتوحة', timeAgo: 'منذ 5 أيام', responseTime: '3 دقائق', totalDuration: '20 دقيقة', maintDuration: '17 دقيقة', reporter: 'Mazen (Inspector)', hasCM: 'نعم', cmNumber: '312', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'جاري استكمال تثبيت المفصلات الهيدروليكية.' },
  { id: 'TKT-104', title: 'رش ومكافحة الحشرات بالمنطقة الخارجية', department: 'Pest Control', location: 'الساحة الخارجية', status: 'مفتوحة', timeAgo: 'منذ 5 أيام', responseTime: '2 دقائق', totalDuration: '15 دقيقة', maintDuration: '13 دقيقة', reporter: 'Mazen (Inspector)', hasCM: 'نعم', cmNumber: '315', thumb: ICON_PATHS.photoAfter, afterPhoto: ICON_PATHS.photoBefore, closingNotes: 'تم تنفيذ الرش الوقائي الدوري.' },
  { id: 'TKT-105', title: 'تنظيف وتعقيم صالة القدوم الدولية', department: 'Janitorial', location: 'صالة الركاب الدولية 1', status: 'مفتوحة', timeAgo: 'منذ 3 أيام', responseTime: '2 دقائق', totalDuration: '25 دقيقة', maintDuration: '23 دقيقة', reporter: 'Mazen (Inspector)', hasCM: 'لا', cmNumber: '', thumb: ICON_PATHS.photoBefore, afterPhoto: ICON_PATHS.photoAfter, closingNotes: 'تم التعقيم بالكامل.' }
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
    shortTitle: 'جولات التفتيش اليومية',
    excelName: 'جولات التفتيش اليومية',
    fullTitle: 'جولات التفتيش اليومية (التذاكر والأقسام الـ 12)',
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
          { key: 'sprNo', label: 'رقم SPR' },
          { key: 'system', label: 'اسم النظام' },
          { key: 'createdDate', label: 'تاريخ الطلب' },
          { key: 'status', label: 'حالة الاستلام' }
        ],
        fields: [
          { key: 'sprNo', label: 'رقم SPR', type: 'text' },
          { key: 'system', label: 'اسم النظام', type: 'master_system' },
          { key: 'createdDate', label: 'تاريخ الطلب', type: 'date' },
          { key: 'status', label: 'حالة الاستلام', type: 'select', options: ['مستلم بالكامل', 'مستلم جزئياً', 'قيد الانتظار'] },
          { key: 'woNumber', label: 'رقم أمر العمل (CM / RM)', type: 'text' },
          { key: 'woStatus', label: 'حالة أمر العمل', type: 'select', options: ['مفتوح', 'مغلق'] }
        ],
        records: [
          {
            id: 'SPR-01',
            sprNo: 'SPR-2026-0041',
            system: 'نظام الإنارة الملاحية للمدرج (AGL)',
            createdDate: '2026-10-12',
            status: 'مستلم بالكامل',
            woNumber: 'CM-2026-881',
            woStatus: 'مغلق',
            items: [
              { partName: 'كشاف إنارة مدرج LED متكامل 200W', reqQty: 20, recQty: 20, recDate: '2026-10-16', woNumber: 'CM-2026-881', woStatus: 'مغلق' },
              { partName: 'كابل تأريض نحاسي مجدول 25mm', reqQty: 50, recQty: 50, recDate: '2026-10-17', woNumber: 'CM-2026-881', woStatus: 'مغلق' }
            ]
          },
          {
            id: 'SPR-02',
            sprNo: 'SPR-2026-0042',
            system: 'نظام مناولة وسيور الأمتعة (BHS)',
            createdDate: '2026-10-15',
            status: 'مستلم جزئياً',
            woNumber: 'RM-2026-502',
            woStatus: 'مفتوح',
            items: [
              { partName: 'رولمان بلي محوري لسيور العفش', reqQty: 12, recQty: 12, recDate: '2026-10-18', woNumber: 'RM-2026-502', woStatus: 'مغلق' },
              { partName: 'سير مطاطي مقوى عرض 800mm', reqQty: 4, recQty: 2, recDate: '2026-10-19', woNumber: 'RM-2026-502', woStatus: 'مفتوح' }
            ]
          }
        ]
      },
      {
        id: 'sub_mrf',
        textIcon: '📤',
        shortTitle: 'طلبات الـ MRF',
        helpText: 'تسجيل طلبات صرف المواد وقطع الغيار للأعطال أو تغذية الرصيد المستودعي.',
        icon: ICON_PATHS.Warehouse,
        summaryKeys: [
          { key: 'mrfNo', label: 'رقم MRF' },
          { key: 'system', label: 'اسم النظام' },
          { key: 'createdDate', label: 'تاريخ الطلب' },
          { key: 'status', label: 'حالة الاستلام' }
        ],
        fields: [
          { key: 'mrfNo', label: 'رقم MRF', type: 'text' },
          { key: 'mrfType', label: 'نوع الطلب', type: 'select', options: ['عطل', 'رصيد مستودعي'] },
          { key: 'system', label: 'اسم النظام (خاص بالأعطال)', type: 'master_system' },
          { key: 'createdDate', label: 'تاريخ الطلب', type: 'date' },
          { key: 'status', label: 'حالة الاستلام', type: 'select', options: ['مستلم بالكامل', 'مستلم جزئياً', 'قيد الانتظار'] },
          { key: 'woNumber', label: 'رقم أمر العمل (CM / RM)', type: 'text' },
          { key: 'woStatus', label: 'حالة أمر العمل', type: 'select', options: ['مفتوح', 'مغلق'] }
        ],
        records: [
          {
            id: 'MRF-01',
            mrfNo: 'MRF-2026-0118',
            mrfType: 'عطل',
            system: 'نظام مناولة وسيور الأمتعة (BHS)',
            createdDate: '2026-10-14',
            status: 'مستلم بالكامل',
            woNumber: 'CM-2026-309',
            woStatus: 'مغلق',
            items: [
              { partName: 'رولمان بلي محوري لسيور العفش', reqQty: 12, recQty: 12, recDate: '2026-10-15', matching: 'مطابقة', woNumber: 'CM-2026-309', woStatus: 'مغلق' },
              { partName: 'شحم حراري عالي اللزوجة', reqQty: 3, recQty: 3, recDate: '2026-10-15', matching: 'مطابقة', woNumber: 'CM-2026-309', woStatus: 'مغلق' }
            ],
            notes: 'صرف عاجل لإصلاح عطل سير الأمتعة صالة القدوم'
          },
          {
            id: 'MRF-02',
            mrfNo: 'MRF-2026-0119',
            mrfType: 'رصيد مستودعي',
            createdDate: '2026-10-16',
            status: 'مستلم بالكامل',
            items: [
              { partName: 'لمبات LED إرشادية 40W', reqQty: 50, recQty: 50, recDate: '2026-10-17', matching: 'مطابقة' },
              { partName: 'مفاتيح قواطع ثنائية 20A', reqQty: 25, recQty: 25, recDate: '2026-10-17', matching: 'مطابقة' }
            ],
            notes: 'تغذية الرصيد المستودعي الدوري العام'
          }
        ]
      },
      {
        id: 'sub_cash',
        textIcon: '💵',
        shortTitle: 'CASH PURCHASE',
        helpText: 'توثيق المشتريات النقدية والآجلة العاجلة لتأمين احتياجات الصيانة والتشغيل.',
        icon: ICON_PATHS.Warehouse,
        summaryKeys: [
          { key: 'orderNo', label: 'رقم الطلب' },
          { key: 'department', label: 'القسم' },
          { key: 'purchaseDate', label: 'تاريخ الشراء' },
          { key: 'amount', label: 'المبلغ' }
        ],
        fields: [
          { key: 'orderNo', label: 'رقم الطلب', type: 'text' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'purchaseDate', label: 'تاريخ الشراء', type: 'date' },
          { key: 'amount', label: 'المبلغ (ريال)', type: 'number' },
          { key: 'paymentType', label: 'طريقة الدفع', type: 'select', options: ['نقدي', 'دَين'] },
          { key: 'supplierName', label: 'اسم المورد', type: 'text' },
          { key: 'woNumber', label: 'رقم أمر العمل (أو لا يوجد)', type: 'text' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' }
        ],
        records: [
          {
            id: 'CP-01',
            orderNo: 'CP-2026-089',
            department: 'الكهرباء (Electrical)',
            purchaseDate: '2026-10-16',
            amount: 1450,
            paymentType: 'نقدي',
            supplierName: 'مؤسسة أضواء حائل للكهرباء',
            woNumber: 'CM-2026-401',
            system: 'نظام المولدات الاحتياطية ولوحات ATS',
            items: [
              { partName: 'قاطع فرعي 63A Schneider', reqQty: 2, recQty: 2, recDate: '2026-10-16' },
              { partName: 'عازل حراري ومسامير نحاسية', reqQty: 10, recQty: 10, recDate: '2026-10-16' }
            ]
          },
          {
            id: 'CP-02',
            orderNo: 'CP-2026-090',
            department: 'المباني (Building)',
            purchaseDate: '2026-10-18',
            amount: 820,
            paymentType: 'دَين',
            supplierName: 'شركة مواد البناء المتقدمة',
            woNumber: 'لا يوجد أمر عمل',
            system: 'أخرى',
            items: [
              { partName: 'سيليكون مقاوم للعوامل الجوية', reqQty: 15, recQty: 15, recDate: '2026-10-18' }
            ]
          }
        ]
      },
      {
        id: 'sub_stock',
        textIcon: '📊',
        shortTitle: 'المخزون STOCK',
        helpText: 'مراقبة أرصدة الأصناف المخزنية والكميات المتوفرة وسجل حركات التوريد والصرف.',
        icon: ICON_PATHS.Warehouse,
        isAutoStock: true,
        branchByDept: true,
        summaryKeys: [
          { key: 'itemName', label: 'اسم الصنف' },
          { key: 'department', label: 'القسم' },
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
          {
            id: 'STK-01',
            itemName: 'كشاف إنارة مدرج LED متكامل 200W',
            department: 'الإنارة الملاحية (AFL)',
            prevQty: 45,
            incomingQty: 20,
            issuedQty: 8,
            availableQty: 57,
            unit: 'حبة',
            movements: [
              { date: '2026-10-18', type: 'توريد', qty: 20, ref: 'SPR-2026-0041', note: 'توريد دفعة كشافات مدرج جديدة' },
              { date: '2026-10-19', type: 'صرف', qty: 8, ref: 'MRF-2026-0118', note: 'صرف لصيانة قطاع المدرج الشرقي' }
            ]
          },
          {
            id: 'STK-02',
            itemName: 'ضاغط تبريد ترددي (Compressor 25HP)',
            department: 'التكييف والتبريد (HVAC)',
            prevQty: 6,
            incomingQty: 2,
            issuedQty: 1,
            availableQty: 7,
            unit: 'وحدة',
            movements: [
              { date: '2026-10-12', type: 'توريد', qty: 2, ref: 'SPR-2026-0038', note: 'توريد ضواغط شلرات' },
              { date: '2026-10-15', type: 'صرف', qty: 1, ref: 'MRF-2026-0114', note: 'تركيب في شلر رقم 2' }
            ]
          },
          {
            id: 'STK-03',
            itemName: 'سير مطاطي مقوى لخط العفش (BHS Belt)',
            department: 'الميكانيكا (Mechanical)',
            prevQty: 12,
            incomingQty: 5,
            issuedQty: 3,
            availableQty: 14,
            unit: 'متر',
            movements: [
              { date: '2026-10-10', type: 'توريد', qty: 5, ref: 'SPR-2026-0035', note: 'توريد سيور مطاطية' },
              { date: '2026-10-14', type: 'صرف', qty: 3, ref: 'MRF-2026-0112', note: 'صرف لصيانة سير رقم 1' }
            ]
          }
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
        helpText: 'توثيق وتسجيل حالات الغياب اليومي بالتاريخ والوردية ونوع العذر (بعذر / بدون عذر).',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الفني الغائب' },
          { key: 'department', label: 'القسم' },
          { key: 'shift', label: 'الوردية' },
          { key: 'absenceType', label: 'نوع الغياب' },
          { key: 'absenceDate', label: 'تاريخ الغياب' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'shift', label: 'الوردية', type: 'select', options: ['وردية A', 'وردية B', 'وردية C', 'وردية عامة'] },
          { key: 'employee', label: 'اسم الفني الغائب', type: 'master_employee' },
          { key: 'absenceType', label: 'نوع الغياب', type: 'select', options: ['بعذر واستئذان', 'بدون عذر واستئذان'] },
          { key: 'absenceDate', label: 'تاريخ الغياب', type: 'date' },
          { key: 'notes', label: 'ملاحظات / سبب الغياب', type: 'textarea' }
        ],
        records: [
          { id: 'ABS-01', employee: 'سعيد عوض المالكي', department: 'الميكانيكا (Mechanical)', shift: 'وردية B', absenceType: 'بعذر واستئذان', absenceDate: '2026-10-18', notes: 'استئذان مسبق لمراجعة جهة رسمية' },
          { id: 'ABS-02', employee: 'سلطان فهد القحطاني', department: 'الكهرباء (Electrical)', shift: 'وردية A', absenceType: 'بدون عذر واستئذان', absenceDate: '2026-10-19', notes: 'تم رفع إشعار غياب غير مبرر للإدارة' },
          { id: 'ABS-03', employee: 'نايف حسن العمري', department: 'التكييف والتبريد (HVAC)', shift: 'وردية C', absenceType: 'بعذر واستئذان', absenceDate: '2026-10-17', notes: 'إشعار مرضي معتمد' }
        ]
      },
      {
        id: 'sub_final_exit',
        textIcon: '🛫',
        shortTitle: 'الخروج النهائي',
        helpText: 'متابعة إجراءات الخروج النهائي وإخلاء الطرف مع رقم الملف وتاريخ آخر دوام.',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'employee', label: 'اسم الموظف' },
          { key: 'department', label: 'القسم' },
          { key: 'fileNumber', label: 'رقم الملف' },
          { key: 'lastDayDate', label: 'تاريخ آخر دوام' }
        ],
        fields: [
          { key: 'employee', label: 'اسم الموظف', type: 'master_employee' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'fileNumber', label: 'رقم الملف', type: 'text' },
          { key: 'lastDayDate', label: 'تاريخ آخر دوام', type: 'date' },
          { key: 'notes', label: 'ملاحظات إخلاء الطرف والتسليم', type: 'textarea' }
        ],
        records: [
          { id: 'EXT-01', employee: 'نايف حسن العمري', department: 'التكييف والتبريد (HVAC)', fileNumber: 'FILE-9941', lastDayDate: '2026-10-31', notes: 'تم تسليم العهدة وبطاقة الدخول الأمنية بالكامل' },
          { id: 'EXT-02', employee: 'فاروق عبد العظيم', department: 'المباني (Building)', fileNumber: 'FILE-8820', lastDayDate: '2026-11-15', notes: 'جاري استكمال التوقيعات وإخلاء السكن' }
        ]
      },
      {
        id: 'sub_staffing_shortage',
        textIcon: '📉',
        shortTitle: 'الشواغر',
        helpText: 'رصد ومتابعة الشواغر الوظيفية الفنية (العدد المطلوب، العدد الفعلي، وعدد الشواغر).',
        icon: ICON_PATHS.MotorPool,
        summaryKeys: [
          { key: 'vacancyTitle', label: 'اسم الوظيفة' },
          { key: 'department', label: 'القسم' },
          { key: 'requiredCount', label: 'المطلوب' },
          { key: 'actualCount', label: 'الفعلي' },
          { key: 'vacantCount', label: 'الشواغر' }
        ],
        fields: [
          { key: 'vacancyTitle', label: 'اسم الوظيفة', type: 'text' },
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'requiredCount', label: 'العدد المطلوب', type: 'number' },
          { key: 'actualCount', label: 'العدد الفعلي', type: 'number' },
          { key: 'vacantCount', label: 'عدد الشواغر (المطلوب - الفعلي)', type: 'readonly_calc' }
        ],
        records: [
          { id: 'VAC-01', vacancyTitle: 'فني أول أنظمة إنارة مدرج (AGL)', department: 'الإنارة الملاحية (AFL)', requiredCount: 6, actualCount: 4, vacantCount: 2 },
          { id: 'VAC-02', vacancyTitle: 'مشغل محطة قوى وتحكم (Power Plant Operator)', department: 'محطة الكهرباء (Power Plant)', requiredCount: 5, actualCount: 3, vacantCount: 2 },
          { id: 'VAC-03', vacancyTitle: 'فني تبريد وتكييف مركزي (Chiller Tech)', department: 'التكييف والتبريد (HVAC)', requiredCount: 4, actualCount: 3, vacantCount: 1 },
          { id: 'VAC-04', vacancyTitle: 'فني ميكانيكا سيور ومضخات', department: 'الميكانيكا (Mechanical)', requiredCount: 5, actualCount: 5, vacantCount: 0 }
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
    helpText: 'قاعدة بيانات الأصول والمعدات التشغيلية بالمطار، وسجل نقل الأصول بين المرافق.',
    icon: ICON_PATHS.Building,
    badge: 0,
    subSections: [
      {
        id: 'sub_assets_register',
        textIcon: '🏛️',
        shortTitle: 'سجل الأصول',
        helpText: 'عرض مختصر وجاذب للأصول حسب القسم (اسم الأصل، الشركة المصنعة، العدد، الموقع، وعمر الأصل المحسوب).',
        icon: ICON_PATHS.Building,
        branchByDept: true,
        summaryKeys: [
          { key: 'assetName', label: 'اسم الأصل' },
          { key: 'manufacturer', label: 'الشركة المصنعة' },
          { key: 'count', label: 'العدد' },
          { key: 'location', label: 'الموقع' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'assetName', label: 'اسم الأصل', type: 'master_catalog_asset' },
          { key: 'manufacturer', label: 'الشركة المصنعة', type: 'text' },
          { key: 'model', label: 'الموديل', type: 'text' },
          { key: 'count', label: 'العدد / الكمية', type: 'number' },
          { key: 'location', label: 'الموقع', type: 'master_location' },
          { key: 'manufactureDate', label: 'تاريخ التصنيع (لحساب عمر الأصل)', type: 'date' },
          { key: 'assetAge', label: 'عمر الأصل المحسوب', type: 'readonly_calc' },
          { key: 'assetCondition', label: 'حالة الأصل', type: 'select', options: ['ممتاز', 'جديد', 'متوسط', 'قديم', 'يحتاج إعادة تهيئة', 'متهالك'] },
          { key: 'operationStatus', label: 'حالة الأصل (تشغيل)', type: 'select', options: ['يعمل', 'لا يعمل'] },
          { key: 'usageStatus', label: 'الأصل (استخدام)', type: 'select', options: ['مستخدم', 'غير مستخدم'] },
          { key: 'imageNote', label: 'الصورة', type: 'select', options: ['صورة الأصل مرفقة ✅', 'بانتظار التصوير'] }
        ],
        records: [
          {
            id: 'AST-01',
            assetName: 'مولد كهرباء احتياطي CAT 2000KVA',
            department: 'محطة الكهرباء (Power Plant)',
            system: 'GENERATORS',
            location: 'محطة الكهرباء (POWER PLANT)',
            model: 'CAT 3516B',
            manufacturer: 'Caterpillar Inc.',
            count: 3,
            manufactureDate: '2018-05-15',
            assetAge: '8 سنوات و 5 أشهر',
            assetCondition: 'ممتاز',
            operationStatus: 'يعمل',
            usageStatus: 'مستخدم',
            imageNote: 'صورة الأصل مرفقة ✅'
          },
          {
            id: 'AST-02',
            assetName: 'وحدة تبريد مركزي Chiller York #2',
            department: 'التكييف والتبريد (HVAC)',
            system: 'PACKAGE UNITS',
            location: 'صالات المسافرين (terminal)',
            model: 'YK-Centrifugal 600TR',
            manufacturer: 'York International',
            count: 4,
            manufactureDate: '2016-03-20',
            assetAge: '10 سنوات و 7 أشهر',
            assetCondition: 'متوسط',
            operationStatus: 'يعمل',
            usageStatus: 'مستخدم',
            imageNote: 'صورة الأصل مرفقة ✅'
          },
          {
            id: 'AST-03',
            assetName: 'مضخة حريق رئيسية Grundfos 1500GPM',
            department: 'الميكانيكا (Mechanical)',
            system: 'FIRE PUMP SYSTEM',
            location: 'مبني الاطفاء (CFR)',
            model: 'NK 125-250',
            manufacturer: 'Grundfos',
            count: 2,
            manufactureDate: '2019-11-10',
            assetAge: '6 سنوات و 11 شهراً',
            assetCondition: 'ممتاز',
            operationStatus: 'يعمل',
            usageStatus: 'مستخدم',
            imageNote: 'صورة الأصل مرفقة ✅'
          }
        ]
      },
      {
        id: 'sub_asset_transfers',
        textIcon: '🔄',
        shortTitle: 'نقل الأصول',
        helpText: 'توثيق نقل الأصول بين المواقع والأنظمة وتوثيق التوجيهات الرسمية.',
        icon: ICON_PATHS.Building,
        summaryKeys: [
          { key: 'assetName', label: 'اسم الأصل' },
          { key: 'transferredFrom', label: 'من' },
          { key: 'transferredTo', label: 'إلى' },
          { key: 'transferDate', label: 'التاريخ' }
        ],
        fields: [
          { key: 'assetName', label: 'اسم الأصل المنقول', type: 'master_catalog_asset' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'transferredFrom', label: 'تم نقله من', type: 'master_location' },
          { key: 'transferredTo', label: 'تم النقل إلى', type: 'master_location' },
          { key: 'transferDate', label: 'تاريخ النقل', type: 'date' },
          { key: 'directedBy', label: 'بتوجيهات من', type: 'text' },
          { key: 'notes', label: 'ملاحظات النقل والتركيب', type: 'textarea' }
        ],
        records: [
          {
            id: 'TRF-01',
            assetName: 'وحدة تكييف دولابية Package Unit 10TR',
            system: 'PACKAGE UNITS',
            transferredFrom: 'الشحن الجوي (Cargo)',
            transferredTo: 'صالات المسافرين (terminal)',
            transferDate: '2026-10-15',
            directedBy: 'م. حسام العبدالله (مدير الصيانة)',
            notes: 'تم فك ونقل وإعادة تركيب الوحدة وتشغيلها بنجاح'
          },
          {
            id: 'TRF-02',
            assetName: 'مضخة مياه غاطسة 15HP',
            system: 'DOMESTICS WATER PUMPS',
            transferredFrom: 'المستودع (STORE)',
            transferredTo: 'محطة تجميع الصرف الصحي (SEWAGE PLANT)',
            transferDate: '2026-10-18',
            directedBy: 'أ. فهد الشمري (مشرف العمليات)',
            notes: 'تركيب كبديل لمضخة تحت الصيانة الشاملة'
          }
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
        helpText: 'توثيق الأعمال اليومية لكل قسم وتاريخ، مع إسناد عدة فنيين وصورة العمل والمواد المستخدمة.',
        icon: ICON_PATHS.AFL,
        branchByDept: true,
        summaryKeys: [
          { key: 'workDesc', label: 'وصف العمل' },
          { key: 'department', label: 'القسم' },
          { key: 'workDate', label: 'التاريخ' },
          { key: 'technicians', label: 'الفنيين المشاركين' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'workDate', label: 'تاريخ العمل', type: 'date' },
          { key: 'workLocation', label: 'موقع العمل', type: 'master_location' },
          { key: 'workDesc', label: 'وصف العمل المنجز', type: 'textarea' },
          { key: 'technicians', label: 'الفنيين المشاركين (أكثر من فني)', type: 'text' },
          { key: 'materialsUsed', label: 'المواد / القطع المستخدمة', type: 'text' },
          { key: 'photo', label: 'صورة العمل الميدانية', type: 'select', options: ['صورة الإنجاز مرفقة ✅', 'بدون صورة'] },
          { key: 'startTime', label: 'زمن البدء', type: 'time' },
          { key: 'endTime', label: 'زمن الانتهاء', type: 'time' },
          { key: 'serviceStopped', label: 'هل تم إيقاف خدمة تشغيلية بالمطار؟', type: 'select', options: ['لا', 'نعم'] }
        ],
        records: [
          {
            id: 'DW-01',
            workDate: '2026-10-19',
            department: 'الانارة الملاحية (AFL)',
            workLocation: 'مدرج الطيران RUNWAY (RUNWAY)',
            workDesc: 'فحص الجهد وتنظيف عدسات الإنارة الملاحية للمدرج وممر الطائرات',
            technicians: 'Mo Nazeem, Hifjur Rahman, Melchor alveris',
            materialsUsed: 'منظف عدسات ملاحية خاص + قواطع إشارة 10A',
            photo: 'صورة الإنجاز مرفقة ✅',
            photoUrl: ICON_PATHS.photoAfter,
            startTime: '06:00',
            endTime: '08:30',
            serviceStopped: 'لا'
          },
          {
            id: 'DW-02',
            workDate: '2026-10-19',
            department: 'التكييف والتبريد (HVAC)',
            workLocation: 'صالات المسافرين (terminal)',
            workDesc: 'غسيل وتعقيم فلاتر وحدات مناولة الهواء AHU-04 وصيانة السير',
            technicians: 'JAWEED, علي سالم القحطاني',
            materialsUsed: 'معقم فلاتر كيميائي + سيور B-64 عدد 2',
            photo: 'صورة الإنجاز مرفقة ✅',
            photoUrl: ICON_PATHS.photoBefore,
            startTime: '09:00',
            endTime: '11:30',
            serviceStopped: 'لا'
          },
          {
            id: 'DW-03',
            workDate: '2026-10-18',
            department: 'الكهرباء (Electrical)',
            workLocation: 'صالات المسافرين (terminal)',
            workDesc: 'استبدال لمبات إضاءة سقفية LED وتفقد لوحة التوزيع الفرعية DP-2',
            technicians: 'Nadeem, repon, Shahil',
            materialsUsed: 'لمبات LED 18W عدد 16 + شريط عازل 3M',
            photo: 'صورة الإنجاز مرفقة ✅',
            photoUrl: ICON_PATHS.photoAfter,
            startTime: '13:00',
            endTime: '15:00',
            serviceStopped: 'لا'
          }
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
  // 9. الصرف الصحي (السحب اليومي ومحطات الرفع الـ 6)
  // --------------------------------------------------------------------------
  {
    id: 'mod_sewage',
    textIcon: '🚛',
    shortTitle: 'الصرف الصحي',
    excelName: 'الصرف الصحي (السحب اليومي)',
    fullTitle: 'الصرف الصحي (السحب اليومي ومحطات الرفع)',
    helpText: 'متابعة الكميات المسحوبة باللتر وعدد التناكر لكل يوم من جميع المحطات، وتفصيل التناكر المسحوبة من كل محطة رفع.',
    icon: ICON_PATHS.PestControl,
    badge: 0,
    subSections: [
      {
        id: 'sub_sewage_cars',
        textIcon: '🚛',
        shortTitle: 'سحب الصرف الصحي',
        helpText: 'شاشة عرض تحتوي على إجمالي التناكر والكميات المسحوبة يومياً وتفصيل محطات الرفع الـ 5 ومحطة الصرف.',
        icon: ICON_PATHS.PestControl,
        hasChildSubIcons: true,
        childSubField: 'stationName',
        childSubOptions: [
          { code: 'محطة رفع 1', title: 'محطة رفع 1', icon: ICON_PATHS.Mechanical },
          { code: 'محطة رفع 2', title: 'محطة رفع 2', icon: ICON_PATHS.Mechanical },
          { code: 'محطة رفع 3', title: 'محطة رفع 3', icon: ICON_PATHS.Mechanical },
          { code: 'محطة رفع 4', title: 'محطة رفع 4', icon: ICON_PATHS.Mechanical },
          { code: 'محطة رفع 5', title: 'محطة رفع 5', icon: ICON_PATHS.Mechanical },
          { code: 'محطة الصرف sewage plant', title: 'محطة الصرف (STP)', icon: ICON_PATHS.PestControl }
        ],
        summaryKeys: [
          { key: 'stationName', label: 'المحطة' },
          { key: 'pullDate', label: 'التاريخ' },
          { key: 'tankersCount', label: 'عدد التناكر' },
          { key: 'pulledQty', label: 'الكمية (لتر)' }
        ],
        fields: [
          { key: 'pullDate', label: 'تاريخ السحب', type: 'date' },
          { key: 'pullTime', label: 'وقت السحب', type: 'time' },
          { key: 'stationName', label: 'محطة الرفع / الصرف', type: 'select', options: ['محطة رفع 1', 'محطة رفع 2', 'محطة رفع 3', 'محطة رفع 4', 'محطة رفع 5', 'محطة الصرف sewage plant'] },
          { key: 'tankerType', label: 'نوع الصهريج', type: 'select', options: ['ضاغط', 'ترلة'] },
          { key: 'tankersCount', label: 'عدد التناكر المسحوبة', type: 'number' },
          { key: 'pulledQty', label: 'الكمية المسحوبة (لتر)', type: 'number' },
          { key: 'driverName', label: 'اسم السائق', type: 'text' },
          { key: 'notes', label: 'ملاحظات', type: 'textarea' }
        ],
        records: [
          { id: 'SWG-01', pullDate: '2026-10-19', pullTime: '08:00', stationName: 'محطة رفع 1', tankerType: 'ضاغط', tankersCount: 2, pulledQty: 24000, driverName: 'سعد العلي' },
          { id: 'SWG-02', pullDate: '2026-10-19', pullTime: '09:30', stationName: 'محطة رفع 2', tankerType: 'ترلة', tankersCount: 1, pulledQty: 22000, driverName: 'منصور القحطاني' },
          { id: 'SWG-03', pullDate: '2026-10-19', pullTime: '11:15', stationName: 'محطة رفع 3', tankerType: 'ضاغط', tankersCount: 1, pulledQty: 12000, driverName: 'فيصل الشمري' },
          { id: 'SWG-04', pullDate: '2026-10-19', pullTime: '13:00', stationName: 'محطة رفع 4', tankerType: 'ضاغط', tankersCount: 1, pulledQty: 12000, driverName: 'سعد العلي' },
          { id: 'SWG-05', pullDate: '2026-10-19', pullTime: '14:30', stationName: 'محطة رفع 5', tankerType: 'ضاغط', tankersCount: 1, pulledQty: 12000, driverName: 'فيصل الشمري' },
          { id: 'SWG-06', pullDate: '2026-10-19', pullTime: '16:00', stationName: 'محطة الصرف sewage plant', tankerType: 'ترلة', tankersCount: 2, pulledQty: 48000, driverName: 'منصور القحطاني' },
          { id: 'SWG-07', pullDate: '2026-10-18', pullTime: '08:30', stationName: 'محطة رفع 1', tankerType: 'ضاغط', tankersCount: 2, pulledQty: 24000, driverName: 'سعد العلي' },
          { id: 'SWG-08', pullDate: '2026-10-18', pullTime: '10:00', stationName: 'محطة رفع 2', tankerType: 'ترلة', tankersCount: 1, pulledQty: 22000, driverName: 'منصور القحطاني' },
          { id: 'SWG-09', pullDate: '2026-10-18', pullTime: '12:00', stationName: 'محطة الصرف sewage plant', tankerType: 'ترلة', tankersCount: 3, pulledQty: 72000, driverName: 'منصور القحطاني' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 10. المعدات / الأنظمة خارج الخدمة (المعدات المتعطلة حالياً + سجل المعدات المُصلحة)
  // --------------------------------------------------------------------------
  {
    id: 'mod_faulty',
    textIcon: '⚠️',
    shortTitle: 'المعدات / الأنظمة خارج الخدمة',
    excelName: 'المعدات/الانظمة خارج الخدمة',
    fullTitle: 'المعدات والأنظمة خارج الخدمة',
    helpText: 'متابعة المعدات المتعطلة حالياً وسجل المعدات التي تم إصلاحها في الماضي بالتاريخ والزمن.',
    icon: ICON_PATHS.Mechanical,
    badge: 2,
    subSections: [
      {
        id: 'sub_faulty_equip',
        textIcon: '⚠️',
        shortTitle: 'المعدات المتعطلة حالياً',
        helpText: 'شاشة عرض تعرض جميع المعدات المتعطلة حالياً (القسم، النظام، تاريخ ووقت بداية العطل، والملاحظات).',
        icon: ICON_PATHS.Mechanical,
        branchByDept: true,
        summaryKeys: [
          { key: 'equipmentName', label: 'المعدة' },
          { key: 'department', label: 'القسم' },
          { key: 'faultDateTime', label: 'بداية العطل' },
          { key: 'faultStatus', label: 'الحالة' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'equipmentName', label: 'اسم النظام / المعدة', type: 'text' },
          { key: 'faultDate', label: 'تاريخ بداية العطل', type: 'date' },
          { key: 'faultTime', label: 'وقت بداية العطل', type: 'time' },
          { key: 'faultDateTime', label: 'تاريخ ووقت بداية العطل', type: 'datetime-local' },
          { key: 'faultDesc', label: 'وصف العطل', type: 'textarea' },
          { key: 'faultStatus', label: 'حالة الصيانة', type: 'select', options: ['تحت الصيانة', 'بانتظار قطعة غيار', 'تحت الاختبار'] },
          { key: 'notes', label: 'الملاحظات التشغيلية', type: 'textarea' }
        ],
        records: [
          { id: 'FEQ-01', department: 'الميكانيكا (Mechanical)', system: 'BHS', equipmentName: 'ميزان عفش كاونتر رقم 14', faultDate: '2026-10-17', faultTime: '08:30', faultDateTime: '2026-10-17T08:30', faultDesc: 'عطل في خلية الوزن الإلكترونية وحساس التغذية', faultStatus: 'بانتظار قطعة غيار', notes: 'تم تحويل حركة المسافرين للكاونتر 15 لضمان انسيابية الرحلات' },
          { id: 'FEQ-02', department: 'الاتصالات والالكترونيات (ECC)', system: 'Clean Agent Suppression System', equipmentName: 'بوابة تفتيش أمني X-Ray صالة 2', faultDate: '2026-10-18', faultTime: '11:15', faultDateTime: '2026-10-18T11:15', faultDesc: 'توقف مفاجئ في سير التغذية الكهربائي', faultStatus: 'تحت الصيانة', notes: 'الفني المبتعث متواجد بالموقع لاستبدال القاطع' },
          { id: 'FEQ-03', department: 'التكييف والتبريد (HVAC)', system: 'PACKAGE UNITS', equipmentName: 'وحدة تكييف بكج صالة القدوم 3', faultDate: '2026-10-19', faultTime: '07:00', faultDateTime: '2026-10-19T07:00', faultDesc: 'ارتفاع في أمبير الضاغط رقم 1', faultStatus: 'تحت الصيانة', notes: 'جاري فحص مروحة المكثف وشحنة الفريون' }
        ]
      },
      {
        id: 'sub_faulty_history',
        textIcon: '📜',
        shortTitle: 'سجل المعدات المُصلحة',
        helpText: 'سجل لكل معدة تعطلت وتم إصلاحها في الماضي بالتاريخ والزمن وتفاصيل قطع الغيار.',
        icon: ICON_PATHS.Mechanical,
        branchByDept: true,
        summaryKeys: [
          { key: 'equipmentName', label: 'المعدة' },
          { key: 'department', label: 'القسم' },
          { key: 'repairDate', label: 'تاريخ الإصلاح' },
          { key: 'repairDuration', label: 'مدة الإصلاح' }
        ],
        fields: [
          { key: 'department', label: 'القسم المختص', type: 'master_dept' },
          { key: 'system', label: 'النظام الفني', type: 'master_system' },
          { key: 'equipmentName', label: 'اسم المعدة / النظام', type: 'text' },
          { key: 'faultDate', label: 'تاريخ بداية العطل', type: 'date' },
          { key: 'repairDate', label: 'تاريخ ووقت الإصلاح', type: 'datetime-local' },
          { key: 'repairDuration', label: 'مدة الإصلاح الكلية', type: 'text' },
          { key: 'technician', label: 'الفني المنفذ للإصلاح', type: 'master_employee' },
          { key: 'replacementParts', label: 'قطع الغيار المستبدلة', type: 'text' },
          { key: 'notes', label: 'ملاحظات المعالجة والتشغيل', type: 'textarea' }
        ],
        records: [
          { id: 'FHS-01', department: 'الانارة الملاحية (AFL)', system: 'RUNWAY LIGHTS', equipmentName: 'كشاف حافة مدرج رقم RW-22', faultDate: '2026-10-14', repairDate: '2026-10-14T22:30', repairDuration: '45 دقيقة', technician: 'Mo Nazeem', replacementParts: 'كشاف إنارة مدرج LED متكامل 200W', notes: 'تم استبدال الكشاف وإعادة الفحص الضوئي والمدرج جاهز' },
          { id: 'FHS-02', department: 'الميكانيكا (Mechanical)', system: 'BHS', equipmentName: 'سير الأمتعة رقم 1 بصالة المغادرة', faultDate: '2026-10-12', repairDate: '2026-10-12T14:10', repairDuration: '1 ساعة و20 دقيقة', technician: 'SHAJU', replacementParts: 'سير مطاطي مقوى + رولمان بلي محوري', notes: 'تم تشغيل وتجربة السير تحت الحمل التشغيلي بنجاح' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 11. انقطاعات الخدمات (4 فروع: انقطاع الكهرباء، التذبذب الكهربائي، انقطاع المياه، انقطاع الهاتف)
  // --------------------------------------------------------------------------
  {
    id: 'mod_outages',
    textIcon: '🔌',
    shortTitle: 'انقطاع الخدمات',
    excelName: 'انقطاعات الخدمات',
    fullTitle: 'انقطاعات الخدمات (الكهرباء | التذبذب | المياه | الهاتف)',
    helpText: 'سجلات موثقة ومفصلة بالتاريخ والزمن لكل انقطاع وتذبذب في خدمات المطار الحيوية.',
    icon: ICON_PATHS.Electrical,
    badge: 0,
    subSections: [
      {
        id: 'sub_outage_elec',
        textIcon: '⚡',
        shortTitle: 'انقطاع الكهرباء',
        helpText: 'سجل حالات انقطاع التيار الكهربائي بالتاريخ والزمن والمرافق المتأثرة (بدون تذبذب التيار).',
        icon: ICON_PATHS.Electrical,
        summaryKeys: [
          { key: 'affectedFacility', label: 'المرفق المتأثر' },
          { key: 'outageStart', label: 'بداية الانقطاع' },
          { key: 'duration', label: 'مدة الانقطاع' },
          { key: 'scheduled', label: 'مجدول؟' }
        ],
        fields: [
          { key: 'affectedFacility', label: 'المرفق المتأثر', type: 'master_location' },
          { key: 'outageStart', label: 'تاريخ ووقت الانقطاع', type: 'datetime-local' },
          { key: 'outageEnd', label: 'تاريخ ووقت عودة الخدمة', type: 'datetime-local' },
          { key: 'duration', label: 'مدة الانقطاع الفعلية', type: 'text' },
          { key: 'scheduled', label: 'انقطاع مجدول مسبقاً؟', type: 'select', options: ['لا', 'نعم'] },
          { key: 'backupUsed', label: 'هل تم دخول المولدات الاحتياطية؟', type: 'select', options: ['نعم تلقائياً', 'نعم يدوياً', 'لا'] },
          { key: 'reason', label: 'سبب الانقطاع والتقرير الفني', type: 'textarea' }
        ],
        records: [
          { id: 'OEL-01', affectedFacility: 'صالات المسافرين (terminal)', outageStart: '2026-10-15T03:10', outageEnd: '2026-10-15T03:12', duration: 'دقيقتان', scheduled: 'لا', backupUsed: 'نعم تلقائياً', reason: 'فصل مفاجئ من شركة الكهرباء ودخول مولدات المطار بنجاح' },
          { id: 'OEL-02', affectedFacility: 'مباني الصيانه (maintenanace bld)', outageStart: '2026-10-12T01:00', outageEnd: '2026-10-12T02:30', duration: 'ساعة ونصف', scheduled: 'نعم', backupUsed: 'لا', reason: 'صيانة دورية مجدولة للوحة القواطع الفرعية' }
        ]
      },
      {
        id: 'sub_fluctuation_elec',
        textIcon: '〰️',
        shortTitle: 'التذبذب الكهربائي',
        helpText: 'سجل تذبذب الجهد والتيار الكهربائي وتوثيق زمن التذبذب والتأثير على الأجهزة الحساسة.',
        icon: ICON_PATHS.Electrical,
        summaryKeys: [
          { key: 'affectedFacility', label: 'المرفق المتأثر' },
          { key: 'fluctuationTime', label: 'وقت التذبذب' },
          { key: 'durationSeconds', label: 'مدة التذبذب' },
          { key: 'fluctuationRange', label: 'نسبة التذبذب' }
        ],
        fields: [
          { key: 'affectedFacility', label: 'المرفق المتأثر', type: 'master_location' },
          { key: 'fluctuationDate', label: 'تاريخ التذبذب', type: 'date' },
          { key: 'fluctuationTime', label: 'وقت التذبذب بدقة', type: 'time' },
          { key: 'durationSeconds', label: 'مدة التذبذب (ثانية / دقيقة)', type: 'text' },
          { key: 'fluctuationRange', label: 'مقدار هبوط الجهد (Voltage Dip)', type: 'text' },
          { key: 'upsProtected', label: 'هل تم حماية الأنظمة بوحدات UPS؟', type: 'select', options: ['نعم بنجاح', 'لا'] },
          { key: 'notes', label: 'ملاحظات التحليل الفني للتذبذب', type: 'textarea' }
        ],
        records: [
          { id: 'FLC-01', affectedFacility: 'غرفة التحكم في انارة المدرج (AFL control room)', fluctuationDate: '2026-10-18', fluctuationTime: '14:22', durationSeconds: '8 ثوانٍ', fluctuationRange: 'هبوط من 380V إلى 340V', upsProtected: 'نعم بنجاح', notes: 'استقرار فوري عبر وحدات منظم الجهد AVR ودخول UPS' },
          { id: 'FLC-02', affectedFacility: 'مركز المراقبه والتحكم (METCO)', fluctuationDate: '2026-10-16', fluctuationTime: '09:05', durationSeconds: '4 ثوانٍ', fluctuationRange: 'تذبذب طفيف 5%', upsProtected: 'نعم بنجاح', notes: 'لم تتأثر أجهزة الاتصال والملاحة' }
        ]
      },
      {
        id: 'sub_outage_water',
        textIcon: '🚰',
        shortTitle: 'انقطاع المياه',
        helpText: 'سجل حالات انقطاع إمدادات المياه بالتاريخ والزمن والمرافق المتأثرة وخطة الطوارئ.',
        icon: ICON_PATHS.PowerPlant,
        summaryKeys: [
          { key: 'affectedFacility', label: 'المرفق المتأثر' },
          { key: 'outageStart', label: 'بداية الانقطاع' },
          { key: 'duration', label: 'المدة' },
          { key: 'scheduled', label: 'مجدول؟' }
        ],
        fields: [
          { key: 'affectedFacility', label: 'المرفق المتأثر', type: 'master_location' },
          { key: 'outageStart', label: 'تاريخ ووقت الانقطاع', type: 'datetime-local' },
          { key: 'outageEnd', label: 'تاريخ ووقت عودة المياه', type: 'datetime-local' },
          { key: 'duration', label: 'مدة الانقطاع', type: 'text' },
          { key: 'scheduled', label: 'مجدول مسبقاً؟', type: 'select', options: ['لا', 'نعم'] },
          { key: 'reason', label: 'سبب الانقطاع والإجراء المتخذ', type: 'textarea' }
        ],
        records: [
          { id: 'OWT-01', affectedFacility: 'الشحن الجوي (Cargo)', outageStart: '2026-10-16T01:00', outageEnd: '2026-10-16T03:00', duration: 'ساعتان', scheduled: 'نعم', reason: 'ربط خط التغذية الجديد وصيانة محبس العزل الرئيسي' }
        ]
      },
      {
        id: 'sub_outage_phone',
        textIcon: '📞',
        shortTitle: 'انقطاع الهاتف',
        helpText: 'سجل انقطاع شبكة الهاتف والسنترال PABX بالتاريخ والزمن والخطوط المتأثرة.',
        icon: ICON_PATHS.Communication,
        summaryKeys: [
          { key: 'affectedFacility', label: 'المرفق المتأثر' },
          { key: 'outageStart', label: 'بداية الانقطاع' },
          { key: 'duration', label: 'المدة' },
          { key: 'scheduled', label: 'مجدول؟' }
        ],
        fields: [
          { key: 'affectedFacility', label: 'المرفق المتأثر', type: 'master_location' },
          { key: 'outageStart', label: 'تاريخ ووقت الانقطاع', type: 'datetime-local' },
          { key: 'outageEnd', label: 'تاريخ ووقت عودة الخطوط', type: 'datetime-local' },
          { key: 'duration', label: 'مدة الانقطاع', type: 'text' },
          { key: 'scheduled', label: 'مجدول مسبقاً؟', type: 'select', options: ['لا', 'نعم'] },
          { key: 'reason', label: 'سبب الانقطاع والإجراء المتخذ', type: 'textarea' }
        ],
        records: [
          { id: 'OPH-01', affectedFacility: 'التنفيذي (VIP)', outageStart: '2026-10-14T10:00', outageEnd: '2026-10-14T10:25', duration: '25 دقيقة', scheduled: 'نعم', reason: 'ترقية نظام السنترال الرئيسي وتحديث لوحة التوزيع' }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 12. المشاريع القائمة بالموقع (أعمال المقاولين)
  // --------------------------------------------------------------------------
  {
    id: 'mod_contractors',
    textIcon: '🏗️',
    shortTitle: 'المشاريع القائمة بالموقع',
    excelName: 'المشاريع القائمة بالموقع',
    fullTitle: 'المشاريع القائمة بالموقع (أعمال المقاولين)',
    helpText: 'متابعة المشاريع القائمة بالمطار، نسب الإنجاز الحقيقي، نسبة مرور الزمن، وتحديد نوع الخدمة المقطوعة إن وجدت.',
    icon: ICON_PATHS.PG,
    badge: 0,
    subSections: [
      {
        id: 'sub_contractors',
        textIcon: '🏗️',
        shortTitle: 'المشاريع القائمة بالموقع',
        helpText: 'عرض بطاقات المشاريع (اسم المشروع، الموقع، البداية، النهاية المجدولة، مخططات نسب الزمن والإنجاز، وفصل الخدمات).',
        icon: ICON_PATHS.PG,
        summaryKeys: [
          { key: 'projectName', label: 'اسم المشروع' },
          { key: 'location', label: 'الموقع' },
          { key: 'startDate', label: 'تاريخ البداية' },
          { key: 'endDate', label: 'النهاية المجدولة' }
        ],
        fields: [
          { key: 'projectName', label: 'اسم المشروع', type: 'text' },
          { key: 'contractorName', label: 'اسم الشركة / المقاول', type: 'master_catalog_contractor' },
          { key: 'location', label: 'موقع العمل', type: 'master_location' },
          { key: 'systemWorkType', label: 'النظام / نوع العمل', type: 'text' },
          { key: 'startDate', label: 'تاريخ بدء العمل', type: 'date' },
          { key: 'endDate', label: 'تاريخ النهاية المجدولة', type: 'date' },
          { key: 'timeElapsedPct', label: 'نسبة مرور الزمن المحدد (%)', type: 'readonly_calc' },
          { key: 'actualCompletionPct', label: 'نسبة الإنجاز الحقيقي (%)', type: 'number' },
          { key: 'serviceCutType', label: 'نوع الخدمة المقطوعة إن وجدت', type: 'select', options: ['لا يوجد قطع خدمة', 'قطع شبكة المياه', 'قطع التيار الكهربائي', 'قطع الاتصالات والشبكة', 'إغلاق مسار مروري'] },
          { key: 'cutStartTime', label: 'زمن بدء قطع الخدمة', type: 'datetime-local' },
          { key: 'cutEndTime', label: 'زمن انتهاء قطع الخدمة', type: 'datetime-local' },
          { key: 'notes', label: 'ملاحظات المشروع', type: 'textarea' }
        ],
        records: [
          {
            id: 'PRJ-01',
            projectName: 'مشروع تطوير وتأهيل أكتاف المدرج التكتيكي Bravo',
            contractorName: 'شركة الرواسي للمقاولات الملاحية',
            location: 'مدرج الطيران RUNWAY (RUNWAY)',
            systemWorkType: 'أعمال رصف وتأهيل أكتاف ممر الطائرات',
            startDate: '2026-08-01',
            endDate: '2026-12-30',
            timeElapsedPct: 53,
            actualCompletionPct: 68,
            serviceCutType: 'قطع التيار الكهربائي',
            cutStartTime: '2026-10-20T01:00',
            cutEndTime: '2026-10-20T04:00',
            notes: 'تم استكمال طبقة الأساس الحجري وجاري صب الخرسانة الخاصة'
          },
          {
            id: 'PRJ-02',
            projectName: 'مشروع توسعة مواقف صالة الركاب التنفيذي VIP',
            contractorName: 'مؤسسة البناء المتكامل المحدودة',
            location: 'مواقف التنفيذي (VIP PARKING)',
            systemWorkType: 'أعمال إنترلوك وأرصفة ومظلات سيارات',
            startDate: '2026-09-15',
            endDate: '2026-11-30',
            timeElapsedPct: 45,
            actualCompletionPct: 40,
            serviceCutType: 'لا يوجد قطع خدمة',
            notes: 'جاري تركيب الهياكل الحديدية للمظلات وأعمدة الإنارة الذكية'
          }
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
