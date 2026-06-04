import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { OwnerHomeMobile } from './ownerMobile';
import { OwnerDashboardWeb } from './ownerWeb';

describe('owner push message quick entry points', () => {
  it('shows a global employee notification send action in the owner web shell', () => {
    const markup = renderToStaticMarkup(createElement(OwnerDashboardWeb, { theme: 'calm' }));

    expect(markup).toContain('aria-label="직원 알림 보내기"');
    expect(markup).toContain('직원 알림 보내기');
  });

  it('shows employee notification as a quick action on the owner mobile home', () => {
    const markup = renderToStaticMarkup(createElement(OwnerHomeMobile, { theme: 'calm' }));

    expect(markup).toContain('aria-label="직원 알림 보내기"');
    expect(markup).toContain('직원 알림 보내기');
  });
});
