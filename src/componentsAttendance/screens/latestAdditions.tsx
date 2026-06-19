import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  Download,
  Ellipsis,
  FileText,
  Home,
  KeyRound,
  Landmark,
  LineChart,
  Mail,
  MessageCircle,
  Plus,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  Store,
  Upload,
  User,
  Users,
  WalletCards,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { DocumentPreview, type DocumentPreviewItem } from '../components/DocumentPreview';
import { FormPanel } from '../components/FormPanel';
import { MobileFrame, WebFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { MobileTabBar, OwnerTabBar, WebAppShell, type NavItem } from '../components/Navigation';
import { StatusBadge, type StatusTone } from '../components/StatusBadge';
import {
  attendanceContracts,
  attendanceDashboardMetrics,
  attendanceEmployees,
  attendancePlans,
  attendanceStores,
} from '../data/attendanceSampleData';
import {
  buildNotificationRows,
  employeeNotificationPushes,
  employeeNotificationUserId,
  type NotificationCategory,
} from './notifications';
import type { AttendanceScreenProps } from './screenTypes';

const owner = {
  name: '김성호',
  email: 'kimceo@example.com',
  phone: '010-1234-5678',
};

const employee = {
  name: '최지우',
  email: 'jiwoo@example.com',
  phone: '010-1234-5678',
};

const store = attendanceStores[0];

const employeeTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'punch', label: '출퇴근', icon: <Clock3 size={18} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={18} /> },
  { id: 'todo', label: '할 일', icon: <ClipboardList size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
];

const ownerTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'memo', label: '메모', icon: <MessageCircle size={18} /> },
  { id: 'schedule', label: '일정', icon: <CalendarDays size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
  { id: 'me', label: '나', icon: <Ellipsis size={18} />, hideLabel: true },
];

const employeeWebNavItems: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={17} /> },
  { id: 'memo', label: '메모·인수인계', icon: <MessageCircle size={17} /> },
  { id: 'salary', label: '내 급여', icon: <WalletCards size={17} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={17} /> },
];

const ownerWebNavItems: NavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: <Home size={17} /> },
  { id: 'schedule', label: '스케줄 편성', icon: <CalendarDays size={17} /> },
  { id: 'payroll', label: '급여 관리', icon: <WalletCards size={17} /> },
  { id: 'staff', label: '직원 관리', icon: <Users size={17} /> },
  { id: 'attendance', label: '근태 현황', icon: <Clock3 size={17} /> },
  { id: 'memo', label: '메모·인수인계', icon: <MessageCircle size={17} /> },
  { id: 'stats', label: '통계 리포트', icon: <LineChart size={17} /> },
  { id: 'taxation', label: '세무사 연결', icon: <Landmark size={17} /> },
  { id: 'labor', label: '근로계약서', icon: <FileText size={17} /> },
  { id: 'payment', label: '결제·구독', icon: <CreditCard size={17} /> },
  { id: 'profile', label: '내 계정', icon: <User size={17} /> },
  { id: 'todo', label: '할 일 관리', icon: <ClipboardList size={17} /> },
];

const contractItems: DocumentPreviewItem[] = [
  { title: '제1조 (근무 장소)', content: `${store.name}\n${store.address}` },
  { title: '제2조 (업무 내용)', content: '편의점 판매, 재고 정리 및 매장 관리 업무' },
  { title: '제3조 (계약 기간)', content: '2026년 01월 01일 ~ 2026년 12월 31일' },
  { title: '제4조 (근무 시간)', content: '09:00 ~ 18:00 (휴게 1시간 포함)\n근무 요일: 월·수·금·토' },
  { title: '제5조 (임금)', content: '시급 10,030원\n매월 25일 근로자 계좌 이체' },
  { title: '제6조 (주휴일)', content: '1주 소정근로일을 개근한 경우 매주 1일' },
];

function BrandMark({ small = false }: { small?: boolean }) {
  return <div className={`att-logo-mark${small ? ' att-logo-mark--small' : ''}`}>근</div>;
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

function PageActions({ children }: { children: ReactNode }) {
  return <div className="att-inline-actions">{children}</div>;
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button aria-label={label} className="att-icon-button" type="button">
      {children}
    </button>
  );
}

function MobileHeader({
  title,
  subtitle,
  back = false,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}) {
  return (
    <header className={`att-mobile-page-header${back ? ' att-mobile-page-header--bordered' : ''}`}>
      <div className="att-mobile-page-header__title">
        {back ? <ArrowLeft size={21} /> : null}
        <div>
          {subtitle ? <p>{subtitle}</p> : null}
          <h1>{title}</h1>
        </div>
      </div>
      {right ? <div className="att-mobile-page-header__right">{right}</div> : null}
    </header>
  );
}

function EmployeeMobileShell({
  activeTab,
  children,
  title,
  theme,
}: {
  activeTab?: string;
  children: ReactNode;
  title: string;
  theme: AttendanceScreenProps['theme'];
}) {
  return (
    <MobileFrame height={844} theme={theme} title={title} width={390}>
      <div className="att-mobile-screen">
        {children}
        {activeTab ? <MobileTabBar activeId={activeTab} items={employeeTabs} /> : null}
      </div>
    </MobileFrame>
  );
}

function OwnerMobileShell({
  activeTab,
  children,
  title,
  theme,
}: {
  activeTab?: string;
  children: ReactNode;
  title: string;
  theme: AttendanceScreenProps['theme'];
}) {
  return (
    <MobileFrame height={844} theme={theme} title={title} width={390}>
      <div className="att-mobile-screen">
        {children}
        {activeTab ? <OwnerTabBar activeId={activeTab} items={ownerTabs} /> : null}
      </div>
    </MobileFrame>
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
  subtitle?: string;
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
              <StatusBadge tone="primary">근무중</StatusBadge>
              <IconButton label="알림 보기">
                <Bell size={17} />
                <span className="att-notification-dot" />
              </IconButton>
            </>
          )
        }
        sidebarFooter={
          <ActionCard
            caption={`${store.name} · ${employee.email}`}
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
        navTitle="경영주 포털"
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
            title={`${owner.name} 경영주`}
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

function AuthWebLayout({
  children,
  heroTitle,
  heroCopy,
  theme,
  title,
}: {
  children: ReactNode;
  heroTitle: string;
  heroCopy: string;
  theme: AttendanceScreenProps['theme'];
  title: string;
}) {
  return (
    <WebFrame height={800} theme={theme} title={title} width={1280}>
      <div className="att-web-split">
        <section className="att-web-hero">
          <div className="att-brand-row">
            <BrandMark small />
            <span>근태관리</span>
          </div>
          <div className="att-web-hero__inner" style={{ marginBottom: 'auto', marginTop: 'auto' }}>
            <h1 className="att-web-title">{heroTitle}</h1>
            <p className="att-copy" style={{ fontSize: 14, marginTop: 16 }}>
              {heroCopy}
            </p>
          </div>
          <p className="att-field__hint">© 2026 근태관리 · 소상공인을 위한 근태·급여 플랫폼</p>
        </section>
        <section className="att-web-form">
          <div className="att-web-form__inner">{children}</div>
        </section>
      </div>
    </WebFrame>
  );
}

function ListItem({
  icon,
  title,
  caption,
  right,
}: {
  icon?: ReactNode;
  title: string;
  caption?: string;
  right?: ReactNode;
}) {
  return (
    <div className="att-action-card">
      {icon ? <div className="att-action-card__icon">{icon}</div> : null}
      <div className="att-action-card__body">
        <strong>{title}</strong>
        {caption ? <span>{caption}</span> : null}
      </div>
      {right ? <div className="att-action-card__right">{right}</div> : null}
    </div>
  );
}

export function ThemePreviewDusk({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={480} theme={theme} title="A · Dusk" width={260}>
      <div className="att-mobile-screen" style={{ background: '#1E3A5F', color: '#F8FAFC', padding: 20 }}>
        <BrandMark />
        <div style={{ marginTop: 'auto' }}>
          <p style={{ color: '#FDC62C', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>DUSK THEME</p>
          <h1 style={{ fontSize: 28, lineHeight: 1.12, margin: 0 }}>오늘 출근을 한눈에</h1>
          <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>
            어두운 네이비와 브랜드 옐로를 강하게 대비한 운영자용 스타일입니다.
          </p>
          <div style={{ background: '#FDC62C', borderRadius: 12, color: '#111827', fontSize: 13, fontWeight: 900, marginTop: 20, padding: '12px 14px', textAlign: 'center' }}>
            출근 현황 보기
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

export function ThemePreviewMinimal({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={480} theme={theme} title="B · Minimal" width={260}>
      <div className="att-mobile-screen" style={{ background: '#FAF9F5', padding: 20 }}>
        <BrandMark />
        <div style={{ display: 'grid', gap: 12, marginTop: 36 }}>
          {attendanceDashboardMetrics.slice(0, 3).map((metric) => (
            <div key={metric.label} style={{ background: 'var(--att-surface)', border: '1px solid var(--att-border)', borderRadius: 8, padding: 14 }}>
              <span style={{ color: 'var(--att-text-muted)', fontSize: 11, fontWeight: 800 }}>{metric.label}</span>
              <strong style={{ display: 'block', fontSize: 22, marginTop: 4 }}>{metric.value}</strong>
              <p style={{ color: 'var(--att-text-subtle)', fontSize: 11, margin: '4px 0 0' }}>{metric.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}

export function LoginWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="경영주은 웹에서 매장을 관리하고, 직원은 모바일에서 출퇴근과 스케줄을 확인합니다."
      heroTitle="다시 만나서 반가워요"
      theme={theme}
      title="09 · 로그인 (웹)"
    >
      <FormPanel
        footer={
          <>
            <button className="att-button att-button--secondary" type="button">
              <MessageCircle size={15} /> 카카오로 로그인
            </button>
            <button className="att-button" type="button">로그인</button>
          </>
        }
        title="계정 로그인"
      >
        <Field focus label="이메일" value={owner.email} />
        <Field label="비밀번호" value="••••••••" />
        <ActionCard caption="로그인이 안 되면 이메일 인증과 비밀번호를 확인하세요." icon={<ShieldCheck size={16} />} title="보안 안내" />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function PasswordResetWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="가입한 이메일로 인증 코드를 받고 새 비밀번호를 설정합니다."
      heroTitle="비밀번호를 다시 설정하세요"
      theme={theme}
      title="10 · 비밀번호 찾기 (웹)"
    >
      <FormPanel
        footer={
          <>
            <button className="att-button att-button--secondary" type="button">로그인으로</button>
            <button className="att-button" type="button"><Send size={15} /> 인증 메일 보내기</button>
          </>
        }
        title="이메일 인증"
      >
        <Field focus label="이메일" value={owner.email} />
        <Field label="인증 코드" value="7K3-82X" />
        <ActionCard caption="5분 안에 입력해야 합니다." icon={<KeyRound size={16} />} title="인증 코드 유효 시간" />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function RoleSelectWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="역할은 나중에 추가할 수 있고, 경영주과 직원 화면을 모두 사용할 수도 있습니다."
      heroTitle="어떻게 시작할까요?"
      theme={theme}
      title="03-B · 역할 선택 (웹)"
    >
      <FormPanel
        footer={<button className="att-button att-button--full" type="button">다음</button>}
        title="역할 선택"
      >
        <ListItem caption="매장을 등록하고 직원·급여·스케줄을 관리합니다." icon={<Store size={16} />} right={<StatusBadge tone="primary">선택</StatusBadge>} title="경영주으로 시작" />
        <ListItem caption="초대받은 매장에 합류해 근무를 관리합니다." icon={<User size={16} />} title="직원으로 시작" />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function StoreRegisterWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="매장 기본 정보를 등록하면 영업시간 설정과 직원 초대로 이어집니다."
      heroTitle="첫 매장을 등록하세요"
      theme={theme}
      title="04-C · 매장 등록 1/3 (웹)"
    >
      <FormPanel
        footer={<button className="att-button att-button--full" type="button">영업시간 설정</button>}
        title="매장 기본 정보"
      >
        <Field focus label="매장 이름" value={store.name} />
        <Field label="업종" value="편의점" />
        <Field label="주소" value={store.address} />
        <ActionCard
          caption="GPS, QR, Wi-Fi는 나중에 매장 설정에서 추가할 수 있어요."
          icon={<CheckCircle2 size={16} />}
          right={<StatusBadge tone="primary">기본</StatusBadge>}
          title="출퇴근은 버튼 태그로 기본 등록"
        />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function StoreRegisterStep2Web({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="영업시간과 휴게시간을 매장 운영 방식에 맞춥니다."
      heroTitle="운영 기준을 정하세요"
      theme={theme}
      title="04-D · 매장 등록 2/3 (웹)"
    >
      <FormPanel
        footer={<button className="att-button att-button--full" type="button">직원 초대하기</button>}
        title="영업시간 설정"
      >
        <Field label="영업시간" value="24시간" />
        <Field focus label="영업 요일" value="월-일" />
        <Field label="휴게시간 기본값" value="1시간" />
        <ActionCard
          caption="GPS, QR, Wi-Fi는 나중에 매장 설정에서 추가할 수 있어요."
          icon={<ShieldCheck size={16} />}
          right={<StatusBadge tone="primary">기본</StatusBadge>}
          title="출퇴근은 버튼 태그로 기본 등록"
        />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function StaffInviteWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="직원에게 초대 링크 또는 매장 코드를 보내면 직원 앱에서 바로 합류합니다."
      heroTitle="직원을 초대하세요"
      theme={theme}
      title="05-B · 직원 초대 (웹)"
    >
      <FormPanel
        footer={<button className="att-button att-button--full" type="button"><Send size={15} /> 초대 링크 보내기</button>}
        title="초대 정보"
      >
        <section className="att-code-card">
          <div className="att-code-card__label">매장 초대 코드</div>
          <div className="att-code-card__code att-mono">7K3-82X</div>
        </section>
        <Field label="전화번호로 직접 초대" value="010-0000-0000" />
        <ActionCard caption="카카오톡, 문자, 이메일 중 선택할 수 있습니다." icon={<Mail size={16} />} title="초대 채널" />
      </FormPanel>
    </AuthWebLayout>
  );
}

export function StaffJoinWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <AuthWebLayout
      heroCopy="초대 코드가 확인되면 매장 정보와 근무 조건을 확인한 뒤 합류합니다."
      heroTitle="매장 코드로 합류하세요"
      theme={theme}
      title="07-B · 직원 코드 입력 (웹)"
    >
      <FormPanel
        footer={<button className="att-button att-button--full" type="button">매장 합류하기</button>}
        title="초대 코드 입력"
      >
        <div className="att-code-grid">
          {['7', 'K', '3', '8', '2', 'X'].map((char) => (
            <div className="att-code-cell att-code-cell--filled" key={char}>{char}</div>
          ))}
        </div>
        <ActionCard caption="GS25 강남역점 · 김성호 경영주" icon={<Store size={16} />} right={<StatusBadge tone="success">확인됨</StatusBadge>} title="초대된 매장" />
      </FormPanel>
    </AuthWebLayout>
  );
}

function getNotificationCategoryIcon(category: NotificationCategory) {
  switch (category) {
    case 'COMMENT':
      return <MessageCircle size={16} />;
    case 'NOTICE':
      return <Bell size={16} />;
    case 'DIRECT_MESSAGE':
      return <Mail size={16} />;
    case 'INVITATION':
      return <Send size={16} />;
    case 'SALARY_BILL_PUBLISHED':
      return <ReceiptText size={16} />;
    case 'SCHEDULE_CHANGE_REQUEST':
    case 'SCHEDULE_UPDATE':
      return <CalendarDays size={16} />;
    case 'ATTENDANCE':
      return <CheckCircle2 size={16} />;
    case 'ALARM':
      return <Clock3 size={16} />;
  }
}

export function EmployeeNotificationMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const notifications = buildNotificationRows(employeeNotificationPushes, employeeNotificationUserId);
  const unreadCount = notifications.filter((item) => item.readStateLabel === '새 알림').length;
  const readCount = notifications.length - unreadCount;

  return (
    <EmployeeMobileShell activeTab="home" theme={theme} title="M10 · 알림 (모바일)">
      <MobileHeader back right={<button className="att-button att-button--ghost" type="button">모두 읽음</button>} title="알림" />
      <main className="att-mobile-content">
        <div aria-label="알림 필터" className="att-notification-filter-row">
          <span className="att-chip att-chip--primary">전체 {notifications.length}</span>
          <span className="att-chip">새 알림 {unreadCount}</span>
          <span className="att-chip">읽음 {readCount}</span>
        </div>
        <div className="att-stack att-notification-list">
          {notifications.map((item) => (
            <article
              className={`att-notification-card${item.readStateLabel === '새 알림' ? ' att-notification-card--unread' : ''}`}
              key={item.notificationId}
            >
              <div className={`att-notification-card__icon att-notification-card__icon--${item.categoryTone}`}>
                {getNotificationCategoryIcon(item.category)}
              </div>
              <div className="att-notification-card__body">
                <div className="att-notification-card__top">
                  <span>{item.categoryLabel}</span>
                  <StatusBadge tone={item.readStateTone}>{item.readStateLabel}</StatusBadge>
                </div>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <div className="att-notification-card__meta">
                  <span>{item.senderLabel}</span>
                  <span>{item.createdAtLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </EmployeeMobileShell>
  );
}

export function OwnerProfileEditMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerMobileShell activeTab="me" theme={theme} title="OM8 · 프로필 수정 (사장 모바일)">
      <MobileHeader back title="프로필 수정" />
      <main className="att-mobile-content">
        <div className="att-stack att-stack--loose">
          <div style={{ display: 'grid', justifyItems: 'center', gap: 10 }}>
            <div style={{ display: 'grid', height: 72, placeItems: 'center', width: 72, borderRadius: 36, background: 'var(--att-primary)', color: 'var(--att-primary-text)', fontSize: 28, fontWeight: 900 }}>
              김
            </div>
            <button className="att-button att-button--secondary" type="button"><Camera size={14} /> 사진 변경</button>
          </div>
          <Field focus label="이름" value={owner.name} />
          <Field label="이메일" value={owner.email} />
          <Field label="전화번호" value={owner.phone} />
          <button className="att-button att-button--full" type="button">저장</button>
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function OwnerNotificationMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const groups = [
    ['박지훈 지각 보고 접수', 'GS25 강남역점 · 예상 도착 9:20', '방금', 'danger'],
    ['스케줄 교환 승인 요청', '이민지 ↔ 박지훈 · 금요일 오전', '32분 전', 'primary'],
    ['5월 급여 발행 완료', '8명 발행 · 총 8,432,000원', '오전 10:02', 'success'],
  ] as const;
  return (
    <OwnerMobileShell activeTab="home" theme={theme} title="OM9 · 알림 (사장 모바일)">
      <MobileHeader back right={<button className="att-button att-button--ghost" type="button">모두 읽음</button>} title="알림" />
      <main className="att-mobile-content">
        <div className="att-stack">
          {groups.map(([title, caption, time, tone]) => (
            <ActionCard
              caption={`${caption} · ${time}`}
              icon={<Bell size={16} />}
              key={title}
              right={<StatusBadge tone={tone}>{tone === 'danger' ? '확인필요' : '알림'}</StatusBadge>}
              title={title}
            />
          ))}
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function OwnerStatsMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerMobileShell activeTab="home" theme={theme} title="OM11 · 통계 리포트 (사장 모바일)">
      <MobileHeader subtitle="주간 인건비 · 출근율 · 매장별 현황" title="통계 리포트" />
      <main className="att-mobile-content">
        <div className="att-stack att-stack--loose">
          <MetricCard caption="전주 대비 +12h" icon={<LineChart size={16} />} label="이번 주 근무" value="286h" />
          <MetricCard caption="지각 1 · 결근 0" icon={<CheckCircle2 size={16} />} label="출근율" value="97%" />
          <div className="att-card-section">
            <h2 className="att-section-title">매장별 인건비</h2>
            {attendanceStores.map((item, index) => (
              <DetailRow key={item.id} label={item.name} value={`${[284, 192, 164][index]}만원`} />
            ))}
          </div>
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function OwnerTaxationMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerMobileShell activeTab="me" theme={theme} title="OM12 · 세무사 연결 (사장 모바일)">
      <MobileHeader subtitle="급여·4대보험·원천세 자료 공유" title="세무사 연결" />
      <main className="att-mobile-content">
        <div className="att-stack att-stack--loose">
          <ActionCard caption="김세무 세무회계 · 자료 공유중" icon={<Landmark size={16} />} right={<StatusBadge tone="success">연결됨</StatusBadge>} title="담당 세무사" />
          <ActionCard caption="급여대장, 원천세 신고자료, 4대보험 내역" icon={<Upload size={16} />} title="이번 달 공유 자료" />
          <button className="att-button att-button--full" type="button">자료 보내기</button>
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function OwnerLaborMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerMobileShell activeTab="salary" theme={theme} title="OM13 · 근로계약서 (사장 모바일)">
      <MobileHeader right={<button className="att-button" type="button"><Plus size={14} /> 작성</button>} title="근로계약서" />
      <main className="att-mobile-content">
        <div className="att-stack">
          {attendanceContracts.map((contract) => (
            <ActionCard
              caption={`${contract.period} · ${contract.wage}`}
              icon={<FileText size={16} />}
              key={contract.id}
              right={<StatusBadge tone={contract.status === '서명완료' ? 'success' : 'neutral'}>{contract.status}</StatusBadge>}
              title={contract.store}
            />
          ))}
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function OwnerPaymentMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerMobileShell activeTab="me" theme={theme} title="OM14 · 결제·구독 (사장 모바일)">
      <MobileHeader subtitle="현재 Pro 플랜 사용중" title="결제·구독" />
      <main className="att-mobile-content">
        <div className="att-stack att-stack--loose">
          {attendancePlans.map((plan) => (
            <ActionCard
              caption={`${plan.stores} · ${plan.staff}`}
              icon={<CreditCard size={16} />}
              key={plan.id}
              right={plan.id === 'pro' ? <StatusBadge tone="primary">현재</StatusBadge> : <StatusBadge>변경</StatusBadge>}
              title={`${plan.name} · ${plan.price}`}
            />
          ))}
          <ActionCard caption="다음 결제일 2026.06.01" icon={<ReceiptText size={16} />} title="정기결제 안내" />
        </div>
      </main>
    </OwnerMobileShell>
  );
}

export function EmployeeNotificationWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell activeId="home" subtitle="근무, 스케줄, 메모 알림을 모아봅니다." theme={theme} title="알림">
      <div className="att-stack att-stack--loose" style={{ maxWidth: 760 }}>
        {[
          ['오늘 14:00 근무 시작 예정', `${store.name} · 1시간 전`, 'primary'],
          ['새 메모가 등록되었습니다', '3번 냉장고 온도 체크 요청', 'warning'],
          ['계약서 서명 완료본 저장됨', '계약서_GS25강남역점_2026.pdf', 'success'],
        ].map(([title, caption, tone]) => (
          <ActionCard icon={<Bell size={16} />} key={title} right={<StatusBadge tone={tone as StatusTone}>알림</StatusBadge>} title={title} caption={caption} />
        ))}
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeLateReportWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell activeId="schedule" subtitle="지각·결근 사유를 남기고 경영주에게 알립니다." theme={theme} title="지각·결근 보고">
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <FormPanel
          footer={
            <>
              <button className="att-button att-button--secondary" type="button">취소</button>
              <button className="att-button" type="button"><Send size={15} /> 보고하기</button>
            </>
          }
          title="보고 내용"
        >
          <Field focus label="근무일" value="2026.04.29 · 09:00-18:00" />
          <Field label="구분" value="지각 예정" />
          <Field label="예상 도착" value="09:20" />
          <Field label="사유" tall value="지하철 지연으로 20분 정도 늦을 예정입니다." />
        </FormPanel>
        <FormPanel title="안내">
          <ActionCard caption="보고 즉시 경영주에게 푸시 알림이 전송됩니다." icon={<AlertTriangle size={16} />} title="자동 알림" />
          <ActionCard caption="증빙 사진을 함께 남길 수 있습니다." icon={<Camera size={16} />} title="사진 첨부" />
        </FormPanel>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeMemoCreateWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell activeId="memo" subtitle="다음 근무자에게 공유할 내용을 작성합니다." theme={theme} title="메모·게시글 작성">
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <FormPanel
          footer={
            <>
              <button className="att-button att-button--secondary" type="button">임시저장</button>
              <button className="att-button" type="button"><Send size={15} /> 게시하기</button>
            </>
          }
          title="새 메모"
        >
          <Field label="분류" value="이슈" />
          <Field focus label="제목" value="3번 냉장고 온도 불안정" />
          <Field label="내용" tall value="새벽부터 8도 위로 올라갔습니다. 기사님 방문 전까지 유제품 체크 부탁드립니다." />
        </FormPanel>
        <FormPanel title="공개 범위">
          <ActionCard caption={store.name} icon={<Store size={16} />} title="매장 전체" />
          <ActionCard caption="댓글과 읽음 확인을 받을 수 있습니다." icon={<MessageCircle size={16} />} title="피드백" />
        </FormPanel>
      </div>
    </EmployeeWebShell>
  );
}

export function EmployeeContractDetailWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <EmployeeWebShell
      activeId="contract"
      right={
        <>
          <button className="att-button att-button--secondary" type="button"><Download size={15} /> PDF 다운로드</button>
          <StatusBadge tone="success">서명 완료</StatusBadge>
        </>
      }
      subtitle={`${store.name} · 2026.01.01 - 2026.12.31`}
      theme={theme}
      title="근로계약서 상세"
    >
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <DocumentPreview items={contractItems} signedDate="2026.01.01" subtitle="표준근로계약서 (기간제 근로자용)" />
        <FormPanel title="계약 정보">
          <DetailRow label="매장" value={store.name} />
          <DetailRow label="시급" value="10,030원/h" />
          <DetailRow label="근무 요일" value="월·수·금·토" />
          <DetailRow label="파일" value={attendanceContracts[0].file} />
          <ActionCard caption="내용이 실제와 다르면 경영주께 문의하세요." icon={<MessageCircle size={16} />} title="문의하기" />
        </FormPanel>
      </div>
    </EmployeeWebShell>
  );
}

export function OwnerScheduleEditWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell activeId="schedule" subtitle="기존 근무를 수정하고 직원에게 변경 알림을 보냅니다." theme={theme} title="근무 수정">
      <div style={{ margin: '0 auto', maxWidth: 760 }}>
        <FormPanel
          footer={
            <>
              <button className="att-button att-button--secondary" type="button">삭제</button>
              <button className="att-button" type="button">변경 저장</button>
            </>
          }
          title="근무 정보"
        >
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            <Field focus label="직원" value={attendanceEmployees[0].name} />
            <Field label="매장" value={store.name} />
            <Field label="근무일" value="2026-04-29" />
            <Field label="시간" value="09:00-18:00" />
          </div>
          <Field label="변경 메모" tall value="오픈 근무 시작 시간을 30분 앞당깁니다." />
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerStaffEditWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell activeId="staff" subtitle="직원 정보, 시급, 근무 매장을 수정합니다." theme={theme} title="직원 정보 수정">
      <div style={{ margin: '0 auto', maxWidth: 820 }}>
        <FormPanel
          footer={
            <>
              <button className="att-button att-button--secondary" type="button">퇴직 처리</button>
              <button className="att-button" type="button">저장</button>
            </>
          }
          title="직원 기본 정보"
        >
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            <Field focus label="이름" value={attendanceEmployees[0].name} />
            <Field label="전화번호" value={attendanceEmployees[0].phone} />
            <Field label="이메일" value="jiwoo@example.com" />
            <Field label="시급" value="10,030원" />
            <Field label="근무 매장" value={store.name} />
            <Field label="역할" value="오픈" />
          </div>
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerNotificationWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell activeId="dashboard" subtitle="매장 운영 알림을 중요도별로 확인합니다." theme={theme} title="알림">
      <div className="att-stack att-stack--loose" style={{ maxWidth: 840 }}>
        {[
          ['박지훈 지각 보고 접수', '예상 도착 09:20 · GS25 강남역점', 'danger'],
          ['스케줄 교환 승인 요청', '이민지 ↔ 박지훈 · 금요일 오전', 'primary'],
          ['근로계약서 서명 완료', '최지우 · 계약서_GS25강남역점_2026.pdf', 'success'],
        ].map(([title, caption, tone]) => (
          <ActionCard icon={<Bell size={16} />} key={title} right={<StatusBadge tone={tone as StatusTone}>확인</StatusBadge>} title={title} caption={caption} />
        ))}
      </div>
    </OwnerWebShell>
  );
}

export function OwnerProfileWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <OwnerWebShell activeId="profile" subtitle="로그인 계정, 알림, 보안 설정을 관리합니다." theme={theme} title="내 계정·프로필">
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <FormPanel title="기본 정보">
          <Field focus label="이름" value={owner.name} />
          <Field label="이메일" value={owner.email} />
          <Field label="전화번호" value={owner.phone} />
          <button className="att-button" type="button">프로필 저장</button>
        </FormPanel>
        <FormPanel title="보안">
          <ActionCard caption="마지막 로그인 2026.05.29 17:30" icon={<ShieldCheck size={16} />} title="2단계 인증" />
          <ActionCard caption="카카오, 구글 계정 연동" icon={<KeyRound size={16} />} title="소셜 로그인" />
        </FormPanel>
      </div>
    </OwnerWebShell>
  );
}

export function OwnerTodoWeb({ theme = 'calm' }: AttendanceScreenProps) {
  const rows = [
    ['오픈 체크리스트', '공통', '2 / 3 완료', 'warning'],
    ['냉장고 온도 확인', '최지우', '완료', 'success'],
    ['행사 매대 정리', '전체', '내일', 'primary'],
  ] as const;
  return (
    <OwnerWebShell activeId="todo" subtitle="매장별 할 일을 만들고 완료 상태를 추적합니다." theme={theme} title="할 일 관리">
      <div className="att-section-heading">
        <PageActions>
          <button className="att-button att-button--secondary" type="button"><Search size={15} /> 검색</button>
          <button className="att-button" type="button"><Plus size={15} /> 할 일 추가</button>
        </PageActions>
      </div>
      <div className="att-card-section">
        {rows.map(([title, ownerName, caption, tone]) => (
          <ActionCard icon={<ClipboardList size={16} />} key={title} right={<StatusBadge tone={tone}>{caption}</StatusBadge>} title={title} caption={`담당 ${ownerName}`} />
        ))}
      </div>
    </OwnerWebShell>
  );
}
