import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerOrdersCard } from "./CustomerOrdersCard";

const meta = {
  title: "Organisms/CustomerOrdersCard",
  component: CustomerOrdersCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    viewAll: { label: "View all 14", compactLabel: "All 14", href: "#" },
    orders: [
      { number: "JFK-251490", href: "#", items: "3 × Greens Daily", status: { label: "To pack", tone: "info" }, date: "Today", total: "GHS 210" },
      { number: "JFK-251402", href: "#", items: "Magnesium Sleep, Greens Daily", status: { label: "Delivered", tone: "success" }, date: "1 Nov", total: "GHS 345" },
      { number: "JFK-251301", href: "#", items: "2 × Greens Daily", status: { label: "Delivered", tone: "success" }, date: "18 Oct", total: "GHS 280" },
      { number: "JFK-251188", href: "#", items: "Ashwagandha Calm, Probiotic", status: { label: "Part refund", tone: "error" }, date: "2 Oct", total: "GHS 300" },
    ],
  },
} satisfies Meta<typeof CustomerOrdersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { orders: [], viewAll: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
