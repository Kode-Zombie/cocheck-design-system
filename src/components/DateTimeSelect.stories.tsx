import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('날짜'));

    const calendar = await canvas.findByRole('dialog', { name: '날짜 달력' });
    const yearSelect = within(calendar).getByLabelText('연도 선택');
    const monthSelect = within(calendar).getByLabelText('월 선택');

    await userEvent.selectOptions(yearSelect, '2028');
    await userEvent.selectOptions(monthSelect, '12');

    await expect(yearSelect).toHaveValue('2028');
    await expect(monthSelect).toHaveValue('12');

    await userEvent.click(
      within(calendar).getByRole('gridcell', { name: '2028년 12월 25일' }),
    );

    await expect(canvas.getByLabelText('날짜')).toHaveValue('2028-12-25');
  },
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
