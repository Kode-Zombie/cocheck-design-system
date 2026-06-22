import {
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardList,
  Download,
  Ellipsis,
  Edit3,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  MoreVertical,
  Pin,
  Plus,
  Search,
  Send,
  Settings,
  Store,
  User,
  Users,
  WalletCards,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { EmptyState } from '../components/EmptyState';
import { FormPanel } from '../components/FormPanel';
import { MobileFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { OwnerTabBar, type NavItem } from '../components/Navigation';
import { StatusBadge, type StatusTone } from '../components/StatusBadge';
import {
  attendanceDashboardMetrics,
  attendanceEmployees,
  attendanceMemos,
  attendancePayrollRows,
  attendanceStores,
  attendanceTodos,
} from '../data/attendanceSampleData';
import type { AttendanceScreenProps } from './screenTypes';

const owner = {
  name: '김성호',
  email: 'kimceo@example.com',
  phone: '010-1234-5678',
};

const selectedStore = attendanceStores[0];

const ownerTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'memo', label: '메모', icon: <MessageCircle size={18} /> },
  { id: 'schedule', label: '일정', icon: <CalendarDays size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
  { id: 'me', label: '나', icon: <Ellipsis size={18} />, hideLabel: true },
];

const ownerStoreStatus = attendanceStores.map((store, index) => ({
  ...store,
  present: [2, 3, 4][index] ?? 2,
  total: [3, 4, 5][index] ?? 3,
  late: index === 1 ? 1 : 0,
  auth: ['버튼 태그', 'GPS · 50m', 'QR 코드'][index] ?? '버튼 태그',
  type: ['편의점', '카페', '베이커리'][index] ?? '매장',
}));

const ownerRosterDaySummaries = [
  { day: '월', fullLabel: '월요일', count: 3 },
  { day: '화', fullLabel: '화요일', count: 4 },
  { day: '수', fullLabel: '수요일', count: 2 },
  { day: '목', fullLabel: '목요일', count: 5 },
  { day: '금', fullLabel: '금요일', count: 3 },
  { day: '토', fullLabel: '토요일', count: 4, weekend: true },
  { day: '일', fullLabel: '일요일', count: 1, weekend: true },
];

const ownerRosterHours = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, '0'));
const ownerRosterRowsTemplate = `36px repeat(${ownerRosterHours.length}, var(--att-owner-roster-hour-height))`;

type OwnerRosterShift = {
  dayIndex: number;
  employee: string;
  endHour: number;
  role: string;
  startHour: number;
  tone: Exclude<StatusTone, 'neutral' | 'danger'> | 'danger';
};

const ownerRosterShifts: OwnerRosterShift[] = [
  { dayIndex: 0, employee: '최지우', role: '오픈', startHour: 9, endHour: 13, tone: 'primary' },
  { dayIndex: 0, employee: '이준호', role: '마감', startHour: 17, endHour: 22, tone: 'warning' },
  { dayIndex: 1, employee: '최지우', role: '오픈', startHour: 8, endHour: 12, tone: 'primary' },
  { dayIndex: 1, employee: '박민아', role: '미들', startHour: 12, endHour: 17, tone: 'success' },
  { dayIndex: 1, employee: '이준호', role: '마감', startHour: 18, endHour: 22, tone: 'warning' },
  { dayIndex: 2, employee: '박민아', role: '미들', startHour: 13, endHour: 18, tone: 'success' },
  { dayIndex: 2, employee: '최지우', role: '지원', startHour: 18, endHour: 22, tone: 'danger' },
  { dayIndex: 3, employee: '이준호', role: '오픈', startHour: 8, endHour: 14, tone: 'primary' },
  { dayIndex: 3, employee: '박민아', role: '미들', startHour: 13, endHour: 18, tone: 'success' },
  { dayIndex: 3, employee: '최지우', role: '마감', startHour: 18, endHour: 22, tone: 'warning' },
  { dayIndex: 4, employee: '박민아', role: '오픈', startHour: 9, endHour: 13, tone: 'primary' },
  { dayIndex: 4, employee: '이준호', role: '마감', startHour: 17, endHour: 22, tone: 'warning' },
  { dayIndex: 5, employee: '최지우', role: '주말', startHour: 10, endHour: 16, tone: 'danger' },
  { dayIndex: 5, employee: '박민아', role: '지원', startHour: 16, endHour: 20, tone: 'success' },
  { dayIndex: 5, employee: '이준호', role: '마감', startHour: 20, endHour: 23, tone: 'warning' },
  { dayIndex: 6, employee: '박민아', role: '주말', startHour: 12, endHour: 17, tone: 'success' },
];

function getOwnerRosterShiftGridRow(shift: OwnerRosterShift) {
  return `${shift.startHour + 2} / span ${Math.max(1, shift.endHour - shift.startHour)}`;
}

const ownerAttendanceRows = [
  { name: attendanceEmployees[0].name, sched: '09:00-18:00', actual: '08:58-', status: '근무중', tone: 'primary' },
  { name: attendanceEmployees[1].name, sched: '06:00-13:00', actual: '06:10-13:00', status: '지각', tone: 'warning' },
  { name: '정지훈', sched: '07:00-15:00', actual: '07:02-15:05', status: '퇴근', tone: 'neutral' },
  { name: '최서아', sched: '14:00-22:00', actual: '미태그', status: '결근', tone: 'danger' },
  { name: attendanceEmployees[2].name, sched: '15:00-22:00', actual: '14:55-', status: '근무중', tone: 'primary' },
] satisfies { name: string; sched: string; actual: string; status: string; tone: StatusTone }[];

const ownerMemoRows = [
  {
    tag: '이슈',
    tone: 'danger',
    title: '3번 냉장고 온도 불안정',
    body: '새벽부터 온도가 8도 위로 올라갔습니다. 기사님 방문 전까지 유제품 상태를 자주 확인해 주세요.',
    author: '정지훈',
    store: selectedStore.name,
    time: '오늘 11:14',
    comments: 2,
    pinned: true,
  },
  ...attendanceMemos.map((memo, index) => ({
    tag: index === 1 ? '공지' : '인수인계',
    tone: index === 1 ? ('success' as StatusTone) : ('primary' as StatusTone),
    title: memo.title,
    body: `${memo.author} 님이 남긴 공유 메모입니다. 다음 근무자가 바로 확인할 수 있도록 요약됩니다.`,
    author: memo.author,
    store: index === 2 ? '전체 매장' : selectedStore.name,
    time: memo.time,
    comments: memo.comments,
    pinned: false,
  })),
] satisfies {
  tag: string;
  tone: StatusTone;
  title: string;
  body: string;
  author: string;
  store: string;
  time: string;
  comments: number;
  pinned: boolean;
}[];

type BranchScheduleTodo = {
  category: string;
  done: boolean;
  exampleImage: string;
  guideLine: string;
  title: string;
};

type BranchScheduleRow = {
  adminComment?: string;
  attendance: string;
  attendanceTone: StatusTone;
  branch: string;
  completed: boolean;
  content: string;
  date: string;
  employee: string;
  id: string;
  name: string;
  position: string;
  time: string;
  todos: BranchScheduleTodo[];
};

const branchScheduleRows: BranchScheduleRow[] = [
  {
    id: 'schedule-open',
    name: '오픈 근무',
    employee: attendanceEmployees[0].name,
    position: attendanceEmployees[0].role,
    branch: selectedStore.name,
    date: '2026.04.29',
    time: '09:00-18:00',
    attendance: '근무 예정',
    attendanceTone: 'primary',
    completed: false,
    content: '오픈 전 시재 확인 후 행사 매대와 냉장 설비를 점검합니다.',
    todos: [
      {
        title: 'POS 전원 켜고 현금 시재 확인',
        category: '오픈',
        guideLine: '출근 직후 금고와 POS 시재 금액을 맞춥니다.',
        exampleImage: '시재 확인표 사진',
        done: true,
      },
      {
        title: attendanceTodos[0].title,
        category: '위생',
        guideLine: '냉장고 상단 온도계를 촬영하고 기준 온도 이탈 여부를 남깁니다.',
        exampleImage: '냉장고 온도계 사진',
        done: false,
      },
    ],
  },
  {
    id: 'schedule-mid',
    name: '피크 타임 지원',
    employee: attendanceEmployees[2].name,
    position: attendanceEmployees[2].role,
    branch: selectedStore.name,
    date: '2026.04.29',
    time: '12:00-17:00',
    attendance: '완수',
    attendanceTone: 'success',
    completed: true,
    adminComment: '점심 피크 계산대 응대는 안정적이었습니다.',
    content: '점심 피크 시간대 계산대와 재고 보충을 지원합니다.',
    todos: [
      {
        title: '행사 매대 정리',
        category: '진열',
        guideLine: '행사 상품은 정면 라벨이 보이도록 같은 방향으로 맞춥니다.',
        exampleImage: '행사 매대 정면 사진',
        done: false,
      },
    ],
  },
  {
    id: 'schedule-close',
    name: '마감 근무',
    employee: attendanceEmployees[1].name,
    position: attendanceEmployees[1].role,
    branch: selectedStore.name,
    date: '2026.04.29',
    time: '18:00-23:00',
    attendance: '대기',
    attendanceTone: 'warning',
    completed: false,
    content: '마감 전 폐기 상품과 매장 외부 청결 상태를 확인합니다.',
    todos: [
      {
        title: attendanceTodos[1].title,
        category: '마감',
        guideLine: '유통기한 임박 상품을 폐기 기준표와 대조합니다.',
        exampleImage: '폐기 상품 집계표 사진',
        done: attendanceTodos[1].done,
      },
      {
        title: '입구 매트와 쓰레기통 정리',
        category: '청결',
        guideLine: '입구 매트 먼지를 털고 외부 쓰레기통 적재 상태를 확인합니다.',
        exampleImage: '입구 정리 완료 사진',
        done: false,
      },
      {
        title: '마감 로그 사진 업로드',
        category: '마감',
        guideLine: 'POS 마감 화면과 매장 정면 사진을 함께 남깁니다.',
        exampleImage: '마감 로그 예시 사진',
        done: false,
      },
    ],
  },
];

const payrollPublishRows = attendancePayrollRows.map((row, index) => ({
  ...row,
  publishStatus: index === 0 ? '발행완료' : '미발행',
}));

function MobileShell({
  activeTab,
  children,
  height = 874,
  showNotificationLauncher = true,
  theme,
  title,
  width = 402,
}: {
  activeTab?: string;
  children: ReactNode;
  height?: number;
  showNotificationLauncher?: boolean;
  theme: AttendanceScreenProps['theme'];
  title: string;
  width?: number;
}) {
  return (
    <MobileFrame height={height} theme={theme} title={title} width={width}>
      <div className="att-mobile-screen">
        <OwnerAppHeader showNotificationLauncher={showNotificationLauncher} />
        {children}
        {activeTab ? <OwnerTabBar activeId={activeTab} items={ownerTabs} /> : null}
      </div>
    </MobileFrame>
  );
}

function OwnerAppHeader({ showNotificationLauncher = true }: { showNotificationLauncher?: boolean } = {}) {
  return (
    <header aria-label="경영주 앱 헤더" className="att-owner-app-header">
      <div className="att-owner-app-header__brand">
        <img alt="CoCheck" src="/cocheck-logo.png" />
        <span>CoCheck</span>
      </div>
      <label className="att-owner-store-select">
        <select aria-label="지점 선택" defaultValue={selectedStore.id}>
          {attendanceStores.map((store) => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </label>
      {showNotificationLauncher ? (
        <button
          aria-controls="owner-push-message-create-mobile"
          aria-label="직원 알림 보내기"
          className="att-icon-button"
          data-target-screen="owner-push-message-create-mobile"
          type="button"
        >
          <Bell size={18} />
          <span className="att-notification-dot" />
        </button>
      ) : null}
    </header>
  );
}

function PageHeader({
  back = false,
  eyebrow,
  right,
  title,
}: {
  back?: boolean;
  eyebrow?: string;
  right?: ReactNode;
  title: string;
}) {
  return (
    <header className={`att-mobile-page-header${back ? ' att-mobile-page-header--bordered' : ''}`}>
      <div className="att-mobile-page-header__title">
        {back ? <ArrowLeft size={21} /> : null}
        <div>
          {eyebrow ? <p>{eyebrow}</p> : null}
          <h1>{title}</h1>
        </div>
      </div>
      {right ? <div className="att-mobile-page-header__right">{right}</div> : null}
    </header>
  );
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="att-icon-button" type="button">
      {children}
    </button>
  );
}

function Chip({
  active = false,
  children,
  tone = 'primary',
}: {
  active?: boolean;
  children: ReactNode;
  tone?: 'primary' | 'warning' | 'danger' | 'success';
}) {
  return <span className={`att-chip${active ? ` att-chip--${tone}` : ''}`}>{children}</span>;
}

function Field({
  focus = false,
  label,
  tall = false,
  value,
}: {
  focus?: boolean;
  label: string;
  tall?: boolean;
  value: string;
}) {
  return (
    <label className="att-field">
      <span className="att-field__label">{label}</span>
      <span className={`att-field__value${focus ? ' att-field__value--focus' : ''}${tall ? ' att-field__value--tall' : ''}`}>
        {value}
      </span>
    </label>
  );
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="att-detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function OwnerHeroCard({
  label,
  value,
  children,
}: {
  children: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <section className="att-salary-hero">
      <span>{label}</span>
      <strong>{value}</strong>
      <div>{children}</div>
    </section>
  );
}

function StoreActionCard({ store }: { store: (typeof ownerStoreStatus)[number] }) {
  return (
    <ActionCard
      caption={`${store.present}/${store.total} 출근${store.late ? ` · 지각 ${store.late}` : ''}`}
      icon={<Store size={17} />}
      right={<ChevronRight size={17} />}
      title={store.name}
    />
  );
}

export function OwnerHomeMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="home" theme={theme} title="01 · 경영주 홈">
      <PageHeader
        eyebrow="경영주"
        title={`${owner.name} 님`}
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <OwnerHeroCard label="오늘 출근" value="6 / 9">
          <DetailRow label="지각" value="1명" />
          <DetailRow label="결근" value="0명" />
          <DetailRow label="오늘 인건비" value="842K" />
        </OwnerHeroCard>
        <section className="att-stack" style={{ marginTop: 16 }}>
          <div className="att-section-heading"><h2>빠른 실행</h2></div>
          <button aria-label="직원 알림 보내기" className="att-button att-button--full" type="button">
            <Send size={16} />
            직원 알림 보내기
          </button>
          <button className="att-button att-button--secondary att-button--full" type="button">
            <CalendarDays size={16} />
            일정 추가
          </button>
        </section>
        <div className="att-metric-grid att-metric-grid--two" style={{ marginTop: 16 }}>
          {attendanceDashboardMetrics.map((metric, index) => (
            <MetricCard
              caption={metric.caption}
              icon={[<Users size={18} />, <CalendarDays size={18} />, <WalletCards size={18} />, <ClipboardList size={18} />][index]}
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
        <section className="att-stack">
          <div className="att-section-heading">
            <h2>매장별 현황</h2>
            <button className="att-button att-button--ghost" type="button">전체 보기</button>
          </div>
          {ownerStoreStatus.map((store) => <StoreActionCard key={store.id} store={store} />)}
        </section>
        <section className="att-stack" style={{ marginTop: 18 }}>
          <div className="att-section-heading"><h2>처리할 요청</h2></div>
          <ActionCard
            caption="4월 23일 야간 근무 · 인건비 변동 없음"
            icon={<CalendarDays size={16} />}
            right={<StatusBadge tone="warning">대기</StatusBadge>}
            title="박민아 → 최지우 교환 요청"
          />
          <ActionCard
            caption="4월 28일 월요일 · 잔여 연차 7일"
            icon={<BriefcaseBusiness size={16} />}
            right={<StatusBadge tone="neutral">검토</StatusBadge>}
            title="이준호 · 연차 신청"
          />
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerMemoMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="memo" theme={theme} title="02 · 메모">
      <PageHeader
        eyebrow={selectedStore.name}
        right={<button className="att-button" type="button"><Plus size={15} /> 작성</button>}
        title="메모"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>오늘 공유 메모</h2>
            <StatusBadge tone="primary">{ownerMemoRows.length}건</StatusBadge>
          </div>
          <p className="att-subtitle">공지 · 인수인계를 한 곳에서 확인합니다.</p>
          <div className="att-metric-grid att-metric-grid--two" style={{ marginBottom: 0, marginTop: 12 }}>
            <MetricCard icon={<Pin size={18} />} label="고정 이슈" value="1건" />
            <MetricCard icon={<MessageCircle size={18} />} label="새 댓글" value="11개" />
          </div>
        </section>
        <div className="att-inline-actions" style={{ marginBottom: 14, marginTop: 16 }}>
          <Chip active>전체</Chip>
          <Chip>이슈</Chip>
          <Chip>인수인계</Chip>
          <Chip>공지</Chip>
        </div>
        <div className="att-stack">
          {ownerMemoRows.map((memo) => (
            <article className="att-memo-card" key={`${memo.title}-${memo.time}`}>
              <div className="att-memo-card__meta">
                <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
                {memo.pinned ? <span><Pin size={12} /> 고정</span> : null}
                <span>{memo.store}</span>
              </div>
              <h2>{memo.title}</h2>
              <p>{memo.body}</p>
              <footer>
                <span>{memo.author}</span>
                <span>{memo.time}</span>
                <span><MessageCircle size={13} /> {memo.comments}</span>
              </footer>
            </article>
          ))}
        </div>
      </main>
    </MobileShell>
  );
}

export function OwnerMemoDetailMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const memo = ownerMemoRows[0];

  return (
    <MobileShell height={844} theme={theme} title="OM2b · 메모 상세·댓글 (경영주)" width={390}>
      <PageHeader back right={<MoreVertical size={19} />} title="메모 상세" />
      <main className="att-mobile-content att-mobile-content--with-input" tabIndex={0}>
        <article className="att-memo-detail">
          <div className="att-memo-card__meta">
            <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
            <span><Pin size={12} /> 고정</span>
            <span>{memo.store}</span>
          </div>
          <h1>{memo.title}</h1>
          <p>{memo.body} 처리 완료하면 사진도 함께 남겨주세요.</p>
          <footer>
            <span>{memo.author}</span>
            <span>{memo.store}</span>
            <span>{memo.time}</span>
          </footer>
        </article>
        <section className="att-stack" style={{ marginTop: 22 }}>
          <div className="att-section-heading">
            <h2>댓글 {memo.comments}개</h2>
          </div>
          {[
            ['김성호', '기사님 오시면 작업 사진 남겨주세요.', '11:22'],
            ['최지우', '유제품은 임시 냉장고로 옮겨두었습니다.', '11:35'],
          ].map(([author, text, time]) => (
            <ActionCard caption={text} icon={<User size={16} />} key={`${author}-${time}`} meta={time} title={author} />
          ))}
        </section>
      </main>
      <footer className="att-comment-composer">
        <span>댓글을 입력하세요...</span>
        <button aria-label="댓글 전송" className="att-button" type="button"><Send size={16} /></button>
      </footer>
    </MobileShell>
  );
}

export function OwnerMemoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell theme={theme} title="F3 · 메모 작성 (경영주 모바일)">
      <PageHeader
        back
        right={<button className="att-button" type="button">게시하기</button>}
        title="메모 작성"
      />
      <main className="att-mobile-content" tabIndex={0}>
        <FormPanel title="게시글 작성">
          <div>
            <span className="att-field__label">유형 *</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active tone="success">공지</Chip>
              <Chip>인수인계</Chip>
              <Chip tone="danger">이슈</Chip>
            </div>
          </div>
          <Field label="대상 매장" value="전체 매장" />
          <Field focus label="제목 *" value="이번 주말 행사 프로모션 안내" />
          <Field
            label="내용 *"
            tall
            value="토·일 맥주 4캔 9,900원 행사가 진행됩니다. 매대 앞쪽 POP 위치와 재고 보충 기준을 확인해 주세요."
          />
          <div>
            <span className="att-field__label">알림 보낼 대상</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>전 직원</Chip>
              <Chip>오늘 근무자</Chip>
              <Chip>매장별</Chip>
            </div>
          </div>
          <ActionCard icon={<Bell size={16} />} right={<span className="att-toggle att-toggle--on" />} title="직원 알림 보내기" />
          <ActionCard caption="중요 메모를 목록 상단에 표시합니다." icon={<Pin size={16} />} right={<span className="att-toggle" />} title="상단 고정" />
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function OwnerRosterMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="schedule" theme={theme} title="02 · 스케줄 편성">
      <PageHeader
        eyebrow={`${selectedStore.name} · 이번 주`}
        right={<button className="att-button" type="button"><Plus size={15} /> 편성</button>}
        title="스케줄 편성"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <div className="att-segmented" style={{ marginBottom: 16 }}>
          <button className="att-segmented__item att-segmented__item--warning" type="button">주간</button>
          <button className="att-segmented__item" type="button">월간</button>
          <button className="att-segmented__item" type="button">교환 1</button>
        </div>
        <section className="att-card-section">
          <div className="att-owner-roster-guide">
            각 요일을 눌러 그날의 일정을 볼 수 있습니다.
          </div>
          <div className="att-owner-roster-day-actions">
            {ownerRosterDaySummaries.map((day) => (
              <button
                aria-controls="owner-schedule-management-mobile"
                aria-label={`${day.fullLabel} 일정 관리 열기, 일정 ${day.count}건`}
                className={`att-owner-roster-day-action${day.weekend ? ' att-owner-roster-day-action--weekend' : ''}`}
                data-target-screen="owner-schedule-management-mobile"
                key={day.day}
                type="button"
              >
                <strong>{day.day}</strong>
                <span>{day.count} <ChevronRight size={11} /></span>
              </button>
            ))}
          </div>
        </section>
        <section aria-label="주간 24시간 일정표" className="att-card-section att-owner-roster-week">
          <div className="att-section-heading">
            <h2>이번 주 일정</h2>
            <StatusBadge tone="success">22건</StatusBadge>
          </div>
          <div className="att-owner-roster-week__calendar" style={{ gridTemplateRows: ownerRosterRowsTemplate }}>
            <div className="att-owner-roster-week__corner" style={{ gridColumn: 1, gridRow: 1 }} />
            {ownerRosterDaySummaries.map((day, dayIndex) => (
              <div
                aria-label={`${day.fullLabel} 시간표 열`}
                className={`att-owner-roster-week__day-head${day.weekend ? ' att-owner-roster-week__day-head--weekend' : ''}`}
                key={`${day.day}-head`}
                style={{ gridColumn: dayIndex + 2, gridRow: 1 }}
              >
                {day.day}
              </div>
            ))}
            {ownerRosterHours.map((hour, hourIndex) => (
              <div
                aria-label={`${hour}시 시간대`}
                className="att-owner-roster-week__hour"
                key={hour}
                style={{ gridColumn: 1, gridRow: hourIndex + 2 }}
              >
                {hour}
              </div>
            ))}
            {ownerRosterDaySummaries.map((day, dayIndex) => (
              <div
                aria-hidden
                className="att-owner-roster-week__day-column"
                key={`${day.day}-column`}
                style={{ gridColumn: dayIndex + 2, gridRow: `2 / span ${ownerRosterHours.length}` }}
              />
            ))}
            {ownerRosterShifts.map((shift) => {
              const day = ownerRosterDaySummaries[shift.dayIndex];
              const timeLabel = `${String(shift.startHour).padStart(2, '0')}-${String(shift.endHour).padStart(2, '0')}`;

              return (
                <article
                  aria-label={`${day.fullLabel} ${shift.employee} ${timeLabel} ${shift.role} 일정`}
                  className={`att-owner-roster-shift att-owner-roster-shift--${shift.tone}`}
                  key={`${day.day}-${shift.employee}-${timeLabel}-${shift.role}`}
                  style={{ gridColumn: shift.dayIndex + 2, gridRow: getOwnerRosterShiftGridRow(shift) }}
                >
                  <strong>{shift.employee}</strong>
                  <span>{timeLabel}</span>
                </article>
              );
            })}
          </div>
        </section>
        <section className="att-card-section" style={{ marginTop: 16 }}>
          <div className="att-section-heading">
            <h2>이번 주 요약</h2>
            <StatusBadge tone="success">커버리지 100%</StatusBadge>
          </div>
          <div className="att-metric-grid att-metric-grid--two" style={{ marginBottom: 0 }}>
            <MetricCard label="총 근무시간" value="152h" />
            <MetricCard label="예상 인건비" value="1,748,000원" />
            <MetricCard label="교환 요청" value="1건" />
            <MetricCard label="연장 경고" value="0건" />
          </div>
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerPayrollMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="salary" theme={theme} title="03 · 급여 관리">
      <PageHeader
        eyebrow={`2026년 4월 · ${selectedStore.name}`}
        right={<button className="att-button" type="button">일괄 지급</button>}
        title="급여 관리"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <OwnerHeroCard label="이번 달 총 인건비" value="5,244,000원">
          <DetailRow label="기본급" value="4,370K" />
          <DetailRow label="수당" value="612K" />
          <DetailRow label="주휴" value="262K" />
        </OwnerHeroCard>
        <section className="att-stack" style={{ marginTop: 18 }}>
          <div className="att-section-heading">
            <h2>직원별 지급 내역</h2>
            <button className="att-button att-button--ghost" type="button">급여 발행</button>
          </div>
          {attendancePayrollRows.map((row) => (
            <ActionCard
              caption={`${row.hours} · 시급 ${row.wage}`}
              icon={<User size={16} />}
              key={row.id}
              right={
                <div style={{ display: 'grid', justifyItems: 'end', gap: 4 }}>
                  <strong className="att-mono" style={{ fontSize: 13 }}>{row.amount}</strong>
                  <StatusBadge tone={row.status === '확정' ? 'success' : 'warning'}>{row.status}</StatusBadge>
                </div>
              }
              title={row.employee}
            />
          ))}
        </section>
        <ActionCard
          caption="PDF · 이메일 · 카카오톡 전송"
          icon={<Download size={16} />}
          right={<ChevronRight size={17} />}
          title="명세서 일괄 내보내기"
        />
      </main>
    </MobileShell>
  );
}

export function OwnerPayrollPublishMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell height={844} theme={theme} title="OM3b · 급여 발행" width={390}>
      <PageHeader
        back
        eyebrow={`2026년 4월 · ${selectedStore.name}`}
        right={<button className="att-button" type="button"><Check size={15} /> 전체 발행</button>}
        title="급여 발행"
      />
      <main className="att-mobile-content" tabIndex={0}>
        <EmptyState
          description="발행 후 직원이 급여 명세를 확인할 수 있습니다. 발행된 내역은 수정 잠금 상태로 표시됩니다."
          icon={<FileText size={20} />}
          title="발행 전 최종 확인"
        />
        <section className="att-stack" style={{ marginTop: 16 }}>
          {payrollPublishRows.map((row) => {
            const published = row.publishStatus === '발행완료';
            return (
              <ActionCard
                caption={`${row.hours} · ${row.amount}`}
                icon={<User size={16} />}
                key={row.id}
                right={
                  <>
                    <StatusBadge tone={published ? 'success' : 'warning'}>{row.publishStatus}</StatusBadge>
                    {!published ? <button className="att-button" style={{ marginLeft: 8 }} type="button">발행</button> : null}
                  </>
                }
                title={row.employee}
              />
            );
          })}
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerStoresMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const store = ownerStoreStatus[0];
  const activeStaffCount = ownerAttendanceRows.filter((row) => row.status === '근무중').length;
  const lateStaffCount = ownerAttendanceRows.filter((row) => row.status === '지각').length;

  return (
    <MobileShell activeTab="me" theme={theme} title="04 · 내 매장">
      <PageHeader
        eyebrow={`${store.name} · 직원 ${store.total}명`}
        right={<IconButton label="매장 정보 수정"><Edit3 size={18} /></IconButton>}
        title="내 매장"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>매장 정보</h2>
            <StatusBadge tone="success">운영중</StatusBadge>
          </div>
          <DetailRow label="매장명" value={store.name} />
          <DetailRow label="주소" value={store.address} />
          <DetailRow label="업종" value={store.type} />
          <DetailRow label="출퇴근 인증" value={store.auth} />
          <div className="att-inline-actions" style={{ marginTop: 12 }}>
            <Chip active>{store.name}</Chip>
            <Chip>시급 10,030원</Chip>
            <Chip>24시간</Chip>
          </div>
        </section>
        <section className="att-card-section" style={{ marginTop: 16 }}>
          <div className="att-section-heading">
            <h2>직원 관리 요약</h2>
            <StatusBadge tone="primary">총 {store.total}명</StatusBadge>
          </div>
          <div className="att-metric-grid att-metric-grid--single" style={{ marginBottom: 0 }}>
            <MetricCard icon={<Users size={18} />} label="전체 직원" value={`${store.total}명`} />
            <MetricCard icon={<CheckCircle2 size={18} />} label="근무중" value={`${activeStaffCount}명`} />
            <MetricCard icon={<CalendarDays size={18} />} label="지각" value={`${lateStaffCount}명`} />
            <MetricCard icon={<Send size={18} />} label="초대 대기" value="1명" />
          </div>
          <div className="att-stack" style={{ marginTop: 16 }}>
            <ActionCard
              caption="직원 정보, 초대, 근무 매장을 관리합니다."
              icon={<Users size={16} />}
              right={<ChevronRight size={17} />}
              title="직원 관리로 이동"
            />
            {attendanceEmployees.slice(0, 3).map((employee, index) => (
              <ActionCard
                caption={`${employee.role} · ${store.name}`}
                icon={<User size={16} />}
                key={employee.id}
                right={<StatusBadge tone={index === 1 ? 'warning' : 'primary'}>{index === 1 ? '지각' : '근무중'}</StatusBadge>}
                title={employee.name}
              />
            ))}
          </div>
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerAttendanceMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="home" theme={theme} title="05 · 출퇴근 현황">
      <PageHeader
        eyebrow={selectedStore.name}
        right={<IconButton label="직원 검색"><Search size={18} /></IconButton>}
        title="출퇴근 현황"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <div className="att-metric-grid att-metric-grid--two">
          <MetricCard icon={<CheckCircle2 size={18} />} label="근무중" value="2명" />
          <MetricCard icon={<CalendarDays size={18} />} label="지각" value="1명" />
          <MetricCard icon={<Circle size={18} />} label="결근" value="1명" />
          <MetricCard icon={<Users size={18} />} label="완료" value="1명" />
        </div>
        <section className="att-stack">
          {ownerAttendanceRows.map((row) => (
            <ActionCard
              caption={`예정 ${row.sched} · 실제 ${row.actual}`}
              icon={<User size={16} />}
              key={`${row.name}-${row.status}`}
              right={
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                  <button className="att-button att-button--ghost" type="button">수정</button>
                </div>
              }
              title={row.name}
            />
          ))}
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerScheduleManagementMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const [expandedScheduleIds, setExpandedScheduleIds] = useState<string[]>([]);
  const todoCount = branchScheduleRows.reduce((sum, schedule) => sum + schedule.todos.length, 0);
  const doneTodoCount = branchScheduleRows.reduce(
    (sum, schedule) => sum + schedule.todos.filter((todo) => todo.done).length,
    0,
  );
  const toggleScheduleChecklist = (scheduleId: string) => {
    setExpandedScheduleIds((current) => (
      current.includes(scheduleId)
        ? current.filter((id) => id !== scheduleId)
        : [...current, scheduleId]
    ));
  };

  return (
    <MobileShell activeTab="schedule" theme={theme} title="06 · 일정 관리">
      <PageHeader
        eyebrow={`${selectedStore.name} · 오늘`}
        right={<button className="att-button" type="button"><Plus size={15} /> 일정 추가</button>}
        title="일정 관리"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>오늘 일정</h2>
            <span className="att-mono">{branchScheduleRows.length}개</span>
          </div>
          <div className="att-metric-grid att-metric-grid--two" style={{ marginBottom: 0 }}>
            <MetricCard icon={<CalendarDays size={18} />} label="근무 일정" value={`${branchScheduleRows.length}건`} />
            <MetricCard icon={<ClipboardList size={18} />} label="체크리스트" value={`${doneTodoCount}/${todoCount}`} />
          </div>
        </section>
        <section className="att-stack" style={{ marginTop: 18 }}>
          <div className="att-section-heading">
            <h2>일정별 할 일</h2>
            <StatusBadge tone="primary">{doneTodoCount}/{todoCount} 완료</StatusBadge>
          </div>
          {branchScheduleRows.map((schedule) => {
            const scheduleDoneCount = schedule.todos.filter((todo) => todo.done).length;
            const isFoldable = schedule.todos.length >= 3;
            const isExpanded = !isFoldable || expandedScheduleIds.includes(schedule.id);

            return (
              <section className="att-card-section" key={schedule.id}>
                <div className="att-section-heading">
                  <h2>{schedule.name}</h2>
                  <StatusBadge tone={schedule.attendanceTone}>{schedule.attendance}</StatusBadge>
                </div>
                <DetailRow label="직원" value={`${schedule.employee} · ${schedule.position}`} />
                <DetailRow label="근무 시간" value={schedule.time} />
                <DetailRow label="지점" value={schedule.branch} />
                <p className="att-subtitle">{schedule.content}</p>
                <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                  <div className="att-section-heading" style={{ marginBottom: 0 }}>
                    <h2>체크리스트</h2>
                    <span className="att-mono">{scheduleDoneCount}/{schedule.todos.length}</span>
                  </div>
                  {isExpanded ? (
                    <>
                      {schedule.todos.map((todo) => (
                        <div
                          key={`${schedule.id}-${todo.title}`}
                          style={{
                            alignItems: 'flex-start',
                            border: '1px solid var(--att-border)',
                            borderRadius: 8,
                            display: 'flex',
                            gap: 10,
                            padding: 10,
                          }}
                        >
                          <span style={{ color: todo.done ? 'var(--att-success)' : 'var(--att-text-muted)', display: 'inline-flex', marginTop: 2 }}>
                            {todo.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ display: 'block', fontSize: 13 }}>{todo.title}</strong>
                            <span className="att-subtitle" style={{ display: 'block' }}>{todo.category} · {todo.guideLine}</span>
                          </div>
                        </div>
                      ))}
                      {isFoldable ? (
                        <button
                          aria-expanded
                          className="att-button att-button--ghost att-button--full"
                          onClick={() => toggleScheduleChecklist(schedule.id)}
                          type="button"
                        >
                          체크리스트 접기
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <div
                      style={{
                        alignItems: 'center',
                        border: '1px solid var(--att-border)',
                        borderRadius: 8,
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'space-between',
                        padding: 10,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ display: 'block', fontSize: 13 }}>체크리스트 {schedule.todos.length}개 접힘</strong>
                        <span className="att-subtitle" style={{ display: 'block' }}>
                          {scheduleDoneCount}/{schedule.todos.length} 완료 · 펼치면 전체 항목을 볼 수 있습니다.
                        </span>
                      </div>
                      <button
                        aria-expanded={false}
                        className="att-button att-button--secondary"
                        onClick={() => toggleScheduleChecklist(schedule.id)}
                        type="button"
                      >
                        체크리스트 펼치기
                      </button>
                    </div>
                  )}
                </div>
                {schedule.completed ? (
                  <section className="att-admin-comment-panel">
                    <div className="att-admin-comment-panel__header">
                      <span className="att-admin-comment-panel__title">
                        <MessageCircle size={15} />
                        완수된 일정 관리자 코멘트
                      </span>
                      <StatusBadge tone="success">작성 가능</StatusBadge>
                    </div>
                    {schedule.adminComment ? (
                      <p className="att-admin-comment-panel__saved">{schedule.adminComment}</p>
                    ) : null}
                    <label className="att-field">
                      <span className="att-field__label">코멘트 입력</span>
                      <textarea
                        aria-label={`${schedule.name} 관리자 코멘트 입력`}
                        className="att-admin-comment-panel__input"
                        placeholder="직원의 수행 내용에 대한 코멘트를 입력하세요."
                      />
                    </label>
                  </section>
                ) : null}
                <div className="att-inline-actions" style={{ marginTop: 12 }}>
                  <button className="att-button att-button--ghost" type="button">일정 수정</button>
                  <button className="att-button att-button--secondary" type="button">직원 알림</button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerScheduleEditMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const schedule = branchScheduleRows[0];

  return (
    <MobileShell theme={theme} title="F1 · 일정 수정 (모바일)">
      <PageHeader
        back
        right={<button className="att-button" type="button">변경 저장</button>}
        title="일정 수정"
      />
      <main className="att-mobile-content" tabIndex={0}>
        <FormPanel description="직원 근무 일정 안에서 체크리스트를 함께 관리합니다." title="근무 정보">
          <Field focus label="일정명 *" value={schedule.name} />
          <div className="att-action-row">
            <Field label="근무일" value={schedule.date} />
            <Field label="근무 시간" value={schedule.time} />
          </div>
          <div className="att-action-row">
            <Field label="직원 *" value={schedule.employee} />
            <Field label="직책" value={schedule.position} />
          </div>
          <Field label="근무 지점" value={schedule.branch} />
          <Field label="근무 내용" tall value={schedule.content} />
        </FormPanel>
        <FormPanel title="일정별 할 일">
          {schedule.todos.map((todo, index) => (
            <section
              key={`${schedule.id}-edit-${todo.title}`}
              style={{
                border: '1px solid var(--att-border)',
                borderRadius: 8,
                display: 'grid',
                gap: 10,
                padding: 12,
              }}
            >
              <div className="att-section-heading" style={{ alignItems: 'flex-start', marginBottom: 0 }}>
                <h2 style={{ minWidth: 0 }}>{index + 1}. {todo.title}</h2>
                <StatusBadge tone={todo.done ? 'success' : 'warning'}>{todo.done ? '완료' : '대기'}</StatusBadge>
              </div>
              <div>
                <span className="att-field__label">카테고리</span>
                <p className="att-copy" style={{ margin: '4px 0 0' }}>{todo.category}</p>
              </div>
              <div>
                <span className="att-field__label">가이드라인</span>
                <p className="att-copy" style={{ margin: '4px 0 0' }}>{todo.guideLine}</p>
              </div>
              <div>
                <span className="att-field__label">예시 이미지</span>
                <p className="att-copy" style={{ margin: '4px 0 0' }}>{todo.exampleImage}</p>
              </div>
            </section>
          ))}
          <button className="att-button att-button--secondary att-button--full" type="button">
            <Plus size={15} />
            체크리스트 항목 추가
          </button>
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function OwnerPushMessageCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell
      height={844}
      showNotificationLauncher={false}
      theme={theme}
      title="F2 · 직원 알림 보내기 (모바일)"
      width={390}
    >
      <PageHeader
        back
        right={<button className="att-button" type="button"><Send size={15} /> 푸시 보내기</button>}
        title="직원 알림 보내기"
      />
      <main className="att-mobile-content" tabIndex={0}>
        <FormPanel description="직원 앱 푸시와 알림함으로 즉시 전달됩니다." title="수신 대상">
          <div>
            <span className="att-field__label">대상 범위</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>전체 직원</Chip>
              <Chip>지점 선택</Chip>
              <Chip>직원 선택</Chip>
            </div>
          </div>
          <ActionCard
            caption="전체 매장 · 직원 12명"
            icon={<Users size={16} />}
            right={<StatusBadge tone="primary">12명</StatusBadge>}
            title="수신 대상 미리보기"
          />
        </FormPanel>
        <FormPanel title="메시지 내용">
          <div>
            <span className="att-field__label">메시지 유형</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip>일반</Chip>
              <Chip active tone="success">공지</Chip>
              <Chip tone="danger">긴급</Chip>
            </div>
          </div>
          <Field focus label="제목 *" value="오늘 행사 매대 확인 요청" />
          <Field
            label="내용 *"
            tall
            value="오후 근무 시작 전 행사 POP와 재고 수량을 확인해 주세요. 완료 후 메모에 사진을 남겨주세요."
          />
        </FormPanel>
        <FormPanel title="발송 옵션">
          <div>
            <span className="att-field__label">발송 시점</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>즉시 발송</Chip>
              <Chip>예약 발송</Chip>
            </div>
          </div>
          <ActionCard
            caption="메모에도 남김"
            icon={<CheckCircle2 size={16} />}
            right={<span className="att-toggle att-toggle--on" />}
            title="공지로도 남기기"
          />
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function OwnerMeMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const menuItems = [
    { icon: <Store size={17} />, label: '내 매장', sub: '매장 정보 · 직원 관리', targetScreen: 'owner-stores-mobile' },
    { icon: <Bell size={17} />, label: '알림 설정', sub: '근태 · 급여 알림' },
    { icon: <Settings size={17} />, label: '앱 설정', sub: '테마 · 언어 · 보안' },
    { icon: <FileText size={17} />, label: '근로계약서', sub: '4건 서명완료' },
    { icon: <BriefcaseBusiness size={17} />, label: '세무사 연결', sub: '김민철 세무사 연결됨' },
  ];

  return (
    <MobileShell activeTab="me" height={844} theme={theme} title="OM7 · 나 탭 (사장 마이페이지)" width={390}>
      <PageHeader title="나" />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <section className="att-card-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'grid', width: 56, height: 56, placeItems: 'center', borderRadius: 28, color: 'var(--att-primary-text)', background: 'var(--att-primary)', fontSize: 22, fontWeight: 800 }}>
              {owner.name[0]}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: 17 }}>{owner.name} 경영주</h2>
              <p className="att-copy" style={{ marginTop: 2 }}>{owner.email}</p>
              <p className="att-copy" style={{ marginTop: 2 }}>{owner.phone}</p>
            </div>
            <IconButton label="프로필 수정"><Edit3 size={17} /></IconButton>
          </div>
          <div className="att-inline-actions" style={{ marginTop: 14 }}>
            {attendanceStores.map((store) => <Chip active key={store.id}>{store.name}</Chip>)}
          </div>
        </section>
        <section className="att-stack" style={{ marginTop: 16 }}>
          {menuItems.map((item) => (
            item.targetScreen ? (
              <button
                aria-controls={item.targetScreen}
                className="att-action-card att-action-card--button"
                data-target-screen={item.targetScreen}
                key={item.label}
                type="button"
              >
                <div className="att-action-card__icon">{item.icon}</div>
                <div className="att-action-card__body">
                  <strong>{item.label}</strong>
                  <span>{item.sub}</span>
                </div>
                <div className="att-action-card__right"><ChevronRight size={17} /></div>
              </button>
            ) : (
              <ActionCard
                caption={item.sub}
                icon={item.icon}
                key={item.label}
                right={<ChevronRight size={17} />}
                title={item.label}
              />
            )
          ))}
        </section>
        <button className="att-button att-button--secondary att-button--full" style={{ marginTop: 16 }} type="button">
          <LogOut size={16} />
          로그아웃
        </button>
      </main>
    </MobileShell>
  );
}
