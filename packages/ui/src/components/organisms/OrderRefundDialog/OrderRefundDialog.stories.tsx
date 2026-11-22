import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderRefundDialog } from "./OrderRefundDialog";

const meta = {
  title: "Organisms/OrderRefundDialog",
  component: OrderRefundDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    defaultOpen: true,
    trigger: <button type="button">Refund</button>,
    number: "JFK-251482",
    summary: "Kwame Asante · Paid GHS 412.00 with MTN MoMo · Delivered",
    compactSummary: "Kwame Asante · GHS 412.00 · MTN MoMo",
    lines: [
      { id: "enr", name: "Energy B-Complex", unitPrice: 116, bought: 2, tint: "sun", defaultQuantity: 1 },
      { id: "ash", name: "Ashwagandha Calm", unitPrice: 145, bought: 1, tint: "amber" },
    ],
    deliveryFee: 35,
    paid: 412,
    defaultReason: "damaged",
    reasons: [
      { value: "damaged", label: "Damaged on arrival" },
      { value: "wrong", label: "Wrong item" },
      { value: "missing", label: "Missing item" },
      { value: "mind", label: "Changed mind" },
      { value: "other", label: "Other" },
    ],
    method: { brand: "mtn", name: "MTN MoMo", detail: "024 ••• 4521 · via Paystack" },
    approvalThreshold: 300,
  },
} satisfies Meta<typeof OrderRefundDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change quantities: the amount follows until you type your own. */
export const Default: Story = {};
/** A bottom sheet. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
