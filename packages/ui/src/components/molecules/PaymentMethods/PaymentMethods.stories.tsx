import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentMethods } from "./PaymentMethods";

const meta = {
  title: "Molecules/PaymentMethods",
  component: PaymentMethods,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { className: "max-w-95" },
} satisfies Meta<typeof PaymentMethods>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
