import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('경영주 할 일', '웹');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/경영주 할 일/웹',
  component: ScreenStory,
  args: { screenId: 'latest-owner-todo-web', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const OwnerTodoWeb = story('latest-owner-todo-web');
