import type { Meta, StoryObj } from '@storybook/react-vite';
import FriendCard from '../components/FriendCard';

const meta = {
  title: 'App/FriendCard',
  component: FriendCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FriendCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    friend: { id: '1', name: 'Alex Rivera', avatar: 'AR', status: 'available', schedule: [] },
  },
};

export const Busy: Story = {
  args: {
    friend: { id: '2', name: 'Jordan Lee', avatar: 'JL', status: 'busy', schedule: [] },
  },
};

export const Away: Story = {
  args: {
    friend: { id: '3', name: 'Sam Chen', avatar: 'SC', status: 'away', schedule: [] },
  },
};

export const Selected: Story = {
  args: {
    friend: { id: '1', name: 'Alex Rivera', avatar: 'AR', status: 'available', schedule: [] },
    selected: true,
    onToggle: () => {},
  },
};

// Shows the empty checkbox ring — the unselected half of the toggle interaction.
export const Selectable: Story = {
  args: {
    friend: { id: '1', name: 'Alex Rivera', avatar: 'AR', status: 'available', schedule: [] },
    selected: false,
    onToggle: () => {},
  },
};

// Verifies the name truncates gracefully at narrow widths.
export const LongName: Story = {
  args: {
    friend: {
      id: '4',
      name: 'Bartholomew Featherstonehaugh-Williams',
      avatar: 'BF',
      status: 'available',
      schedule: [],
    },
  },
};
