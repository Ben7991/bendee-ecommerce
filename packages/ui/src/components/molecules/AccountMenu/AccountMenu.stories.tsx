import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountMenu, AccountMenuItem } from "./AccountMenu";

const meta = {
  title: "Molecules/AccountMenu",
  component: AccountMenu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <AccountMenu {...args} className="max-w-88">
      <AccountMenuItem href="#" badge="1 active">Orders</AccountMenuItem>
      <AccountMenuItem href="#">Subscriptions</AccountMenuItem>
      <AccountMenuItem href="#" hint="3 saved">Addresses</AccountMenuItem>
      <AccountMenuItem href="#">Privacy &amp; data</AccountMenuItem>
    </AccountMenu>
  ),
} satisfies Meta<typeof AccountMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
