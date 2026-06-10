import {
  EmployeeContractWeb,
  EmployeeHomeWeb,
  EmployeeMemoDetailWeb,
  EmployeeMemoWeb,
  EmployeePunchWeb,
  EmployeeProfileWeb,
  EmployeeSalaryWeb,
  EmployeeScheduleDetailCompletedWeb,
  EmployeeScheduleDetailFutureWeb,
  EmployeeScheduleWeb,
  EmployeeShiftSwapMobile,
} from './employeeWeb';
import type { AttendanceScreen } from './screenTypes';

export const employeeWebScreens: AttendanceScreen[] = [
  { id: 'employee-home-web', label: '00 · 홈', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeHomeWeb },
  { id: 'employee-punch-web', label: '01 · 출퇴근', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeePunchWeb },
  { id: 'employee-schedule-web', label: '05 · 스케줄', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeScheduleWeb },
  { id: 'employee-schedule-detail-future-web', label: 'EW5b · 일정 상세·수정 (예정)', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeScheduleDetailFutureWeb },
  { id: 'employee-schedule-detail-completed-web', label: 'EW5c · 수행 일정 상세', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeScheduleDetailCompletedWeb },
  { id: 'employee-shift-swap-mobile', label: '06 · 스케줄 교환 신청 (모바일)', group: '직원 웹', width: 402, height: 874, viewport: 'mobile', Component: EmployeeShiftSwapMobile },
  { id: 'employee-memo-web', label: '03 · 메모·인수인계', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeMemoWeb },
  { id: 'employee-memo-detail-web', label: 'EW5b · 메모 상세·댓글 (직원웹)', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeMemoDetailWeb },
  { id: 'employee-salary-web', label: '04 · 내 급여', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeSalaryWeb },
  { id: 'employee-contract-web', label: 'EW8 · 내 근로계약서 (직원웹)', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeContractWeb },
  { id: 'employee-profile-web', label: 'EW13 · 내 정보 (직원웹)', group: '직원 웹', width: 1280, height: 800, viewport: 'web', Component: EmployeeProfileWeb },
];
