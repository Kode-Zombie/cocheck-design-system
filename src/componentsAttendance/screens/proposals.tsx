import {
  ArrowRightLeft,
  BadgePercent,
  BellMinus,
  BriefcaseBusiness,
  CreditCard,
  FileSignature,
  MessageSquareText,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { getAttendanceThemeStyle } from '../attendance-theme';
import type { AttendanceScreenProps } from './screenTypes';

const proposalItems: Array<{
  title: string;
  body: string;
  icon: ReactNode;
  tone: string;
}> = [
  {
    title: '스케줄 교환 요청',
    body: '직원끼리 교대 제안을 보내고 사장님이 승인하면 근무표와 예상 인건비가 함께 갱신됩니다.',
    icon: <ArrowRightLeft size={20} />,
    tone: 'primary',
  },
  {
    title: '지각·결근 리포트',
    body: '출근 지연, 무단 결근, 퇴근 누락을 자동으로 모아 급여 정산 전에 확인할 수 있습니다.',
    icon: <BellMinus size={20} />,
    tone: 'warn',
  },
  {
    title: '메모·인수인계',
    body: '교대 전 확인해야 할 요청, 재고, 고객 이슈를 근무자와 매장 단위로 남깁니다.',
    icon: <MessageSquareText size={20} />,
    tone: 'success',
  },
  {
    title: '근로계약서',
    body: '근무 조건을 불러와 계약서를 만들고 서명 상태, PDF 보관, 재요청 흐름까지 관리합니다.',
    icon: <FileSignature size={20} />,
    tone: 'primary',
  },
  {
    title: '결제·구독 관리',
    body: '매장 수와 직원 수에 맞는 요금제를 보여주고 결제 수단, 영수증, 플랜 변경을 제공합니다.',
    icon: <CreditCard size={20} />,
    tone: 'neutral',
  },
  {
    title: '세무·노무 연결',
    body: '급여대장, 원천세, 4대보험 자료를 정리해 세무사나 노무사에게 전달하기 쉽게 만듭니다.',
    icon: <BadgePercent size={20} />,
    tone: 'success',
  },
];

export function ProposalSummary({ theme = 'calm' }: AttendanceScreenProps) {
  return (
    <section
      aria-label="기능 제안 요약"
      className="att-root att-proposal-board"
      style={getAttendanceThemeStyle(theme)}
    >
      <header className="att-proposal-board__header">
        <div>
          <span>Small business attendance suite</span>
          <h1>추가 기능 제안 요약</h1>
          <p>
            소규모 매장이 출퇴근 기록 이후 바로 필요로 하는 스케줄 조정, 노무 문서,
            급여·세무 흐름을 한 보드에 모았습니다.
          </p>
        </div>
        <div className="att-proposal-board__badge">
          <BriefcaseBusiness size={18} />
          운영 확장안
        </div>
      </header>
      <div className="att-proposal-grid">
        {proposalItems.map((item) => (
          <article className="att-proposal-card" data-tone={item.tone} key={item.title}>
            <div className="att-proposal-card__icon">{item.icon}</div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
