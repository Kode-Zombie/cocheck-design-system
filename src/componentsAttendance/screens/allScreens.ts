import type { AttendanceScreen } from './screenTypes';
import { onboardingScreens } from './onboarding';

export { onboardingScreens };
export const employeeMobileScreens: AttendanceScreen[] = [];
export const ownerMobileScreens: AttendanceScreen[] = [];
export const employeeWebScreens: AttendanceScreen[] = [];
export const ownerWebScreens: AttendanceScreen[] = [];
export const emptyStateScreens: AttendanceScreen[] = [];
export const proposalScreens: AttendanceScreen[] = [];

export const attendanceScreenGroups = [
  { title: '가입 · 로그인 · 매장 등록', screens: onboardingScreens },
  { title: '직원용 · 모바일 앱', screens: employeeMobileScreens },
  { title: '사장님용 · 모바일 앱', screens: ownerMobileScreens },
  { title: '직원용 · 웹 버전', screens: employeeWebScreens },
  { title: '사장님용 · 웹 대시보드', screens: ownerWebScreens },
  { title: '첫 가입 · Empty States', screens: emptyStateScreens },
  { title: '제안한 추가 기능', screens: proposalScreens },
];
