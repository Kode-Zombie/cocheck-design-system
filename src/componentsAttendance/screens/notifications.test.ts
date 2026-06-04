import { describe, expect, it } from 'vitest';
import {
  buildNotificationRows,
  notificationCategoryConfigs,
  type NotificationCategory,
  type Push,
} from './notifications';

const allCategories: NotificationCategory[] = [
  'COMMENT',
  'NOTICE',
  'DIRECT_MESSAGE',
  'INVITATION',
  'SALARY_BILL_PUBLISHED',
  'SCHEDULE_CHANGE_REQUEST',
  'SCHEDULE_UPDATE',
  'ATTENDANCE',
  'ALARM',
];

describe('notification row model', () => {
  it('has display metadata for every backend notification category', () => {
    expect(Object.keys(notificationCategoryConfigs).sort()).toEqual([...allCategories].sort());
    expect(notificationCategoryConfigs.SALARY_BILL_PUBLISHED.label).toBe('명세서 발급');
    expect(notificationCategoryConfigs.SCHEDULE_CHANGE_REQUEST.label).toBe('일정 교환 요청');
    expect(notificationCategoryConfigs.ATTENDANCE.label).toBe('근태');
  });

  it('builds visible rows for a selected user from push notifications', () => {
    const pushes: Push[] = [
      {
        id: 200,
        createdAt: new Date('2026-05-18T09:00:00+09:00'),
        category: 'NOTICE',
        title: '공지 제목',
        content: '전체 공지 내용',
        writtenByUserId: 501,
        recipientIds: [101, 102],
        notifications: [
          {
            id: 1,
            userId: 101,
            puId: 200,
            title: '공지 제목',
            content: '전체 공지 내용',
            category: 'NOTICE',
            readAt: new Date('2026-05-18T09:20:00+09:00'),
            deletedAt: null,
          },
          {
            id: 2,
            userId: 102,
            puId: 200,
            title: '다른 직원 알림',
            content: '보이면 안 되는 알림',
            category: 'NOTICE',
            readAt: null,
            deletedAt: null,
          },
        ],
      },
      {
        id: 201,
        createdAt: new Date('2026-05-18T10:00:00+09:00'),
        category: 'SCHEDULE_CHANGE_REQUEST',
        title: '일정 교환 요청',
        content: '박민아 님이 금요일 근무 교환을 요청했습니다.',
        writtenByUserId: 502,
        recipientIds: [101],
        notifications: [
          {
            id: 3,
            userId: 101,
            puId: 201,
            title: '일정 교환 요청',
            content: '박민아 님이 금요일 근무 교환을 요청했습니다.',
            category: 'SCHEDULE_CHANGE_REQUEST',
            readAt: null,
            deletedAt: null,
          },
        ],
      },
      {
        id: 202,
        createdAt: new Date('2026-05-18T11:00:00+09:00'),
        category: 'DIRECT_MESSAGE',
        title: '삭제된 메시지',
        content: '삭제한 알림입니다.',
        writtenByUserId: 503,
        recipientIds: [101],
        notifications: [
          {
            id: 4,
            userId: 101,
            puId: 202,
            title: '삭제된 메시지',
            content: '삭제한 알림입니다.',
            category: 'DIRECT_MESSAGE',
            readAt: null,
            deletedAt: new Date('2026-05-18T11:10:00+09:00'),
          },
        ],
      },
    ];

    const rows = buildNotificationRows(pushes, 101);

    expect(rows.map((row) => row.notificationId)).toEqual([3, 1]);
    expect(rows.every((row) => 'recipientCountLabel' in row)).toBe(false);
    expect(rows[0]).toMatchObject({
      category: 'SCHEDULE_CHANGE_REQUEST',
      categoryLabel: '일정 교환 요청',
      readStateLabel: '새 알림',
      readStateTone: 'primary',
    });
    expect(rows[1]).toMatchObject({
      category: 'NOTICE',
      categoryLabel: '공지',
      readStateLabel: '읽음',
      readStateTone: 'neutral',
    });
  });
});
