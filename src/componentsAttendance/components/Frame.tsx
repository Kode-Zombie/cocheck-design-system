import type { ReactNode } from 'react';
import {
  getAttendanceThemeStyle,
  type AttendanceThemeName,
} from '../attendance-theme';
import '../attendance.css';

type FrameProps = {
  children: ReactNode;
  theme?: AttendanceThemeName;
  width?: number;
  height?: number;
  title?: string;
};

export function MobileFrame({
  children,
  theme = 'calm',
  width = 402,
  height = 874,
  title,
}: FrameProps) {
  return (
    <section
      aria-label={title}
      className="att-root att-mobile-frame"
      style={{ ...getAttendanceThemeStyle(theme), width, height }}
    >
      {children}
    </section>
  );
}

export function WebFrame({
  children,
  theme = 'calm',
  width = 1280,
  height = 800,
  title,
}: FrameProps) {
  return (
    <section
      aria-label={title}
      className="att-root att-web-frame"
      style={{ ...getAttendanceThemeStyle(theme), width, height }}
    >
      {children}
    </section>
  );
}
