import type { CSSProperties } from 'react';

export type AttendanceThemeName = 'calm' | 'warm' | 'dark';

export type AttendanceTheme = {
  name: string;
  bg: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primaryHover: string;
  primaryReadable: string;
  primarySoft: string;
  primaryText: string;
  success: string;
  successSoft: string;
  warn: string;
  warnSoft: string;
  danger: string;
  dangerSoft: string;
};

export const attendanceThemes: Record<AttendanceThemeName, AttendanceTheme> = {
  calm: {
    name: '브랜드 옐로',
    bg: '#FAFAF9',
    surface: '#FFFFFF',
    surfaceMuted: '#F5F5F4',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
    text: '#1C1917',
    textMuted: '#57534E',
    textSubtle: '#6B625C',
    primary: '#FDC62C',
    primaryHover: '#E6B01F',
    primaryReadable: '#8A5D00',
    primarySoft: '#FFF6D6',
    primaryText: '#111827',
    success: '#047857',
    successSoft: '#ECFDF5',
    warn: '#92400E',
    warnSoft: '#FFFBEB',
    danger: '#B91C1C',
    dangerSoft: '#FEF2F2',
  },
  warm: {
    name: '따뜻한 슬레이트',
    bg: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceMuted: '#F4EFE7',
    border: '#E8DFCF',
    borderStrong: '#D4C7B0',
    text: '#2A2520',
    textMuted: '#6B5F50',
    textSubtle: '#756957',
    primary: '#FDC62C',
    primaryHover: '#E6B01F',
    primaryReadable: '#8A5D00',
    primarySoft: '#FFF6D6',
    primaryText: '#111827',
    success: '#3E7C3A',
    successSoft: '#EDF6EC',
    warn: '#92400E',
    warnSoft: '#FEF6E7',
    danger: '#B91C1C',
    dangerSoft: '#FBEAEA',
  },
  dark: {
    name: '다크 모드',
    bg: '#0A0A0A',
    surface: '#161615',
    surfaceMuted: '#1F1F1E',
    border: '#2A2A28',
    borderStrong: '#3A3A38',
    text: '#F5F5F4',
    textMuted: '#D6D3D1',
    textSubtle: '#C7C2BC',
    primary: '#FDC62C',
    primaryHover: '#E6B01F',
    primaryReadable: '#FDC62C',
    primarySoft: '#332A10',
    primaryText: '#111827',
    success: '#34D399',
    successSoft: '#0F2A1F',
    warn: '#FBBF24',
    warnSoft: '#2A1F0A',
    danger: '#FCA5A5',
    dangerSoft: '#2A1414',
  },
};

export const getAttendanceThemeStyle = (
  themeName: AttendanceThemeName = 'calm',
): CSSProperties => {
  const theme = attendanceThemes[themeName];

  return {
    '--att-bg': theme.bg,
    '--att-surface': theme.surface,
    '--att-surface-muted': theme.surfaceMuted,
    '--att-border': theme.border,
    '--att-border-strong': theme.borderStrong,
    '--att-text': theme.text,
    '--att-text-muted': theme.textMuted,
    '--att-text-subtle': theme.textSubtle,
    '--att-primary': theme.primary,
    '--att-primary-hover': theme.primaryHover,
    '--att-primary-readable': theme.primaryReadable,
    '--att-primary-soft': theme.primarySoft,
    '--att-primary-text': theme.primaryText,
    '--att-success': theme.success,
    '--att-success-soft': theme.successSoft,
    '--att-warn': theme.warn,
    '--att-warn-soft': theme.warnSoft,
    '--att-danger': theme.danger,
    '--att-danger-soft': theme.dangerSoft,
  } as CSSProperties;
};
