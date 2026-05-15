import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'JB/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@email.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    defaultValue: 'secret123',
  },
};

export const BlueTheme: Story = {
  args: {
    label: 'Blue Theme',
    theme: 'blue',
    placeholder: 'Focused state will be blue',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Field',
    error: 'Please enter a valid value',
    defaultValue: 'wrong data',
  },
};
