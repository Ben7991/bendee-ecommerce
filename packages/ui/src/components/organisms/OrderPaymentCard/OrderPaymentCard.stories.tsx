import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderPaymentCard } from "./OrderPaymentCard";

const meta = {
  title: "Organisms/OrderPaymentCard",
  component: OrderPaymentCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    tone: "due",
    status: "Not collected",
    method: "Cash on delivery · to collect",
    amount: "GHS 596.00",
    note: "Customer confirmed with an SMS code at checkout. The courier collects cash or MoMo on delivery.",
    className: "max-w-90",
  },
} satisfies Meta<typeof OrderPaymentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Check Light, Dark and System. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <OrderPaymentCard {...args} />
      <OrderPaymentCard {...args} tone="paid" status="Paid" method="MTN MoMo · 024 ••• 4521" amount="GHS 412.00" note="Paid via Paystack on Thu 12 Nov, 14:20." />
      <OrderPaymentCard {...args} tone="pending" status="Awaiting approval" method="Telecel Cash" amount="GHS 96.00" note="Waiting for the customer to approve on their phone." />
    </div>
  ),
};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
