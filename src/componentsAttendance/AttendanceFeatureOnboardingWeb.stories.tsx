import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('온보딩', '웹');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/온보딩/웹',
  component: ScreenStory,
  args: { screenId: 'owner-signup-web', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const OwnerSignupWeb = story('owner-signup-web');
export const LoginWeb = story('latest-login-web');
export const PasswordResetWeb = story('latest-password-reset-web');
export const RoleSelectWeb = story('latest-role-select-web');
export const StoreRegisterWeb = story('latest-store-register-web');
export const StoreRegisterStep2Web = story('latest-store-register-step2-web');
export const StaffInviteWeb = story('latest-staff-invite-web');
export const StaffJoinWeb = story('latest-staff-join-web');
