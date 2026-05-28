import type { ComponentType } from 'react';
import type { AttendanceThemeName } from '../attendance-theme';

export type AttendanceViewport = 'mobile' | 'web' | 'custom';

export type AttendanceScreenProps = {
  theme?: AttendanceThemeName;
};

export type AttendanceScreen = {
  id: string;
  label: string;
  group: string;
  width: number;
  height: number;
  viewport: AttendanceViewport;
  Component: ComponentType<AttendanceScreenProps>;
};
