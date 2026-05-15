import type { Meta, StoryObj } from '@storybook/react-vite';
import { MiniProfile } from './MiniProfile';

const meta = {
  title: '컴포넌트/MiniProfile',
  component: MiniProfile,
  args: {
    src: 'https://i.pravatar.cc/128?img=12',
    name: '고중범',
    subtitle: '방금 전 댓글 작성',
    size: 'sm',
  },
} satisfies Meta<typeof MiniProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Comment: Story = {
  name: '댓글용',
};

export const MobileApp: Story = {
  name: '모바일 앱용',
  args: {
    src: 'https://i.pravatar.cc/128?img=32',
    name: '이진우',
    subtitle: '온라인',
    size: 'md',
  },
};

export const Web: Story = {
  name: '웹용',
  args: {
    src: 'https://i.pravatar.cc/128?img=47',
    name: '이민성',
    size: 'lg',
    subtitle: '프로젝트 리드',
  },
};
