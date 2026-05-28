import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  KeyRound,
  MapPin,
  MessageCircle,
  MoreVertical,
  Plus,
  QrCode,
  Send,
  ShieldCheck,
  Store,
  User,
  Users,
  Wifi,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { ActionCard } from '../components/ActionCard';
import { FormPanel } from '../components/FormPanel';
import { MobileFrame, WebFrame } from '../components/Frame';
import { MetricCard } from '../components/MetricCard';
import { WebAppShell, type NavItem } from '../components/Navigation';
import { StatusBadge } from '../components/StatusBadge';
import {
  attendanceEmployees,
  attendancePlans,
  attendanceStores,
} from '../data/attendanceSampleData';
import type { AttendanceScreenProps } from './screenTypes';

const ownerNavItems: NavItem[] = [
  { id: 'stores', label: '매장 관리', icon: <Store size={16} /> },
  { id: 'staff', label: '직원 관리', icon: <Users size={16} /> },
  { id: 'payroll', label: '급여 설정', icon: <CreditCard size={16} /> },
  { id: 'auth', label: '출퇴근 인증', icon: <ShieldCheck size={16} /> },
];

const authMethods = [
  {
    icon: <CheckCircle2 size={18} />,
    title: '버튼 태그',
    caption: '가장 간단. 직원이 앱에서 버튼만 누름',
    selected: true,
  },
  {
    icon: <MapPin size={18} />,
    title: 'GPS 위치',
    caption: '매장 반경 50m 이내에서만 가능',
  },
  { icon: <QrCode size={18} />, title: 'QR 코드', caption: '매장에 붙인 QR을 스캔' },
  {
    icon: <Wifi size={18} />,
    title: 'Wi-Fi SSID',
    caption: '매장 Wi-Fi에 연결된 상태에서만 가능',
  },
];

const storeCards = [
  {
    name: attendanceStores[0].name,
    type: '편의점',
    address: '서울 강남구 강남대로 396',
    staff: '4명',
    auth: '버튼 태그',
    open: '24시간',
  },
  {
    name: 'GS25 역삼점',
    type: '편의점',
    address: '서울 강남구 역삼로 234',
    staff: '3명',
    auth: 'GPS · 50m',
    open: '24시간',
  },
  {
    name: attendanceStores[1].name,
    type: '카페',
    address: '서울 강남구 선릉로 456',
    staff: '5명',
    auth: 'QR 코드',
    open: '07:00-23:00',
  },
];

function BrandMark({ small = false }: { small?: boolean }) {
  return <div className={`att-logo-mark${small ? ' att-logo-mark--small' : ''}`}>근</div>;
}

function BackHeader({ children }: { children: string }) {
  return (
    <header className="att-mobile-header">
      <ArrowLeft size={22} />
      <span>{children}</span>
    </header>
  );
}

function Field({
  label,
  value,
  focus = false,
  mono = false,
  hint,
}: {
  label: string;
  value: string;
  focus?: boolean;
  mono?: boolean;
  hint?: string;
}) {
  return (
    <div className="att-field">
      <span className="att-field__label">{label}</span>
      <div
        className={`att-field__value${focus ? ' att-field__value--focus' : ''}${
          mono ? ' att-mono' : ''
        }`}
      >
        {value}
      </div>
      {hint ? <p className="att-field__hint">{hint}</p> : null}
    </div>
  );
}

function RoleCard({
  icon,
  title,
  body,
  selected = false,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  selected?: boolean;
}) {
  return (
    <div className={`att-choice-card${selected ? ' att-choice-card--selected' : ''}`}>
      <span className="att-choice-card__icon">{icon}</span>
      <span className="att-choice-card__body">
        <strong>{title}</strong>
        <span>{body}</span>
      </span>
      <span className={`att-check-dot${selected ? ' att-check-dot--selected' : ''}`} />
    </div>
  );
}

function MobilePrimaryTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <header style={{ marginBottom: 24 }}>
      {eyebrow ? <div className="att-field__label">{eyebrow}</div> : null}
      <h1 className="att-mobile-title">{title}</h1>
      {copy ? <p className="att-copy">{copy}</p> : null}
    </header>
  );
}

function BottomActions({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: string;
}) {
  return (
    <footer className="att-bottom-actions">
      {secondary ? (
        <button className="att-button att-button--secondary att-button--full" type="button">
          {secondary}
        </button>
      ) : null}
      <button className="att-button att-button--full" type="button">
        {primary}
      </button>
    </footer>
  );
}

export function OwnerSignupWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <WebFrame height={800} theme={theme} title="01 · 사장님 회원가입 (웹)" width={1280}>
      <div className="att-web-split">
        <section className="att-web-hero">
          <div className="att-brand-row">
            <BrandMark small />
            <span>근태관리</span>
          </div>
          <div className="att-web-hero__inner" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <h1 className="att-web-title">
              사장님의 하루가
              <br />더 단순해집니다.
            </h1>
            <p className="att-copy" style={{ fontSize: 14, marginTop: 16 }}>
              매장 여러 개, 직원 여러 명, 급여·주휴수당·4대보험까지. 전부 자동으로
              계산하고 한 곳에서 관리하세요.
            </p>
            <div className="att-feature-list">
              {[
                ['실시간 출퇴근 현황', '버튼 태그 · GPS · QR · Wi-Fi 중 선택'],
                ['자동 급여 계산', '연장·야간·주말수당 + 4대보험·세금'],
                ['인수인계 & 메모 공유', '이슈·공지·체크리스트를 한 자리에'],
              ].map(([title, caption]) => (
                <div className="att-feature-list__item" key={title}>
                  <span className="att-feature-list__icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <span>{caption}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="att-field__hint">© 2026 근태관리 · 소상공인을 위한 근태·급여 플랫폼</p>
        </section>
        <section className="att-web-form">
          <div className="att-web-form__inner">
            <p className="att-copy">
              이미 계정이 있다면 <strong style={{ color: 'var(--att-primary)' }}>로그인</strong>
            </p>
            <FormPanel
              description="기본 계정 정보를 입력하면 바로 매장 등록으로 이어집니다."
              footer={
                <>
                  <button className="att-button att-button--secondary" type="button">
                    카카오로 빠르게 시작하기
                  </button>
                  <button className="att-button" type="button">
                    계정 만들기
                  </button>
                </>
              }
              title="30초 만에 시작하기"
            >
              <Field label="이름" value="김성호" />
              <Field label="전화번호" mono value="010-1234-5678" />
              <Field label="이메일" value="kimceo@example.com" />
              <Field focus label="비밀번호" value="••••••••" />
              <ActionCard
                caption="서비스 알림 수신과 개인정보처리방침에 동의합니다."
                icon={<Check size={16} />}
                title="이용약관 전체 동의"
              />
            </FormPanel>
          </div>
        </section>
      </div>
    </WebFrame>
  );
}

export function LoginMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="02 · 로그인 (모바일)" width={402}>
      <main className="att-mobile-content att-mobile-content--centered">
        <BrandMark />
        <MobilePrimaryTitle
          copy="계정 정보를 입력하고 로그인하세요"
          title="다시 만나서 반가워요"
        />
        <div className="att-stack" style={{ marginBottom: 18 }}>
          <button className="att-button att-button--kakao att-button--full" type="button">
            <MessageCircle size={18} /> 카카오로 로그인
          </button>
          <button className="att-button att-button--icon att-button--full" type="button">
            <strong>G</strong> 구글로 로그인
          </button>
        </div>
        <div className="att-divider" style={{ marginBottom: 18 }}>
          또는
        </div>
        <div className="att-stack">
          <Field label="전화번호" mono value="010-1234-5678" />
          <Field focus label="비밀번호" value="••••••••" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0 18px' }}>
          <button className="att-button att-button--ghost" type="button">
            비밀번호 찾기
          </button>
        </div>
        <button className="att-button att-button--full" type="button">
          로그인
        </button>
        <p className="att-copy" style={{ textAlign: 'center', marginTop: 18 }}>
          처음이신가요? <strong style={{ color: 'var(--att-primary)' }}>회원가입</strong>
        </p>
      </main>
    </MobileFrame>
  );
}

export function RoleSelectMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="03 · 역할 선택" width={402}>
      <main className="att-mobile-content">
        <MobilePrimaryTitle
          copy="나중에 변경하거나 두 역할 모두 사용할 수 있어요."
          eyebrow="회원가입 · 2 / 4"
          title="어떻게 사용하실 건가요?"
        />
        <div className="att-choice-grid">
          <RoleCard
            body="매장을 등록하고 직원의 근무·급여를 관리합니다."
            icon={<Store size={22} />}
            selected
            title="사장님으로 시작"
          />
          <RoleCard
            body="초대받은 매장에 출근하고 스케줄을 확인합니다."
            icon={<User size={22} />}
            title="직원으로 시작"
          />
        </div>
      </main>
      <BottomActions primary="다음" />
    </MobileFrame>
  );
}

export function StoreRegisterMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="04 · 매장 등록" width={402}>
      <BackHeader>매장 등록 · 1 / 3</BackHeader>
      <main className="att-mobile-content">
        <h1 className="att-mobile-title att-mobile-title--compact" style={{ marginBottom: 24 }}>
          어떤 매장을 등록할까요?
        </h1>
        <div className="att-stack att-stack--loose">
          <Field focus label="매장 이름" value={attendanceStores[0].name} />
          <div className="att-field">
            <span className="att-field__label">업종</span>
            <div className="att-choice-grid att-choice-grid--two">
              {['편의점', '카페', '음식점', '기타'].map((kind) => (
                <div
                  className={`att-field__value${kind === '편의점' ? ' att-field__value--focus' : ''}`}
                  key={kind}
                  style={{
                    color: kind === '편의점' ? 'var(--att-primary)' : undefined,
                    textAlign: 'center',
                    fontWeight: 800,
                  }}
                >
                  {kind}
                </div>
              ))}
            </div>
          </div>
          <ActionCard
            caption="GPS 인증 시 이 좌표를 기준으로 반경을 설정합니다."
            icon={<MapPin size={16} />}
            title="서울 강남구 강남대로 396"
          />
          <ActionCard
            icon={<Clock3 size={16} />}
            right={<StatusBadge tone="success">ON</StatusBadge>}
            title="24시간 영업"
          />
          <div className="att-stack">
            <span className="att-field__label">출퇴근 인증 방식</span>
            {authMethods.map((method) => (
              <RoleCard
                body={method.caption}
                icon={method.icon}
                key={method.title}
                selected={method.selected}
                title={method.title}
              />
            ))}
          </div>
        </div>
      </main>
      <BottomActions primary="다음" secondary="이전" />
    </MobileFrame>
  );
}

export function StaffInviteMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="05 · 직원 초대" width={402}>
      <BackHeader>매장 등록 · 3 / 3</BackHeader>
      <main className="att-mobile-content">
        <MobilePrimaryTitle
          copy="나중에 언제든 추가할 수 있어요. 지금은 건너뛰어도 괜찮아요."
          title="직원을 초대해 보세요"
        />
        <section className="att-code-card" style={{ marginBottom: 20 }}>
          <div className="att-code-card__label">매장 초대 코드</div>
          <div className="att-code-card__code att-mono">7K3-82X</div>
          <p className="att-copy" style={{ color: 'var(--att-primary)' }}>
            직원이 앱에서 이 코드를 입력하면 바로 연결됩니다.
          </p>
        </section>
        <div className="att-bottom-actions" style={{ padding: 0, border: 0, marginBottom: 24 }}>
          <button className="att-button att-button--icon att-button--full" type="button">
            <Send size={14} /> 링크 공유
          </button>
          <button className="att-button att-button--icon att-button--full" type="button">
            <QrCode size={14} /> QR 코드
          </button>
        </div>
        <div className="att-stack">
          <Field label="전화번호로 직접 초대" mono value="010-0000-0000" />
          <span className="att-field__label">이미 초대된 직원</span>
          {[
            { name: attendanceEmployees[1].name, phone: '010-1234-5678', status: '수락' },
            { name: '이수빈', phone: '010-8765-4321', status: '대기' },
          ].map((person) => (
            <ActionCard
              caption={person.phone}
              icon={<User size={16} />}
              key={person.phone}
              right={
                <StatusBadge tone={person.status === '수락' ? 'success' : 'warning'}>
                  {person.status}
                </StatusBadge>
              }
              title={person.name}
            />
          ))}
        </div>
      </main>
      <BottomActions primary="시작하기" secondary="나중에" />
    </MobileFrame>
  );
}

export function StoreManageWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <WebFrame height={800} theme={theme} title="06 · 매장 관리 (웹)" width={1280}>
      <WebAppShell
        activeId="stores"
        navItems={ownerNavItems}
        navTitle="근태관리"
        right={
          <>
            <StatusBadge tone="primary">Pro 플랜</StatusBadge>
            <button className="att-button" type="button">
              <Plus size={15} /> 새 매장
            </button>
          </>
        }
        sidebarFooter={
          <ActionCard
            caption={`${attendancePlans[1].price} · ${attendancePlans[1].stores}`}
            title={attendancePlans[1].name}
          />
        }
        subtitle="매장별 출퇴근 인증, 급여 기준, 직원 수를 한 곳에서 관리합니다."
        title="매장 관리"
      >
        <div className="att-stack att-stack--loose">
          <div className="att-store-grid">
            {storeCards.map((store) => (
              <section className="att-store-card" key={store.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="att-action-card__icon">
                    <Store size={20} />
                  </span>
                  <MoreVertical color="var(--att-text-subtle)" size={16} />
                </div>
                <h2 className="att-section-title" style={{ fontSize: 16, marginTop: 14 }}>
                  {store.name}
                </h2>
                <p className="att-subtitle">
                  {store.type} · {store.open}
                </p>
                <p className="att-subtitle">
                  <MapPin size={12} /> {store.address}
                </p>
                <div className="att-bottom-actions" style={{ padding: '14px 0 0', border: 0 }}>
                  <MetricCard label="직원" value={store.staff} />
                  <MetricCard label="출퇴근 인증" value={store.auth} />
                </div>
              </section>
            ))}
            <section className="att-dashed-card">
              <div>
                <span className="att-action-card__icon" style={{ margin: '0 auto 10px' }}>
                  <Plus size={20} />
                </span>
                <strong>새 매장 등록</strong>
                <p className="att-subtitle">업종·주소·영업시간을 입력하면 바로 시작</p>
              </div>
            </section>
          </div>
          <FormPanel
            footer={
              <>
                <button className="att-button att-button--secondary" type="button">
                  변경 취소
                </button>
                <button className="att-button" type="button">
                  저장
                </button>
              </>
            }
            title="GS25 강남역점 · 매장 설정"
          >
            <div className="att-settings-grid">
              {[
                ['기본 시급', '11,500 원', '2026년 최저시급 기준'],
                ['야간수당 배율', 'x 1.5', '22:00-06:00 적용'],
                ['주말수당 배율', 'x 1.5', '토·일 근무 시 적용'],
                ['연장근무 기준', '일 8시간', '초과 시 1.5배 자동 계산'],
                ['휴게시간', '4시간 근무 시 30분', '자동 차감 · 직원이 변경 가능'],
                ['급여 지급일', '매월 10일', '휴일이면 전 영업일'],
              ].map(([label, value, caption]) => (
                <MetricCard caption={caption} key={label} label={label} value={value} />
              ))}
            </div>
          </FormPanel>
        </div>
      </WebAppShell>
    </WebFrame>
  );
}

export function StoreRegisterStep2Mobile({ theme = 'calm' }: AttendanceScreenProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const activeDays = new Set(['월', '화', '수', '목', '금']);

  return (
    <MobileFrame
      height={874}
      theme={theme}
      title="04-B · 매장 등록 2/3 (영업시간·인증)"
      width={402}
    >
      <BackHeader>매장 등록 · 2 / 3</BackHeader>
      <main className="att-mobile-content">
        <MobilePrimaryTitle title="영업 및 인증 설정" />
        <div className="att-stack att-stack--loose">
          <div className="att-field">
            <span className="att-field__label">영업 요일</span>
            <div className="att-code-grid">
              {days.map((day) => (
                <div
                  className={`att-code-cell${activeDays.has(day) ? ' att-code-cell--filled' : ''}`}
                  key={day}
                  style={{ height: 38 }}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="att-bottom-actions" style={{ padding: 0, border: 0 }}>
            <Field label="시작" mono value="09:00" />
            <Field focus label="종료" mono value="22:00" />
          </div>
          <RoleCard
            body="매장에 비치된 버튼을 누르면 출퇴근이 기록됩니다. 별도 앱 없이 태그 하나로 동작해요."
            icon={<CheckCircle2 size={22} />}
            selected
            title="버튼 태그"
          />
          <ActionCard
            caption="GPS 반경과 Wi-Fi 인증은 매장 설정에서 나중에 추가할 수 있어요."
            icon={<ShieldCheck size={16} />}
            title="직원 부정 출퇴근 방지"
          />
        </div>
      </main>
      <BottomActions primary="다음" secondary="이전" />
    </MobileFrame>
  );
}

export function StaffJoinMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const codeChars = ['G', 'S', '2', '5', '-', 'A', '4', 'K'];

  return (
    <MobileFrame height={874} theme={theme} title="07 · 직원 - 매장 코드 입력" width={402}>
      <BackHeader>직원 가입 · 3 / 4</BackHeader>
      <main className="att-mobile-content">
        <MobilePrimaryTitle
          copy="사장님한테 받은 8자리 코드를 입력하세요."
          title="매장 코드를 입력해주세요"
        />
        <div className="att-code-grid" style={{ marginBottom: 16 }}>
          {codeChars.map((char, index) => (
            <div
              className={`att-code-cell${index <= 4 ? ' att-code-cell--filled' : ''}`}
              key={`${char}-${index}`}
            >
              {char}
            </div>
          ))}
        </div>
        <ActionCard
          caption="편의점 · 서울 강남구 강남대로 396"
          icon={<Store size={18} />}
          right={<Check color="var(--att-success)" size={18} strokeWidth={2.5} />}
          title={attendanceStores[0].name}
        />
      </main>
      <BottomActions primary="이 매장에 합류하기" secondary="코드 없이 나중에 입력하기" />
    </MobileFrame>
  );
}

export function PasswordResetMobile({ theme = 'calm' }: AttendanceScreenProps) {
  const code = ['4', '8', '', '', '', ''];

  return (
    <MobileFrame height={874} theme={theme} title="08 · 비밀번호 찾기 (인증 단계)" width={402}>
      <main className="att-mobile-content att-mobile-content--centered">
        <BrandMark />
        <MobilePrimaryTitle
          copy="010-1234-5678 으로 6자리 코드를 보냈어요."
          eyebrow="비밀번호 찾기 · 2 / 3"
          title="인증 코드를 입력해주세요"
        />
        <div className="att-code-grid" style={{ marginBottom: 14 }}>
          {code.map((char, index) => (
            <div
              className={`att-code-cell${char ? ' att-code-cell--filled' : ''}`}
              key={`${char || 'blank'}-${index}`}
              style={{ height: 52, fontSize: 22 }}
            >
              {char}
            </div>
          ))}
        </div>
        <p className="att-copy" style={{ marginBottom: 28 }}>
          코드를 못 받으셨나요?{' '}
          <strong style={{ color: 'var(--att-primary)' }}>재전송 (55초)</strong>
        </p>
        <div className="att-stack">
          <button className="att-button att-button--full" type="button">
            <KeyRound size={16} /> 확인
          </button>
          <button className="att-button att-button--secondary att-button--full" type="button">
            로그인으로 돌아가기
          </button>
        </div>
      </main>
    </MobileFrame>
  );
}
