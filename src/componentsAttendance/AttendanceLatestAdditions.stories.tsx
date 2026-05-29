import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { latestAdditionScreens } from './screens/latestAdditions.registry';
import './attendance.css';

type StoryArgs = {
  screenId: string;
  theme: AttendanceThemeName;
};

const argTypes = {
  theme: {
    control: 'inline-radio' as const,
    options: ['calm', 'warm', 'dark'],
  },
  screenId: { table: { disable: true } },
};

function ScreenStory({ screenId, theme }: StoryArgs) {
  const screen = latestAdditionScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/08 최신 추가 화면',
  component: ScreenStory,
  args: { screenId: 'latest-login-web', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeDusk: Story = {
  name: 'A · Dusk',
  args: { screenId: 'latest-theme-dusk' },
};

export const ThemeMinimal: Story = {
  name: 'B · Minimal',
  args: { screenId: 'latest-theme-minimal' },
};

export const LoginWeb: Story = {
  name: '09 · 로그인 (웹)',
  args: { screenId: 'latest-login-web' },
};

export const PasswordResetWeb: Story = {
  name: '10 · 비밀번호 찾기 (웹)',
  args: { screenId: 'latest-password-reset-web' },
};

export const RoleSelectWeb: Story = {
  name: '03-B · 역할 선택 (웹)',
  args: { screenId: 'latest-role-select-web' },
};

export const StoreRegisterWeb: Story = {
  name: '04-C · 매장 등록 1/3 (웹)',
  args: { screenId: 'latest-store-register-web' },
};

export const StoreRegisterStep2Web: Story = {
  name: '04-D · 매장 등록 2/3 (웹)',
  args: { screenId: 'latest-store-register-step2-web' },
};

export const StaffInviteWeb: Story = {
  name: '05-B · 직원 초대 (웹)',
  args: { screenId: 'latest-staff-invite-web' },
};

export const StaffJoinWeb: Story = {
  name: '07-B · 직원 코드 입력 (웹)',
  args: { screenId: 'latest-staff-join-web' },
};

export const EmployeeShiftSwapMobile: Story = {
  name: 'M3b · 근무 교환 신청 (직원 모바일)',
  args: { screenId: 'latest-employee-shift-swap-mobile' },
};

export const EmployeeNotificationMobile: Story = {
  name: 'M10 · 알림 (모바일)',
  args: { screenId: 'latest-employee-notification-mobile' },
};

export const OwnerInviteListMobile: Story = {
  name: 'OM4b · 초대 인원 목록 (사장 모바일)',
  args: { screenId: 'latest-owner-invite-list-mobile' },
};

export const OwnerProfileEditMobile: Story = {
  name: 'OM8 · 프로필 수정 (사장 모바일)',
  args: { screenId: 'latest-owner-profile-edit-mobile' },
};

export const OwnerNotificationMobile: Story = {
  name: 'OM9 · 알림 (사장 모바일)',
  args: { screenId: 'latest-owner-notification-mobile' },
};

export const OwnerLeaveMobile: Story = {
  name: 'OM10 · 휴가·연차 관리 (사장 모바일)',
  args: { screenId: 'latest-owner-leave-mobile' },
};

export const OwnerStatsMobile: Story = {
  name: 'OM11 · 통계 리포트 (사장 모바일)',
  args: { screenId: 'latest-owner-stats-mobile' },
};

export const OwnerTaxationMobile: Story = {
  name: 'OM12 · 세무사 연결 (사장 모바일)',
  args: { screenId: 'latest-owner-taxation-mobile' },
};

export const OwnerLaborMobile: Story = {
  name: 'OM13 · 근로계약서 (사장 모바일)',
  args: { screenId: 'latest-owner-labor-mobile' },
};

export const OwnerPaymentMobile: Story = {
  name: 'OM14 · 결제·구독 (사장 모바일)',
  args: { screenId: 'latest-owner-payment-mobile' },
};

export const EmployeeNotificationWeb: Story = {
  name: 'EW9 · 알림 (직원 웹)',
  args: { screenId: 'latest-employee-notification-web' },
};

export const EmployeeLateReportWeb: Story = {
  name: 'EW10 · 지각·결근 보고 (직원 웹)',
  args: { screenId: 'latest-employee-late-report-web' },
};

export const EmployeeMemoCreateWeb: Story = {
  name: 'EW11 · 메모·게시글 작성 (직원 웹)',
  args: { screenId: 'latest-employee-memo-create-web' },
};

export const EmployeeContractDetailWeb: Story = {
  name: 'EW12 · 계약서 상세 (직원 웹)',
  args: { screenId: 'latest-employee-contract-detail-web' },
};

export const OwnerScheduleEditWeb: Story = {
  name: 'F3b · 근무 수정 (웹 모달)',
  args: { screenId: 'latest-owner-schedule-edit-web' },
};

export const OwnerStaffEditWeb: Story = {
  name: 'F5b · 직원 정보 수정 (웹 모달)',
  args: { screenId: 'latest-owner-staff-edit-web' },
};

export const OwnerNotificationWeb: Story = {
  name: 'D13 · 알림 (사장 웹)',
  args: { screenId: 'latest-owner-notification-web' },
};

export const OwnerProfileWeb: Story = {
  name: 'D12 · 내 계정·프로필 (사장 웹)',
  args: { screenId: 'latest-owner-profile-web' },
};

export const OwnerTodoWeb: Story = {
  name: 'D14 · 할 일 관리 (사장 웹)',
  args: { screenId: 'latest-owner-todo-web' },
};

export const OwnerInviteManageWeb: Story = {
  name: 'D15 · 초대 관리 (사장 웹)',
  args: { screenId: 'latest-owner-invite-manage-web' },
};

