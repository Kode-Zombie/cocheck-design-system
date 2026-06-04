import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

type StoryEntry = {
  screenId: string;
  title: string;
};

const storiesDir = dirname(fileURLToPath(import.meta.url));

function collectStoryEntries(): StoryEntry[] {
  return readdirSync(storiesDir)
    .filter((fileName) => fileName.endsWith('.stories.tsx'))
    .flatMap((fileName) => {
      const source = readFileSync(join(storiesDir, fileName), 'utf8');
      const title = source.match(/title:\s*'([^']+)'/)?.[1];

      if (!title) {
        return [];
      }

      const screenIds = new Set([
        ...Array.from(source.matchAll(/screenId:\s*'([^']+)'/g)).map((match) => match[1]),
        ...Array.from(source.matchAll(/story\('([^']+)'\)/g)).map((match) => match[1]),
      ]);

      return Array.from(screenIds).map((screenId) => ({ screenId, title }));
    });
}

describe('attendance feature story sidebar', () => {
  it('moves latest additions out of the catch-all sidebar section', () => {
    const titles = new Set(collectStoryEntries().map((entry) => entry.title));

    expect(Array.from(titles).filter((title) => title.includes('최신 추가 화면'))).toEqual([]);
  });

  it('groups latest additions by feature first and platform second', () => {
    const entries = collectStoryEntries();

    expect(entries).toEqual(
      expect.arrayContaining([
        { screenId: 'latest-login-web', title: 'Attendance/기능별/온보딩/웹' },
        { screenId: 'latest-employee-notification-mobile', title: 'Attendance/기능별/직원 알림/앱' },
        { screenId: 'latest-employee-notification-web', title: 'Attendance/기능별/직원 알림/웹' },
        { screenId: 'latest-owner-schedule-edit-web', title: 'Attendance/기능별/사장님 일정관리/웹' },
        { screenId: 'owner-schedule-management-mobile', title: 'Attendance/기능별/사장님 일정관리/앱' },
        { screenId: 'latest-owner-profile-edit-mobile', title: 'Attendance/기능별/사장님 프로필/앱' },
        { screenId: 'latest-owner-profile-web', title: 'Attendance/기능별/사장님 프로필/웹' },
        { screenId: 'latest-owner-payment-mobile', title: 'Attendance/기능별/사장님 결제구독/앱' },
      ]),
    );
  });
});
