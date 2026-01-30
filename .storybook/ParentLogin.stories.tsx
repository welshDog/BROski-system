import ParentLogin from '@/components/Auth/ParentLogin';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ParentLogin> = { component: ParentLogin, title: 'Auth/ParentLogin' };
export default meta;
export const Default: StoryObj<typeof ParentLogin> = { args: {} };
