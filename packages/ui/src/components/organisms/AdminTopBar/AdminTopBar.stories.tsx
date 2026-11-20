import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminTopBar } from "./AdminTopBar";

const meta = {
  title: "Organisms/AdminTopBar",
  component: AdminTopBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    unreadNotifications: true,
    staff: { name: "Abena Mensah", role: "Owner", email: "abena@jofak.com" },
    staffMenuItems: [
      { label: "My profile & sign-in", icon: "user", href: "#" },
      { label: "Settings", icon: "settings", href: "#" },
      { label: "Sign out", icon: "signOut", href: "#" },
    ],
  },
} satisfies Meta<typeof AdminTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoUnread: Story = { args: { unreadNotifications: false } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Logo, search, bell and the avatar, which opens the account sheet. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
