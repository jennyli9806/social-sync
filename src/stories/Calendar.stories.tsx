import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '../components/ui/calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedDate: Story = {
  args: {
    mode: 'single',
    selected: new Date('2026-05-10'),
  },
};

export const WithRange: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date('2026-05-12'),
      to: new Date('2026-05-17'),
    },
  },
};

export const WithDisabledDates: Story = {
  args: {
    mode: 'single',
    disabled: { before: new Date() },
  },
};

export const TwoMonths: Story = {
  args: {
    numberOfMonths: 2,
  },
};
