import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReceiveStockSheet } from "./ReceiveStockSheet";

const meta = {
  title: "Organisms/ReceiveStockSheet",
  component: ReceiveStockSheet,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    location: "Main store, Osu",
    suppliers: [
      { value: "ans", label: "Accra Nutrition Supply" },
      { value: "kgh", label: "Kumasi Green Health" },
    ],
    defaultSupplier: "ans",
    defaultInvoice: "ANS-3381",
    variants: [
      { id: "ash-60", name: "Ashwagandha · 60", sku: "JF-ASH-60", barcode: "6001", tint: "amber", onHand: 2, unitCost: 70 },
      { id: "mag", name: "Magnesium Sleep", sku: "JF-MAG-30", barcode: "6002", tint: "sage", onHand: 5, unitCost: 80 },
      { id: "enr-cit", name: "Energy B · Citrus", sku: "JF-ENR-CIT", barcode: "6003", tint: "citrus", onHand: 7, unitCost: 58 },
    ],
    defaultLines: [
      { variantId: "ash-60", quantity: 48, unitCost: 70 },
      { variantId: "mag", quantity: 36, unitCost: 80 },
      { variantId: "enr-cit", quantity: 60, unitCost: 58 },
    ],
  },
} satisfies Meta<typeof ReceiveStockSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { defaultLines: [], defaultInvoice: "" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
