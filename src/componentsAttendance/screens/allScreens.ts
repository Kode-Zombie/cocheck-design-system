import type { AttendanceScreen } from './screenTypes';
import { emptyStateScreens } from './emptyStates.registry';
import { employeeMobileScreens } from './employeeMobile.registry';
import { employeeWebScreens } from './employeeWeb.registry';
import { onboardingScreens } from './onboarding.registry';
import { ownerMobileScreens } from './ownerMobile.registry';
import { ownerWebScreens } from './ownerWeb.registry';
import { proposalScreens } from './proposals.registry';

export { emptyStateScreens };
export { employeeMobileScreens };
export { employeeWebScreens };
export { onboardingScreens };
export { ownerMobileScreens };
export { ownerWebScreens };
export { proposalScreens };

export const attendanceScreenGroups: Array<{
  title: string;
  screens: AttendanceScreen[];
}> = [
  { title: '가입 · 로그인 · 매장 등록', screens: onboardingScreens },
  { title: '직원용 · 모바일 앱', screens: employeeMobileScreens },
  { title: '사장님용 · 모바일 앱', screens: ownerMobileScreens },
  { title: '직원용 · 웹 버전', screens: employeeWebScreens },
  { title: '사장님용 · 웹 대시보드', screens: ownerWebScreens },
  { title: '첫 가입 · Empty States', screens: emptyStateScreens },
  { title: '제안한 추가 기능', screens: proposalScreens },
];

export const allAttendanceScreens = attendanceScreenGroups.flatMap(
  (group) => group.screens,
);
