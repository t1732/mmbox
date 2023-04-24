import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from './SearchIcon';

const meta = {
  title: 'mmbox/parts/icon/SearchIcon',
  component: SearchIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: undefined,
  },
};
