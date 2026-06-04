import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('사장님 급여관리', '앱');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/사장님 급여관리/앱',
  component: ScreenStory,
  args: { screenId: 'owner-payroll-mobile', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const OwnerPayrollMobile = story('owner-payroll-mobile');
export const OwnerPayrollPublishMobile = story('owner-payroll-publish-mobile');
