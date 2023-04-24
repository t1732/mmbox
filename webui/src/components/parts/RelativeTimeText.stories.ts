import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { RelativeTimeText } from './RelativeTimeText';

const meta = {
  title: 'mmbox/parts/RelativeTimeText',
  component: RelativeTimeText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RelativeTimeText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ago: Story = {
  args: {
    time: '2023/01/01 10:30',
  },
};

export const Now: Story = {
  args: {
    time: dayjs().format('YYYY/MM/DD  HH:mm:ss'),
  },
};
