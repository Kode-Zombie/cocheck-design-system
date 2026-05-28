import {
  AlertTriangle,
  BadgePercent,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  Home,
  Landmark,
  LineChart,
  MessageCircle,
  Pencil,
  Plus,
  ReceiptText,
  Send,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { DocumentPreview, type DocumentPreviewItem } from '../components/DocumentPreview';
import { EmptyState } from '../components/EmptyState';
import { FormPanel } from '../components/FormPanel';
import { WebFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { WebAppShell, type NavItem } from '../components/Navigation';
import { StatusBadge, type StatusTone } from '../components/StatusBadge';
import {
  attendanceContracts,
  attendanceDashboardMetrics,
  attendanceEmployees,
  attendanceMemos,
  attendancePayrollRows,
  attendancePlans,
  attendanceStores,
} from '../data/attendanceSampleData';
import type { AttendanceScreenProps } from './screenTypes';

const owner = {
  name: '김성호',
  email: 'kimceo@example.com',
  phone: '010-1234-5678',
};

const selectedStore = attendanceStores[0];

const ownerWebNavItems: NavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: <Home size={17} /> },
  { id: 'schedule', label: '스케줄 편성', icon: <CalendarDays size={17} /> },
  { id: 'payroll', label: '급여 관리', icon: <WalletCards size={17} /> },
  { id: 'staff', label: '직원 관리', icon: <Users size={17} /> },
  { id: 'attendance', label: '근태 현황', icon: <ClockIcon /> },
  { id: 'memo', label: '메모·인수인계', icon: <MessageCircle size={17} /> },
  { id: 'leave', label: '휴가·연차', icon: <BriefcaseBusiness size={17} /> },
  { id: 'stats', label: '통계 리포트', icon: <LineChart size={17} /> },
  { id: 'taxation', label: '세무사 연결', icon: <Landmark size={17} /> },
  { id: 'labor', label: '근로계약서', icon: <FileText size={17} /> },
  { id: 'payment', label: '결제·구독', icon: <CreditCard size={17} /> },
];

const ownerStoreStatus = attendanceStores.map((store, index) => ({
  ...store,
  present: [4, 3, 5][index] ?? 3,
  total: [5, 4, 6][index] ?? 4,
  late: [0, 1, 0][index] ?? 0,
  auth: ['버튼 태그', 'GPS · 50m', 'QR 코드'][index] ?? '버튼 태그',
  type: ['편의점', '카페', '베이커리'][index] ?? '매장',
}));

const staffRows = [
  ...attendanceEmployees.map((employee, index) => ({
    name: employee.name,
    phone: employee.phone,
    store: attendanceStores[index % attendanceStores.length].name,
    role: employee.role,
    since: ['2025.09.01', '2025.11.15', '2026.01.10'][index] ?? '2026.01.01',
    wage: '10,030',
    status: employee.status === '휴무' ? '휴직' : '재직',
    tone: employee.status === '휴무' ? ('neutral' as StatusTone) : ('success' as StatusTone),
  })),
  {
    name: '한유진',
    phone: '010-9999-0000',
    store: attendanceStores[1].name,
    role: '마감',
    since: '2026.03.05',
    wage: '10,030',
    status: '재직',
    tone: 'success' as StatusTone,
  },
  {
    name: '강도현',
    phone: '010-2222-3333',
    store: attendanceStores[2].name,
    role: '주말',
    since: '2024.06.01',
    wage: '9,860',
    status: '퇴직',
    tone: 'neutral' as StatusTone,
  },
];

const attendanceRows = [
  { name: '최지우', store: attendanceStores[0].name, sched: '09:00-18:00', in: '08:58', out: '근무중', status: '근무중', tone: 'primary' },
  { name: '박민아', store: attendanceStores[0].name, sched: '06:00-13:00', in: '06:10', out: '13:00', status: '지각', tone: 'warning' },
  { name: '정지훈', store: attendanceStores[1].name, sched: '07:00-15:00', in: '07:02', out: '15:05', status: '정상', tone: 'success' },
  { name: '최서아', store: attendanceStores[2].name, sched: '14:00-22:00', in: '-', out: '-', status: '결근', tone: 'danger' },
  { name: '한유진', store: attendanceStores[1].name, sched: '15:00-23:00', in: '14:55', out: '근무중', status: '근무중', tone: 'primary' },
  { name: '강도현', store: attendanceStores[2].name, sched: '09:00-18:00', in: '09:01', out: '18:00', status: '정상', tone: 'success' },
] satisfies { name: string; store: string; sched: string; in: string; out: string; status: string; tone: StatusTone }[];

const memoRows = [
  {
    tag: '이슈',
    tone: 'danger',
    title: '3번 냉장고 온도 불안정',
    body: '새벽부터 온도가 8도 위로 올라갔습니다. 기사님 오후 4시 방문 전까지 유제품 체크를 자주 부탁드립니다.',
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
    body: `${memo.author} 님이 남긴 공유 메모입니다. 다음 근무자가 바로 확인할 수 있도록 사장님 화면에 요약됩니다.`,
    author: memo.author,
    store: index === 2 ? '전체' : selectedStore.name,
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

const leaveRequests = [
  { name: '최지우', store: selectedStore.name, type: '연차', date: '4월 25일 (금)', days: '1일', status: '대기', tone: 'warning' },
  { name: '한유진', store: attendanceStores[1].name, type: '반차(오후)', date: '5월 1일-5월 3일', days: '3일', status: '대기', tone: 'warning' },
  { name: '박민아', store: selectedStore.name, type: '연차', date: '4월 18일 (금)', days: '1일', status: '승인', tone: 'success' },
  { name: '정지훈', store: attendanceStores[1].name, type: '병가', date: '4월 10일-4월 11일', days: '2일', status: '승인', tone: 'success' },
] satisfies { name: string; store: string; type: string; date: string; days: string; status: string; tone: StatusTone }[];

const contractItems: DocumentPreviewItem[] = [
  { title: '제1조 (근무 장소)', content: `${selectedStore.name}\n${selectedStore.address}` },
  { title: '제2조 (업무 내용)', content: '편의점 판매, 재고 정리 및 매장 관리 업무' },
  { title: '제3조 (계약 기간)', content: '2026년 01월 01일 ~ 2026년 12월 31일' },
  { title: '제4조 (근무 시간)', content: '09:00 ~ 18:00 (휴게 1시간 포함)\n근무 요일: 월·수·금·토' },
  { title: '제5조 (임금)', content: '시급 10,030원\n매월 25일 근로자 계좌 이체' },
];

function ClockIcon() {
  return <Circle size={17} />;
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="att-icon-button" type="button">
      {children}
    </button>
  );
}

function OwnerWebShell({
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
  subtitle?: string;
  theme: AttendanceScreenProps['theme'];
  title: string;
}) {
  return (
    <WebFrame height={800} theme={theme} title={title} width={1280}>
      <WebAppShell
        activeId={activeId}
        navItems={ownerWebNavItems}
        navTitle="사장님 포털"
        right={
          right ?? (
            <>
              <StatusBadge tone="primary">3개 매장 운영중</StatusBadge>
              <IconButton label="알림 보기">
                <Bell size={17} />
                <span className="att-notification-dot" />
              </IconButton>
            </>
          )
        }
        sidebarFooter={
          <ActionCard
            caption={`${owner.email} · ${owner.phone}`}
            icon={<User size={16} />}
            title={`${owner.name} 사장님`}
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

function PageActions({ children }: { children: ReactNode }) {
  return <div className="att-inline-actions">{children}</div>;
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

function WebTable({
  columns,
  rows,
  template,
}: {
  columns: string[];
  rows: ReactNode[][];
  template: string;
}) {
  return (
    <section className="att-card-section" style={{ overflow: 'hidden', padding: 0 }}>
      <div
        style={{
          background: 'var(--att-surface-muted)',
          borderBottom: '1px solid var(--att-border)',
          color: 'var(--att-text-muted)',
          display: 'grid',
          fontSize: 11,
          fontWeight: 800,
          gap: 10,
          gridTemplateColumns: template,
          padding: '11px 16px',
        }}
      >
        {columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            alignItems: 'center',
            borderBottom: index < rows.length - 1 ? '1px solid var(--att-border)' : 0,
            display: 'grid',
            fontSize: 13,
            gap: 10,
            gridTemplateColumns: template,
            minHeight: 54,
            padding: '12px 16px',
          }}
        >
          {row.map((cell, cellIndex) => <div key={`${index}-${cellIndex}`}>{cell}</div>)}
        </div>
      ))}
    </section>
  );
}

function AvatarName({ name }: { name: string }) {
  return (
    <span style={{ alignItems: 'center', display: 'inline-flex', gap: 8, minWidth: 0 }}>
      <span
        style={{
          background: 'var(--att-surface-muted)',
          borderRadius: 999,
          color: 'var(--att-text-muted)',
          display: 'grid',
          flex: '0 0 auto',
          fontSize: 11,
          fontWeight: 800,
          height: 28,
          placeItems: 'center',
          width: 28,
        }}
      >
        {name.slice(0, 1)}
      </span>
      <strong>{name}</strong>
    </span>
  );
}

function Money({ children, tone }: { children: ReactNode; tone?: 'success' | 'danger' }) {
  return (
    <span
      className="att-mono"
      style={{
        color: tone === 'success' ? 'var(--att-success)' : tone === 'danger' ? 'var(--att-danger)' : 'var(--att-text)',
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function BarChart({
  items,
  tone = 'primary',
}: {
  items: { label: string; value: number; caption?: string }[];
  tone?: 'primary' | 'success' | 'warning';
}) {
  const max = Math.max(...items.map((item) => item.value));
  const color = tone === 'success' ? 'var(--att-success)' : tone === 'warning' ? 'var(--att-warn)' : 'var(--att-primary)';

  return (
    <div style={{ alignItems: 'end', display: 'flex', gap: 9, height: 150 }}>
      {items.map((item, index) => (
        <div key={item.label} style={{ display: 'grid', flex: 1, gap: 5, justifyItems: 'center' }}>
          <span style={{ color: 'var(--att-text-subtle)', fontSize: 10 }}>{item.caption}</span>
          <div
            style={{
              background: index === items.length - 1 ? color : 'var(--att-primary-soft)',
              borderRadius: '5px 5px 0 0',
              height: `${Math.max(18, (item.value / max) * 98)}px`,
              width: '100%',
            }}
          />
          <span style={{ color: 'var(--att-text-muted)', fontSize: 11 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function ModalOverlay({
  activeId,
  children,
  subtitle,
  theme,
  title,
}: {
  activeId: string;
  children: ReactNode;
  subtitle?: string;
  theme: AttendanceScreenProps['theme'];
  title: string;
}) {
  return (
    <OwnerWebShell activeId={activeId} subtitle={subtitle} theme={theme} title={title}>
      <div style={{ minHeight: 612, position: 'relative' }}>
        <div aria-hidden="true" inert style={{ opacity: 0.38, pointerEvents: 'none' }}>
          {activeId === 'schedule' ? <RosterContent compact /> : activeId === 'staff' ? <StaffContent compact /> : <MemoContent compact />}
        </div>
        <div
          style={{
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.42)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            position: 'absolute',
          }}
        >
          {children}
        </div>
      </div>
    </OwnerWebShell>
  );
}

function ModalCard({
  children,
  footer,
  subtitle,
  title,
  width = 520,
}: {
  children: ReactNode;
  footer: ReactNode;
  subtitle?: string;
  title: string;
  width?: number;
}) {
  return (
    <section
      aria-label={title}
      aria-modal="true"
      className="att-form-panel"
      role="dialog"
      style={{ boxShadow: '0 20px 60px rgba(15, 23, 42, 0.24)', maxHeight: 690, overflow: 'auto', width }}
    >
      <header className="att-form-panel__header" style={{ alignItems: 'start', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <IconButton label={`${title} 닫기`}>
          <X size={17} />
        </IconButton>
      </header>
      <div className="att-form-panel__body">{children}</div>
      <footer className="att-form-panel__footer">{footer}</footer>
    </section>
  );
}

function RosterContent({ compact = false }: { compact?: boolean }) {
  const days = ['월 14', '화 15', '수 16', '목 17', '금 18', '토 19', '일 20'];
  const rows = staffRows.slice(0, compact ? 4 : 6).map((staff, staffIndex) => ({
    staff,
    cells: days.map((day, dayIndex) => {
      const hasShift = [
        [0, 2, 4],
        [0, 1, 3, 5],
        [1, 2, 4, 6],
        [0, 2, 5],
        [1, 3, 4, 6],
        [0, 2, 3, 5],
      ][staffIndex]?.includes(dayIndex);
      return hasShift ? {
        day,
        store: attendanceStores[staffIndex % attendanceStores.length].name.replace('GS25 ', ''),
        time: staffIndex % 2 === 0 ? '09-18' : '14-22',
        tone: staffIndex % 3 === 1 ? 'success' : staffIndex % 3 === 2 ? 'warning' : 'primary',
      } : undefined;
    }),
  }));

  return (
    <div className="att-stack att-stack--loose">
      <div className="att-section-heading">
        <PageActions>
          <button className="att-button att-button--secondary" type="button">
            <ChevronLeft size={15} /> 4월 14일-20일
          </button>
          <button className="att-button att-button--ghost" type="button">복사하기</button>
          <button className="att-button" type="button"><Plus size={15} /> 근무 추가</button>
        </PageActions>
        <span>총 668시간 편성 · 예상 인건비 3,847,500원</span>
      </div>
      <section className="att-card-section" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '150px repeat(7, minmax(0, 1fr))' }}>
          <div style={{ background: 'var(--att-surface-muted)', padding: 12 }} />
          {days.map((day) => (
            <div
              key={day}
              style={{
                background: 'var(--att-surface-muted)',
                borderLeft: '1px solid var(--att-border)',
                color: day.startsWith('월') ? 'var(--att-primary-readable)' : 'var(--att-text-muted)',
                fontSize: 12,
                fontWeight: 800,
                padding: 12,
                textAlign: 'center',
              }}
            >
              {day}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.staff.name}
            style={{
              borderTop: '1px solid var(--att-border)',
              display: 'grid',
              gridTemplateColumns: '150px repeat(7, minmax(0, 1fr))',
              minHeight: compact ? 54 : 68,
            }}
          >
            <div style={{ alignItems: 'center', display: 'flex', gap: 8, minWidth: 0, padding: '12px 14px' }}>
              <AvatarName name={row.staff.name} />
            </div>
            {row.cells.map((shift, index) => (
              <div key={`${row.staff.name}-${days[index]}`} style={{ borderLeft: '1px solid var(--att-border)', padding: 6 }}>
                {shift ? (
                  <div
                    style={{
                      background: `var(--att-${shift.tone === 'warning' ? 'warn' : shift.tone}-soft)`,
                      borderLeft: `3px solid var(--att-${shift.tone === 'warning' ? 'warn' : shift.tone})`,
                      borderRadius: 5,
                      height: '100%',
                      padding: '6px 8px',
                    }}
                  >
                    <strong
                      className="att-mono"
                      style={{
                        color: shift.tone === 'primary'
                          ? 'var(--att-primary-readable)'
                          : `var(--att-${shift.tone === 'warning' ? 'warn' : shift.tone})`,
                        fontSize: 11,
                      }}
                    >
                      {shift.time}
                    </strong>
                    <span style={{ color: 'var(--att-text-muted)', display: 'block', fontSize: 10, marginTop: 2 }}>{shift.store}</span>
                  </div>
                ) : (
                  <div style={{ border: '1px dashed var(--att-border)', borderRadius: 5, height: '100%', opacity: 0.55 }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

function StaffContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className="att-stack att-stack--loose">
      <div className="att-section-heading">
        <PageActions>
          {['전체 (5)', `${selectedStore.name} (2)`, `${attendanceStores[1].name} (2)`, '퇴직 포함'].map((filter, index) => (
            <button className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`} key={filter} type="button">
              {filter}
            </button>
          ))}
        </PageActions>
        <button className="att-button" type="button"><Plus size={15} /> 직원 추가</button>
      </div>
      <WebTable
        columns={['이름', '전화번호', '근무 매장', '역할', '입사일', '시급', '상태', '관리']}
        rows={staffRows.slice(0, compact ? 4 : staffRows.length).map((staff) => [
          <AvatarName name={staff.name} />,
          <span className="att-mono">{staff.phone}</span>,
          staff.store,
          staff.role,
          staff.since,
          <Money>{staff.wage}</Money>,
          <StatusBadge tone={staff.tone}>{staff.status}</StatusBadge>,
          <PageActions>
            <button className="att-button att-button--ghost" type="button">수정</button>
            {staff.status === '재직' ? <button className="att-button att-button--secondary" type="button">방출</button> : null}
          </PageActions>,
        ])}
        template="1.05fr 1.15fr 1.3fr 0.7fr 0.9fr 0.7fr 0.7fr 1fr"
      />
    </div>
  );
}

function MemoContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className="att-stack">
      <div className="att-section-heading">
        <PageActions>
          {['전체 12', '이슈 3', '인수인계 5', '공지 4', '고정됨 1'].map((filter, index) => (
            <button className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`} key={filter} type="button">
              {filter}
            </button>
          ))}
        </PageActions>
        <button className="att-button" type="button"><Plus size={15} /> 새 메모 작성</button>
      </div>
      {memoRows.slice(0, compact ? 3 : memoRows.length).map((memo) => (
        <article className="att-memo-card" key={`${memo.title}-${memo.time}`}>
          <div className="att-memo-card__meta">
            <StatusBadge tone={memo.tone}>{memo.tag}</StatusBadge>
            {memo.pinned ? <StatusBadge tone="warning">고정</StatusBadge> : null}
            <span>{memo.author}</span>
            <span>{memo.store}</span>
            <span>{memo.time}</span>
          </div>
          <h2>{memo.title}</h2>
          <p>{memo.body}</p>
          <footer>
            <span>댓글 {memo.comments}</span>
            <span style={{ marginLeft: 'auto' }}>
              <button className="att-button att-button--ghost" type="button">수정</button>
              <button className="att-button att-button--secondary" style={{ marginLeft: 6 }} type="button">삭제</button>
            </span>
          </footer>
        </article>
      ))}
    </div>
  );
}

export function OwnerDashboardWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="dashboard"
      subtitle="2026년 4월 21일 화요일 · 전 매장의 근무, 승인 요청, 미확인 메모를 확인합니다."
      theme={theme}
      title="대시보드"
    >
      <div className="att-stack att-stack--loose">
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
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
        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 320px' }}>
          <WebTable
            columns={['직원', '매장', '스케줄', '출근', '퇴근', '상태']}
            rows={attendanceRows.map((row) => [
              <AvatarName name={row.name} />,
              row.store,
              <span className="att-mono">{row.sched}</span>,
              <span className="att-mono">{row.in}</span>,
              <span className="att-mono">{row.out}</span>,
              <StatusBadge tone={row.tone}>{row.status}</StatusBadge>,
            ])}
            template="1.1fr 1.3fr 1fr 0.75fr 0.75fr 0.8fr"
          />
          <div className="att-stack">
            <FormPanel title="주간 근무 시간" description="4월 14일-20일">
              <BarChart
                items={[
                  { label: '월', value: 86, caption: '86h' },
                  { label: '화', value: 92, caption: '92h' },
                  { label: '수', value: 78, caption: '78h' },
                  { label: '목', value: 88, caption: '88h' },
                  { label: '금', value: 94, caption: '94h' },
                  { label: '토', value: 120, caption: '120h' },
                  { label: '일', value: 110, caption: '110h' },
                ]}
              />
              <DetailRow label="이번 주 총 근무" value="668h" />
            </FormPanel>
            <FormPanel title="승인 대기">
              {leaveRequests.slice(0, 2).map((request) => (
                <ActionCard
                  caption={`${request.date} · ${request.store}`}
                  icon={<BriefcaseBusiness size={16} />}
                  key={`${request.name}-${request.date}`}
                  right={<ChevronRight size={16} />}
                  title={`${request.name} · ${request.type}`}
                />
              ))}
            </FormPanel>
          </div>
        </div>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerScheduleWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="schedule"
      subtitle={`${selectedStore.name} · 근무를 추가하거나 주간 스케줄을 조정합니다.`}
      theme={theme}
      title="스케줄 편성"
    >
      <RosterContent />
    </OwnerWebShell>
  );
}

export function OwnerScheduleCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <ModalOverlay activeId="schedule" subtitle="웹 모달 · 새 근무를 추가합니다." theme={theme} title="스케줄 편성">
      <ModalCard
        footer={
          <>
            <button className="att-button att-button--secondary" type="button">취소</button>
            <button className="att-button" type="button"><Plus size={15} /> 추가하기</button>
          </>
        }
        title="새 근무 추가"
        width={440}
      >
        <Field focus label="직원 *" value={attendanceEmployees[0].name} />
        <Field label="매장 *" value={selectedStore.name} />
        <div>
          <span className="att-field__label">날짜</span>
          <div className="att-inline-actions" style={{ marginTop: 8 }}>
            {days.map((day, index) => <Chip active={index === 4} key={day}>{day}</Chip>)}
          </div>
        </div>
        <div className="att-action-row">
          <Field label="시작" value="09:00" />
          <Field focus label="종료" value="18:00" />
        </div>
        <ActionCard
          caption="주휴수당과 예상 인건비에 자동 반영됩니다."
          icon={<AlertTriangle size={16} />}
          title="예상 근무 8시간 · 휴게 1시간"
        />
      </ModalCard>
    </ModalOverlay>
  );
}

export function OwnerPayrollWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const total = '5,842,000원';

  return (
    <OwnerWebShell
      activeId="payroll"
      subtitle="2026년 4월 급여 · 지급 예정일 5월 10일"
      theme={theme}
      title="급여 관리"
    >
      <div className="att-stack att-stack--loose">
        <div className="att-section-heading">
          <PageActions>
            <button className="att-button att-button--secondary" type="button"><ChevronLeft size={15} /> 2026년 4월</button>
            <button className="att-button att-button--ghost" type="button"><Download size={15} /> 명세서 PDF</button>
          </PageActions>
          <button className="att-button" type="button"><Send size={15} /> 일괄 확정 송금</button>
        </div>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
          <MetricCard label="총 지급액" value={total} caption="기본급 + 수당" icon={<WalletCards size={18} />} />
          <MetricCard label="총 공제액" value="814,500원" caption="4대보험 · 소득세" icon={<ReceiptText size={18} />} />
          <MetricCard label="실수령 합계" value="5,027,500원" caption="검토 1명 포함" icon={<CheckCircle2 size={18} />} />
          <MetricCard label="대상 인원" value={`${attendancePayrollRows.length}명`} caption="3개 매장 합산" icon={<Users size={18} />} />
        </div>
        <WebTable
          columns={['직원', '근무', '시급', '기본급', '수당', '공제', '실수령', '상태']}
          rows={attendancePayrollRows.map((row, index) => [
            <AvatarName name={row.employee} />,
            <span className="att-mono">{row.hours}</span>,
            <Money>{row.wage}</Money>,
            <Money>{index === 0 ? '1,310,000' : index === 1 ? '963,000' : '642,000'}</Money>,
            <Money tone="success">+{index === 0 ? '114,260' : index === 1 ? '0' : '0'}</Money>,
            <Money tone="danger">-{index === 0 ? '182,000' : index === 1 ? '91,000' : '61,000'}</Money>,
            <Money>{row.amount}</Money>,
            <StatusBadge tone={row.status === '확정' ? 'success' : 'warning'}>{row.status}</StatusBadge>,
          ])}
          template="1.1fr 0.65fr 0.85fr 0.85fr 0.85fr 0.85fr 1fr 0.7fr"
        />
      </div>
    </OwnerWebShell>
  );
}

export function OwnerStaffWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="staff"
      subtitle="등록된 직원 목록과 근무 매장, 시급, 재직 상태를 관리합니다."
      theme={theme}
      title="직원 관리"
    >
      <StaffContent />
    </OwnerWebShell>
  );
}

export function OwnerStaffAddWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <ModalOverlay activeId="staff" subtitle="웹 모달 · 신규 직원을 초대합니다." theme={theme} title="직원 관리">
      <ModalCard
        footer={
          <>
            <button className="att-button att-button--secondary" type="button">취소</button>
            <button className="att-button" type="button"><Send size={15} /> 직원 추가</button>
          </>
        }
        title="직원 추가"
        width={460}
      >
        <Field focus label="이름 *" value="김알바" />
        <Field label="전화번호 *" value="010-0000-0000" />
        <Field label="이메일 (선택)" value="alba@example.com" />
        <Field label="근무 매장 *" value="매장 선택" />
        <Field label="시급 (원)" value="10,030" />
        <ActionCard
          caption="추가 후 직원에게 앱 초대 코드가 자동 발송됩니다."
          icon={<ShieldCheck size={16} />}
          title="초대 코드 발송 예정"
        />
      </ModalCard>
    </ModalOverlay>
  );
}

export function OwnerAttendanceWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="attendance"
      subtitle={`${selectedStore.name} · 2026년 4월 21일 근태 기록`}
      theme={theme}
      title="근태 현황"
    >
      <div className="att-stack att-stack--loose">
        <div className="att-section-heading">
          <PageActions>
            <button className="att-button att-button--secondary" type="button"><CalendarDays size={15} /> 2026년 4월 21일</button>
            {['전체', '정상', '지각', '결근', '근무중'].map((filter, index) => (
              <button className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`} key={filter} type="button">{filter}</button>
            ))}
          </PageActions>
          <button className="att-button att-button--ghost" type="button"><Download size={15} /> 내보내기</button>
        </div>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
          <MetricCard icon={<CheckCircle2 size={18} />} label="정상 출근" value="4명" />
          <MetricCard icon={<AlertTriangle size={18} />} label="지각" value="1명" />
          <MetricCard icon={<Circle size={18} />} label="결근" value="1명" />
          <MetricCard icon={<Users size={18} />} label="근무중" value="2명" />
        </div>
        <WebTable
          columns={['이름', '근무 매장', '예정 시간', '출근', '퇴근', '상태', '관리']}
          rows={attendanceRows.map((row) => [
            <AvatarName name={row.name} />,
            row.store,
            <span className="att-mono">{row.sched}</span>,
            <span className="att-mono">{row.in}</span>,
            <span className="att-mono">{row.out}</span>,
            <StatusBadge tone={row.tone}>{row.status}</StatusBadge>,
            <button className="att-button att-button--ghost" type="button">수정</button>,
          ])}
          template="1fr 1.35fr 1fr 0.75fr 0.75fr 0.75fr 0.65fr"
        />
      </div>
    </OwnerWebShell>
  );
}

export function OwnerMemoWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="memo"
      subtitle="매장 공지, 이슈, 인수인계를 작성하고 확인합니다."
      theme={theme}
      title="메모·인수인계"
    >
      <MemoContent />
    </OwnerWebShell>
  );
}

export function OwnerMemoCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <ModalOverlay activeId="memo" subtitle="웹 모달 · 공지와 인수인계를 작성합니다." theme={theme} title="메모·인수인계">
      <ModalCard
        footer={
          <>
            <button className="att-button att-button--secondary" type="button">취소</button>
            <button className="att-button" type="button"><Send size={15} /> 게시하기</button>
          </>
        }
        title="메모·공지 작성"
        width={540}
      >
        <div>
          <span className="att-field__label">유형</span>
          <div className="att-inline-actions" style={{ marginTop: 8 }}>
            <Chip>이슈</Chip>
            <Chip>인수인계</Chip>
            <Chip active tone="success">공지</Chip>
          </div>
        </div>
        <Field label="대상 매장" value="전체 매장" />
        <Field focus label="제목 *" value="이번 주말 행사 프로모션 안내" />
        <Field
          label="내용 *"
          tall
          value="토·일 맥주 4캔 9,900원 행사가 진행됩니다. 매대 앞쪽 POP 위치와 재고 보충 기준을 확인해 주세요."
        />
        <div className="att-action-row">
          <ActionCard icon={<Bell size={16} />} title="직원 알림 보내기" right={<span className="att-toggle att-toggle--on" />} />
          <ActionCard icon={<CheckCircle2 size={16} />} title="상단 고정" right={<span className="att-toggle" />} />
        </div>
      </ModalCard>
    </ModalOverlay>
  );
}

export function OwnerLeaveWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const balances = [
    { name: '최지우', total: 15, used: 3, remain: 12 },
    { name: '박민아', total: 11, used: 2, remain: 9 },
    { name: '정지훈', total: 15, used: 5, remain: 10 },
    { name: '최서아', total: 8, used: 0, remain: 8 },
    { name: '한유진', total: 15, used: 1, remain: 14 },
  ];

  return (
    <OwnerWebShell
      activeId="leave"
      subtitle="휴가 신청 승인과 직원별 연차 잔여 현황을 확인합니다."
      theme={theme}
      title="휴가·연차 관리"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr' }}>
        <FormPanel title={`승인 대기 (${leaveRequests.filter((request) => request.status === '대기').length}건)`}>
          {leaveRequests.map((request) => (
            <ActionCard
              caption={`${request.store} · ${request.type} · ${request.date} (${request.days})`}
              icon={<BriefcaseBusiness size={16} />}
              key={`${request.name}-${request.date}`}
              right={
                request.status === '대기' ? (
                  <PageActions>
                    <button className="att-button" type="button">승인</button>
                    <button className="att-button att-button--secondary" type="button">반려</button>
                  </PageActions>
                ) : <StatusBadge tone={request.tone}>{request.status}</StatusBadge>
              }
              title={request.name}
            />
          ))}
        </FormPanel>
        <FormPanel title="연차 잔여 현황">
          <WebTable
            columns={['직원', '부여', '사용', '잔여']}
            rows={balances.map((balance) => [
              <AvatarName name={balance.name} />,
              `${balance.total}일`,
              <span style={{ color: 'var(--att-warn)', fontWeight: 800 }}>{balance.used}일</span>,
              <span style={{ color: 'var(--att-success)', fontWeight: 800 }}>{balance.remain}일</span>,
            ])}
            template="1fr 70px 70px 70px"
          />
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerStatsWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const storeData = ownerStoreStatus.map((store, index) => ({
    ...store,
    hours: [312, 380, 240][index] ?? 260,
    cost: ['1,748,200', '2,080,000', '1,340,000'][index] ?? '1,200,000',
    absent: index === 2 ? 1 : 0,
  }));

  return (
    <OwnerWebShell
      activeId="stats"
      subtitle="매장별 근무량, 인건비, 출근율 추이를 분석합니다."
      theme={theme}
      title="통계 리포트"
    >
      <div className="att-stack att-stack--loose">
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr' }}>
          <FormPanel title="주간 인건비 추이">
            <BarChart
              items={[
                { label: '3/24', value: 284, caption: '284만' },
                { label: '3/31', value: 312, caption: '312만' },
                { label: '4/7', value: 299, caption: '299만' },
                { label: '4/14', value: 338, caption: '338만' },
                { label: '4/21', value: 384, caption: '384만' },
              ]}
            />
          </FormPanel>
          <FormPanel title="주간 출근율">
            <BarChart
              items={[
                { label: '3/24', value: 91, caption: '91%' },
                { label: '3/31', value: 88, caption: '88%' },
                { label: '4/7', value: 94, caption: '94%' },
                { label: '4/14', value: 90, caption: '90%' },
                { label: '4/21', value: 87, caption: '87%' },
              ]}
              tone="success"
            />
          </FormPanel>
        </div>
        <WebTable
          columns={['매장', '총 근무시간', '인건비', '지각', '결근']}
          rows={storeData.map((store) => [
            <strong>{store.name}</strong>,
            <span className="att-mono">{store.hours}h</span>,
            <Money>{store.cost}</Money>,
            <span style={{ color: store.late ? 'var(--att-warn)' : 'var(--att-text-muted)', fontWeight: 800 }}>{store.late}건</span>,
            <span style={{ color: store.absent ? 'var(--att-danger)' : 'var(--att-text-muted)', fontWeight: 800 }}>{store.absent}건</span>,
          ])}
          template="1fr 110px 140px 80px 80px"
        />
      </div>
    </OwnerWebShell>
  );
}

export function OwnerTaxationWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const recommendations = [
    { name: '이정훈 세무사', office: '한빛 세무법인', spec: '프랜차이즈 가맹점', rating: '4.8', reviews: '32건' },
    { name: '박소연 세무사', office: '클리어 세무사무소', spec: '편의점·소매업 전문', rating: '4.7', reviews: '21건' },
    { name: '최준호 세무사', office: '미래 세무법인', spec: '카페·F&B 특화', rating: '4.6', reviews: '18건' },
  ];

  return (
    <OwnerWebShell
      activeId="taxation"
      subtitle="급여 자료와 매장 매출 신고를 함께 볼 세무사를 연결합니다."
      theme={theme}
      title="세무사 연결"
    >
      <div className="att-stack att-stack--loose">
        <FormPanel title="연결된 세무사" description="김민철 세무사 · 청운 세무회계사무소 · 2025-03부터">
          <ActionCard
            caption="소규모 사업장 특화 · 02-1234-5678"
            icon={<User size={16} />}
            right={
              <PageActions>
                <button className="att-button att-button--secondary" type="button">연결 해제</button>
                <button className="att-button" type="button"><MessageCircle size={15} /> 메시지 보내기</button>
              </PageActions>
            }
            title="김민철 세무사"
          />
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <MetricCard label="이번 달 신고" value="부가세 예정" caption="5월 25일 마감" />
            <MetricCard label="다음 미팅" value="5월 10일" caption="온라인 상담" />
            <MetricCard label="미처리 서류" value="2건" caption="급여대장 · 카드매출" />
          </div>
        </FormPanel>
        <FormPanel title="추천 세무사">
          {recommendations.map((tax) => (
            <ActionCard
              caption={`${tax.office} · ${tax.spec} · 리뷰 ${tax.reviews}`}
              icon={<Landmark size={16} />}
              key={tax.name}
              right={
                <PageActions>
                  <StatusBadge tone="warning"><Star size={12} /> {tax.rating}</StatusBadge>
                  <button className="att-button att-button--ghost" type="button">연결 요청</button>
                </PageActions>
              }
              title={tax.name}
            />
          ))}
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerLaborWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const rows = [
    { name: '최지우', contract: attendanceContracts[0], status: '서명완료', tone: 'success' },
    { name: '박민아', contract: attendanceContracts[0], status: '서명대기', tone: 'warning' },
    { name: '이준호', contract: attendanceContracts[1], status: '만료', tone: 'neutral' },
  ] satisfies { name: string; contract: (typeof attendanceContracts)[number]; status: string; tone: StatusTone }[];

  return (
    <OwnerWebShell
      activeId="labor"
      subtitle="근로계약서 작성, 서명 요청, 완료본 보관을 관리합니다."
      theme={theme}
      title="근로계약서"
    >
      <div className="att-stack att-stack--loose">
        <div className="att-section-heading">
          <PageActions>
            {['전체', '서명완료', '서명대기', '만료'].map((filter, index) => (
              <button className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`} key={filter} type="button">{filter}</button>
            ))}
          </PageActions>
          <button className="att-button" type="button"><Plus size={15} /> 계약서 작성</button>
        </div>
        <WebTable
          columns={['직원', '매장', '계약 기간', '시급', '상태', '관리']}
          rows={rows.map((row) => [
            <AvatarName name={row.name} />,
            row.contract.store,
            row.contract.period,
            row.contract.wage,
            <StatusBadge tone={row.tone}>{row.status}</StatusBadge>,
            <PageActions>
              <button className="att-button att-button--ghost" type="button">보기</button>
              {row.status !== '만료' ? <button className="att-button att-button--secondary" type="button">재발급</button> : null}
            </PageActions>,
          ])}
          template="1fr 1.2fr 1.8fr 0.9fr 0.8fr 1.1fr"
        />
        <ActionCard
          caption="근로계약서는 근로기준법에 따라 근로 시작일 전에 작성·교부해야 합니다."
          icon={<AlertTriangle size={16} />}
          title="서명이 완료된 계약서는 3년간 보관됩니다."
        />
      </div>
    </OwnerWebShell>
  );
}

export function OwnerLaborCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="labor"
      subtitle="작성 완료 후 직원에게 서명 요청이 전송됩니다."
      theme={theme}
      title="근로계약서 작성 폼"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 340px' }}>
        <FormPanel
          footer={
            <>
              <button className="att-button att-button--secondary" type="button">미리보기</button>
              <button className="att-button att-button--ghost" type="button">임시저장</button>
              <button className="att-button" type="button"><Send size={15} /> 서명 요청 보내기</button>
            </>
          }
          title="계약 정보"
        >
          <div className="att-action-row">
            <Field label="사업장명 *" value={selectedStore.name} />
            <Field label="사업자등록번호 *" value="123-45-67890" />
          </div>
          <Field label="사업장 주소 *" value={selectedStore.address} />
          <div className="att-action-row">
            <Field label="대표자명 *" value={owner.name} />
            <Field label="근로자 성명 *" value={attendanceEmployees[0].name} />
          </div>
          <div className="att-action-row">
            <Field label="계약 시작일 *" value="2026-01-01" />
            <Field label="계약 종료일 *" value="2026-12-31" />
          </div>
          <div className="att-action-row">
            <Field label="근무 요일" value="월, 수, 금, 토 (주 4일)" />
            <Field label="근무 시간" value="09:00 - 18:00" />
          </div>
          <div className="att-action-row">
            <Field label="시급 *" value="10,030원 (2026년 최저임금)" />
            <Field label="급여 지급일 *" value="매월 25일" />
          </div>
          <div>
            <span className="att-field__label">서명 요청 방식</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active>카카오 알림톡</Chip>
              <Chip>SMS</Chip>
              <Chip>직접 서명</Chip>
            </div>
          </div>
        </FormPanel>
        <FormPanel title="작성 도우미" description="필수 항목을 채우면 표준 계약서가 생성됩니다.">
          <EmptyState
            description="계약 기간과 근무 시간, 임금 항목을 확인한 뒤 미리보기로 문서를 검토하세요."
            icon={<FileText size={20} />}
            title="표준근로계약서"
          />
          <ActionCard caption="근무 시작 전 교부 필요" icon={<ShieldCheck size={16} />} title="법정 보관 3년" />
          <ActionCard caption="앱 내 서명 링크 전송" icon={<Send size={16} />} title="카카오 알림톡 선택됨" />
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerLaborPreviewWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="labor"
      subtitle="계약서 미리보기, 다운로드, 서명본 업로드 화면입니다."
      theme={theme}
      title="계약서 미리보기·다운로드·업로드"
    >
      <div style={{ display: 'grid', gap: 0, gridTemplateColumns: '1fr 260px', minHeight: 612 }}>
        <div style={{ background: 'var(--att-surface-muted)', display: 'grid', justifyItems: 'center', overflow: 'auto', padding: 28 }}>
          <DocumentPreview items={contractItems} signedDate="2026.01.01" subtitle="표준근로계약서 (기간제 근로자용)" />
        </div>
        <aside className="att-form-panel" style={{ borderLeft: '1px solid var(--att-border)', borderRadius: 0 }}>
          <div className="att-form-panel__header">
            <h2>파일</h2>
            <p>서명완료본 · 0.8 MB</p>
          </div>
          <ActionCard caption="계약서_GS25강남역점_2026.pdf" icon={<Download size={16} />} title="PDF 다운로드" />
          <div className="att-dashed-card" style={{ minHeight: 150 }}>
            <div>
              <Upload size={22} />
              <p className="att-copy">서명본 업로드</p>
              <button className="att-button att-button--secondary" type="button">파일 선택</button>
            </div>
          </div>
          {[
            { icon: <Send size={16} />, title: '서명 재요청' },
            { icon: <Pencil size={16} />, title: '계약서 수정' },
            { icon: <Trash2 size={16} />, title: '계약서 삭제' },
          ].map((action) => <ActionCard icon={action.icon} key={action.title} title={action.title} />)}
          <FormPanel title="이력">
            {['사용자 서명 완료 · 2026.01.01 09:12', '근로자 서명 완료 · 2026.01.01 14:35', '서명 요청 발송 · 2025.12.30 11:00'].map((history) => (
              <DetailRow key={history} label={history.split(' · ')[0]} value={history.split(' · ')[1]} />
            ))}
          </FormPanel>
        </aside>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerPaymentWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const history = [
    { date: '2026-04-01', desc: 'Pro 플랜 · 4월', amount: '39,000원', method: '신한카드 ****1234' },
    { date: '2026-03-01', desc: 'Pro 플랜 · 3월', amount: '39,000원', method: '신한카드 ****1234' },
    { date: '2026-02-01', desc: 'Pro 플랜 · 2월', amount: '39,000원', method: '신한카드 ****1234' },
  ];

  return (
    <OwnerWebShell
      activeId="payment"
      subtitle="구독 플랜, 결제 수단, 결제 내역을 관리합니다."
      theme={theme}
      title="결제·구독 관리"
    >
      <div className="att-stack att-stack--loose">
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
          <FormPanel title="현재 플랜" description="다음 결제일: 2026-05-01">
            <MetricCard label="Pro" value="39,000원 / 월" caption="3개 매장 · 직원 50명" icon={<BadgePercent size={18} />} />
            <PageActions>
              <button className="att-button att-button--secondary" type="button">플랜 변경</button>
              <button className="att-button att-button--ghost" type="button">구독 취소</button>
            </PageActions>
          </FormPanel>
          <FormPanel title="결제 수단" description="토스페이먼츠로 안전하게 처리됩니다.">
            <ActionCard caption="유효기간 12/27 · 자동결제 등록됨" icon={<CreditCard size={16} />} title="신한카드 ****1234" />
            <button className="att-button att-button--secondary" type="button">카드 변경</button>
          </FormPanel>
        </div>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {attendancePlans.map((plan) => (
            <FormPanel
              key={plan.id}
              title={plan.name}
              description={`${plan.stores} · ${plan.staff}`}
              footer={plan.id === 'pro' ? <StatusBadge tone="primary">현재 플랜</StatusBadge> : <button className="att-button att-button--ghost" type="button">{plan.id === 'team' ? '업그레이드' : '다운그레이드'}</button>}
            >
              <MetricCard label="월 요금" value={plan.price} caption="VAT 별도" />
              {['출퇴근·스케줄', '할일·메모', plan.id === 'basic' ? '급여 기본' : '근태 통계·세무 연동'].map((feature) => (
                <DetailRow key={feature} label={feature} value={<Check size={14} />} />
              ))}
            </FormPanel>
          ))}
        </div>
        <WebTable
          columns={['날짜', '내역', '결제 수단', '금액', '상태']}
          rows={history.map((item) => [
            item.date,
            item.desc,
            item.method,
            <Money>{item.amount}</Money>,
            <StatusBadge tone="success">결제완료</StatusBadge>,
          ])}
          template="1fr 1.6fr 1.4fr 1fr 0.8fr"
        />
      </div>
    </OwnerWebShell>
  );
}

export function OwnerPaymentCheckoutWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell
      activeId="payment"
      subtitle="토스페이먼츠 결제 위젯 · 실제 결제 동작은 없는 정적 화면입니다."
      theme={theme}
      title="결제 위젯 (토스페이먼츠)"
    >
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 380px', margin: '0 auto', maxWidth: 900 }}>
        <FormPanel title="주문 요약">
          <DetailRow label="Pro 플랜" value="39,000원" />
          <DetailRow label="VAT (10%)" value="3,900원" />
          <DetailRow label="현재 플랜 잔여분 공제" value={<span style={{ color: 'var(--att-success)' }}>-25,500원</span>} />
          <div style={{ borderTop: '1px solid var(--att-border)', paddingTop: 16 }}>
            <DetailRow label="오늘 결제 금액" value={<span style={{ color: 'var(--att-primary-readable)', fontSize: 18 }}>17,400원</span>} />
          </div>
          <ActionCard
            caption="다음달부터 매월 1일 42,900원(VAT 포함)이 자동 결제됩니다."
            icon={<ShieldCheck size={16} />}
            title="정기결제 안내"
          />
          {['Pro 플랜 전체 기능', '근로계약서 자동 생성', '전용 고객센터', '데이터 엑셀 내보내기'].map((feature) => (
            <DetailRow key={feature} label={feature} value={<Check size={14} />} />
          ))}
        </FormPanel>
        <FormPanel
          footer={<button className="att-button att-button--full" type="button">17,400원 결제하기</button>}
          title="토스페이먼츠"
          description="카드 · 계좌이체 · 가상계좌"
        >
          <div className="att-inline-actions">
            {['카드', '계좌이체', '가상계좌'].map((method, index) => (
              <button className={`att-button ${index === 0 ? '' : 'att-button--secondary'}`} key={method} type="button">{method}</button>
            ))}
          </div>
          <Field focus label="카드 번호" value="신한  9411  ****  ****  1234" />
          <div className="att-action-row">
            <Field label="유효기간" value="12 / 27" />
            <Field label="CVC" value="***" />
          </div>
          <Field label="할부" value="일시불" />
          <ActionCard
            caption="매월 1일 자동으로 구독료가 청구됩니다."
            icon={<Check size={16} />}
            title="정기결제 서비스 이용 및 자동결제 동의"
          />
          <p className="att-copy" style={{ textAlign: 'center' }}>SSL 보안 결제 · PCI DSS 인증</p>
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}
