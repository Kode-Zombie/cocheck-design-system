import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('경영주 메모', '앱');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/경영주 메모/앱',
  component: ScreenStory,
  args: { screenId: 'owner-memo-mobile', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const OwnerMemoMobile = story('owner-memo-mobile');
