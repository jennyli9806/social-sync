import type { Meta, StoryObj } from '@storybook/react-vite';
import EventCard from '../components/EventCard';

const meta = {
  title: 'App/EventCard',
  component: EventCard,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Coral: Story = {
  args: {
    event: {
      id: '1',
      title: 'Rooftop Hangout',
      date: '2026-05-10',
      time: '6:00 PM',
      location: 'The Rooftop Bar',
      friends: ['1', '2'],
      color: 'coral',
    },
  },
};

export const Amber: Story = {
  args: {
    event: {
      id: '2',
      title: 'Brunch Run',
      date: '2026-05-11',
      time: '10:30 AM',
      location: 'Blue Bottle Coffee',
      friends: ['3'],
      color: 'amber',
    },
  },
};

export const Lavender: Story = {
  args: {
    event: {
      id: '3',
      title: 'Movie Night',
      date: '2026-05-14',
      time: '8:00 PM',
      location: 'Alex\'s Place',
      friends: ['1', '2', '3'],
      color: 'lavender',
    },
  },
};

export const Mint: Story = {
  args: {
    event: {
      id: '4',
      title: 'Morning Hike',
      date: '2026-05-17',
      time: '7:00 AM',
      location: 'Runyon Canyon',
      friends: ['2', '3'],
      color: 'mint',
    },
  },
};

export const OneFriend: Story = {
  args: {
    event: {
      id: '5',
      title: 'Coffee Catch-up',
      date: '2026-05-09',
      time: '3:00 PM',
      location: 'Verve Coffee',
      friends: ['1'],
      color: 'coral',
    },
  },
};

export const NoFriends: Story = {
  args: {
    event: {
      id: '6',
      title: 'Solo Study Session',
      date: '2026-05-20',
      time: '2:00 PM',
      location: 'Local Library',
      friends: [],
      color: 'mint',
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const ErrorState: Story = {
  name: 'Error',
  args: {
    error: 'Failed to load event. Please try again.',
  },
};
