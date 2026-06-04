import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { OwnerScheduleWeb } from './ownerWeb';
import { ownerWebScreens } from './ownerWeb.registry';

describe('owner web schedule create modal', () => {
  it('labels F3 as schedule creation instead of work creation', () => {
    const screen = ownerWebScreens.find((item) => item.id === 'owner-schedule-create-web');

    expect(screen).toBeDefined();
    expect(screen!.label).toBe('F3 · 일정 추가 (웹 모달)');

    const scheduleMarkup = renderToStaticMarkup(createElement(OwnerScheduleWeb, { theme: 'calm' }));

    expect(scheduleMarkup).toContain('일정 추가');
    expect(scheduleMarkup).not.toContain('근무 추가');
  });

  it('creates a branch schedule with owned checklist items', () => {
    const screen = ownerWebScreens.find((item) => item.id === 'owner-schedule-create-web');
    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('일정 추가');
    expect(markup).toContain('일정 정보');
    expect(markup).toContain('일정명 *');
    expect(markup).toContain('근무 내용');
    expect(markup).toContain('일정별 할 일');
    expect(markup).toContain('가이드라인');
    expect(markup).toContain('예시 이미지');
    expect(markup).toContain('체크리스트 항목 추가');
    expect(markup).not.toContain('새 근무 추가');
  });
});
