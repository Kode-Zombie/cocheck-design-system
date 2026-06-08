export const notificationCategoryConfigs = {
  COMMENT: { label: '댓글', tone: 'primary' },
  NOTICE: { label: '공지', tone: 'neutral' },
  DIRECT_MESSAGE: { label: '메시지', tone: 'primary' },
  INVITATION: { label: '초대', tone: 'warning' },
  SALARY_BILL_PUBLISHED: { label: '명세서 발급', tone: 'success' },
  SCHEDULE_CHANGE_REQUEST: { label: '일정 교환 요청', tone: 'warning' },
  SCHEDULE_UPDATE: { label: '일정 변경', tone: 'primary' },
  ATTENDANCE: { label: '근태', tone: 'danger' },
  ALARM: { label: '근무 시간 알림', tone: 'warning' },
} as const;

export type NotificationCategory = keyof typeof notificationCategoryConfigs;
export type NotificationTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export type Notification = {
  id: number;
  userId: number;
  puId: number;
  title: string;
  content: string;
  category: NotificationCategory;
  readAt: Date | null;
  deletedAt: Date | null;
};

export type Push = {
  id: number;
  createdAt: Date;
  category: NotificationCategory;
  title: string;
  content: string;
  writtenByUserId: number;
  recipientIds: number[];
  notifications: Notification[];
};

export type NotificationRow = {
  notificationId: number;
  pushId: number;
  title: string;
  content: string;
  category: NotificationCategory;
  categoryLabel: string;
  categoryTone: NotificationTone;
  readStateLabel: '새 알림' | '읽음';
  readStateTone: NotificationTone;
  senderLabel: string;
  createdAtLabel: string;
  createdAt: Date;
};

export const employeeNotificationUserId = 101;

export const notificationUserLabels: Record<number, string> = {
  0: '시스템',
  101: '최지우 직원',
  102: '박민아 직원',
  103: '이도윤 직원',
  501: '김성호 경영주',
};

export const employeeNotificationPushes: Push[] = [
  {
    id: 1209,
    createdAt: new Date('2026-05-18T13:20:00+09:00'),
    category: 'SCHEDULE_CHANGE_REQUEST',
    title: '금요일 근무 교환 요청',
    content: '박민아 님이 5월 22일 14:00 근무를 교환하고 싶어 합니다.',
    writtenByUserId: 102,
    recipientIds: [101],
    notifications: [
      {
        id: 3009,
        userId: 101,
        puId: 1209,
        title: '금요일 근무 교환 요청',
        content: '박민아 님이 5월 22일 14:00 근무를 교환하고 싶어 합니다.',
        category: 'SCHEDULE_CHANGE_REQUEST',
        readAt: null,
        deletedAt: null,
      },
    ],
  },
  {
    id: 1208,
    createdAt: new Date('2026-05-18T12:40:00+09:00'),
    category: 'ALARM',
    title: '근무 시작 10분 전',
    content: '오늘 13:00부터 GS25 강남역점 오후 근무가 시작됩니다.',
    writtenByUserId: 0,
    recipientIds: [101],
    notifications: [
      {
        id: 3008,
        userId: 101,
        puId: 1208,
        title: '근무 시작 10분 전',
        content: '오늘 13:00부터 GS25 강남역점 오후 근무가 시작됩니다.',
        category: 'ALARM',
        readAt: null,
        deletedAt: null,
      },
    ],
  },
  {
    id: 1207,
    createdAt: new Date('2026-05-18T11:15:00+09:00'),
    category: 'DIRECT_MESSAGE',
    title: '경영주 메시지',
    content: '오늘 발주 물품 도착하면 냉장 진열대 먼저 확인해 주세요.',
    writtenByUserId: 501,
    recipientIds: [101],
    notifications: [
      {
        id: 3007,
        userId: 101,
        puId: 1207,
        title: '경영주 메시지',
        content: '오늘 발주 물품 도착하면 냉장 진열대 먼저 확인해 주세요.',
        category: 'DIRECT_MESSAGE',
        readAt: null,
        deletedAt: null,
      },
    ],
  },
  {
    id: 1206,
    createdAt: new Date('2026-05-18T10:05:00+09:00'),
    category: 'SCHEDULE_UPDATE',
    title: '다음 주 일정이 변경됐어요',
    content: '수요일 마감 근무가 목요일 오픈 근무로 변경되었습니다.',
    writtenByUserId: 501,
    recipientIds: [101, 102],
    notifications: [
      {
        id: 3006,
        userId: 101,
        puId: 1206,
        title: '다음 주 일정이 변경됐어요',
        content: '수요일 마감 근무가 목요일 오픈 근무로 변경되었습니다.',
        category: 'SCHEDULE_UPDATE',
        readAt: null,
        deletedAt: null,
      },
      {
        id: 3106,
        userId: 102,
        puId: 1206,
        title: '다음 주 일정이 변경됐어요',
        content: '수요일 마감 근무가 목요일 오픈 근무로 변경되었습니다.',
        category: 'SCHEDULE_UPDATE',
        readAt: null,
        deletedAt: null,
      },
    ],
  },
  {
    id: 1205,
    createdAt: new Date('2026-05-17T18:30:00+09:00'),
    category: 'SALARY_BILL_PUBLISHED',
    title: '5월 급여 명세서 발급',
    content: '5월 1일-15일 근무분 급여 명세서를 확인할 수 있습니다.',
    writtenByUserId: 501,
    recipientIds: [101],
    notifications: [
      {
        id: 3005,
        userId: 101,
        puId: 1205,
        title: '5월 급여 명세서 발급',
        content: '5월 1일-15일 근무분 급여 명세서를 확인할 수 있습니다.',
        category: 'SALARY_BILL_PUBLISHED',
        readAt: new Date('2026-05-17T19:04:00+09:00'),
        deletedAt: null,
      },
    ],
  },
  {
    id: 1204,
    createdAt: new Date('2026-05-17T16:05:00+09:00'),
    category: 'COMMENT',
    title: '인수인계 댓글',
    content: '3번 냉장고 온도 체크 메모에 새 댓글이 달렸습니다.',
    writtenByUserId: 103,
    recipientIds: [101, 501],
    notifications: [
      {
        id: 3004,
        userId: 101,
        puId: 1204,
        title: '인수인계 댓글',
        content: '3번 냉장고 온도 체크 메모에 새 댓글이 달렸습니다.',
        category: 'COMMENT',
        readAt: new Date('2026-05-17T16:40:00+09:00'),
        deletedAt: null,
      },
    ],
  },
  {
    id: 1203,
    createdAt: new Date('2026-05-17T09:10:00+09:00'),
    category: 'ATTENDANCE',
    title: '출근 기록 확인',
    content: '09:02 출근 기록이 정상 처리되었습니다.',
    writtenByUserId: 0,
    recipientIds: [101, 501],
    notifications: [
      {
        id: 3003,
        userId: 101,
        puId: 1203,
        title: '출근 기록 확인',
        content: '09:02 출근 기록이 정상 처리되었습니다.',
        category: 'ATTENDANCE',
        readAt: new Date('2026-05-17T09:12:00+09:00'),
        deletedAt: null,
      },
    ],
  },
  {
    id: 1202,
    createdAt: new Date('2026-05-16T14:00:00+09:00'),
    category: 'NOTICE',
    title: '매장 공지',
    content: '이번 주 토요일 본사 점검으로 오픈 전 청소 체크를 먼저 진행합니다.',
    writtenByUserId: 501,
    recipientIds: [101, 102, 103],
    notifications: [
      {
        id: 3002,
        userId: 101,
        puId: 1202,
        title: '매장 공지',
        content: '이번 주 토요일 본사 점검으로 오픈 전 청소 체크를 먼저 진행합니다.',
        category: 'NOTICE',
        readAt: new Date('2026-05-16T14:11:00+09:00'),
        deletedAt: null,
      },
    ],
  },
  {
    id: 1201,
    createdAt: new Date('2026-05-15T10:20:00+09:00'),
    category: 'INVITATION',
    title: '새 매장 초대',
    content: 'GS25 강남역점 합류 초대가 승인되었습니다.',
    writtenByUserId: 501,
    recipientIds: [101],
    notifications: [
      {
        id: 3001,
        userId: 101,
        puId: 1201,
        title: '새 매장 초대',
        content: 'GS25 강남역점 합류 초대가 승인되었습니다.',
        category: 'INVITATION',
        readAt: new Date('2026-05-15T10:24:00+09:00'),
        deletedAt: null,
      },
    ],
  },
  {
    id: 1199,
    createdAt: new Date('2026-05-14T22:00:00+09:00'),
    category: 'DIRECT_MESSAGE',
    title: '삭제된 메시지',
    content: '사용자가 삭제한 알림입니다.',
    writtenByUserId: 501,
    recipientIds: [101],
    notifications: [
      {
        id: 2999,
        userId: 101,
        puId: 1199,
        title: '삭제된 메시지',
        content: '사용자가 삭제한 알림입니다.',
        category: 'DIRECT_MESSAGE',
        readAt: null,
        deletedAt: new Date('2026-05-15T08:10:00+09:00'),
      },
    ],
  },
];

const notificationDateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Seoul',
});

export function buildNotificationRows(
  pushes: Push[],
  userId: number,
  userLabels: Record<number, string> = notificationUserLabels,
): NotificationRow[] {
  return pushes
    .flatMap((push) =>
      push.notifications
        .filter((notification) => notification.userId === userId)
        .filter((notification) => notification.puId === push.id)
        .filter((notification) => notification.deletedAt === null)
        .map((notification) => {
          const categoryConfig = notificationCategoryConfigs[notification.category];
          const unread = notification.readAt === null;

          return {
            notificationId: notification.id,
            pushId: push.id,
            title: notification.title || push.title,
            content: notification.content || push.content,
            category: notification.category,
            categoryLabel: categoryConfig.label,
            categoryTone: categoryConfig.tone,
            readStateLabel: unread ? '새 알림' : '읽음',
            readStateTone: unread ? 'primary' : 'neutral',
            senderLabel: userLabels[push.writtenByUserId] ?? `사용자 #${push.writtenByUserId}`,
            createdAtLabel: notificationDateFormatter.format(push.createdAt),
            createdAt: push.createdAt,
          } satisfies NotificationRow;
        }),
    )
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
}
