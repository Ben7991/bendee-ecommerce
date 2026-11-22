import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderTimeline } from "./OrderTimeline";

const meta = {
  title: "Organisms/OrderTimeline",
  component: OrderTimeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-220",
    steps: [
      { label: "Order paid", time: "Today, 10:42", state: "done" },
      { label: "Packing", compactLabel: "Packing your order", time: "Today", state: "current" },
      { label: "Out for delivery", time: "Sat 14 Nov", state: "todo", hideOnMobile: true },
      { label: "Delivered", compactLabel: "Delivered by 6pm", time: "By 6pm, Sat 14 Nov", compactTime: "Sat 14 Nov", state: "todo" },
    ],
  },
} satisfies Meta<typeof OrderTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
