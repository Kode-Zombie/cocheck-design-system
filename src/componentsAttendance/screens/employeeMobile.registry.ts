import {
  EmployeeContractDetailMobile,
  EmployeeContractMobile,
  EmployeeHomeMobile,
  EmployeeLateMobile,
  EmployeeMemoCreateMobile,
  EmployeeMemoDetailMobile,
  EmployeeMemoMobile,
  EmployeeNotificationMobile,
  EmployeeProfileMobile,
  EmployeeSalaryMobile,
  EmployeeScheduleDetailCompletedMobile,
  EmployeeScheduleDetailFutureMobile,
  EmployeeScheduleMobile,
} from './employeeMobile';
import type { AttendanceScreen } from './screenTypes';

export const employeeMobileScreens: AttendanceScreen[] = [
  { id: 'employee-home-mobile', label: '01 · 홈 · 지금 근무 관리', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeHomeMobile },
  { id: 'employee-memo-mobile', label: '02 · 메모 · 공지사항 및 메모 관리', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoMobile },
  { id: 'employee-schedule-mobile', label: '03 · 일정 목록 조회', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeScheduleMobile },
  { id: 'employee-schedule-detail-future-mobile', label: 'M3b · 일정 상세·수정 (예정)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeScheduleDetailFutureMobile },
  { id: 'employee-schedule-detail-completed-mobile', label: 'M3c · 수행 일정 상세', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeScheduleDetailCompletedMobile },
  { id: 'employee-late-mobile', label: 'M4 · 지각·결근 보고 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeLateMobile },
  { id: 'employee-memo-detail-mobile', label: 'M6b · 메모 상세·댓글 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeMemoDetailMobile },
  { id: 'employee-memo-create-mobile', label: 'F2 · 메모·게시글 작성 (모바일)', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoCreateMobile },
  { id: 'employee-salary-mobile', label: '04 · 급여 조회', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeSalaryMobile },
  { id: 'employee-contract-mobile', label: 'M9 · 내 근로계약서 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractMobile },
  { id: 'employee-contract-detail-mobile', label: 'M9b · 계약서 상세 바텀시트', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractDetailMobile },
  { id: 'employee-profile-mobile', label: '05 · 나 · 마이페이지', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeProfileMobile },
  { id: 'employee-notification-mobile', label: '알림창', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeNotificationMobile },
];
