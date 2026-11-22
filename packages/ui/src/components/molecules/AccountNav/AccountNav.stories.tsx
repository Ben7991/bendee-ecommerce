import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountNav, AccountNavItem } from "./AccountNav";

const sections = ["Overview", "Orders", "Subscriptions", "Favourites", "Addresses", "Profile & preferences", "Privacy & data"];

const meta = {
  title: "Molecules/AccountNav",
  component: AccountNav,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <AccountNav {...args} className="xl:w-65">
      {sections.map((section) => (
        <AccountNavItem key={section} href="#" active={section === "Overview"} badge={section === "Orders" ? "1 active" : undefined}>
          {section}
        </AccountNavItem>
      ))}
    </AccountNav>
  ),
} satisfies Meta<typeof AccountNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The sidebar from 1440px. */
export const Default: Story = {};

/** Tabs at 768px. Hidden on mobile. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
