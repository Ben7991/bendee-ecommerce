import type { Meta, StoryObj } from "@storybook/react-vite";

import { LowStockCard } from "./LowStockCard";

const meta = {
  title: "Organisms/LowStockCard",
  component: LowStockCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    count: 6,
    action: { label: "Receive stock", href: "#" },
    footer: { label: "See all 6 in Inventory", href: "#" },
    items: [
      { id: "ash", name: "Ashwagandha Calm", detail: "60 capsules · JF-ASH-60", href: "#", left: 0, forecast: "Sold out", tint: "amber" },
      { id: "mag", name: "Magnesium Sleep", detail: "Gummies · JF-MAG-30", href: "#", left: 3, forecast: "~2 days", tint: "sage" },
      { id: "pro", name: "Daily Probiotic", detail: "30 capsules · JF-PRO-30", href: "#", left: 4, forecast: "~4 days", tint: "lavender" },
      { id: "enr", name: "Energy B-Complex", detail: "Citrus · JF-ENR-CIT", href: "#", left: 5, forecast: "~6 days", tint: "sun" },
    ],
    className: "xl:w-90",
  },
} satisfies Meta<typeof LowStockCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
