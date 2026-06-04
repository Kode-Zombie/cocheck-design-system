import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  attendanceStoryArgTypes,
  createScreenStory,
  getScreenLabel,
} from './AttendanceScreenStory';
import { getFeatureStoryGroup } from './screens/featureStoryGroups';
import './attendance.css';

const group = getFeatureStoryGroup('온보딩', '앱');
const ScreenStory = createScreenStory(group.screens);

const meta = {
  title: 'Attendance/기능별/온보딩/앱',
  component: ScreenStory,
  args: { screenId: 'login-mobile', theme: 'calm' },
  argTypes: attendanceStoryArgTypes,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (screenId: string): Story => ({
  name: getScreenLabel(group.screens, screenId),
  args: { screenId },
});

export const LoginMobile = story('login-mobile');
export const RoleSelectMobile = story('role-select-mobile');
export const StoreRegisterMobile = story('store-register-mobile');
export const StoreRegisterStep2Mobile = story('store-register-step2-mobile');
export const StaffInviteMobile = story('staff-invite-mobile');
export const StaffJoinMobile = story('staff-join-mobile');
export const PasswordResetMobile = story('password-reset-mobile');
