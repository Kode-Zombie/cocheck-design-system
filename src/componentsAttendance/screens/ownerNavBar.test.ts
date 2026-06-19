import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { emptyStateScreens } from './emptyStates.registry';
import { latestAdditionScreens } from './latestAdditions.registry';
import { ownerMobileScreens } from './ownerMobile.registry';
import type { AttendanceScreen } from './screenTypes';

const ownerScreensWithoutTabBar = new Set([
  'owner-payroll-publish-mobile',
  'owner-schedule-edit-mobile',
  'owner-push-message-create-mobile',
]);

const ownerAppScreens: AttendanceScreen[] = [
  ...ownerMobileScreens,
  ...latestAdditionScreens.filter((screen) => (
    screen.viewport === 'mobile' && screen.id.startsWith('latest-owner-')
  )),
  ...emptyStateScreens.filter((screen) => screen.id === 'empty-owner-mobile'),
].filter((screen) => !ownerScreensWithoutTabBar.has(screen.id));

function getOwnerNavMarkup(markup: string) {
  const match = markup.match(/<nav aria-label="경영주 하단 메뉴"[\s\S]*?<\/nav>/);
  return match?.[0] ?? '';
}

function getVisibleNavText(navMarkup: string) {
  return navMarkup.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function getNavButtonMarkups(navMarkup: string) {
  return navMarkup.match(/<button[\s\S]*?<\/button>/g) ?? [];
}

describe('owner mobile navigation bar', () => {
  it('uses the unified owner app tab order', () => {
    for (const screen of ownerAppScreens) {
      const markup = renderToStaticMarkup(createElement(screen.Component, { theme: 'calm' }));
      const navMarkup = getOwnerNavMarkup(markup);
      const navText = getVisibleNavText(navMarkup);

      expect(navMarkup, screen.id).toContain('aria-label="경영주 하단 메뉴"');
      expect(navText, screen.id).toBe('홈메모일정급여');
      expect(navMarkup, screen.id).toContain('aria-label="나"');
      expect(navMarkup, screen.id).toContain('lucide-ellipsis');
      expect(navText, screen.id).not.toContain('스케줄');
      expect(navText, screen.id).not.toContain('매장');
    }
  });

  it('groups store management under the hidden more tab', () => {
    const storesScreen = ownerMobileScreens.find((screen) => screen.id === 'owner-stores-mobile');
    const markup = renderToStaticMarkup(createElement(storesScreen!.Component, { theme: 'calm' }));
    const navMarkup = getOwnerNavMarkup(markup);
    const activeButton = getNavButtonMarkups(navMarkup).find((buttonMarkup) => (
      buttonMarkup.includes('aria-current="page"')
    ));

    expect(activeButton).toContain('aria-label="나"');
  });
});
