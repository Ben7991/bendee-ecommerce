import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckoutSummary } from "./CheckoutSummary";

const meta = {
  title: "Organisms/CheckoutSummary",
  component: CheckoutSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    itemCount: 4,
    items: [
      { id: "greens", name: "Daily Greens Powder", detail: "Lemon lime · 25 servings", price: "GHS 450", quantity: 1, tint: "sage" },
      { id: "ashwagandha", name: "Ashwagandha Tablets", detail: "Subscribe & save · every 30 days", price: "GHS 304", quantity: 1, tint: "amber" },
      { id: "energy", name: "Energy Capsules", detail: "30 capsules · GHS 320 each", price: "GHS 640", quantity: 2, tint: "lavender" },
    ],
    note: "Magnesium Bisglycinate is sold out and isn't in this order.",
    code: { code: "JOFAK10", description: "10% off order" },
    totals: {
      subtotalLabel: "Subtotal · 4 items",
      subtotal: "GHS 1,394.00",
      discountLabel: "Discount (JOFAK10)",
      discount: "− GHS 139.40",
      deliveryLabel: "Delivery · Standard",
      delivery: "Free",
      total: "GHS 1,254.60",
      taxNote: "Includes VAT & levies of GHS 225.40",
      savings: "You save GHS 425.40",
    },
  },
} satisfies Meta<typeof CheckoutSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {};
export const Strip: Story = { args: { variant: "strip" }, parameters: { layout: "fullscreen" }, globals: { viewport: { value: "mobile", isRotated: false } } };
