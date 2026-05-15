import { Bell, Check, Settings, Trash2 } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta = {
  title: '컴포넌트/IconButton',
  component: IconButton,
  args: {
    label: '확인',
    icon: <Check size={19} />,
    variant: 'primary',
    size: 'md',
    surface: 'solid',
    shape: 'rounded',
  },
  argTypes: {
    icon: { control: false },
    surface: {
      control: 'inline-radio',
      options: ['solid', 'transparent', 'translucent'],
      labels: {
        solid: '기본',
        transparent: '투명',
        translucent: '반투명',
      },
    },
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'circle'],
      labels: {
        rounded: '둥근 사각형',
        circle: '원형',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '기본',
};

export const Notification: Story = {
  name: '알림',
  args: {
    label: '알림',
    icon: <Bell size={19} />,
    variant: 'neutral',
  },
};

export const Transparent: Story = {
  name: '투명',
  args: {
    label: '설정',
    icon: <Settings size={19} />,
    surface: 'transparent',
  },
};

export const Translucent: Story = {
  name: '반투명',
  args: {
    label: '알림',
    icon: <Bell size={19} />,
    surface: 'translucent',
    variant: 'primary',
  },
};

export const Circle: Story = {
  name: '원형',
  args: {
    label: '확인',
    icon: <Check size={19} />,
    shape: 'circle',
    variant: 'primary',
  },
};

export const Danger: Story = {
  name: '위험',
  args: {
    label: '삭제',
    icon: <Trash2 size={19} />,
    variant: 'danger',
  },
};
