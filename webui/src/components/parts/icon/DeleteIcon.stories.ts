import type { Meta, StoryObj } from '@storybook/react';
import { DeleteIcon } from './DeleteIcon';

const meta = {
  title: 'mmbox/parts/icon/DeleteIcon',
  component: DeleteIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DeleteIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: undefined,
  },
};
