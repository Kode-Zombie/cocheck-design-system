import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DateTimeSelect,
  type DateTimeSelectProps,
  type DateTimeSelectValue,
} from './DateTimeSelect';

function ControlledDateTimeSelect(args: DateTimeSelectProps) {
  const [value, setValue] = useState<DateTimeSelectValue>(
    args.defaultValue ?? { year: 2026, month: 5, day: 12 },
  );

  return (
    <DateTimeSelect
      {...args}
      value={args.mode === 'md' ? { month: value.month, day: value.day } : value}
      onChange={setValue}
      helperText={`선택됨: ${
        args.mode === 'md'
          ? `${value.month.toString().padStart(2, '0')}-${value.day
              .toString()
              .padStart(2, '0')}`
          : `${value.year}-${value.month.toString().padStart(2, '0')}-${value.day
              .toString()
              .padStart(2, '0')}`
      }`}
    />
  );
}

const meta = {
  title: '컴포넌트/DateTimeSelect',
  component: DateTimeSelect,
  args: {
    label: '날짜',
    mode: 'ymd',
    minYear: 2024,
    maxYear: 2028,
    defaultValue: { year: 2026, month: 5, day: 12 },
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['ymd', 'md'],
      labels: {
        ymd: '연월일',
        md: '월일',
      },
    },
  },
} satisfies Meta<typeof DateTimeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const YearMonthDay: Story = {
  name: '연월일',
  render: (args) => <ControlledDateTimeSelect {...args} />,
};

export const MonthDay: Story = {
  name: '월일',
  args: {
    label: '생일',
    mode: 'md',
    defaultValue: { month: 9, day: 18 },
  },
  render: (args) => <ControlledDateTimeSelect {...args} />,
};
