import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { getFeatureStoryGroup } from './featureStoryGroups';
import { employeeMobileScreens } from './employeeMobile.registry';
import { employeeWebScreens } from './employeeWeb.registry';
import type { AttendanceScreen } from './screenTypes';

const renderScreen = (screen: AttendanceScreen | undefined) => {
  expect(screen).toBeDefined();
  return renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));
};

describe('employee schedule detail screens', () => {
  it('registers future and completed schedule detail screens for mobile and web', () => {
    expect(employeeMobileScreens.map((screen) => screen.id)).toContain('employee-schedule-detail-future-mobile');
    expect(employeeMobileScreens.map((screen) => screen.id)).toContain('employee-schedule-detail-completed-mobile');
    expect(employeeWebScreens.map((screen) => screen.id)).toContain('employee-schedule-detail-future-web');
    expect(employeeWebScreens.map((screen) => screen.id)).toContain('employee-schedule-detail-completed-web');

    expect(getFeatureStoryGroup('직원 일정관리', '앱').screens.map((screen) => screen.id)).toEqual(
      expect.arrayContaining([
        'employee-schedule-mobile',
        'employee-schedule-detail-future-mobile',
        'employee-schedule-detail-completed-mobile',
      ]),
    );
    expect(getFeatureStoryGroup('직원 일정관리', '웹').screens.map((screen) => screen.id)).toEqual(
      expect.arrayContaining([
        'employee-schedule-web',
        'employee-schedule-detail-future-web',
        'employee-schedule-detail-completed-web',
      ]),
    );
  });

  it('shows editable scheduled time and todos for a future employee schedule', () => {
    const mobileMarkup = renderScreen(
      employeeMobileScreens.find((screen) => screen.id === 'employee-schedule-detail-future-mobile'),
    );
    const webMarkup = renderScreen(
      employeeWebScreens.find((screen) => screen.id === 'employee-schedule-detail-future-web'),
    );

    for (const markup of [mobileMarkup, webMarkup]) {
      expect(markup).toContain('일정 상세·수정');
      expect(markup).toContain('예정 일정');
      expect(markup).toContain('근무 시각');
      expect(markup).toContain('09:00-18:00');
      expect(markup).toContain('할 일');
      expect(markup).toContain('포스기 점검 및 시재 확인');
      expect(markup).toContain('교대 요청');
      expect(markup).toContain('저장');
    }
  });

  it('shows punch times and checked todos for a completed employee schedule', () => {
    const mobileMarkup = renderScreen(
      employeeMobileScreens.find((screen) => screen.id === 'employee-schedule-detail-completed-mobile'),
    );
    const webMarkup = renderScreen(
      employeeWebScreens.find((screen) => screen.id === 'employee-schedule-detail-completed-web'),
    );

    for (const markup of [mobileMarkup, webMarkup]) {
      expect(markup).toContain('수행 일정 상세');
      expect(markup).toContain('완료 일정');
      expect(markup).toContain('근무 시각');
      expect(markup).toContain('09:00-18:00');
      expect(markup).toContain('출근 시각');
      expect(markup).toContain('08:58:42');
      expect(markup).toContain('퇴근 시각');
      expect(markup).toContain('18:03:10');
      expect(markup).toContain('체크된 할 일');
      expect(markup).toContain('냉장고 온도 확인 (2-5도)');
    }
  });
});
