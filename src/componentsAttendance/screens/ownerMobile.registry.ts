import {
  OwnerAttendanceMobile,
  OwnerHomeMobile,
  OwnerMeMobile,
  OwnerMemoMobile,
  OwnerPayrollMobile,
  OwnerPayrollPublishMobile,
  OwnerPushMessageCreateMobile,
  OwnerRosterMobile,
  OwnerScheduleEditMobile,
  OwnerScheduleManagementMobile,
  OwnerStoresMobile,
} from './ownerMobile';
import type { AttendanceScreen } from './screenTypes';

export const ownerMobileScreens: AttendanceScreen[] = [
  { id: 'owner-home-mobile', label: '01 · 경영주 홈', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerHomeMobile },
  { id: 'owner-memo-mobile', label: '02 · 메모', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerMemoMobile },
  { id: 'owner-roster-mobile', label: '02 · 스케줄 편성', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerRosterMobile },
  { id: 'owner-payroll-mobile', label: '03 · 급여 관리', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerPayrollMobile },
  { id: 'owner-payroll-publish-mobile', label: 'OM3b · 급여 발행', group: '경영주 모바일', width: 390, height: 844, viewport: 'mobile', Component: OwnerPayrollPublishMobile },
  { id: 'owner-stores-mobile', label: '04 · 매장 관리', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerStoresMobile },
  { id: 'owner-attendance-mobile', label: '05 · 출퇴근 현황', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerAttendanceMobile },
  { id: 'owner-schedule-management-mobile', label: '06 · 일정 관리', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerScheduleManagementMobile },
  { id: 'owner-schedule-edit-mobile', label: 'F1 · 일정 수정 (모바일)', group: '경영주 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerScheduleEditMobile },
  { id: 'owner-push-message-create-mobile', label: 'F2 · 직원 알림 보내기 (모바일)', group: '경영주 모바일', width: 390, height: 844, viewport: 'mobile', Component: OwnerPushMessageCreateMobile },
  { id: 'owner-me-mobile', label: 'OM7 · 나 탭 (사장 마이페이지)', group: '경영주 모바일', width: 390, height: 844, viewport: 'mobile', Component: OwnerMeMobile },
];
