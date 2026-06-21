import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { attendanceFeatureStoryGroups } from './featureStoryGroups';
import { ownerMobileScreens } from './ownerMobile.registry';
import { ownerWebScreens } from './ownerWeb.registry';

describe('owner memo app screens', () => {
  it('adds an owner mobile memo screen under the memo tab', () => {
    const screen = ownerMobileScreens.find((item) => item.id === 'owner-memo-mobile');

    expect(screen).toBeDefined();
    expect(screen!.label).toBe('02 · 메모');

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('aria-label="경영주 앱 헤더"');
    expect(markup).toContain('공지 · 인수인계를 한 곳에서 확인합니다');
    expect(markup).toContain('3번 냉장고 온도 불안정');
    expect(markup).toContain('아침 입고 지연');
    expect(markup).toContain('인수인계');
    expect(markup).toContain('공지');
    expect(markup).toMatch(/aria-current="page"[\s\S]*?<span>메모<\/span>/);
  });

  it('renames owner memo menus and feature groups to memo', () => {
    const ownerMemoWeb = ownerWebScreens.find((item) => item.id === 'owner-memo-web');
    const ownerMemoCreateWeb = ownerWebScreens.find((item) => item.id === 'owner-memo-create-web');
    const ownerMemoAppGroup = attendanceFeatureStoryGroups.find((group) => (
      group.feature === '경영주 메모' && group.platform === '앱'
    ));
    const ownerMemoWebGroup = attendanceFeatureStoryGroups.find((group) => (
      group.feature === '경영주 메모' && group.platform === '웹'
    ));

    expect(ownerMemoWeb!.label).toBe('06 · 메모');
    expect(ownerMemoCreateWeb!.label).toBe('F5 · 메모 작성 (웹 모달)');
    expect(ownerMemoAppGroup?.screens.map((screen) => screen.id)).toEqual(['owner-memo-mobile']);
    expect(ownerMemoWebGroup?.screens.map((screen) => screen.id)).toEqual([
      'owner-memo-web',
      'owner-memo-create-web',
    ]);
  });
});
