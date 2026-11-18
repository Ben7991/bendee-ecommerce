import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { MiniCart } from "./MiniCart";

const meta = {
  title: "Organisms/MiniCart",
  component: MiniCart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    defaultOpen: true,
    added: (
      <>
        <strong>Daily Greens Powder</strong> added to your cart
      </>
    ),
    freeDelivery: {
      value: 100,
      message: (
        <>
          <strong>Free delivery unlocked</strong> to Accra · East Legon
        </>
      ),
    },
    items: [
      { id: "greens", name: "Daily Greens Powder", href: "#", details: "", compactDetails: "Lemon lime · 25 servings · One-time", unitPrice: 450, compareAtUnitPrice: 520, quantity: 1, lineTotal: 450, compareAtLineTotal: 520, tint: "sage", action: { label: "Switch to subscribe & save 20%", href: "#" } },
      { id: "ashwagandha", name: "Ashwagandha Tablets", href: "#", details: "", compactDetails: "120 tablets · Every 30 days", unitPrice: 304, compareAtUnitPrice: 380, quantity: 1, lineTotal: 304, compareAtLineTotal: 380, tint: "amber", action: { label: "Change frequency", href: "#", inMiniCart: true } },
      { id: "energy", name: "Energy Capsules", href: "#", details: "", compactDetails: "30 capsules · One-time · GHS 320 each", unitPrice: 320, compareAtUnitPrice: 390, quantity: 2, lineTotal: 640, compareAtLineTotal: 780, tint: "lavender" },
      { id: "magnesium", name: "Magnesium Bisglycinate", href: "#", details: "", unitPrice: 340, quantity: 1, lineTotal: 0, tint: "sage", soldOut: true, action: { label: "Notify me when it's back", href: "#", inMiniCart: true } },
    ],
    totals: {
      subtotalLabel: "Subtotal · 4 items",
      subtotal: "GHS 1,394.00",
      discountLabel: "Discount (JOFAK10)",
      discount: "− GHS 139.40",
      deliveryLabel: "Delivery · East Legon, tomorrow",
      delivery: "Free",
      total: "GHS 1,254.60",
      taxNote: "Includes VAT & levies of GHS 225.40",
    },
  },
} satisfies Meta<typeof MiniCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drawer: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Sheet: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Empty: Story = {
  args: {
    items: [],
    added: undefined,
    empty: {
      title: (
        <>
          Nothing in here <em>yet</em>
        </>
      ),
      description: "Add something you love. Orders over GHS 500 ship free across Accra.",
      primaryAction: { label: "Shop bestsellers", href: "#" },
      secondaryAction: { label: "Take the wellness quiz", href: "#" },
      note: (
        <>
          Saved a cart before? <TextLink href="#">Sign in</TextLink> to bring it back.
        </>
      ),
    },
    suggestions: [
      { name: "Ashwagandha Tablets", href: "#a", meta: "★ 4.8 · GHS 380", tint: "amber" },
      { name: "Energy Capsules", href: "#e", meta: "★ 4.9 · GHS 320", tint: "lavender" },
      { name: "Daily Greens Powder", href: "#g", meta: "★ 4.9 · GHS 450", tint: "sage" },
    ],
  },
  globals: { viewport: { value: "tablet", isRotated: false } },
};
