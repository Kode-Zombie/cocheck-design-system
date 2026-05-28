import type { AttendanceScreen } from './screenTypes';
import { employeeMobileScreens } from './employeeMobile';
import { employeeWebScreens } from './employeeWeb';
import { onboardingScreens } from './onboarding';
import { ownerMobileScreens } from './ownerMobile';
import { ownerWebScreens } from './ownerWeb';

export { employeeMobileScreens };
export { employeeWebScreens };
export { onboardingScreens };
export { ownerMobileScreens };
export { ownerWebScreens };
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
