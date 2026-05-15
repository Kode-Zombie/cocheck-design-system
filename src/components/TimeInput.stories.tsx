import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeInput } from './TimeInput';

const meta = {
  title: '컴포넌트/TimeInput',
  component: TimeInput,
  args: {
    label: '시간 입력',
    helperText: '시간과 분을 직접 입력한 뒤 오전/오후를 선택하세요.',
    defaultValue: '09:30',
  },
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: '기본',
};

export const WithBounds: Story = {
  name: '범위 제한',
  args: {
    label: '선택 가능 시간',
    min: '09:00',
    max: '18:00',
    step: 900,
    defaultValue: '13:30',
    helperText: '내부 값은 24시간 형식 문자열로 저장됩니다.',
  },
};
