import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DiscontinuousInput,
  type DiscontinuousInputProps,
} from './DiscontinuousInput';

function ControlledDiscontinuousInput(args: DiscontinuousInputProps) {
  const [value, setValue] = useState(args.defaultValue ?? '');

  return (
    <DiscontinuousInput
      {...args}
      value={value}
      onChange={setValue}
      helperText={`현재 값: ${value || '비어 있음'}`}
    />
  );
}

const meta = {
  title: '컴포넌트/DiscontinuousInput',
  component: DiscontinuousInput,
  args: {
    label: '인증 코드',
    length: 6,
    shape: 'square',
    opaqueWhenFilled: false,
    defaultValue: '12',
    validateCharacter: (character: string) => /^[0-9]$/.test(character),
  },
  argTypes: {
    shape: {
      control: 'inline-radio',
      options: ['square', 'circle'],
      labels: {
        square: '사각형',
        circle: '동그라미',
      },
    },
    opaqueWhenFilled: {
      control: 'boolean',
      name: '채워지면 시크릿',
    },
    validateCharacter: { control: false },
  },
} satisfies Meta<typeof DiscontinuousInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumericCode: Story = {
  name: '숫자 코드',
  render: (args) => <ControlledDiscontinuousInput {...args} />,
};

export const FourCharacterCode: Story = {
  name: '네 글자 코드',
  args: {
    label: '접근 코드',
    length: 4,
    defaultValue: 'A7',
    validateCharacter: (character: string) => /^[A-Z0-9]$/i.test(character),
  },
  render: (args) => <ControlledDiscontinuousInput {...args} />,
};

export const Circle: Story = {
  name: '동그라미',
  args: {
    shape: 'circle',
  },
  render: (args) => <ControlledDiscontinuousInput {...args} />,
};

export const OpaqueWhenFilled: Story = {
  name: '채워진 칸 시크릿',
  args: {
    shape: 'circle',
    opaqueWhenFilled: true,
  },
  render: (args) => <ControlledDiscontinuousInput {...args} />,
};
