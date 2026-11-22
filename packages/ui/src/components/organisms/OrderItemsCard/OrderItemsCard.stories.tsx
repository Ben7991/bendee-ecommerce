import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderItemsCard } from "./OrderItemsCard";

const meta = {
  title: "Organisms/OrderItemsCard",
  component: OrderItemsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    pickable: true,
    items: [
      { id: "ash", name: "Ashwagandha Calm", detail: "60 capsules · SKU JF-ASH-60 · Shelf B2", compactDetail: "60 caps · Shelf B2 · ×1", quantityLabel: "1 × GHS 145.00", lineTotal: "GHS 145.00", compactLineTotal: "GHS 145", tint: "amber", picked: true },
      { id: "mag", name: "Magnesium Sleep", detail: "Gummies · SKU JF-MAG-30 · Shelf A4", compactDetail: "Gummies · Shelf A4 · ×1", quantityLabel: "1 × GHS 160.00", lineTotal: "GHS 160.00", compactLineTotal: "GHS 160", picked: true },
      { id: "pro", name: "Daily Probiotic", detail: "30 capsules · SKU JF-PRO-30 · Shelf B1", compactDetail: "30 caps · Shelf B1 · ×1", quantityLabel: "1 × GHS 180.00", lineTotal: "GHS 180.00", compactLineTotal: "GHS 180", tint: "lavender" },
    ],
    totals: {
      subtotalLabel: "Subtotal · 3 items",
      compactSubtotalLabel: "Subtotal",
      subtotal: "GHS 485.00",
      discount: { code: "WELCOME20", amount: "GHS 20.00" },
      delivery: { label: "Same-day delivery · Madina", compactLabel: "Same-day delivery", amount: "GHS 35.00" },
      total: "GHS 500.00",
      compactTotalLabel: "Total · COD to collect",
      tax: { label: "Includes VAT, NHIL and GETFund", amount: "GHS 89.80" },
    },
  },
} satisfies Meta<typeof OrderItemsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tick lines as they're picked. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Delivered orders: no pick ticks. */
export const NotPickable: Story = { args: { pickable: false } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
