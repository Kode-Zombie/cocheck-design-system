import {
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock3,
  Coffee,
  Download,
  FileText,
  Home,
  ListChecks,
  LogIn,
  LogOut,
  MapPin,
  MessageCircle,
  MoreVertical,
  Pencil,
  Pin,
  Plus,
  Send,
  Store,
  User,
  WalletCards,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { DocumentPreview } from '../components/DocumentPreview';
import { EmptyState } from '../components/EmptyState';
import { FormPanel } from '../components/FormPanel';
import { MobileFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { MobileTabBar, type NavItem } from '../components/Navigation';
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
import type { AttendanceScreen, AttendanceScreenProps } from './screenTypes';

const employee = attendanceEmployees[0];
const store = attendanceStores[0];
const currentShift = attendanceShifts[0];
const currentContract = attendanceContracts[0];

const employeeTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'punch', label: '출퇴근', icon: <Clock3 size={18} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={18} /> },
  { id: 'todo', label: '할 일', icon: <ListChecks size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
];

type ScheduleRow = {
  day: string;
  date: string;
  work?: string;
  store?: string;
  tag?: string;
  today?: boolean;
};

type TodoItem = {
  text: string;
  done: boolean;
  owner: string;
  due?: string;
  priority?: boolean;
};

type MemoItem = {
  tag: string;
  tone: StatusTone;
  title: string;
  body: string;
  author: string;
  time: string;
  pinned?: boolean;
  comments: number;
};

const weekDays: ScheduleRow[] = [
  { day: '월', date: '14', work: '09-18' },
  { day: '화', date: '15', work: '13-22' },
  { day: '수', date: '16', work: '09-15' },
  { day: '목', date: '17' },
  { day: '금', date: '18', work: '09-18' },
  { day: '토', date: '19', work: '18-24', tag: '야간' },
  { day: '일', date: '20' },
  { day: '화', date: '21', work: '09-18', today: true },
];

const scheduleRows: ScheduleRow[] = [
  ...weekDays,
  { day: '수', date: '22', work: '13-22', store: attendanceStores[1].name },
  { day: '목', date: '23', work: '09-18' },
];

const todoSections: { title: string; done: number; total: number; items: TodoItem[] }[] = [
  {
    title: '오전 오픈 체크',
    done: 3,
    total: 4,
    items: [
      { text: 'POS 전원 켜고 현금 시재 확인', done: true, owner: '공통' },
      { text: '도시락·김밥 유통기한 확인', done: true, owner: '공통' },
      { text: '매장 외부 청소', done: true, owner: employee.name },
      { text: '신상품 POP 교체', done: false, owner: employee.name, due: '11:00' },
    ],
  },
  {
    title: '수시 업무',
    done: 0,
    total: 3,
    items: [
      { text: attendanceTodos[0].title, done: attendanceTodos[0].done, owner: attendanceTodos[0].owner },
      { text: attendanceTodos[2].title, done: attendanceTodos[2].done, owner: attendanceTodos[2].owner },
      { text: '본사 공지사항 확인 후 공유', done: false, owner: employee.name, due: '14:00', priority: true },
    ],
  },
];

const memoFeed: MemoItem[] = [
  {
    tag: '이슈',
    tone: 'danger' as StatusTone,
    title: '3번 냉장고 온도 불안정',
    body: '새벽부터 8도 위로 올라감. 기사님 오늘 오후 4시 방문 예정입니다.',
    author: employee.name,
    time: '10분 전',
    pinned: true,
    comments: 4,
  },
  ...attendanceMemos.map((memo) => ({
    tag: memo.author === employee.name ? '내 메모' : '인수인계',
    tone: memo.author === employee.name ? ('primary' as StatusTone) : ('neutral' as StatusTone),
    title: memo.title,
    body: `${memo.author} 님이 ${memo.time}에 남긴 공유 메모입니다.`,
    author: memo.author,
    time: memo.time,
    comments: memo.comments,
  })),
];

function MobileShell({
  theme,
  title,
  width = 402,
  height = 874,
  activeTab,
  children,
}: {
  theme: AttendanceScreenProps['theme'];
  title: string;
  width?: number;
  height?: number;
  activeTab?: string;
  children: ReactNode;
}) {
  return (
    <MobileFrame height={height} theme={theme} title={title} width={width}>
      <div className="att-mobile-screen">
        {children}
        {activeTab ? <MobileTabBar activeId={activeTab} items={employeeTabs} /> : null}
      </div>
    </MobileFrame>
  );
}

function PageHeader({
  eyebrow,
  title,
  right,
  back = false,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
  back?: boolean;
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

function Field({
  label,
  value,
  focus = false,
  tall = false,
}: {
  label: string;
  value: string;
  focus?: boolean;
  tall?: boolean;
}) {
  return (
    <label className="att-field">
      <span className="att-field__label">{label}</span>
      <span
        className={`att-field__value${focus ? ' att-field__value--focus' : ''}${
          tall ? ' att-field__value--tall' : ''
        }`}
      >
        {value}
      </span>
    </label>
  );
}

function Chip({
  children,
  active = false,
  tone = 'primary',
}: {
  children: ReactNode;
  active?: boolean;
  tone?: 'primary' | 'warning' | 'danger' | 'success';
}) {
  return (
    <span className={`att-chip${active ? ` att-chip--${tone}` : ''}`}>{children}</span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="att-progress">
      <div style={{ width: `${value}%` }} />
    </div>
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

function PrimaryStatusCard() {
  return (
    <section className="att-primary-status-card">
      <div className="att-primary-status-card__top">
        <div>
          <p>{store.name} · {employee.role} 타임</p>
          <h2>근무 중</h2>
          <span className="att-mono">09:00 출근 · 4시간 23분 경과</span>
        </div>
        <span>정시 출근</span>
      </div>
      <button className="att-primary-status-card__action" type="button">
        <LogOut size={18} />
        <span>
          <strong>퇴근하기</strong>
          <small>예정: 18:00 · 3시간 37분 남음</small>
        </span>
        <ChevronRight size={18} />
      </button>
    </section>
  );
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="att-icon-button" type="button">
      {children}
    </button>
  );
}

function ContractDocument() {
  return (
    <DocumentPreview
      items={[
        { title: '근무 장소', content: `${currentContract.store}\n${store.address}` },
        { title: '업무 내용', content: '편의점 판매 및 매장 관리 업무' },
        { title: '계약 기간', content: currentContract.period.replace(' - ', ' ~ ') },
        { title: '근무 시간', content: '09:00 ~ 18:00 (휴게 1시간)\n월·수·금·토 (주 4일)' },
        { title: '시급', content: currentContract.wage },
        { title: '급여 지급일', content: '매월 25일' },
      ]}
      signedDate={currentContract.signed}
      subtitle="표준근로계약서 (기간제 근로자용)"
    />
  );
}

function ContractListContent() {
  return (
    <main className="att-mobile-content att-mobile-content--flush-top">
      <div className="att-stack">
        {attendanceContracts.map((contract) => (
          <section className="att-contract-card" key={contract.id}>
            <div className="att-section-heading">
              <h2>{contract.store}</h2>
              <StatusBadge tone={contract.status === '서명완료' ? 'success' : 'neutral'}>{contract.status}</StatusBadge>
            </div>
            <DetailRow label="계약 기간" value={contract.period} />
            <DetailRow label="시급" value={contract.wage} />
            <ActionCard
              caption="PDF · 서명완료본"
              icon={<FileText size={16} />}
              right={<button className="att-button" type="button">저장</button>}
              title={contract.file}
            />
            <button className="att-button att-button--secondary att-button--full" type="button">내용 보기</button>
          </section>
        ))}
      </div>
      <EmptyState
        description="내용이 실제와 다르거나 계약서를 받지 못했다면 사장님께 문의하세요."
        icon={<FileText size={20} />}
        title="계약서 문의가 필요하신가요?"
      />
    </main>
  );
}

export function EmployeeHomeMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="home" theme={theme} title="01 · 홈">
      <main className="att-mobile-content">
        <PageHeader
          eyebrow="2026년 4월 21일 화요일"
          right={
            <IconButton label="알림 보기">
              <Bell size={18} />
              <span className="att-notification-dot" />
            </IconButton>
          }
          title={`안녕하세요, ${employee.name} 님`}
        />
        <PrimaryStatusCard />
        <div className="att-metric-grid att-metric-grid--two">
          <MetricCard icon={<ListChecks size={18} />} label="오늘 할 일" value="3 / 7" />
          <MetricCard icon={<Pencil size={18} />} label="새 메모" value="인수인계" />
          <MetricCard icon={<WalletCards size={18} />} label="이번 달 예상" value="1,424,260원" />
          <MetricCard icon={<CalendarDays size={18} />} label="스케줄 교환" value="요청 1건" />
        </div>
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>이번 주 근무</h2>
            <span className="att-mono">28h 15m / 40h</span>
          </div>
          <div className="att-week-grid">
            {weekDays.slice(0, 7).map((day) => (
              <div className={day.work ? 'att-week-cell att-week-cell--active' : 'att-week-cell'} key={day.date}>
                <span>{day.day}</span>
                <strong>{day.date}</strong>
                <small>{day.work ?? '휴무'}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="att-stack">
          <div className="att-section-heading">
            <h2>오늘 체크</h2>
            <button className="att-button att-button--ghost" type="button">전체 보기</button>
          </div>
          {attendanceTodos.slice(0, 2).map((todo) => (
            <ActionCard
              caption={`${todo.owner} · ${todo.due}`}
              icon={todo.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              key={todo.id}
              right={<StatusBadge tone={todo.done ? 'success' : 'warning'}>{todo.done ? '완료' : '대기'}</StatusBadge>}
              title={todo.title}
            />
          ))}
        </section>
      </main>
    </MobileShell>
  );
}

export function EmployeePunchMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="punch" theme={theme} title="02 · 출퇴근">
      <PageHeader eyebrow="2026년 4월 21일 · 화요일" title="출퇴근" />
      <main className="att-mobile-content att-mobile-content--flush-top">
        <ActionCard
          caption={`${currentShift.time} · 버튼 태그`}
          icon={<Store size={17} />}
          right={<ChevronDown size={18} />}
          title={store.name}
        />
        <section className="att-time-display">
          <strong>13:23</strong>
          <span className="att-mono">:47</span>
        </section>
        <ActionCard
          caption="GPS · QR · Wi-Fi 인증으로 변경 가능"
          icon={<CheckCircle2 size={16} />}
          right={<StatusBadge tone="success">사용 가능</StatusBadge>}
          title="사장님이 설정한 방식: 버튼 태그"
        />
        <div className="att-action-row" style={{ marginTop: 14 }}>
          <button className="att-punch-button att-punch-button--done" type="button">
            <LogIn size={24} />
            <strong>출근 완료</strong>
            <span className="att-mono">09:00:12</span>
          </button>
          <button className="att-punch-button att-punch-button--primary" type="button">
            <LogOut size={24} />
            <strong>퇴근하기</strong>
            <span className="att-mono">18:00 예정</span>
          </button>
        </div>
        <section className="att-stack" style={{ marginTop: 18 }}>
          <h2 className="att-section-title" style={{ fontSize: 15 }}>오늘 기록</h2>
          {[
            ['출근', '09:00:12', '정시 · 버튼 태그'],
            ['휴게 시작', '12:30:04', '30분 예정'],
            ['휴게 종료', '13:01:22', '실제 31분'],
          ].map(([title, time, caption]) => (
            <ActionCard
              caption={caption}
              icon={title === '출근' ? <LogIn size={16} /> : <Coffee size={16} />}
              key={title}
              meta={time}
              title={title}
            />
          ))}
        </section>
      </main>
    </MobileShell>
  );
}

export function EmployeeScheduleMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="schedule" theme={theme} title="03 · 스케줄">
      <PageHeader
        eyebrow="2026년 4월"
        right={
          <>
            <IconButton label="날짜 선택"><CalendarDays size={18} /></IconButton>
            <IconButton label="스케줄 더보기"><MoreVertical size={18} /></IconButton>
          </>
        }
        title="스케줄"
      />
      <div className="att-date-strip">
        {weekDays.map((day) => (
          <div className={day.today ? 'att-date-pill att-date-pill--today' : 'att-date-pill'} key={day.date}>
            <span>{day.day}</span>
            <strong>{day.date}</strong>
            {day.work ? <small /> : null}
          </div>
        ))}
      </div>
      <main className="att-mobile-content att-mobile-content--flush-top">
        <div className="att-schedule-list">
          {scheduleRows.map((row) => (
            <div className="att-schedule-row" key={`${row.day}-${row.date}`}>
              <div className="att-schedule-row__date">
                <span>{row.day}</span>
                <strong>{row.date}</strong>
              </div>
              {row.work ? (
                <div className={`att-schedule-row__card${row.today ? ' att-schedule-row__card--today' : ''}`}>
                  <div>
                    <strong>{row.work}</strong>
                    {row.tag ? <StatusBadge tone="warning">{row.tag}</StatusBadge> : null}
                    {row.today ? <StatusBadge tone="primary">오늘</StatusBadge> : null}
                  </div>
                  <p><MapPin size={13} /> {row.store ?? store.name}</p>
                </div>
              ) : (
                <div className="att-schedule-row__empty">휴무</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </MobileShell>
  );
}

export function EmployeeLateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell height={844} theme={theme} title="M4 · 지각·결근 보고 (직원)" width={390}>
      <PageHeader back title="지각 · 결근 보고" />
      <main className="att-mobile-content">
        <ActionCard caption={`오늘 ${currentShift.time} (예정)`} icon={<BriefcaseBusiness size={16} />} title={store.name} />
        <section className="att-stack att-stack--loose" style={{ marginTop: 20 }}>
          <div>
            <span className="att-field__label">유형</span>
            <div className="att-segmented" style={{ marginTop: 10 }}>
              <button className="att-segmented__item att-segmented__item--warning" type="button">지각</button>
              <button className="att-segmented__item" type="button">결근</button>
              <button className="att-segmented__item" type="button">조기퇴근</button>
            </div>
          </div>
          <Field focus label="예상 도착 시간" value="09:35 · 약 35분 지각" />
          <Field
            focus
            label="사유 *"
            tall
            value="교통사고로 인한 도로 정체로 늦을 것 같습니다. 매장 도착 즉시 출근 태그하겠습니다."
          />
          <ActionCard
            caption="가능한 팀원에게 알림 발송"
            right={<span className="att-toggle" />}
            title="대타 요청"
          />
        </section>
      </main>
      <footer className="att-bottom-actions">
        <button className="att-button att-button--full" type="button">사장님께 보고하기</button>
      </footer>
    </MobileShell>
  );
}

export function EmployeeTodoMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="todo" theme={theme} title="04 · 할 일">
      <PageHeader
        eyebrow="오늘의 체크리스트"
        right={<button className="att-button" type="button"><Plus size={15} /> 추가</button>}
        title="할 일"
      />
      <main className="att-mobile-content att-mobile-content--flush-top">
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>전체 진행률</h2>
            <span className="att-mono">3 / 7</span>
          </div>
          <ProgressBar value={43} />
        </section>
        {todoSections.map((section) => (
          <section className="att-stack" key={section.title} style={{ marginTop: 18 }}>
            <div className="att-section-heading">
              <h2>{section.title}</h2>
              <span className="att-mono">{section.done}/{section.total}</span>
            </div>
            {section.items.map((item) => (
              <ActionCard
                caption={`${item.owner}${item.due ? ` · ${item.due}` : ''}${item.priority ? ' · 중요' : ''}`}
                icon={item.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                key={item.text}
                right={<StatusBadge tone={item.done ? 'success' : 'neutral'}>{item.done ? '완료' : '대기'}</StatusBadge>}
                title={item.text}
              />
            ))}
          </section>
        ))}
      </main>
    </MobileShell>
  );
}

export function EmployeeTodoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell height={844} theme={theme} title="M5b · 내 할일 추가 (직원)" width={390}>
      <PageHeader
        back
        right={<button className="att-button" type="button">저장</button>}
        title="내 할일 추가"
      />
      <main className="att-mobile-content">
        <FormPanel description="내가 볼 개인 체크리스트로 저장됩니다." title="할 일 정보">
          <Field focus label="제목 *" value="신상품 POP 교체" />
          <Field label="기한" value="오늘 11:00" />
          <Field label="매장" value={store.name} />
          <Field tall label="메모" value="행사 매대 왼쪽 첫 번째 줄에 부착하고 사진으로 확인하기" />
          <div>
            <span className="att-field__label">반복</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>오늘만</Chip>
              <Chip>매 근무일</Chip>
              <Chip>매주</Chip>
            </div>
          </div>
          <ActionCard caption="완료 전 10분 전에 알려줍니다." right={<span className="att-toggle att-toggle--on" />} title="알림 받기" />
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function EmployeeMemoMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="home" theme={theme} title="05 · 메모·인수인계">
      <PageHeader
        eyebrow={store.name}
        right={<button className="att-button" type="button"><Plus size={15} /> 작성</button>}
        title="메모 · 인수인계"
      />
      <main className="att-mobile-content att-mobile-content--flush-top">
        <div className="att-inline-actions" style={{ marginBottom: 14 }}>
          <Chip active>전체</Chip>
          <Chip>이슈</Chip>
          <Chip>인수인계</Chip>
          <Chip>공지</Chip>
        </div>
        <div className="att-stack">
          {memoFeed.map((memo) => (
            <article className="att-memo-card" key={`${memo.title}-${memo.time}`}>
              <div className="att-memo-card__meta">
                <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
                {memo.pinned ? <span><Pin size={12} /> 고정</span> : null}
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

export function EmployeeMemoDetailMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const memo = memoFeed[0];

  return (
    <MobileShell height={844} theme={theme} title="M6b · 메모 상세·댓글 (직원)" width={390}>
      <PageHeader back right={<MoreVertical size={19} />} title="메모 상세" />
      <main className="att-mobile-content att-mobile-content--with-input">
        <article className="att-memo-detail">
          <div className="att-memo-card__meta">
            <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
            <span><Pin size={12} /> 고정</span>
          </div>
          <h1>{memo.title}</h1>
          <p>{memo.body} 음료는 냉장고 안에 새로 넣지 말고 기존 재고를 앞으로 빼주세요.</p>
          <footer>
            <span>{memo.author}</span>
            <span>{store.name}</span>
            <span>{memo.time}</span>
          </footer>
        </article>
        <section className="att-stack" style={{ marginTop: 22 }}>
          <div className="att-section-heading">
            <h2>댓글 3개</h2>
          </div>
          {[
            ['김성호', '확인했습니다. 기사님 오시면 바로 연락 주세요.', '10:24'],
            ['박민아', '유제품 온도 체크 30분마다 해둘게요.', '10:31'],
            [employee.name, '현재 7.8도입니다. 체크표에 남겼습니다.', '10:40'],
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

export function EmployeeMemoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell theme={theme} title="F2 · 메모·게시글 작성 (모바일)">
      <PageHeader
        back
        right={<button className="att-button" type="button">올리기</button>}
        title="새 메모"
      />
      <main className="att-mobile-content">
        <FormPanel title="게시글 작성">
          <div>
            <span className="att-field__label">유형 *</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active tone="danger">이슈</Chip>
              <Chip>인수인계</Chip>
              <Chip>공지</Chip>
            </div>
          </div>
          <Field focus label="제목 *" value="3번 냉장고 온도 불안정" />
          <Field
            label="내용"
            tall
            value="새벽부터 8도 위로 올라감. 기사님 오늘 오후 4시 방문 예정이라 그 전까지는 유제품 체크 자주 부탁드립니다."
          />
          <div>
            <span className="att-field__label">알림 보낼 대상</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>사장님</Chip>
              <Chip>전 직원</Chip>
              <Chip>오늘 근무자</Chip>
            </div>
          </div>
          <ActionCard caption="중요 메모를 목록 상단에 표시합니다." icon={<Pin size={16} />} right={<span className="att-toggle" />} title="상단에 고정" />
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function EmployeeSalaryMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const payroll = attendancePayrollRows[0];

  return (
    <MobileShell activeTab="salary" theme={theme} title="06 · 월급 계산">
      <PageHeader eyebrow="2026년 4월 예상" title="월급 계산" />
      <main className="att-mobile-content att-mobile-content--flush-top">
        <section className="att-salary-hero">
          <span>예상 실수령액</span>
          <strong>{payroll.amount}</strong>
          <div>
            <DetailRow label="근무시간" value="168h" />
            <DetailRow label="시급" value={payroll.wage} />
            <DetailRow label="근무일" value="21일" />
          </div>
        </section>
        <section className="att-stack" style={{ marginTop: 16 }}>
          <div className="att-section-heading"><h2>지급 내역</h2></div>
          {[
            ['기본급', '132h × 10,030원', '1,323,960원'],
            ['연장근무 수당', '18h × 150%', '270,810원'],
            ['야간수당', '12h × 150%', '180,540원'],
            ['주휴수당', '1주 1일 평균', '80,240원'],
          ].map(([label, caption, value]) => (
            <ActionCard caption={caption} key={label} right={<strong className="att-mono">+ {value}</strong>} title={label} />
          ))}
        </section>
        <section className="att-stack" style={{ marginTop: 16 }}>
          <div className="att-section-heading"><h2>공제 내역</h2></div>
          {[
            ['국민연금', '4.5%', '64,092원'],
            ['건강보험', '3.545%', '50,481원'],
            ['고용보험', '0.9%', '12,818원'],
            ['소득세', '간이세액', '18,200원'],
          ].map(([label, caption, value]) => (
            <ActionCard caption={caption} key={label} right={<strong className="att-mono">- {value}</strong>} title={label} />
          ))}
        </section>
      </main>
    </MobileShell>
  );
}

export function EmployeeContractMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell activeTab="salary" height={844} theme={theme} title="M9 · 내 근로계약서 (직원)" width={390}>
      <PageHeader eyebrow="계약서를 확인하고 PDF로 저장할 수 있어요" title="내 근로계약서" />
      <ContractListContent />
    </MobileShell>
  );
}

export function EmployeeContractDetailMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={844} theme={theme} title="M9b · 계약서 상세 바텀시트" width={390}>
      <div className="att-mobile-screen att-sheet-screen">
        <div className="att-sheet-background">
          <div className="att-mobile-screen">
            <PageHeader eyebrow="계약서를 확인하고 PDF로 저장할 수 있어요" title="내 근로계약서" />
            <ContractListContent />
            <MobileTabBar activeId="salary" items={employeeTabs} />
          </div>
        </div>
        <div className="att-sheet-backdrop">
          <section className="att-bottom-sheet">
            <div className="att-bottom-sheet__handle" />
            <header className="att-bottom-sheet__header">
              <div>
                <h1>{store.name} 계약서</h1>
                <p>{currentContract.period}</p>
              </div>
              <StatusBadge tone="success"><Check size={12} /> 서명완료</StatusBadge>
            </header>
            <div className="att-bottom-sheet__body">
              <ContractDocument />
            </div>
            <footer className="att-bottom-sheet__footer">
              <button className="att-button att-button--secondary att-button--full" type="button">닫기</button>
              <button className="att-button att-button--full" type="button"><Download size={15} /> PDF 저장</button>
            </footer>
          </section>
        </div>
      </div>
    </MobileFrame>
  );
}

export const employeeMobileScreens: AttendanceScreen[] = [
  { id: 'employee-home-mobile', label: '01 · 홈', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeHomeMobile },
  { id: 'employee-punch-mobile', label: '02 · 출퇴근', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeePunchMobile },
  { id: 'employee-schedule-mobile', label: '03 · 스케줄', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeScheduleMobile },
  { id: 'employee-late-mobile', label: 'M4 · 지각·결근 보고 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeLateMobile },
  { id: 'employee-todo-mobile', label: '04 · 할 일', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeTodoMobile },
  { id: 'employee-todo-create-mobile', label: 'M5b · 내 할일 추가 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeTodoCreateMobile },
  { id: 'employee-memo-mobile', label: '05 · 메모·인수인계', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoMobile },
  { id: 'employee-memo-detail-mobile', label: 'M6b · 메모 상세·댓글 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeMemoDetailMobile },
  { id: 'employee-memo-create-mobile', label: 'F2 · 메모·게시글 작성 (모바일)', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeMemoCreateMobile },
  { id: 'employee-salary-mobile', label: '06 · 월급 계산', group: '직원 모바일', width: 402, height: 874, viewport: 'mobile', Component: EmployeeSalaryMobile },
  { id: 'employee-contract-mobile', label: 'M9 · 내 근로계약서 (직원)', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractMobile },
  { id: 'employee-contract-detail-mobile', label: 'M9b · 계약서 상세 바텀시트', group: '직원 모바일', width: 390, height: 844, viewport: 'mobile', Component: EmployeeContractDetailMobile },
];
