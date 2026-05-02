import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within, waitFor } from 'storybook/test';
import CalendarConnect from '../pages/CalendarConnect';

const meta = {
  title: 'App/CalendarConnect',
  component: CalendarConnect,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-md mx-auto pt-6">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CalendarConnect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Connecting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText('Connect')[0]);
  },
};

export const OneConnected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText('Connect')[0]);
    await waitFor(() => canvas.getByText('Synced'), { timeout: 4000 });
  },
};

export const MultipleConnected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText('Connect')[0]);
    await waitFor(() => canvas.getAllByText('Connect')[0], { timeout: 4000 });
    await userEvent.click(canvas.getAllByText('Connect')[0]);
    await waitFor(() => canvas.getAllByText('Synced').length === 2, { timeout: 4000 });
  },
};

export const EventsExpanded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText('Connect')[0]);
    await waitFor(() => canvas.getByText('Synced'), { timeout: 4000 });
    const showButton = await canvas.findByText(/Show \d+ events/);
    await userEvent.click(showButton);
  },
};
