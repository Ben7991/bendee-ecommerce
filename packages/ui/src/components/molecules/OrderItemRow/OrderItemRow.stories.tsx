import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderItemRow } from "./OrderItemRow";

const meta = {
  title: "Molecules/OrderItemRow",
  component: OrderItemRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Energy Capsules", detail: "30 capsules · GHS 320 each", price: "GHS 640", quantity: 2, tint: "lavender", className: "max-w-95" },
} satisfies Meta<typeof OrderItemRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
