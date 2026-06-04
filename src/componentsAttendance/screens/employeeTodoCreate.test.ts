import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EmployeeTodoCreateMobile } from './employeeMobile';

describe('employee todo create form', () => {
  it('keeps the personal todo form scoped to content and memo only', () => {
    const markup = renderToStaticMarkup(createElement(EmployeeTodoCreateMobile, { theme: 'calm' }));

    expect(markup).toContain('내 할일 추가');
    expect(markup).toContain('제목 *');
    expect(markup).toContain('메모');
    expect(markup).not.toContain('기한');
    expect(markup).not.toContain('매장');
    expect(markup).not.toContain('반복');
    expect(markup).not.toContain('알림 받기');
  });
});
