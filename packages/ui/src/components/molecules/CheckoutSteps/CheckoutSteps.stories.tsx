import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckoutSteps } from "./CheckoutSteps";

const meta = {
  title: "Molecules/CheckoutSteps",
  component: CheckoutSteps,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { steps: ["Contact", "Delivery", "Payment", "Review & pay"], current: 1 },
} satisfies Meta<typeof CheckoutSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Delivery: Story = {};
export const ReviewAndPay: Story = { args: { current: 3 } };
