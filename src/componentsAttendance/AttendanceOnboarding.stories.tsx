import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { onboardingScreens } from './screens/onboarding.registry';
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
  const screen = onboardingScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/01 가입·온보딩',
  component: ScreenStory,
  args: { screenId: 'owner-signup-web', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerSignupWeb: Story = {
  name: '01 · 사장님 회원가입 (웹)',
  args: { screenId: 'owner-signup-web' },
};

export const LoginMobile: Story = {
  name: '02 · 로그인 (모바일)',
  args: { screenId: 'login-mobile' },
};

export const RoleSelectMobile: Story = {
  name: '03 · 역할 선택',
  args: { screenId: 'role-select-mobile' },
};

export const StoreRegisterMobile: Story = {
  name: '04 · 매장 등록',
  args: { screenId: 'store-register-mobile' },
};

export const StaffInviteMobile: Story = {
  name: '05 · 직원 초대',
  args: { screenId: 'staff-invite-mobile' },
};

export const StoreManageWeb: Story = {
  name: '06 · 매장 관리 (웹)',
  args: { screenId: 'store-manage-web' },
};

export const StoreRegisterStep2Mobile: Story = {
  name: '04-B · 매장 등록 2/3 (영업시간·인증)',
  args: { screenId: 'store-register-step2-mobile' },
};

export const StaffJoinMobile: Story = {
  name: '07 · 직원 - 매장 코드 입력',
  args: { screenId: 'staff-join-mobile' },
};

export const PasswordResetMobile: Story = {
  name: '08 · 비밀번호 찾기 (인증 단계)',
  args: { screenId: 'password-reset-mobile' },
};
