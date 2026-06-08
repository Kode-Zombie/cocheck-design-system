import {
  EmptyEmployeeMobile,
  EmptyOwnerMobile,
  EmptyOwnerWeb,
} from './emptyStates';
import type { AttendanceScreen } from './screenTypes';

export const emptyStateScreens: AttendanceScreen[] = [
  { id: 'empty-owner-mobile', label: 'E1 · 경영주 홈 (매장 없음)', group: 'Empty States', width: 402, height: 874, viewport: 'mobile', Component: EmptyOwnerMobile },
  { id: 'empty-employee-mobile', label: 'E2 · 직원 홈 (근무 없음)', group: 'Empty States', width: 402, height: 874, viewport: 'mobile', Component: EmptyEmployeeMobile },
  { id: 'empty-owner-web', label: 'E3 · 경영주 웹 대시보드 (직원 없음)', group: 'Empty States', width: 1280, height: 800, viewport: 'web', Component: EmptyOwnerWeb },
];
