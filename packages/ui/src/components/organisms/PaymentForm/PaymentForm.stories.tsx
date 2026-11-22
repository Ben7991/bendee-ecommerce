import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentForm } from "./PaymentForm";

const meta = {
  title: "Organisms/PaymentForm",
  component: PaymentForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-186"><Story /></div>],
  args: { defaultWallet: "24 412 7781", detected: { full: "MTN number detected · same as your contact number", short: "MTN number detected" } },
} satisfies Meta<typeof PaymentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
