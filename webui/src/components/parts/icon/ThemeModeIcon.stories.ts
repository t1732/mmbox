import type { Meta, StoryObj } from '@storybook/react';
import { ThemeModeIcon } from './ThemeModeIcon';

const meta = {
  title: 'mmbox/parts/icon/ThemeModeIcon',
  component: ThemeModeIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThemeModeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    outlined: false,
    sx: undefined,
  },
};
