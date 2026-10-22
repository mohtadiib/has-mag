// ============================================================================
// HAS MAG IFMT - FIELD INSPECTIONS SERVICE (خدمة إدارة تذاكر الجولات الميدانية)
// Flutter Equivalent: lib/domain/services/inspection_service.dart
// ============================================================================

/**
 * Flutter Service Equivalent: lib/domain/services/inspection_service.dart
 * تسجيل تذكرة تفتيش جديدة
 */
function submitNewInspection(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const deptCode = fd.get('department');
  const hasCM = fd.get('hasCM') || 'لا';
  const cmNumber = hasCM === 'نعم' ? (fd.get('cmNumber') || `CM-${Math.floor(320 + Math.random() * 90)}`) : '';
  INSPECTION_TICKETS.unshift({
    id: 'TKT-' + Math.floor(200 + Math.random() * 700),
    title: fd.get('title') || fd.get('problemDesc'),
    department: deptCode,
    location: fd.get('location'),
    status: 'مفتوحة',
    timeAgo: 'الآن',
    responseTime: '1 دقيقة',
    totalDuration: '10 دقائق',
    maintDuration: '9 دقائق',
    reporter: 'Mazen (Inspector)',
    hasCM: hasCM,
    cmNumber: cmNumber,
    thumb: ICON_PATHS.photoBefore,
    afterPhoto: ICON_PATHS.photoAfter,
    closingNotes: hasCM === 'نعم' ? `تم فتح أمر عمل (${cmNumber}) وتوجيه القسم المختص.` : 'تم رصد الملاحظة وإحالتها للمتابعة الميدانية.'
  });
  const depObj = MASTER_DATA.departments.find(d => d.code === deptCode);
  if (depObj) depObj.badge = (depObj.badge || 0) + 1;
  closeBottomSheet();
  showToast('تمت إضافة تذكرة الجولة الميدانية');
  renderApp();
}

/**
 * Flutter Service Equivalent: lib/domain/services/inspection_service.dart
 * تبديل حالة تذكرة التفتيش (مفتوحة / مغلقة)
 */
function toggleTicketStatus(tktId) {
  const tkt = INSPECTION_TICKETS.find(r => r.id === tktId);
  if (tkt) {
    tkt.status = tkt.status === 'مغلقة' ? 'مفتوحة' : 'مغلقة';
    showToast(`حالة التذكرة: ${tkt.status}`);
    renderApp();
  }
}

window.submitNewInspection = submitNewInspection;
window.toggleTicketStatus = toggleTicketStatus;
