import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderReceipt } from "./OrderReceipt";

const meta = {
  title: "Organisms/OrderReceipt",
  component: OrderReceipt,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-220",
    delivery: { name: "Ama Mensah", phone: "+233 24 412 7781", address: "14 Lagos Avenue, East Legon, Accra", landmark: "Opposite the Shell filling station, blue gate", method: "Standard delivery · Free", short: "14 Lagos Ave, East Legon" },
    payment: { brand: "mtn", label: "MoMo ···· 7781", amount: "GHS 1,254.60 paid", when: "today, 10:42", note: "Includes VAT & levies of GHS 225.40 · You saved GHS 425.40", short: "MTN MoMo ···· 7781" },
    items: [
      { id: "greens", name: "Daily Greens Powder", detail: "Lemon lime · 25 servings", price: "GHS 450", quantity: 1, tint: "sage" },
      { id: "energy", name: "Energy Capsules", detail: "30 capsules · GHS 320 each", price: "GHS 640", quantity: 2, tint: "lavender" },
    ],
    itemsTitle: "In this order · 4 items",
    itemsShort: "4 items",
    totalsLine: "Subtotal GHS 1,394.00 · JOFAK10 −GHS 139.40 · Delivery free",
    total: "GHS 1,254.60",
    receiptHref: "#",
    itemsHref: "#",
  },
} satisfies Meta<typeof OrderReceipt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
