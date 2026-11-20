import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminNavItem } from "./AdminNavItem";

const meta = {
  title: "Molecules/AdminNavItem",
  component: AdminNavItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", icon: "box", label: "Orders", count: 14, hint: "14 open" },
} satisfies Meta<typeof AdminNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Active, count and dot. A full row from 1440px; icon cells below (switch the viewport). */
export const Variants: Story = {
  render: (args) => (
    <div className="flex w-54 flex-col gap-0.5">
      <AdminNavItem {...args} icon="dashboard" label="Dashboard" count={undefined} active />
      <AdminNavItem {...args} />
      <AdminNavItem {...args} icon="warehouse" label="Inventory" count={undefined} dot />
      <AdminNavItem {...args} icon="users" label="Customers" count={undefined} />
    </div>
  ),
};

/** The collapsed desktop sidebar: always icon cells, label in a tooltip. */
export const Rail: Story = {
  render: (args) => (
    <div className="flex w-12 flex-col gap-0.5">
      <AdminNavItem {...args} layout="rail" icon="dashboard" label="Dashboard" count={undefined} active />
      <AdminNavItem {...args} layout="rail" />
      <AdminNavItem {...args} layout="rail" icon="warehouse" label="Inventory" count={undefined} dot />
    </div>
  ),
};

export const Tablet: Story = { ...Variants, globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
