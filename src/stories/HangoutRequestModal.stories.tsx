import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent, expect } from 'storybook/test';
import HangoutRequestModal from '../components/HangoutRequestModal';
import { friends } from '../lib/mockData';

const meta = {
  title: 'App/HangoutRequestModal',
  component: HangoutRequestModal,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    friends,
    onClose: fn(),
    onSend: fn(),
  },
} satisfies Meta<typeof HangoutRequestModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FriendSelected: Story = {
  name: 'Selecting a friend toggles highlight',
  play: async ({ canvas }) => {
    const card = canvas.getByText('Alex Rivera').closest('button')!;
    await userEvent.click(card);
    await expect(card.className).toContain('bg-coral-light');
  },
};

export const SendRequest: Story = {
  name: 'Send button calls onSend',
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByText('Alex Rivera').closest('button')!);
    await userEvent.click(canvas.getByRole('button', { name: 'Send Request' }));
    await expect(args.onSend).toHaveBeenCalledOnce();
  },
};

export const CloseButton: Story = {
  name: 'Close button calls onClose',
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(args.onClose).toHaveBeenCalledOnce();
  },
};
