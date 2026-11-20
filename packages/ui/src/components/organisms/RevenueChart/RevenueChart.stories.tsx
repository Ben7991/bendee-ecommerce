import type { Meta, StoryObj } from "@storybook/react-vite";

import { RevenueChart } from "./RevenueChart";

const meta = {
  title: "Organisms/RevenueChart",
  component: RevenueChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    summary: "GHS 35,260 total · 271 orders",
    max: 8000,
    ticks: ["8k", "6k", "4k", "2k", "0"],
    days: [
      { label: "Mon", value: 3940, display: "GHS 3,940" },
      { label: "Tue", value: 4450, display: "GHS 4,450" },
      { label: "Wed", value: 3610, display: "GHS 3,610" },
      { label: "Thu", value: 5230, display: "GHS 5,230" },
      { label: "Fri", value: 6290, display: "GHS 6,290" },
      { label: "Sat", value: 7100, display: "GHS 7,100" },
      { label: "Today", compactLabel: "Sun", value: 4820, display: "GHS 4,820", compactDisplay: "4,820", current: true },
    ],
  },
} satisfies Meta<typeof RevenueChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Shorter plot, short day names, no legend. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
