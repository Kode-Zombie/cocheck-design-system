import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EmployeeHomeMobile } from './employeeMobile';
import { ownerMobileScreens } from './ownerMobile.registry';

const attendanceCss = readFileSync(new URL('../attendance.css', import.meta.url), 'utf8');

function getHeaderMarkup(markup: string, label: string) {
  const match = markup.match(new RegExp(`<header aria-label="${label}"[\\s\\S]*?</header>`));
  return match?.[0] ?? '';
}

describe('owner mobile app header', () => {
  it('shows the CoCheck app header on every owner mobile screen', () => {
    for (const screen of ownerMobileScreens) {
      const markup = renderToStaticMarkup(createElement(screen.Component, { theme: 'calm' }));

      expect(markup, screen.id).toContain('aria-label="경영주 앱 헤더"');
      expect(markup, screen.id).toContain('src="/cocheck-logo.png"');
      expect(markup, screen.id).toContain('CoCheck');
    }
  });

  it('uses the app header as the owner home notification launcher', () => {
    const ownerHome = ownerMobileScreens.find((screen) => screen.id === 'owner-home-mobile');
    const markup = renderToStaticMarkup(createElement(ownerHome!.Component, { theme: 'calm' }));

    expect(markup).not.toContain('aria-label="알림 보기"');
  });

  it('shows a store selector on the owner app header', () => {
    for (const screen of ownerMobileScreens) {
      const markup = renderToStaticMarkup(createElement(screen.Component, { theme: 'calm' }));
      const headerMarkup = getHeaderMarkup(markup, '경영주 앱 헤더');

      expect(headerMarkup, screen.id).toContain('aria-label="지점 선택"');
      expect(headerMarkup, screen.id).toContain('GS25 강남역점');
      expect(headerMarkup, screen.id).toContain('스타벅스 선릉');
      expect(headerMarkup, screen.id).toContain('성수 베이커리');
      expect(headerMarkup, screen.id).not.toContain('aria-label="설정 열기"');
    }
  });

  it('keeps the store selector out of the employee app header', () => {
    const markup = renderToStaticMarkup(createElement(EmployeeHomeMobile, { theme: 'calm' }));
    const headerMarkup = getHeaderMarkup(markup, '직원 앱 헤더');

    expect(headerMarkup).toContain('aria-label="설정 열기"');
    expect(headerMarkup).not.toContain('aria-label="지점 선택"');
  });

  it('keeps the owner brand on the left and the store selector next to notifications', () => {
    const ownerHome = ownerMobileScreens.find((screen) => screen.id === 'owner-home-mobile');
    const markup = renderToStaticMarkup(createElement(ownerHome!.Component, { theme: 'calm' }));
    const headerMarkup = getHeaderMarkup(markup, '경영주 앱 헤더');
    const brandIndex = headerMarkup.indexOf('att-owner-app-header__brand');
    const selectIndex = headerMarkup.indexOf('aria-label="지점 선택"');
    const notificationIndex = headerMarkup.indexOf('aria-label="직원 알림 보내기"');

    expect(brandIndex).toBeGreaterThan(-1);
    expect(selectIndex).toBeGreaterThan(brandIndex);
    expect(notificationIndex).toBeGreaterThan(selectIndex);
    expect(attendanceCss).toContain('grid-template-columns: minmax(0, 1fr) 118px 40px;');
    expect(attendanceCss).toContain('justify-self: start;');
    expect(attendanceCss).toContain('grid-column: 2;');
    expect(attendanceCss).toContain('max-width: 118px;');
  });
});
