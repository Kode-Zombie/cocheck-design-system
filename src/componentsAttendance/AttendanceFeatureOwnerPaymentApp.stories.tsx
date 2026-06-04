import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('사장님 결제구독', '앱');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/사장님 결제구독/앱',
  component: ScreenStory,
  args: { screenId: 'latest-owner-payment-mobile', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const OwnerPaymentMobile = story('latest-owner-payment-mobile');
