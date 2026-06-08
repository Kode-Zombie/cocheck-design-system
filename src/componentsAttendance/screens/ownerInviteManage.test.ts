import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { OwnerInviteListMobile, OwnerInviteManageWeb } from './latestAdditions';

const countOccurrences = (markup: string, text: string) => markup.split(text).length - 1;

describe('owner invite management screens', () => {
  it('shows invite timestamps and status-specific actions on the web invite list', () => {
    const markup = renderToStaticMarkup(createElement(OwnerInviteManageWeb, { theme: 'calm' }));

    expect(markup).toContain('초대일시 06.08 10:20');
    expect(markup).toContain('초대일시 06.05 14:12');
    expect(markup).toContain('초대일시 06.01 09:30');
    expect(markup).toContain('완료일시 06.07 09:15');
    expect(countOccurrences(markup, '> 취소</button>')).toBe(1);
    expect(countOccurrences(markup, '> 재전송</button>')).toBe(1);
  });

  it('shows invite timestamps and status-specific actions in the mobile invite list', () => {
    const markup = renderToStaticMarkup(createElement(OwnerInviteListMobile, { theme: 'calm' }));

    expect(markup).toContain('att-invite-card');
    expect(markup).toContain('매장');
    expect(markup).toContain('GS25 강남역점');
    expect(markup).toContain('스타벅스 선릉');
    expect(markup).toContain('성수 베이커리');
    expect(countOccurrences(markup, '전화번호')).toBe(3);
    expect(countOccurrences(markup, '초대일시')).toBe(3);
    expect(markup).toContain('06.08 10:20');
    expect(markup).toContain('06.05 14:12');
    expect(markup).toContain('06.01 09:30');
    expect(markup).toContain('완료일시');
    expect(markup).toContain('06.07 09:15');
    expect(countOccurrences(markup, '> 취소</button>')).toBe(1);
    expect(countOccurrences(markup, '> 재전송</button>')).toBe(1);
  });
});
