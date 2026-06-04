import type { AttendanceThemeName } from './attendance-theme';
import type { AttendanceScreen } from './screens/screenTypes';

export type AttendanceStoryArgs = {
  screenId: string;
  theme: AttendanceThemeName;
};

export const attendanceStoryArgTypes = {
  theme: {
    control: 'inline-radio' as const,
    options: ['calm', 'warm', 'dark'],
  },
  screenId: { table: { disable: true } },
};

export function createScreenStory(screens: AttendanceScreen[]) {
  return function ScreenStory({ screenId, theme }: AttendanceStoryArgs) {
    const screen = screens.find((item) => item.id === screenId);

    if (!screen) {
      return null;
    }

    return <screen.Component theme={theme} />;
  };
}

export function getScreenLabel(screens: AttendanceScreen[], screenId: string) {
  return screens.find((item) => item.id === screenId)?.label ?? screenId;
}
