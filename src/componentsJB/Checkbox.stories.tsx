import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'JB/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Agree to terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected item',
    checked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    subType: 'required',
  },
};

export const BlueTheme: Story = {
  args: {
    label: 'Blue Theme Checkbox',
    theme: 'blue',
    defaultChecked: true,
  },
};
