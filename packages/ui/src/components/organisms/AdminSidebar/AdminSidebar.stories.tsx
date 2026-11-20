import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminSidebar } from "./AdminSidebar";

const meta = {
  title: "Organisms/AdminSidebar",
  component: AdminSidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    activeHref: "/admin",
    primary: [
      { href: "/admin", label: "Dashboard", icon: "dashboard" },
      { href: "/admin/orders", label: "Orders", icon: "box", count: 14, hint: "14 open" },
      { href: "/admin/products", label: "Products", icon: "bottle" },
      { href: "/admin/inventory", label: "Inventory", icon: "warehouse", dot: true, hint: "6 low" },
      { href: "/admin/customers", label: "Customers", icon: "users" },
      { href: "/admin/returns", label: "Returns", icon: "undo", count: 2, hint: "2 to review" },
    ],
    secondary: [
      { href: "/admin/collections", label: "Collections", icon: "tiles" },
      { href: "/admin/discounts", label: "Discounts", icon: "discount" },
      { href: "/admin/marketing", label: "Marketing", icon: "megaphone" },
      { href: "/admin/content", label: "Content", icon: "document" },
      { href: "/admin/reports", label: "Reports", icon: "barChart" },
    ],
    settings: { href: "/admin/settings", label: "Settings", icon: "settings" },
    staff: { name: "Abena Mensah", role: "Owner", email: "abena@jofak.com" },
    staffMenuItems: [
      { label: "My profile & sign-in", icon: "user", href: "#" },
      { label: "Sign out", icon: "signOut", href: "#" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="flex h-dvh">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdminSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 1440px: labels, counts and the staff card. Click the card for the account menu. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

/** Desktop with the sidebar folded to the icon rail; hover an icon for its tooltip. */
export const Collapsed: Story = { args: { defaultCollapsed: true }, globals: { viewport: { value: "desktop", isRotated: false } } };

/** Tablet: always the icon rail, no collapse button. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };

/** Hidden on mobile: AdminTopBar and AdminTabBar take over. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
