import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { OwnerHomeMobile } from './ownerMobile';
import { ownerMobileScreens } from './ownerMobile.registry';

describe('owner mobile schedule management screens', () => {
  it('replaces the standalone todo management screen with schedule management', () => {
    const screen = ownerMobileScreens.find((item) => item.id === 'owner-schedule-management-mobile');

    expect(screen).toBeDefined();
    expect(screen!.label).toBe('06 · 일정 관리');
    expect(ownerMobileScreens.some((item) => item.id === 'owner-todo-mobile')).toBe(false);

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('일정 관리');
    expect(markup).toContain('오늘 일정');
    expect(markup).toContain('일정별 할 일');
    expect(markup).toContain('체크리스트');
    expect(markup).toContain('09:00-18:00');
    expect(markup).not.toContain('전체 진행률');
  });

  it('replaces the todo create form with a schedule edit form that owns todos', () => {
    const screen = ownerMobileScreens.find((item) => item.id === 'owner-schedule-edit-mobile');

    expect(screen).toBeDefined();
    expect(screen!.label).toBe('F1 · 일정 수정 (모바일)');
    expect(ownerMobileScreens.some((item) => item.id === 'owner-todo-create-mobile')).toBe(false);

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('일정 수정');
    expect(markup).toContain('근무 정보');
    expect(markup).toContain('근무 내용');
    expect(markup).toContain('일정별 할 일');
    expect(markup).toContain('가이드라인');
    expect(markup).toContain('예시 이미지');
    expect(markup).not.toContain('할 일 추가');
    expect(markup).not.toContain('반복');
  });

  it('routes the owner home quick action toward schedule addition instead of standalone todos', () => {
    const markup = renderToStaticMarkup(createElement(OwnerHomeMobile, { theme: 'calm' }));

    expect(markup).toContain('일정 추가');
    expect(markup).not.toContain('할 일 추가');
  });

  it('shows short checklists inline and folds checklists with three or more items', () => {
    const screen = ownerMobileScreens.find((item) => item.id === 'owner-schedule-management-mobile');
    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('POS 전원 켜고 현금 시재 확인');
    expect(markup).toContain('냉장고 온도 확인');
    expect(markup).toContain('행사 매대 정리');
    expect(markup).toContain('체크리스트 3개 접힘');
    expect(markup).toContain('체크리스트 펼치기');
    expect(markup).not.toContain('마감 로그 사진 업로드');
  });
});
