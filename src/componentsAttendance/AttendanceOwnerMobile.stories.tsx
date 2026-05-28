import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { ownerMobileScreens } from './screens/ownerMobile.registry';
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
  const screen = ownerMobileScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/03 사장님 모바일',
  component: ScreenStory,
  args: { screenId: 'owner-home-mobile', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerHomeMobile: Story = {
  name: '01 · 사장님 홈',
  args: { screenId: 'owner-home-mobile' },
};

export const OwnerRosterMobile: Story = {
  name: '02 · 스케줄 편성',
  args: { screenId: 'owner-roster-mobile' },
};

export const OwnerPayrollMobile: Story = {
  name: '03 · 급여 관리',
  args: { screenId: 'owner-payroll-mobile' },
};

export const OwnerPayrollPublishMobile: Story = {
  name: 'OM3b · 급여 발행',
  args: { screenId: 'owner-payroll-publish-mobile' },
};

export const OwnerStoresMobile: Story = {
  name: '04 · 매장 관리',
  args: { screenId: 'owner-stores-mobile' },
};

export const OwnerAttendanceMobile: Story = {
  name: '05 · 출퇴근 현황',
  args: { screenId: 'owner-attendance-mobile' },
};

export const OwnerTodoMobile: Story = {
  name: '06 · 할 일 관리',
  args: { screenId: 'owner-todo-mobile' },
};

export const OwnerTodoCreateMobile: Story = {
  name: 'F1 · 할 일 추가 (모바일)',
  args: { screenId: 'owner-todo-create-mobile' },
};

export const OwnerMeMobile: Story = {
  name: 'OM7 · 나 탭 (사장 마이페이지)',
  args: { screenId: 'owner-me-mobile' },
};
