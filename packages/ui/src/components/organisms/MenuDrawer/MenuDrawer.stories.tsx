import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuDrawer } from "./MenuDrawer";

const meta = {
  title: "Organisms/MenuDrawer",
  component: MenuDrawer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    defaultOpen: true,
    activeHref: "/shop",
    primaryLinks: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/collections", badge: "Sale" },
    ],
    needs: [
      { label: "Sleep & stress", href: "#sleep" },
      { label: "Immunity", href: "#immunity" },
      { label: "Energy", href: "#energy" },
      { label: "Gut health", href: "#gut" },
      { label: "Skin & hair", href: "#skin" },
      { label: "Women's health", href: "#women" },
    ],
    promo: {
      href: "#reset",
      eyebrow: "Ends Sat 31 Jan",
      title: "The Harmattan reset",
      description: "Up to 20% off · 12 picks",
    },
    secondaryLinks: [
      { label: "Favourites", href: "#favourites", icon: "heart", meta: "6 on this device" },
      { label: "Track an order", href: "#track", icon: "truck" },
      { label: "Help & FAQ", href: "#faq", icon: "help" },
    ],
    help: { prompt: "Need help?", label: "Chat on WhatsApp", href: "#whatsapp" },
  },
} satisfies Meta<typeof MenuDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Opens on load. Close it and use the menu button to reopen. */
export const SignedOut: Story = {};

export const SignedIn: Story = {
  args: {
    secondaryLinks: [
      { label: "Favourites", href: "#favourites", icon: "heart", meta: "6 saved" },
      { label: "Track an order", href: "#track", icon: "truck" },
      { label: "Help & FAQ", href: "#faq", icon: "help" },
    ],
    account: { name: "Ama Mensah", initials: "AM", summary: "My account · 1 order on the way", href: "#account" },
  },
};

/** Paper mobile artboard (390): full-screen sheet. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};

/** Paper tablet artboard (768): 420px panel over a scrim. */
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

/** Closed: only the header's menu button shows. */
export const Closed: Story = { args: { defaultOpen: false } };
