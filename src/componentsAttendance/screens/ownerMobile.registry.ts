import {
  OwnerAttendanceMobile,
  OwnerHomeMobile,
  OwnerMeMobile,
  OwnerPayrollMobile,
  OwnerPayrollPublishMobile,
  OwnerRosterMobile,
  OwnerStoresMobile,
  OwnerTodoCreateMobile,
  OwnerTodoMobile,
} from './ownerMobile';
import type { AttendanceScreen } from './screenTypes';

export const ownerMobileScreens: AttendanceScreen[] = [
  { id: 'owner-home-mobile', label: '01 · 사장님 홈', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerHomeMobile },
  { id: 'owner-roster-mobile', label: '02 · 스케줄 편성', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerRosterMobile },
  { id: 'owner-payroll-mobile', label: '03 · 급여 관리', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerPayrollMobile },
  { id: 'owner-payroll-publish-mobile', label: 'OM3b · 급여 발행', group: '사장님 모바일', width: 390, height: 844, viewport: 'mobile', Component: OwnerPayrollPublishMobile },
  { id: 'owner-stores-mobile', label: '04 · 매장 관리', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerStoresMobile },
  { id: 'owner-attendance-mobile', label: '05 · 출퇴근 현황', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerAttendanceMobile },
  { id: 'owner-todo-mobile', label: '06 · 할 일 관리', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerTodoMobile },
  { id: 'owner-todo-create-mobile', label: 'F1 · 할 일 추가 (모바일)', group: '사장님 모바일', width: 402, height: 874, viewport: 'mobile', Component: OwnerTodoCreateMobile },
  { id: 'owner-me-mobile', label: 'OM7 · 나 탭 (사장 마이페이지)', group: '사장님 모바일', width: 390, height: 844, viewport: 'mobile', Component: OwnerMeMobile },
];
