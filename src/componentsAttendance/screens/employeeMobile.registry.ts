import {
  EmployeeContractDetailMobile,
  EmployeeContractMobile,
  EmployeeHomeMobile,
  EmployeeLateMobile,
  EmployeeMemoCreateMobile,
  EmployeeMemoDetailMobile,
  EmployeeMemoMobile,
  EmployeePunchMobile,
  EmployeeSalaryMobile,
  EmployeeScheduleMobile,
  EmployeeTodoCreateMobile,
  EmployeeTodoMobile,
} from './employeeMobile';
import type { AttendanceScreen } from './screenTypes';

export const employeeMobileScreens: AttendanceScreen[] = [
  { id: 'employee-home-mobile', label: '01 · 홈', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeHomeMobile },
  { id: 'employee-punch-mobile', label: '02 · 출퇴근', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeePunchMobile },
  { id: 'employee-schedule-mobile', label: '03 · 스케줄', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeScheduleMobile },
  { id: 'employee-late-mobile', label: 'M4 · 지각·결근 보고 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeLateMobile },
  { id: 'employee-todo-mobile', label: '04 · 할 일', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeTodoMobile },
  { id: 'employee-todo-create-mobile', label: 'M5b · 내 할일 추가 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeTodoCreateMobile },
  { id: 'employee-memo-mobile', label: '05 · 메모·인수인계', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoMobile },
  { id: 'employee-memo-detail-mobile', label: 'M6b · 메모 상세·댓글 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeMemoDetailMobile },
  { id: 'employee-memo-create-mobile', label: 'F2 · 메모·게시글 작성 (모바일)', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoCreateMobile },
  { id: 'employee-salary-mobile', label: '06 · 월급 계산', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeSalaryMobile },
  { id: 'employee-contract-mobile', label: 'M9 · 내 근로계약서 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractMobile },
  { id: 'employee-contract-detail-mobile', label: 'M9b · 계약서 상세 바텀시트', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractDetailMobile },
];
