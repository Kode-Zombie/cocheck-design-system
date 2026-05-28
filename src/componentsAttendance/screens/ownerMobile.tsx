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
  Edit3,
  FileText,
  Home,
  ListChecks,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Store,
  User,
  Users,
  WalletCards,
} from 'lucide-react';
import type { ReactNode } from 'react';
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
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
  { id: 'stores', label: '매장', icon: <Store size={18} /> },
  { id: 'me', label: '나', icon: <User size={18} /> },
];

const ownerStoreStatus = attendanceStores.map((store, index) => ({
  ...store,
  present: [2, 3, 4][index] ?? 2,
  total: [3, 4, 5][index] ?? 3,
  late: index === 1 ? 1 : 0,
  auth: ['버튼 태그', 'GPS · 50m', 'QR 코드'][index] ?? '버튼 태그',
  type: ['편의점', '카페', '베이커리'][index] ?? '매장',
}));

const ownerRosterRows = attendanceEmployees.map((employee, index) => ({
  name: employee.name,
  role: employee.role,
  cells: [
    [1, 1, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1],
  ][index] ?? [1, 0, 1, 0, 1, 0, 0],
}));

const ownerAttendanceRows = [
  { name: attendanceEmployees[0].name, sched: '09:00-18:00', actual: '08:58-', status: '근무중', tone: 'primary' },
  { name: attendanceEmployees[1].name, sched: '06:00-13:00', actual: '06:10-13:00', status: '지각', tone: 'warning' },
  { name: '정지훈', sched: '07:00-15:00', actual: '07:02-15:05', status: '퇴근', tone: 'neutral' },
  { name: '최서아', sched: '14:00-22:00', actual: '미태그', status: '결근', tone: 'danger' },
  { name: attendanceEmployees[2].name, sched: '15:00-22:00', actual: '14:55-', status: '근무중', tone: 'primary' },
] satisfies { name: string; sched: string; actual: string; status: string; tone: StatusTone }[];

const ownerTodoRows = [
  { title: 'POS 전원 켜고 현금 시재 확인', owner: '공통', done: true },
  { title: attendanceTodos[1].title, owner: attendanceTodos[1].owner, done: attendanceTodos[1].done },
  { title: '매장 외부 청소 (입구·쓰레기통)', owner: '오픈조', done: false, due: '09:00' },
  { title: '신상품 POP 교체', owner: attendanceEmployees[0].name, done: false, due: '11:00' },
  { title: attendanceTodos[0].title, owner: attendanceTodos[0].owner, done: false },
];

const payrollPublishRows = attendancePayrollRows.map((row, index) => ({
  ...row,
  publishStatus: index === 0 ? '발행완료' : '미발행',
}));

function MobileShell({
  activeTab,
  children,
  height = 874,
  theme,
  title,
  width = 402,
}: {
  activeTab?: string;
  children: ReactNode;
  height?: number;
  theme: AttendanceScreenProps['theme'];
  title: string;
  width?: number;
}) {
  return (
    <MobileFrame height={height} theme={theme} title={title} width={width}>
      <div className="att-mobile-screen">
        {children}
        {activeTab ? <OwnerTabBar activeId={activeTab} items={ownerTabs} /> : null}
      </div>
    </MobileFrame>
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

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="att-progress">
      <div style={{ width: `${value}%` }} />
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
    <MobileShell activeTab="home" theme={theme} title="01 · 사장님 홈">
      <PageHeader
        eyebrow="사장님"
        right={
          <IconButton label="알림 보기">
            <Bell size={18} />
            <span className="att-notification-dot" />
          </IconButton>
        }
        title={`${owner.name} 님`}
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <OwnerHeroCard label="오늘 출근" value="6 / 9">
          <DetailRow label="지각" value="1명" />
          <DetailRow label="결근" value="0명" />
          <DetailRow label="오늘 인건비" value="842K" />
        </OwnerHeroCard>
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

export function OwnerRosterMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

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
          <div style={{ display: 'grid', gap: 6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '76px repeat(7, minmax(0, 1fr))', gap: 4 }}>
              <span />
              {days.map((day) => (
                <span className="att-field__label" key={day} style={{ textAlign: 'center' }}>{day}</span>
              ))}
            </div>
            {ownerRosterRows.map((row) => (
              <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '76px repeat(7, minmax(0, 1fr))', gap: 4, alignItems: 'center' }}>
                <div style={{ minWidth: 0 }}>
                  <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{row.name}</strong>
                  <span className="att-field__label">{row.role}</span>
                </div>
                {row.cells.map((cell, index) => (
                  <div
                    className={cell ? 'att-week-cell att-week-cell--active' : 'att-week-cell'}
                    key={`${row.name}-${days[index]}`}
                    style={{ minHeight: 36, padding: 4 }}
                  >
                    <small>{cell ? '8h' : ''}</small>
                  </div>
                ))}
              </div>
            ))}
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
  return (
    <MobileShell activeTab="stores" theme={theme} title="04 · 매장 관리">
      <PageHeader
        eyebrow={`${ownerStoreStatus.length}개 매장 · 직원 ${ownerStoreStatus.reduce((sum, store) => sum + store.total, 0)}명`}
        right={<IconButton label="매장 추가"><Plus size={18} /></IconButton>}
        title="매장 관리"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <div className="att-stack">
          {ownerStoreStatus.map((store) => (
            <section className="att-card-section" key={store.id}>
              <div className="att-section-heading">
                <h2>{store.name}</h2>
                <IconButton label={`${store.name} 메뉴`}><MoreVertical size={17} /></IconButton>
              </div>
              <DetailRow label="주소" value={store.address} />
              <DetailRow label="업종 · 직원" value={`${store.type} · ${store.total}명`} />
              <div className="att-inline-actions" style={{ marginTop: 12 }}>
                <Chip active>{store.auth}</Chip>
                <Chip>시급 10,030원</Chip>
                <Chip>24시간</Chip>
              </div>
            </section>
          ))}
        </div>
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

export function OwnerTodoMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const doneCount = ownerTodoRows.filter((todo) => todo.done).length;

  return (
    <MobileShell activeTab="home" theme={theme} title="06 · 할 일 관리">
      <PageHeader
        eyebrow={`${selectedStore.name} · 오늘`}
        right={<button className="att-button" type="button"><Plus size={15} /> 추가</button>}
        title="할 일 관리"
      />
      <main className="att-mobile-content att-mobile-content--flush-top" tabIndex={0}>
        <section className="att-card-section">
          <div className="att-section-heading">
            <h2>전체 진행률</h2>
            <span className="att-mono">{doneCount} / {ownerTodoRows.length}</span>
          </div>
          <ProgressBar value={(doneCount / ownerTodoRows.length) * 100} />
        </section>
        <section className="att-stack" style={{ marginTop: 18 }}>
          {ownerTodoRows.map((todo) => (
            <ActionCard
              caption={`${todo.owner}${todo.due ? ` · ~${todo.due}` : ''}`}
              icon={todo.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              key={todo.title}
              right={
                <div style={{ display: 'inline-flex', gap: 6 }}>
                  <button className="att-button att-button--ghost" type="button">수정</button>
                  <button className="att-button att-button--secondary" type="button">삭제</button>
                </div>
              }
              title={todo.title}
            />
          ))}
        </section>
      </main>
    </MobileShell>
  );
}

export function OwnerTodoCreateMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileShell theme={theme} title="F1 · 할 일 추가 (모바일)">
      <PageHeader
        back
        right={<button className="att-button" type="button">저장</button>}
        title="할 일 추가"
      />
      <main className="att-mobile-content" tabIndex={0}>
        <FormPanel description="직원에게 보이는 오늘 체크리스트로 추가됩니다." title="할 일 정보">
          <Field focus label="할 일 내용 *" value="신상품 POP 교체" />
          <div>
            <span className="att-field__label">담당자</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip>공통</Chip>
              <Chip>오픈조</Chip>
              <Chip active>{attendanceEmployees[0].name}</Chip>
              <Chip>{attendanceEmployees[1].name}</Chip>
            </div>
          </div>
          <div>
            <span className="att-field__label">마감 시각</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip>설정 안 함</Chip>
              <Chip>09:00</Chip>
              <Chip active>11:00</Chip>
              <Chip>18:00</Chip>
            </div>
          </div>
          <div>
            <span className="att-field__label">반복</span>
            <div className="att-inline-actions" style={{ marginTop: 8 }}>
              <Chip active tone="success">반복 없음</Chip>
              <Chip>매일</Chip>
              <Chip>주중</Chip>
            </div>
          </div>
          <Field
            label="메모"
            tall
            value="행사 매대 왼쪽 첫 번째 줄에 부착하고 완료 후 사진으로 확인해 주세요."
          />
          <ActionCard
            caption="직원 앱 할 일 탭에 즉시 표시됩니다."
            icon={<ListChecks size={16} />}
            right={<StatusBadge tone="primary">미리보기</StatusBadge>}
            title="신상품 POP 교체"
          />
        </FormPanel>
      </main>
    </MobileShell>
  );
}

export function OwnerMeMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const menuItems = [
    { icon: <Store size={17} />, label: '매장 관리', sub: '3개 매장 운영 중' },
    { icon: <Users size={17} />, label: '직원 관리', sub: '총 12명' },
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
              <h2 style={{ margin: 0, fontSize: 17 }}>{owner.name} 사장님</h2>
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
            <ActionCard
              caption={item.sub}
              icon={item.icon}
              key={item.label}
              right={<ChevronRight size={17} />}
              title={item.label}
            />
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
