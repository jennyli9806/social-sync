import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import { userEvent, within } from 'storybook/test';
import { NavLink } from '../components/NavLink';

const baseClass = 'text-sm font-medium px-3 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100';
const activeClass = 'text-blue-600 bg-blue-50';
const pendingClass = 'text-amber-500 opacity-60 cursor-wait';

const meta = {
  title: 'App/NavLink',
  component: NavLink,
  parameters: { layout: 'centered' },
  args: {
    to: '/home',
    children: 'Home',
    className: baseClass,
    activeClassName: activeClass,
    pendingClassName: pendingClass,
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/other']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Active: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/home']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Pending requires a data router: a never-resolving loader keeps isPending true after the click.
export const Pending: Story = {
  decorators: [
    () => {
      const router = createMemoryRouter([
        {
          path: '/',
          element: (
            <NavLink to="/slow" className={baseClass} activeClassName={activeClass} pendingClassName={pendingClass}>
              Home
            </NavLink>
          ),
        },
        {
          path: '/slow',
          loader: () => new Promise(() => {}),
          element: <div />,
        },
      ]);
      return <RouterProvider router={router} />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('link', { name: 'Home' }));
  },
};

// NavLink has no built-in disabled prop; simulate it via aria + Tailwind.
export const Disabled: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/other']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    className: `${baseClass} opacity-40 cursor-not-allowed pointer-events-none`,
    'aria-disabled': 'true',
    tabIndex: -1,
  },
};
