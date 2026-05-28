import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { emptyStateScreens } from './screens/emptyStates.registry';
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
  const screen = emptyStateScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/06 Empty States',
  component: ScreenStory,
  args: { screenId: 'empty-owner-mobile', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyOwnerMobile: Story = {
  name: 'E1 · 사장님 홈 (매장 없음)',
  args: { screenId: 'empty-owner-mobile' },
};

export const EmptyEmployeeMobile: Story = {
  name: 'E2 · 직원 홈 (근무 없음)',
  args: { screenId: 'empty-employee-mobile' },
};

export const EmptyOwnerWeb: Story = {
  name: 'E3 · 사장님 웹 대시보드 (직원 없음)',
  args: { screenId: 'empty-owner-web' },
};
