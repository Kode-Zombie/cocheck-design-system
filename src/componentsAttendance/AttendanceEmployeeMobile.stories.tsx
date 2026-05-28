import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { employeeMobileScreens } from './screens/employeeMobile.registry';
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
  const screen = employeeMobileScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/02 직원 모바일',
  component: ScreenStory,
  args: { screenId: 'employee-home-mobile', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmployeeHomeMobile: Story = {
  name: '01 · 홈',
  args: { screenId: 'employee-home-mobile' },
};

export const EmployeePunchMobile: Story = {
  name: '02 · 출퇴근',
  args: { screenId: 'employee-punch-mobile' },
};

export const EmployeeScheduleMobile: Story = {
  name: '03 · 스케줄',
  args: { screenId: 'employee-schedule-mobile' },
};

export const EmployeeLateMobile: Story = {
  name: 'M4 · 지각·결근 보고 (직원)',
  args: { screenId: 'employee-late-mobile' },
};

export const EmployeeTodoMobile: Story = {
  name: '04 · 할 일',
  args: { screenId: 'employee-todo-mobile' },
};

export const EmployeeTodoCreateMobile: Story = {
  name: 'M5b · 내 할일 추가 (직원)',
  args: { screenId: 'employee-todo-create-mobile' },
};

export const EmployeeMemoMobile: Story = {
  name: '05 · 메모·인수인계',
  args: { screenId: 'employee-memo-mobile' },
};

export const EmployeeMemoDetailMobile: Story = {
  name: 'M6b · 메모 상세·댓글 (직원)',
  args: { screenId: 'employee-memo-detail-mobile' },
};

export const EmployeeMemoCreateMobile: Story = {
  name: 'F2 · 메모·게시글 작성 (모바일)',
  args: { screenId: 'employee-memo-create-mobile' },
};

export const EmployeeSalaryMobile: Story = {
  name: '06 · 월급 계산',
  args: { screenId: 'employee-salary-mobile' },
};

export const EmployeeContractMobile: Story = {
  name: 'M9 · 내 근로계약서 (직원)',
  args: { screenId: 'employee-contract-mobile' },
};

export const EmployeeContractDetailMobile: Story = {
  name: 'M9b · 계약서 상세 바텀시트',
  args: { screenId: 'employee-contract-detail-mobile' },
};
