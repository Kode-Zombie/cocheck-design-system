import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('디자인 테마', '프리뷰');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/디자인 테마/프리뷰',
  component: ScreenStory,
  args: { screenId: 'latest-theme-dusk', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const ThemeDusk = story('latest-theme-dusk');
export const ThemeMinimal = story('latest-theme-minimal');
