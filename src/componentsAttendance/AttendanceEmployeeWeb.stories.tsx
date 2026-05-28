import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { employeeWebScreens } from './screens/employeeWeb.registry';
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
  const screen = employeeWebScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/04 직원 웹',
  component: ScreenStory,
  args: { screenId: 'employee-home-web', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmployeeHomeWeb: Story = {
  name: '00 · 홈',
  args: { screenId: 'employee-home-web' },
};

export const EmployeePunchWeb: Story = {
  name: '01 · 출퇴근',
  args: { screenId: 'employee-punch-web' },
};

export const EmployeeScheduleWeb: Story = {
  name: '05 · 스케줄',
  args: { screenId: 'employee-schedule-web' },
};

export const EmployeeShiftSwapMobile: Story = {
  name: '06 · 스케줄 교환 신청 (모바일)',
  args: { screenId: 'employee-shift-swap-mobile' },
};

export const EmployeeTodoWeb: Story = {
  name: '02 · 할 일',
  args: { screenId: 'employee-todo-web' },
};

export const EmployeeMemoWeb: Story = {
  name: '03 · 메모·인수인계',
  args: { screenId: 'employee-memo-web' },
};

export const EmployeeMemoDetailWeb: Story = {
  name: 'EW5b · 메모 상세·댓글 (직원웹)',
  args: { screenId: 'employee-memo-detail-web' },
};

export const EmployeeSalaryWeb: Story = {
  name: '04 · 내 급여',
  args: { screenId: 'employee-salary-web' },
};

export const EmployeeContractWeb: Story = {
  name: 'EW8 · 내 근로계약서 (직원웹)',
  args: { screenId: 'employee-contract-web' },
};
