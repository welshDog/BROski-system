import type { Meta, StoryObj } from '@storybook/react';
import Dummy from './Dummy';

const meta: Meta<typeof Dummy> = {
  title: 'UI/Dummy',
  component: Dummy
};

export default meta;
type Story = StoryObj<typeof Dummy>;

export const Default: Story = {};
