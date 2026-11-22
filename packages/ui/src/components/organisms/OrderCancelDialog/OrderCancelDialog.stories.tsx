import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderCancelDialog } from "./OrderCancelDialog";

const meta = {
  title: "Organisms/OrderCancelDialog",
  component: OrderCancelDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    defaultOpen: true,
    trigger: <button type="button">Cancel order</button>,
    number: "JFK-251477",
    summary: "Ama Boateng · GHS 596.00 · Cash on delivery",
    defaultReason: "customer",
    reasons: [
      { value: "customer", label: "Customer asked to cancel" },
      { value: "unreachable", label: "Couldn't reach customer" },
      { value: "stock", label: "Out of stock" },
      { value: "fraud", label: "Suspected fraud" },
      { value: "other", label: "Other" },
    ],
    money: { title: "Nothing to refund", body: "This is a cash-on-delivery order and no money has been collected yet." },
    switches: [
      { name: "restock", label: "Return 4 items to stock", detail: "Ashwagandha Calm, Magnesium Sleep, Daily Probiotic, Greens Daily", defaultChecked: true },
      { name: "notify", label: "Text the customer", detail: "“Your Jofak order JFK-251477 has been cancelled as you asked.”", defaultChecked: true },
    ],
  },
} satisfies Meta<typeof OrderCancelDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** A bottom sheet. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
