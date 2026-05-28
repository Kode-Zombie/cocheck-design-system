import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import { ownerWebScreens } from './screens/ownerWeb.registry';
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
  const screen = ownerWebScreens.find((item) => item.id === screenId);

  if (!screen) {
    return null;
  }

  return <screen.Component theme={theme} />;
}

const meta = {
  title: 'Attendance/05 사장님 웹',
  component: ScreenStory,
  args: { screenId: 'owner-dashboard-web', theme: 'calm' },
  argTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OwnerDashboardWeb: Story = {
  name: '01 · 대시보드',
  args: { screenId: 'owner-dashboard-web' },
};

export const OwnerScheduleWeb: Story = {
  name: '02 · 스케줄 편성',
  args: { screenId: 'owner-schedule-web' },
};

export const OwnerScheduleCreateWeb: Story = {
  name: 'F3 · 새 근무 추가 (웹 모달)',
  args: { screenId: 'owner-schedule-create-web' },
};

export const OwnerPayrollWeb: Story = {
  name: '03 · 급여 관리',
  args: { screenId: 'owner-payroll-web' },
};

export const OwnerStaffWeb: Story = {
  name: '04 · 직원 관리',
  args: { screenId: 'owner-staff-web' },
};

export const OwnerStaffAddWeb: Story = {
  name: 'F4 · 직원 추가 (웹 모달)',
  args: { screenId: 'owner-staff-add-web' },
};

export const OwnerAttendanceWeb: Story = {
  name: '05 · 근태 현황',
  args: { screenId: 'owner-attendance-web' },
};

export const OwnerMemoWeb: Story = {
  name: '06 · 메모·인수인계',
  args: { screenId: 'owner-memo-web' },
};

export const OwnerMemoCreateWeb: Story = {
  name: 'F5 · 메모·공지 작성 (웹 모달)',
  args: { screenId: 'owner-memo-create-web' },
};

export const OwnerLeaveWeb: Story = {
  name: '07 · 휴가·연차 관리',
  args: { screenId: 'owner-leave-web' },
};

export const OwnerStatsWeb: Story = {
  name: '08 · 통계 리포트',
  args: { screenId: 'owner-stats-web' },
};

export const OwnerTaxationWeb: Story = {
  name: 'D9 · 세무사 연결',
  args: { screenId: 'owner-taxation-web' },
};

export const OwnerLaborWeb: Story = {
  name: 'D10 · 근로계약서',
  args: { screenId: 'owner-labor-web' },
};

export const OwnerLaborCreateWeb: Story = {
  name: 'D10b · 근로계약서 작성 폼',
  args: { screenId: 'owner-labor-create-web' },
};

export const OwnerLaborPreviewWeb: Story = {
  name: 'D10c · 계약서 미리보기·다운로드·업로드',
  args: { screenId: 'owner-labor-preview-web' },
};

export const OwnerPaymentWeb: Story = {
  name: 'D11 · 결제·구독 관리',
  args: { screenId: 'owner-payment-web' },
};

export const OwnerPaymentCheckoutWeb: Story = {
  name: 'D11b · 결제 위젯 (토스페이먼츠)',
  args: { screenId: 'owner-payment-checkout-web' },
};
