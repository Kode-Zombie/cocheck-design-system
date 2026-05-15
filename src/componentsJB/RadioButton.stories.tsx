import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';
import { User, Shield, CreditCard } from 'lucide-react';

const meta: Meta<typeof RadioButton> = {
  title: 'JB/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Personal: Story = {
  args: {
    icon: User,
    title: 'Personal Account',
    description: 'For individual users and creators.',
    name: 'account',
    id: 'personal',
    defaultChecked: true,
  },
};

export const Business: Story = {
  args: {
    icon: Shield,
    title: 'Business Account',
    description: 'For companies and large organizations.',
    name: 'account',
    id: 'business',
  },
};

export const Payment: Story = {
  args: {
    icon: CreditCard,
    title: 'Credit Card',
    description: 'Secure payment via Visa or Mastercard.',
    name: 'payment',
    id: 'card',
  },
};
