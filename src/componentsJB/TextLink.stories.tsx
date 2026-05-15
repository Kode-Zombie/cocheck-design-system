import type { Meta, StoryObj } from '@storybook/react';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'JB/TextLink',
  component: TextLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
  args: {
    children: '로그인',
    href: '#',
  },
};

export const Blue: Story = {
  args: {
    children: '블루 링크',
    theme: 'blue',
    href: '#',
  },
};

export const Yellow: Story = {
  args: {
    children: '옐로우 링크',
    theme: 'yellow',
    href: '#',
  },
};

export const WithUnderline: Story = {
  args: {
    children: '항상 밑줄 표시',
    underline: true,
    href: '#',
  },
};

export const WithinText: Story = {
  render: () => (
    <p style={{ color: '#64748b', fontSize: '14px' }}>
      이미 계정이 있다면 <TextLink href="#">로그인</TextLink>
    </p>
  ),
};
