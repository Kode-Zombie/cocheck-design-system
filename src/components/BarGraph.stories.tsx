import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarGraph } from './BarGraph';

const meta = {
  title: '컴포넌트/BarGraph',
  component: BarGraph,
  args: {
    data: [
      { label: '비활성 1', value: 58, status: 'inactive' },
      { label: '진행중', value: 65, status: 'progress' },
      { label: '비활성 2', value: 86, status: 'inactive' },
      { label: '비활성 3', value: 50, status: 'inactive' },
      { label: '정보 없음 1', value: null, status: 'empty' },
      { label: '정보 없음 2', value: null, status: 'empty' },
      { label: '정보 없음 3', value: null, status: 'empty' },
    ],
    max: 100,
    height: 250,
  },
} satisfies Meta<typeof BarGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: '기본',
};

export const WithFormatter: Story = {
  name: '활성 상태',
  args: {
    data: [
      { label: '이전', value: 42, status: 'inactive' },
      { label: '현재', value: 78, status: 'active' },
      { label: '다음', value: 62, status: 'inactive' },
      { label: '대기', value: null, status: 'empty' },
      { label: '대기 2', value: null, status: 'empty' },
    ],
    max: 100,
    height: 220,
  },
};
