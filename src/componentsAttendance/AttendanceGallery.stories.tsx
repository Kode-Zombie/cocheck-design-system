import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttendanceThemeName } from './attendance-theme';
import {
  AttendanceArtboard,
  AttendanceCanvas,
  AttendanceSection,
} from './components/AttendanceCanvas';
import { attendanceScreenGroups } from './screens/allScreens';
import './attendance.css';

type StoryArgs = {
  theme: AttendanceThemeName;
};

const argTypes = {
  theme: {
    control: 'inline-radio' as const,
    options: ['calm', 'warm', 'dark'],
  },
};

function Gallery({ theme }: StoryArgs) {
  return (
    <AttendanceCanvas>
      {attendanceScreenGroups.map((group) => (
        <AttendanceSection key={group.title} title={group.title}>
          {group.screens.map((screen) => (
            <AttendanceArtboard key={screen.id} screen={screen}>
              <screen.Component theme={theme} />
            </AttendanceArtboard>
          ))}
        </AttendanceSection>
      ))}
    </AttendanceCanvas>
  );
}

const meta = {
  title: 'Attendance/00 전체 갤러리',
  component: Gallery,
  args: { theme: 'calm' },
  argTypes,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllScreens: Story = {
  name: '전체 화면',
};
