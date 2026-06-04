import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ownerMobileScreens } from './ownerMobile.registry';
import { ownerWebScreens } from './ownerWeb.registry';

describe('owner push message send form', () => {
  it('registers a web modal form for sending employee push messages', () => {
    const screen = ownerWebScreens.find((item) => item.id === 'owner-push-message-create-web');

    expect(screen).toBeDefined();

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('직원 알림 보내기');
    expect(markup).toContain('대상 범위');
    expect(markup).toContain('메시지 유형');
    expect(markup).toContain('제목 *');
    expect(markup).toContain('내용 *');
    expect(markup).toContain('푸시 보내기');
  });

  it('registers a mobile full-screen form for sending employee push messages', () => {
    const screen = ownerMobileScreens.find((item) => item.id === 'owner-push-message-create-mobile');

    expect(screen).toBeDefined();

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('직원 알림 보내기');
    expect(markup).toContain('수신 대상');
    expect(markup).toContain('전체 직원');
    expect(markup).toContain('발송 시점');
    expect(markup).toContain('푸시 보내기');
  });
});
