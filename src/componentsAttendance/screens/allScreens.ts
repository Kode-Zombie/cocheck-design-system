import type { AttendanceScreen } from './screenTypes';
import { emptyStateScreens } from './emptyStates.registry';
import { employeeMobileScreens } from './employeeMobile.registry';
import { employeeWebScreens } from './employeeWeb.registry';
import { attendanceFeatureGalleryGroups } from './featureStoryGroups';
import { latestAdditionScreens } from './latestAdditions.registry';
import { onboardingScreens } from './onboarding.registry';
import { ownerMobileScreens } from './ownerMobile.registry';
import { ownerWebScreens } from './ownerWeb.registry';
import { proposalScreens } from './proposals.registry';

export { emptyStateScreens };
export { employeeMobileScreens };
export { employeeWebScreens };
export { latestAdditionScreens };
export { onboardingScreens };
export { ownerMobileScreens };
export { ownerWebScreens };
export { proposalScreens };

export const attendanceScreenGroups: Array<{
  title: string;
  screens: AttendanceScreen[];
}> = [
  ...attendanceFeatureGalleryGroups,
  { title: '첫 가입 · Empty States', screens: emptyStateScreens },
  { title: '제안한 추가 기능', screens: proposalScreens },
];

export const allAttendanceScreens = attendanceScreenGroups.flatMap(
  (group) => group.screens,
);
