import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarGraph } from './BarGraph';

const meta = {
  title: '컴포넌트/BarGraph',
  component: BarGraph,
  args: {
    data: { label: '진행중', value: 65, status: 'progress' },
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
    data: { label: '현재', value: 78, status: 'active' },
    max: 100,
    height: 220,
  },
};
