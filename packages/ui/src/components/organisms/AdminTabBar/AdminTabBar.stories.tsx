import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminTabBar } from "./AdminTabBar";

const meta = {
  title: "Organisms/AdminTabBar",
  component: AdminTabBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    activeHref: "/admin",
    tabs: [
      { href: "/admin", label: "Home", icon: "dashboard" },
      { href: "/admin/orders", label: "Orders", icon: "box", count: 14 },
      { href: "/admin/products", label: "Products", icon: "bottle" },
      { href: "/admin/inventory", label: "Inventory", icon: "warehouse", dot: true },
      { href: "/admin/more", label: "More", icon: "more" },
    ],
  },
} satisfies Meta<typeof AdminTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mobile only: hidden from 768px. */
export const Default: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
