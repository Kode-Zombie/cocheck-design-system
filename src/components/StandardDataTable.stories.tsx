import type { Meta, StoryObj } from '@storybook/react-vite';
import { StandardDataTable } from './StandardDataTable';
import type { DataTableColumn, DataTableRow } from './StandardDataTable';

const rows: DataTableRow[] = [
  {
    id: 'A-104',
    name: 'TimeInput',
    owner: 'Mina',
    status: 'active',
    statusLabel: '활성',
    score: 92,
  },
  {
    id: 'A-205',
    name: 'SearchInput',
    owner: 'Joon',
    status: 'waiting',
    statusLabel: '대기',
    score: 77,
  },
  {
    id: 'A-318',
    name: 'StandardDataTable',
    owner: 'Alex',
    status: 'blocked',
    statusLabel: '차단',
    score: 64,
  },
];

const columns: DataTableColumn[] = [
  { key: 'id', header: 'ID', sortable: true, width: '96px' },
  { key: 'name', header: '컴포넌트', sortable: true },
  { key: 'owner', header: '담당자', sortable: true },
  {
    key: 'status',
    header: '상태',
    render: (row) => (
      <span className={`sb-status sb-status--${row.status}`}>
        {row.statusLabel}
      </span>
    ),
  },
  {
    key: 'score',
    header: '점수',
    align: 'right',
    sortable: true,
    sortValue: (row) => Number(row.score),
  },
];

const meta = {
  title: '컴포넌트/StandardDataTable',
  component: StandardDataTable,
  args: {
    caption: '컴포넌트 준비 상태',
    columns,
    rows,
    rowKey: (row: DataTableRow) => String(row.id),
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    rowKey: { control: false },
  },
} satisfies Meta<typeof StandardDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: '기본',
};

export const Empty: Story = {
  name: '빈 상태',
  args: {
    rows: [],
    emptyMessage: '아직 컴포넌트가 없습니다',
  },
};
