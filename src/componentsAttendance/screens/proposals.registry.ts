import { ProposalSummary } from './proposals';
import type { AttendanceScreen } from './screenTypes';

export const proposalScreens: AttendanceScreen[] = [
  { id: 'proposal-summary', label: '기능 제안 요약', group: '제안 기능', width: 720, height: 600, viewport: 'custom', Component: ProposalSummary },
];
