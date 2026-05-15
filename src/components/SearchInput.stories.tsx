import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta = {
  title: '컴포넌트/SearchInput',
  component: SearchInput,
  args: {
    label: '멤버 검색',
    placeholder: '이름 또는 이메일로 검색',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: '기본',
};

export const HiddenLabel: Story = {
  name: '숨긴 라벨',
  args: {
    hideLabel: true,
    placeholder: '전체 검색',
  },
};
