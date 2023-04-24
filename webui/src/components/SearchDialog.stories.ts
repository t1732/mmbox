import type { Meta, StoryObj } from '@storybook/react';
import { SearchDialog } from './SearchDialog';

const meta = {
  title: 'mmbox/SearchDialog',
  component: SearchDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    open: false,
    defaultWord: '',
    defaultDate: '',
    handleCancel: () => {},
    handleSearch: () => {},
  },
};
