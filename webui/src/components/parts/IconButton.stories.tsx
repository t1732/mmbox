import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from '@mui/icons-material';
import { IconButton } from './IconButton';

const meta = {
  title: 'mmbox/parts/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'medium',
    color: 'primary',
    loading: false,
    children: <Mail fontSize="medium" />,
  },
};

export const Loading: Story = {
  args: {
    size: 'medium',
    color: 'primary',
    loading: true,
    children: <Mail fontSize="medium" />,
  },
};
