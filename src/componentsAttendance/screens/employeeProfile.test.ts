import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { employeeMobileScreens } from './employeeMobile.registry';
import { employeeWebScreens } from './employeeWeb.registry';

describe('employee profile customer support entry points', () => {
  it('registers an employee mobile my page with customer support items', () => {
    const screen = employeeMobileScreens.find((item) => item.id === 'employee-profile-mobile');

    expect(screen).toBeDefined();

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('나');
    expect(markup).toContain('고객지원');
    expect(markup).toContain('공지사항');
    expect(markup).toContain('1:1 문의');
    expect(markup).toContain('문의 내역');
  });

  it('registers an employee web my page with customer support items', () => {
    const screen = employeeWebScreens.find((item) => item.id === 'employee-profile-web');

    expect(screen).toBeDefined();

    const markup = renderToStaticMarkup(createElement(screen!.Component, { theme: 'calm' }));

    expect(markup).toContain('내 정보');
    expect(markup).toContain('고객지원');
    expect(markup).toContain('공지사항');
    expect(markup).toContain('1:1 문의');
    expect(markup).toContain('문의 내역');
  });
});
