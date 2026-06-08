import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('직원 일정관리', '앱');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/직원 일정관리/앱',
  component: ScreenStory,
  args: { screenId: 'employee-schedule-mobile', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const EmployeeScheduleMobile = story('employee-schedule-mobile');
export const EmployeeScheduleDetailFutureMobile = story('employee-schedule-detail-future-mobile');
export const EmployeeScheduleDetailCompletedMobile = story('employee-schedule-detail-completed-mobile');
export const EmployeeShiftSwapMobile = story('employee-shift-swap-mobile');
export const LatestEmployeeShiftSwapMobile = story('latest-employee-shift-swap-mobile');
