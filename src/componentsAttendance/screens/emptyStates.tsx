import {
  CalendarDays,
  Clock3,
  Home,
  KeyRound,
  Plus,
  Store,
  User,
  Users,
  WalletCards,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { MobileFrame, WebFrame } from '../components/Frame';
import {
  MobileTabBar,
  OwnerTabBar,
  WebAppShell,
  type NavItem,
} from '../components/Navigation';
import type { AttendanceScreenProps } from './screenTypes';

const ownerTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
  { id: 'stores', label: '매장', icon: <Store size={18} /> },
  { id: 'me', label: '나', icon: <User size={18} /> },
];

const employeeTabs: NavItem[] = [
  { id: 'home', label: '홈', icon: <Home size={18} /> },
  { id: 'punch', label: '출퇴근', icon: <Clock3 size={18} /> },
  { id: 'schedule', label: '스케줄', icon: <CalendarDays size={18} /> },
  { id: 'todo', label: '할 일', icon: <KeyRound size={18} /> },
  { id: 'salary', label: '급여', icon: <WalletCards size={18} /> },
];

const ownerWebNavItems: NavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: <Home size={17} /> },
  { id: 'schedule', label: '스케줄 편성', icon: <CalendarDays size={17} /> },
  { id: 'payroll', label: '급여 관리', icon: <WalletCards size={17} /> },
  { id: 'staff', label: '직원 관리', icon: <Users size={17} /> },
];

export function EmptyOwnerMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="E1 · 사장님 홈 (매장 없음)" width={402}>
      <div className="att-mobile-screen">
        <header className="att-empty-mobile-header">
          <div>
            <p>사장님</p>
            <h1>김성호 님</h1>
          </div>
          <div className="att-empty-avatar" aria-hidden="true">
            <User size={20} />
          </div>
        </header>
        <main className="att-empty-mobile-main">
          <EmptyState
            action={
              <button className="att-button att-button--full" type="button">
                <Plus size={16} />
                첫 매장 등록하기
              </button>
            }
            description={
              <>
                매장을 등록하면 직원의 출퇴근, 스케줄, 급여를 한 곳에서 관리할 수
                있어요.
              </>
            }
            icon={<Store size={28} />}
            title="아직 등록된 매장이 없어요"
          />
        </main>
        <OwnerTabBar activeId="home" items={ownerTabs} />
      </div>
    </MobileFrame>
  );
}

export function EmptyEmployeeMobile({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <MobileFrame height={874} theme={theme} title="E2 · 직원 홈 (근무 없음)" width={402}>
      <div className="att-mobile-screen">
        <main className="att-mobile-content" tabIndex={0}>
          <header className="att-empty-mobile-header att-empty-mobile-header--flush">
            <div>
              <p>2026년 4월 21일 화요일</p>
              <h1>안녕하세요, 민준 님</h1>
            </div>
            <div className="att-empty-avatar" aria-hidden="true">
              <User size={20} />
            </div>
          </header>
          <EmptyState
            description={
              <>
                사장님이 스케줄을 등록하면 여기에 표시됩니다.
              </>
            }
            icon={<CalendarDays size={26} />}
            title="아직 배정된 근무가 없어요"
          />
          <section className="att-empty-join-card">
            <strong>매장에 합류하셨나요?</strong>
            <p>사장님한테 받은 코드를 입력하면 바로 연결돼요.</p>
            <button className="att-button att-button--full" type="button">
              <KeyRound size={15} />
              매장 코드 입력하기
            </button>
          </section>
        </main>
        <MobileTabBar activeId="home" items={employeeTabs} />
      </div>
    </MobileFrame>
  );
}

export function EmptyOwnerWeb({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <WebFrame height={800} theme={theme} title="E3 · 사장님 웹 대시보드 (직원 없음)" width={1280}>
      <WebAppShell
        activeId="dashboard"
        navItems={ownerWebNavItems}
        navTitle="근태관리"
        right={
          <button className="att-button" type="button">
            <Plus size={15} />
            직원 초대
          </button>
        }
        subtitle="오늘의 근태와 매장 현황을 한 눈에 확인하세요"
        title="대시보드"
      >
        <div className="att-empty-web-panel">
          <EmptyState
            action={
              <div className="att-empty-action-row">
                <button className="att-button" type="button">
                  <Plus size={15} />
                  직원 초대하기
                </button>
                <button className="att-button att-button--secondary" type="button">
                  초대 코드 보기
                </button>
              </div>
            }
            description={
              <>
                직원이 등록되면 실시간 출퇴근 현황, 스케줄, 급여 정산까지 이
                대시보드에서 한번에 관리할 수 있어요.
              </>
            }
            icon={<Users size={34} />}
            title="직원을 초대해보세요"
          />
        </div>
      </WebAppShell>
    </WebFrame>
  );
}
