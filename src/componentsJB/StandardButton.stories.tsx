import type { Meta, StoryObj } from '@storybook/react';
import { StandardButton } from './StandardButton';
import { Mail, ArrowRight } from 'lucide-react';

const meta: Meta<typeof StandardButton> = {
  title: 'JB/StandardButton',
  component: StandardButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StandardButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const LargeWithIcon: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    icon: <Mail size={20} />,
    children: 'Send Message',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'outline',
    children: 'Small Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
