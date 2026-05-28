import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Home,
  ListChecks,
  LogIn,
  LogOut,
  MessageCircle,
  Pencil,
  Pin,
  Plus,
  RefreshCw,
  Send,
  Store,
  User,
  WalletCards,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { DocumentPreview } from '../components/DocumentPreview';
import { FormPanel } from '../components/FormPanel';
import { MobileFrame, WebFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { WebAppShell, type NavItem } from '../components/Navigation';
import { StatusBadge, type StatusTone } from '../components/StatusBadge';
import {
  attendanceContracts,
  attendanceEmployees,
  attendanceMemos,
  attendancePayrollRows,
  attendanceShifts,
  attendanceStores,
  attendanceTodos,
} from '../data/attendanceSampleData';
import type { AttendanceScreenProps } from './screenTypes';

const employee = attendanceEmployees[0];
const store = attendanceStores[0];
const currentShift = attendanceShifts[0];

const employeeWebNavItems: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={17} /> },
  { id: 'punch', label: '출퇴근', icon: <Clock3 size={17} /> },
  { id: 'todo', label: '할 일', icon: <ListChecks size={17} /> },
  { id: 'memo', label: '메모·인수인계', icon: <MessageCircle size={17} /> },
  { id: 'salary', label: '내 급여', icon: <WalletCards size={17} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={17} /> },
  { id: 'contract', label: '근로계약서', icon: <FileText size={17} /> },
];

const weekShifts = [
  { day: '월 4/20', store: store.name, time: '09:00-18:00', status: '완료', tone: 'success' },
  { day: '화 4/21', store: store.name, time: '14:00-22:00', status: '오늘', tone: 'primary' },
  { day: '목 4/23', store: store.name, time: '09:00-18:00', status: '예정', tone: 'primary' },
  { day: '토 4/25', store: attendanceStores[1].name, time: '18:00-24:00', status: '야간', tone: 'warning' },
] satisfies { day: string; store: string; time: string; status: string; tone: StatusTone }[];

const scheduleRows = [
  { day: '월', date: '4/20', store: store.name, time: '09:00-18:00', tone: 'primary', status: '완료' },
  { day: '화', date: '4/21', store: store.name, time: '14:00-22:00', tone: 'primary', status: '오늘', today: true },
  { day: '수', date: '4/22' },
  { day: '목', date: '4/23', store: store.name, time: '09:00-18:00', tone: 'primary', status: '예정' },
  { day: '금', date: '4/24' },
  { day: '토', date: '4/25', store: attendanceStores[1].name, time: '18:00-24:00', tone: 'warning', status: '야간' },
  { day: '일', date: '4/26' },
  { day: '월', date: '4/27', store: store.name, time: '09:00-18:00', tone: 'primary', status: '예정' },
  { day: '화', date: '4/28', store: attendanceStores[1].name, time: '13:00-22:00', tone: 'success', status: '예정' },
] satisfies {
  day: string;
  date: string;
  store?: string;
  time?: string;
  tone?: StatusTone;
  status?: string;
  today?: boolean;
}[];

const todoGroups = [
  {
    title: '오픈 체크리스트',
    progress: '2 / 3',
    items: [
      { title: '매장 청소 및 바닥 쓸기', done: true },
      { title: '냉장고 온도 확인 (2-5도)', done: true },
      { title: '포스기 점검 및 시재 확인', done: false, mine: true },
    ],
  },
  {
    title: '재고 · 발주',
    progress: '1 / 3',
    items: [
      { title: attendanceTodos[0].title, done: attendanceTodos[0].done, mine: true },
      { title: '담배 재고 카운트', done: false },
      { title: '영수증 용지 확인', done: true },
    ],
  },
  {
    title: '마감 (22:00)',
    progress: '0 / 3',
    items: [
      { title: '금고 시재 정산', done: false },
      { title: 'POS 마감 및 영업일지 작성', done: false },
      { title: '쓰레기 분리수거', done: false },
    ],
  },
];

const memoRows = [
  {
    tag: '이슈',
    tone: 'danger',
    author: employee.name,
    time: '오늘 11:20',
    title: '3번 냉장고 온도 불안정',
    body: '새벽부터 8도 위로 올라갔습니다. 기사님 오늘 오후 4시 방문 예정이라 그 전까지 유제품 체크 자주 부탁드립니다.',
    comments: 4,
    pinned: true,
  },
  ...attendanceMemos.map((memo) => ({
    tag: memo.author === employee.name ? '내 메모' : '인수인계',
    tone: memo.author === employee.name ? ('primary' as StatusTone) : ('neutral' as StatusTone),
    author: memo.author,
    time: memo.time,
    title: memo.title,
    body: `${memo.author} 님이 남긴 공유 메모입니다. 다음 근무자가 바로 확인할 수 있도록 요약되어 있습니다.`,
    comments: memo.comments,
    pinned: false,
  })),
] satisfies {
  tag: string;
  tone: StatusTone;
  author: string;
  time: string;
  title: string;
  body: string;
  comments: number;
  pinned: boolean;
}[];

const contractRows = attendanceContracts.map((contract, index) => ({
  ...contract,
  days: index === 0 ? '월·수·금·토' : '화·목·일',
  hours: index === 0 ? '09:00-18:00' : '10:00-19:00',
  fileSize: index === 0 ? '0.8 MB' : '0.7 MB',
  tone: contract.status === '서명완료' ? ('success' as StatusTone) : ('neutral' as StatusTone),
}));

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="att-icon-button" type="button">
      {children}
    </button>
  );
}

function EmployeeWebShell({
  activeId,
  children,
  right,
  subtitle,
  theme,
  title,
}: {
  activeId: string;
  children: ReactNode;
  right?: ReactNode;
  subtitle: string;
  theme: AttendanceScreenProps['theme'];
  title: string;
}) {
  return (
    <WebFrame height={800} theme={theme} title={title} width={1280}>
      <WebAppShell
        activeId={activeId}
        navItems={employeeWebNavItems}
        navTitle="직원 포털"
        right={
          right ?? (
            <>
              <StatusBadge tone="primary">{employee.status}</StatusBadge>
              <IconButton label="알림 보기">
                <Bell size={17} />
                <span className="att-notification-dot" />
              </IconButton>
            </>
          )
        }
        sidebarFooter={
          <ActionCard
            caption={`${store.name} · ${employee.role} 근무`}
            icon={<User size={16} />}
            title={`${employee.name} 님`}
          />
        }
        subtitle={subtitle}
        title={title}
      >
        {children}
      </WebAppShell>
    </WebFrame>
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

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="att-progress">
      <div style={{ width: `${value}%` }} />
    </div>
  );
}

function WebHeroCard({
  children,
  label,
  value,
}: {
  children?: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <section className="att-salary-hero">
      <span>{label}</span>
      <strong>{value}</strong>
      {children ? <div>{children}</div> : null}
    </section>
  );
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

function TodoCheck({ done }: { done: boolean }) {
  return (
    <span className={`att-check-dot${done ? ' att-check-dot--selected' : ''}`}>
      {done ? <Check color="var(--att-primary-text)" size={10} strokeWidth={3} /> : null}
    </span>
  );
}

function MobileBackHeader({ children }: { children: ReactNode }) {
  return (
    <header className="att-mobile-page-header att-mobile-page-header--bordered">
      <div className="att-mobile-page-header__title">
        <ChevronLeft size={21} />
        <h1>{children}</h1>
      </div>
    </header>
  );
}

export function EmployeeHomeWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell
      activeId="home"
      subtitle="2026년 4월 21일 화요일 · 오늘 근무와 전달사항을 한눈에 확인합니다."
      theme={theme}
      title="홈"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="att-stack att-stack--loose">
          <WebHeroCard label="오늘 근무" value={store.name}>
            <DetailRow label="근무 시간" value={currentShift.time} />
            <DetailRow label="출근 예정" value="14:00까지" />
            <DetailRow label="인증 방식" value="버튼 태그" />
          </WebHeroCard>
          <FormPanel
            footer={
              <button className="att-button" type="button">
                <LogIn size={15} /> 출근하기
              </button>
            }
            title="이번 주 스케줄"
          >
            {weekShifts.map((shift) => (
              <ActionCard
                caption={`${shift.store} · ${shift.time}`}
                icon={<CalendarDays size={16} />}
                key={`${shift.day}-${shift.time}`}
                right={<StatusBadge tone={shift.tone}>{shift.status}</StatusBadge>}
                title={shift.day}
              />
            ))}
          </FormPanel>
        </div>
        <div className="att-stack att-stack--loose">
          <MetricCard
            caption="5월 10일 입금 예정 · 세전 기준"
            icon={<WalletCards size={18} />}
            label="이번 달 예상 급여"
            value="1,598,420원"
          />
          <FormPanel title="오늘 할 일">
            {attendanceTodos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 10,
                  padding: '9px 0',
                }}
              >
                <TodoCheck done={todo.done} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: 'block', fontSize: 13 }}>{todo.title}</strong>
                  <span className="att-subtitle">{todo.owner} · {todo.due}</span>
                </div>
              </div>
            ))}
          </FormPanel>
          <ActionCard
            caption="냉장고 온도 이슈 · 댓글 4개"
            icon={<Pin size={16} />}
            right={<ChevronRight size={16} />}
            title="고정된 인수인계"
          />
        </div>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeePunchWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const recentRows = [
    { date: '4/20 월', record: '14:02 -> 22:04', hours: '8h 2m', tone: 'success' },
    { date: '4/19 일', record: '휴무', hours: '-', tone: 'neutral' },
    { date: '4/18 토', record: '14:00 -> 22:03', hours: '8h 3m', tone: 'success' },
    { date: '4/17 금', record: '14:15 -> 22:00', hours: '7h 45m', tone: 'warning' },
  ] satisfies { date: string; record: string; hours: string; tone: StatusTone }[];

  return (
    <EmployeeWebShell
      activeId="punch"
      subtitle={`${store.name} · 오늘은 ${currentShift.time} 근무 예정입니다.`}
      theme={theme}
      title="출퇴근"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.3fr 1fr' }}>
        <section
          className="att-salary-hero"
          style={{ display: 'grid', justifyItems: 'center', minHeight: 410, placeContent: 'center' }}
        >
          <span>현재 시각</span>
          <strong className="att-mono" style={{ fontSize: 58, fontWeight: 800 }}>
            13:58:24
          </strong>
          <p style={{ margin: '6px 0 0', opacity: 0.72 }}>2026년 4월 21일 · 화요일</p>
          <button className="att-button" style={{ marginTop: 30, minHeight: 58, minWidth: 210 }} type="button">
            <LogIn size={20} /> 출근하기
          </button>
          <p style={{ margin: '14px 0 0', opacity: 0.62 }}>근무 시작 2분 전 · 정시 출근으로 기록됩니다.</p>
        </section>
        <div className="att-stack att-stack--loose">
          <MetricCard caption="/ 40h 목표" icon={<Clock3 size={18} />} label="이번 주 근무" value="32h" />
          <ProgressBar value={80} />
          <FormPanel title="최근 기록">
            {recentRows.map((row) => (
              <div
                key={row.date}
                style={{ alignItems: 'center', display: 'grid', gap: 10, gridTemplateColumns: '72px 1fr 62px auto' }}
              >
                <span className="att-mono" style={{ color: 'var(--att-text-muted)', fontSize: 12 }}>{row.date}</span>
                <strong className="att-mono" style={{ fontSize: 12 }}>{row.record}</strong>
                <span className="att-mono" style={{ fontSize: 12, fontWeight: 800 }}>{row.hours}</span>
                <StatusBadge tone={row.tone}>{row.tone === 'warning' ? '지각' : row.tone === 'success' ? '정상' : '휴무'}</StatusBadge>
              </div>
            ))}
          </FormPanel>
          <div className="att-action-row">
            <button className="att-button att-button--secondary" type="button">
              <LogOut size={15} /> 퇴근 기록
            </button>
            <button className="att-button att-button--ghost" type="button">
              기록 정정 요청
            </button>
          </div>
        </div>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeScheduleWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell
      activeId="schedule"
      subtitle="2026년 4월 · 이번 달 근무 일정과 교환 가능한 근무를 확인합니다."
      theme={theme}
      title="스케줄"
    >
      <div className="att-stack att-stack--loose">
        <div className="att-section-heading">
          <div className="att-inline-actions">
            <button className="att-button att-button--secondary" type="button">주간</button>
            <button className="att-button att-button--ghost" type="button">월간</button>
          </div>
          <button className="att-button att-button--secondary" type="button">
            <RefreshCw size={15} /> 스케줄 교환 신청
          </button>
        </div>
        <section className="att-card-section" style={{ padding: 0, overflow: 'hidden' }}>
          {scheduleRows.map((row, index) => (
            <div
              key={`${row.day}-${row.date}`}
              style={{
                alignItems: 'center',
                background: row.today ? 'var(--att-primary-soft)' : 'transparent',
                borderBottom: index < scheduleRows.length - 1 ? '1px solid var(--att-border)' : 0,
                display: 'grid',
                gap: 16,
                gridTemplateColumns: '120px 1fr auto',
                minHeight: 62,
                padding: '12px 18px',
              }}
            >
              <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                {row.today ? <span style={{ background: 'var(--att-primary)', borderRadius: 999, height: 8, width: 8 }} /> : null}
                <strong style={{ color: row.today ? 'var(--att-primary-readable)' : 'var(--att-text-muted)', fontSize: 13 }}>
                  {row.day} {row.date}
                </strong>
              </div>
              {row.store ? (
                <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
                  <span style={{ background: `var(--att-${row.tone === 'warning' ? 'warn' : row.tone})`, borderRadius: 4, height: 34, width: 4 }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: 13 }}>{row.store}</strong>
                    <span className="att-mono" style={{ color: 'var(--att-text-muted)', fontSize: 12 }}>{row.time}</span>
                  </div>
                </div>
              ) : (
                <span style={{ color: 'var(--att-text-subtle)', fontSize: 13 }}>근무 없음</span>
              )}
              {row.status ? <StatusBadge tone={row.tone}>{row.status}</StatusBadge> : null}
            </div>
          ))}
        </section>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeShiftSwapMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="06 · 스케줄 교환 신청 (모바일)" width={402}>
      <div className="att-mobile-screen">
        <MobileBackHeader>스케줄 교환 신청</MobileBackHeader>
        <main className="att-mobile-content" tabIndex={0}>
          <div className="att-stack att-stack--loose">
            <FormPanel title="내 근무 (교환할 날)">
              <ActionCard
                caption="4월 25일 (금) · 09:00-18:00"
                icon={<Store size={16} />}
                right={<StatusBadge tone="primary">선택됨</StatusBadge>}
                title={store.name}
              />
            </FormPanel>
            <FormPanel title="교환할 동료 선택">
              {[
                { name: '이수빈', shift: '4월 28일 (월) · 06:00-13:00', selected: true },
                { name: '정지훈', shift: '4월 26일 (토) · 07:00-15:00', selected: false },
              ].map((person) => (
                <div
                  className={`att-choice-card${person.selected ? ' att-choice-card--selected' : ''}`}
                  key={person.name}
                >
                  <div className="att-choice-card__body">
                    <strong>{person.name}</strong>
                    <span>{person.shift}</span>
                  </div>
                  <span className={`att-check-dot${person.selected ? ' att-check-dot--selected' : ''}`} />
                </div>
              ))}
            </FormPanel>
            <ActionCard
              caption="교환 신청 후 사장님의 승인이 필요합니다. 승인되면 양쪽 근무가 자동으로 바뀌고 급여에 반영돼요."
              icon={<AlertTriangle size={16} />}
              title="사장님 승인 후 확정"
            />
          </div>
        </main>
        <div className="att-bottom-actions">
          <button className="att-button att-button--full" type="button">
            교환 신청하기
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

export function EmployeeTodoWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell
      activeId="todo"
      subtitle="오늘 완료 4 / 9 · 내 담당 항목은 강조되어 표시됩니다."
      theme={theme}
      title="할 일 · 체크리스트"
    >
      <div className="att-stack att-stack--loose">
        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {todoGroups.map((group) => (
            <FormPanel
              key={group.title}
              title={group.title}
              description={`${group.progress} 완료`}
            >
              {group.items.map((item) => (
                <div
                  key={item.title}
                  style={{
                    alignItems: 'center',
                    background: item.mine ? 'var(--att-primary-soft)' : 'var(--att-bg)',
                    border: `1px solid ${item.mine ? 'var(--att-primary)' : 'var(--att-border)'}`,
                    borderRadius: 8,
                    display: 'flex',
                    gap: 10,
                    minHeight: 44,
                    padding: '8px 10px',
                  }}
                >
                  <TodoCheck done={item.done} />
                  <span
                    style={{
                      color: item.done ? 'var(--att-text-subtle)' : 'var(--att-text)',
                      flex: 1,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: item.done ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </span>
                  {item.mine ? <StatusBadge tone="primary">내 담당</StatusBadge> : null}
                </div>
              ))}
            </FormPanel>
          ))}
        </div>
        <FormPanel
          footer={
            <button className="att-button" type="button">
              <Plus size={15} /> 할 일 추가
            </button>
          }
          title="내가 추가한 할 일"
        >
          <Field focus label="새 할 일" value="신상품 POP 교체" />
          <div className="att-action-row">
            <Field label="담당자" value={employee.name} />
            <Field label="마감" value="오늘 18:00" />
          </div>
        </FormPanel>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeMemoWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell
      activeId="memo"
      subtitle="매장 게시판 · 이슈는 자동으로 사장님께 알림이 갑니다."
      theme={theme}
      title="메모 · 인수인계"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 320px' }}>
        <div className="att-stack">
          <div className="att-inline-actions">
            {['전체 12', '인수인계 3', '이슈 2', '공지 4', '일반 3'].map((filter, index) => (
              <button
                className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`}
                key={filter}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          {memoRows.map((memo) => (
            <article className="att-memo-card" key={`${memo.title}-${memo.time}`}>
              <div className="att-memo-card__meta">
                <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
                {memo.pinned ? <span><Pin size={13} /> 고정됨</span> : null}
                <span><User size={13} /> {memo.author}</span>
                <span>{memo.time}</span>
              </div>
              <h2>{memo.title}</h2>
              <p>{memo.body}</p>
              <footer>
                <span><MessageCircle size={13} /> 댓글 {memo.comments}</span>
                <span><CheckCircle2 size={13} /> 읽음 확인</span>
                <span style={{ marginLeft: 'auto', color: 'var(--att-primary-readable)', fontWeight: 800 }}>자세히</span>
              </footer>
            </article>
          ))}
        </div>
        <aside className="att-stack">
          <FormPanel
            footer={
              <button className="att-button att-button--full" type="button">
                <Send size={15} /> 게시하기
              </button>
            }
            title="새 메모 작성"
          >
            <div className="att-inline-actions">
              <StatusBadge tone="warning">인수인계</StatusBadge>
              <StatusBadge tone="danger">이슈</StatusBadge>
              <StatusBadge tone="primary">공지</StatusBadge>
              <StatusBadge>일반</StatusBadge>
            </div>
            <Field focus label="제목" value="제목을 입력하세요" />
            <Field label="내용" tall value="내용을 입력하세요. 이슈로 표시하면 사장님께 자동 알림." />
          </FormPanel>
          <ActionCard
            caption="다음 근무자에게 자동 표시되고 중요한 이슈는 사장님께 푸시됩니다."
            icon={<Bell size={16} />}
            title="인수인계 알림"
          />
        </aside>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeMemoDetailWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const comments = [
    { author: '박민아', initials: '민', time: '11:20', text: '확인했어요. 유제품 계속 체크할게요!' },
    { author: '이준호', initials: '준', time: '11:35', text: '음료 재고 앞으로 뺐습니다. 기사님 오시면 말씀드릴게요.' },
    { author: '김성호', initials: '김', time: '12:01', text: '수고들 해주세요. 기사 방문 후 결과 공유 부탁드립니다.' },
  ];

  return (
    <EmployeeWebShell
      activeId="memo"
      right={
        <>
          <button className="att-button att-button--ghost" type="button">
            <Pencil size={15} /> 수정
          </button>
          <button className="att-button att-button--secondary" type="button">
            목록으로
          </button>
        </>
      }
      subtitle={`${store.name} · 2026-04-29 11:14`}
      theme={theme}
      title="메모 상세 · 댓글"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <article className="att-memo-detail" style={{ padding: 28 }}>
          <div className="att-memo-card__meta">
            <StatusBadge tone="warning">이슈</StatusBadge>
            <span><Pin size={13} /> 고정됨</span>
            <span><User size={13} /> {employee.name}</span>
          </div>
          <h1>3번 냉장고 온도 불안정</h1>
          <p>
            새벽부터 8도 위로 올라감. 기사님 오늘 오후 4시 방문 예정이라 그 전까지는 유제품 체크 자주
            부탁드립니다. 음료는 냉장고 안 들어오게 하고 기존 재고 앞으로 빼주세요.
          </p>
          <footer>
            <span><Store size={13} /> {store.name}</span>
            <span>2026-04-29 11:14</span>
          </footer>
          <div style={{ borderTop: '1px solid var(--att-border)', marginTop: 28, paddingTop: 24 }}>
            <h2 className="att-section-title" style={{ fontSize: 16 }}>댓글 {comments.length}개</h2>
            <div className="att-stack" style={{ marginTop: 18 }}>
              {comments.map((comment) => (
                <div key={`${comment.author}-${comment.time}`} style={{ display: 'flex', gap: 12 }}>
                  <span
                    style={{
                      background: 'var(--att-primary)',
                      borderRadius: 999,
                      color: 'var(--att-primary-text)',
                      display: 'grid',
                      flex: '0 0 auto',
                      fontSize: 13,
                      fontWeight: 900,
                      height: 36,
                      placeItems: 'center',
                      width: 36,
                    }}
                  >
                    {comment.initials}
                  </span>
                  <div>
                    <strong style={{ fontSize: 14 }}>{comment.author}</strong>
                    <span style={{ color: 'var(--att-text-subtle)', fontSize: 12, marginLeft: 8 }}>{comment.time}</span>
                    <p style={{ marginTop: 4 }}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <span className="att-field__value" style={{ flex: 1 }}>댓글을 입력하세요...</span>
              <button className="att-button" type="button">등록</button>
            </div>
          </div>
        </article>
        <aside className="att-stack">
          <ActionCard
            caption="3명이 댓글로 확인했습니다."
            icon={<CheckCircle2 size={16} />}
            title="읽음 확인"
          />
          <ActionCard
            caption="중요 이슈로 상단에 고정"
            icon={<Pin size={16} />}
            title="고정 메모"
          />
          <button className="att-button att-button--secondary" type="button">
            <ChevronLeft size={15} /> 메모 목록으로
          </button>
        </aside>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeSalaryWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const statementRows = [
    { month: '2026년 3월', amount: '1,512,800원', status: '지급완료' },
    { month: '2026년 2월', amount: '1,408,200원', status: '지급완료' },
    { month: '2026년 1월', amount: '1,602,000원', status: '지급완료' },
  ];

  return (
    <EmployeeWebShell
      activeId="salary"
      subtitle="2026년 4월 · 5월 10일에 입금 예정입니다."
      theme={theme}
      title="내 급여"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.2fr 1fr' }}>
        <WebHeroCard label="이번 달 예상 실수령액" value="1,598,420원">
          <DetailRow label="기본급 (152h x 10,030)" value="1,524,560원" />
          <DetailRow label="야간수당" value="+ 103,500원" />
          <DetailRow label="공제 예상" value="- 181,440원" />
        </WebHeroCard>
        <div className="att-stack att-stack--loose">
          <div className="att-metric-grid att-metric-grid--two" style={{ margin: 0 }}>
            <MetricCard label="근무일수" value="19일" />
            <MetricCard label="총 근무시간" value={attendancePayrollRows[0].hours} />
            <MetricCard label="야간 근무" value="12h" />
            <MetricCard label="연장 근무" value="0h" />
          </div>
          <FormPanel title="최근 명세서">
            {statementRows.map((row) => (
              <ActionCard
                caption={row.status}
                icon={<FileText size={16} />}
                key={row.month}
                right={<Download size={16} />}
                title={`${row.month} · ${row.amount}`}
              />
            ))}
          </FormPanel>
        </div>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeContractWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const [selected, setSelected] = useState(0);
  const contract = contractRows[selected];

  return (
    <EmployeeWebShell
      activeId="contract"
      right={
        <>
          <StatusBadge tone={contract.tone}>{contract.status}</StatusBadge>
          <button className="att-button" type="button">
            <Download size={15} /> PDF 다운로드
          </button>
        </>
      }
      subtitle="계약서를 확인하고 PDF로 저장할 수 있습니다."
      theme={theme}
      title="내 근로계약서"
    >
      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '270px minmax(0, 1fr) 240px' }}>
        <aside className="att-stack">
          <h2 className="att-section-title" style={{ fontSize: 14 }}>계약 목록</h2>
          {contractRows.map((row, index) => (
            <button
              className={`att-contract-card${selected === index ? ' att-choice-card--selected' : ''}`}
              key={row.id}
              onClick={() => setSelected(index)}
              style={{ cursor: 'pointer', textAlign: 'left' }}
              type="button"
            >
              <div className="att-section-heading" style={{ margin: 0 }}>
                <strong>{row.store}</strong>
                <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
              </div>
              <span className="att-subtitle">{row.period}</span>
            </button>
          ))}
        </aside>
        <div style={{ minHeight: 0, overflow: 'auto' }}>
          <DocumentPreview
            items={[
              { title: '제1조 (근무 장소)', content: `${contract.store}\n${attendanceStores.find((item) => item.name === contract.store)?.address ?? store.address}` },
              { title: '제2조 (업무 내용)', content: '편의점 판매 및 매장 관리 업무' },
              { title: '제3조 (계약 기간)', content: contract.period },
              { title: '제4조 (근무 시간)', content: `${contract.hours} (휴게 1시간 포함)\n근무 요일: ${contract.days}` },
              { title: '제5조 (임금)', content: `시급 ${contract.wage}\n매월 25일 근로자 계좌 이체` },
            ]}
            signedDate={contract.signed}
            subtitle="표준근로계약서 (기간제 근로자용)"
            title="근 로 계 약 서"
          />
        </div>
        <aside className="att-stack">
          <ActionCard
            caption={`PDF · ${contract.fileSize}`}
            icon={<FileText size={16} />}
            right={<Download size={16} />}
            title={contract.file}
          />
          <FormPanel title="계약 정보">
            <DetailRow label="상태" value={contract.status} />
            <DetailRow label="서명일" value={contract.signed} />
            <DetailRow label="시급" value={contract.wage} />
            <DetailRow label="근무 요일" value={contract.days} />
          </FormPanel>
          <button className="att-button att-button--secondary" type="button">
            사장님께 문의
          </button>
        </aside>
      </div>
    </EmployeeWebShell>
  );
}
