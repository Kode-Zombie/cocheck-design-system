export const attendanceStores = [
  { id: 'store-gs25', name: 'GS25 강남역점', address: '서울시 강남구 강남대로 123' },
  { id: 'store-cafe', name: '스타벅스 선릉', address: '서울시 강남구 테헤란로 456' },
  { id: 'store-bakery', name: '성수 베이커리', address: '서울시 성동구 연무장길 7' },
] as const;

export const attendanceEmployees = [
  { id: 'emp-jiwoo', name: '최지우', role: '오픈', phone: '010-1234-5678', status: '출근중' },
  { id: 'emp-mina', name: '박민아', role: '마감', phone: '010-9876-5432', status: '대기' },
  { id: 'emp-jun', name: '이준호', role: '주말', phone: '010-2222-3333', status: '휴무' },
] as const;

export const attendanceShifts = [
  { id: 'shift-1', employee: '최지우', store: 'GS25 강남역점', day: '월', time: '09:00-18:00', status: '확정' },
  { id: 'shift-2', employee: '박민아', store: 'GS25 강남역점', day: '수', time: '14:00-22:00', status: '교환요청' },
  { id: 'shift-3', employee: '이준호', store: '스타벅스 선릉', day: '토', time: '10:00-19:00', status: '확정' },
] as const;

export const attendanceTodos = [
  { id: 'todo-1', title: '냉장고 온도 확인', owner: '최지우', due: '오늘 11:00', done: false },
  { id: 'todo-2', title: '폐기 상품 체크', owner: '박민아', due: '오늘 18:00', done: true },
  { id: 'todo-3', title: '행사 매대 정리', owner: '전체', due: '내일', done: false },
] as const;

export const attendanceMemos = [
  { id: 'memo-1', title: '아침 입고 지연', author: '김성호', time: '09:12', comments: 3 },
  { id: 'memo-2', title: 'POS 영수증 용지 보충', author: '최지우', time: '13:40', comments: 1 },
  { id: 'memo-3', title: '주말 행사 안내', author: '박민아', time: '어제', comments: 5 },
] as const;

export const attendancePayrollRows = [
  { id: 'pay-1', employee: '최지우', hours: '142h', wage: '10,030원', amount: '1,424,260원', status: '확정' },
  { id: 'pay-2', employee: '박민아', hours: '96h', wage: '10,030원', amount: '962,880원', status: '검토' },
  { id: 'pay-3', employee: '이준호', hours: '64h', wage: '10,030원', amount: '641,920원', status: '확정' },
] as const;

export const attendanceContracts = [
  {
    id: 'contract-1',
    store: 'GS25 강남역점',
    period: '2026.01.01 - 2026.12.31',
    wage: '10,030원/h',
    status: '서명완료',
    signed: '2026.01.01',
    file: '계약서_GS25강남역점_2026.pdf',
  },
  {
    id: 'contract-2',
    store: '스타벅스 선릉',
    period: '2025.07.01 - 2025.12.31',
    wage: '9,860원/h',
    status: '만료',
    signed: '2025.07.01',
    file: '계약서_스타벅스선릉_2025.pdf',
  },
] as const;

export const attendanceEmployeeWorkplaces = [
  {
    id: 'workplace-gs25',
    store: 'GS25 강남역점',
    address: '서울시 강남구 강남대로 123',
    role: '오픈 타임',
    contractStatus: '서명완료',
    contractTone: 'success',
    contractPeriod: '2026.01.01 - 2026.12.31',
    wage: '10,030원/h',
    payAccount: '국민 ****1234',
    payday: '매월 25일',
    manager: '김성호 점장',
  },
  {
    id: 'workplace-cafe',
    store: '스타벅스 선릉',
    address: '서울시 강남구 테헤란로 456',
    role: '바리스타',
    contractStatus: '만료',
    contractTone: 'neutral',
    contractPeriod: '2025.07.01 - 2025.12.31',
    wage: '9,860원/h',
    payAccount: '신한 ****0908',
    payday: '매월 10일',
    manager: '이서연 매니저',
  },
] as const;

export const attendanceDashboardMetrics = [
  { label: '오늘 출근', value: '12명', caption: '지각 1명' },
  { label: '이번 주 근무', value: '286h', caption: '전주 대비 +12h' },
  { label: '급여 예상', value: '5,842,000원', caption: '3개 매장 합산' },
  { label: '대기 요청', value: '4건', caption: '교환 2 · 휴가 2' },
] as const;

export const attendancePlans = [
  { id: 'basic', name: 'Basic', price: '19,000원', stores: '1개 매장', staff: '직원 10명' },
  { id: 'pro', name: 'Pro', price: '39,000원', stores: '3개 매장', staff: '직원 50명' },
  { id: 'team', name: 'Team', price: '79,000원', stores: '무제한', staff: '무제한' },
] as const;
