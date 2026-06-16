import { employeeMobileScreens } from './employeeMobile.registry';
import { employeeWebScreens } from './employeeWeb.registry';
import { latestAdditionScreens } from './latestAdditions.registry';
import { onboardingScreens } from './onboarding.registry';
import { ownerMobileScreens } from './ownerMobile.registry';
import { ownerWebScreens } from './ownerWeb.registry';
import type { AttendanceScreen } from './screenTypes';

export type AttendanceFeaturePlatform = '웹' | '앱' | '프리뷰';

export type AttendanceFeatureStoryGroup = {
  feature: string;
  platform: AttendanceFeaturePlatform;
  screens: AttendanceScreen[];
};

const screensById = new Map(
  [
    ...onboardingScreens,
    ...employeeMobileScreens,
    ...employeeWebScreens,
    ...ownerMobileScreens,
    ...ownerWebScreens,
    ...latestAdditionScreens,
  ].map((screen) => [screen.id, screen]),
);

function pickScreens(...screenIds: string[]) {
  return screenIds.map((screenId) => {
    const screen = screensById.get(screenId);

    if (!screen) {
      throw new Error(`Unknown attendance screen: ${screenId}`);
    }

    return screen;
  });
}

export const attendanceFeatureStoryGroups: AttendanceFeatureStoryGroup[] = [
  {
    feature: '디자인 테마',
    platform: '프리뷰',
    screens: pickScreens('latest-theme-dusk', 'latest-theme-minimal'),
  },
  {
    feature: '온보딩',
    platform: '웹',
    screens: pickScreens(
      'owner-signup-web',
      'latest-login-web',
      'latest-password-reset-web',
      'latest-role-select-web',
      'latest-store-register-web',
      'latest-store-register-step2-web',
      'latest-staff-invite-web',
      'latest-staff-join-web',
    ),
  },
  {
    feature: '온보딩',
    platform: '앱',
    screens: pickScreens(
      'login-mobile',
      'role-select-mobile',
      'store-register-mobile',
      'store-register-step2-mobile',
      'staff-invite-mobile',
      'staff-join-mobile',
      'password-reset-mobile',
    ),
  },
  {
    feature: '직원 홈',
    platform: '웹',
    screens: pickScreens('employee-home-web'),
  },
  {
    feature: '직원 홈',
    platform: '앱',
    screens: pickScreens('employee-home-mobile'),
  },
  {
    feature: '직원 출퇴근',
    platform: '웹',
    screens: pickScreens('employee-punch-web'),
  },
  {
    feature: '직원 일정관리',
    platform: '웹',
    screens: pickScreens(
      'employee-schedule-web',
      'employee-schedule-detail-future-web',
      'employee-schedule-detail-completed-web',
    ),
  },
  {
    feature: '직원 일정관리',
    platform: '앱',
    screens: pickScreens(
      'employee-schedule-mobile',
      'employee-schedule-detail-future-mobile',
      'employee-schedule-detail-completed-mobile',
      'employee-shift-swap-mobile',
      'latest-employee-shift-swap-mobile',
    ),
  },
  {
    feature: '직원 메모',
    platform: '웹',
    screens: pickScreens(
      'employee-memo-web',
      'employee-memo-detail-web',
      'latest-employee-memo-create-web',
    ),
  },
  {
    feature: '직원 메모',
    platform: '앱',
    screens: pickScreens(
      'employee-memo-mobile',
      'employee-memo-detail-mobile',
      'employee-memo-create-mobile',
    ),
  },
  {
    feature: '직원 급여',
    platform: '웹',
    screens: pickScreens('employee-salary-web'),
  },
  {
    feature: '직원 급여',
    platform: '앱',
    screens: pickScreens('employee-salary-mobile'),
  },
  {
    feature: '직원 계약서',
    platform: '웹',
    screens: pickScreens('employee-contract-web', 'latest-employee-contract-detail-web'),
  },
  {
    feature: '직원 계약서',
    platform: '앱',
    screens: pickScreens('employee-contract-mobile', 'employee-contract-detail-mobile'),
  },
  {
    feature: '직원 알림',
    platform: '웹',
    screens: pickScreens('latest-employee-notification-web'),
  },
  {
    feature: '직원 알림',
    platform: '앱',
    screens: pickScreens('employee-notification-mobile'),
  },
  {
    feature: '직원 프로필',
    platform: '웹',
    screens: pickScreens('employee-profile-web'),
  },
  {
    feature: '직원 프로필',
    platform: '앱',
    screens: pickScreens('employee-profile-mobile'),
  },
  {
    feature: '직원 근태보고',
    platform: '웹',
    screens: pickScreens('latest-employee-late-report-web'),
  },
  {
    feature: '직원 근태보고',
    platform: '앱',
    screens: pickScreens('employee-late-mobile'),
  },
  {
    feature: '경영주 홈',
    platform: '웹',
    screens: pickScreens('owner-dashboard-web'),
  },
  {
    feature: '경영주 홈',
    platform: '앱',
    screens: pickScreens('owner-home-mobile'),
  },
  {
    feature: '경영주 일정관리',
    platform: '웹',
    screens: pickScreens(
      'owner-schedule-web',
      'owner-schedule-create-web',
      'latest-owner-schedule-edit-web',
    ),
  },
  {
    feature: '경영주 일정관리',
    platform: '앱',
    screens: pickScreens(
      'owner-roster-mobile',
      'owner-schedule-management-mobile',
      'owner-schedule-edit-mobile',
    ),
  },
  {
    feature: '경영주 급여관리',
    platform: '웹',
    screens: pickScreens('owner-payroll-web'),
  },
  {
    feature: '경영주 급여관리',
    platform: '앱',
    screens: pickScreens('owner-payroll-mobile', 'owner-payroll-publish-mobile'),
  },
  {
    feature: '경영주 매장관리',
    platform: '웹',
    screens: pickScreens('store-manage-web'),
  },
  {
    feature: '경영주 매장관리',
    platform: '앱',
    screens: pickScreens('owner-stores-mobile'),
  },
  {
    feature: '경영주 직원관리',
    platform: '웹',
    screens: pickScreens('owner-staff-web', 'owner-staff-add-web', 'latest-owner-staff-edit-web'),
  },
  {
    feature: '경영주 출퇴근현황',
    platform: '웹',
    screens: pickScreens('owner-attendance-web'),
  },
  {
    feature: '경영주 출퇴근현황',
    platform: '앱',
    screens: pickScreens('owner-attendance-mobile'),
  },
  {
    feature: '경영주 메모공지',
    platform: '웹',
    screens: pickScreens('owner-memo-web', 'owner-memo-create-web'),
  },
  {
    feature: '경영주 알림',
    platform: '웹',
    screens: pickScreens('owner-push-message-create-web', 'latest-owner-notification-web'),
  },
  {
    feature: '경영주 알림',
    platform: '앱',
    screens: pickScreens('owner-push-message-create-mobile', 'latest-owner-notification-mobile'),
  },
  {
    feature: '경영주 통계리포트',
    platform: '웹',
    screens: pickScreens('owner-stats-web'),
  },
  {
    feature: '경영주 통계리포트',
    platform: '앱',
    screens: pickScreens('latest-owner-stats-mobile'),
  },
  {
    feature: '경영주 세무사연결',
    platform: '웹',
    screens: pickScreens('owner-taxation-web'),
  },
  {
    feature: '경영주 세무사연결',
    platform: '앱',
    screens: pickScreens('latest-owner-taxation-mobile'),
  },
  {
    feature: '경영주 계약서',
    platform: '웹',
    screens: pickScreens('owner-labor-web', 'owner-labor-create-web', 'owner-labor-preview-web'),
  },
  {
    feature: '경영주 계약서',
    platform: '앱',
    screens: pickScreens('latest-owner-labor-mobile'),
  },
  {
    feature: '경영주 결제구독',
    platform: '웹',
    screens: pickScreens('owner-payment-web', 'owner-payment-checkout-web'),
  },
  {
    feature: '경영주 결제구독',
    platform: '앱',
    screens: pickScreens('latest-owner-payment-mobile'),
  },
  {
    feature: '경영주 프로필',
    platform: '웹',
    screens: pickScreens('latest-owner-profile-web'),
  },
  {
    feature: '경영주 프로필',
    platform: '앱',
    screens: pickScreens('owner-me-mobile', 'latest-owner-profile-edit-mobile'),
  },
  {
    feature: '경영주 할 일',
    platform: '웹',
    screens: pickScreens('latest-owner-todo-web'),
  },
];

export function getFeatureStoryGroup(
  feature: string,
  platform: AttendanceFeaturePlatform,
) {
  const group = attendanceFeatureStoryGroups.find(
    (item) => item.feature === feature && item.platform === platform,
  );

  if (!group) {
    throw new Error(`Unknown attendance feature story group: ${feature}/${platform}`);
  }

  return group;
}

export const attendanceFeatureGalleryGroups = attendanceFeatureStoryGroups.map((group) => ({
  title: `${group.feature} · ${group.platform}`,
  screens: group.screens,
}));
