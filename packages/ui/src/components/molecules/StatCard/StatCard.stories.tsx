import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatCard } from "./StatCard";

const meta = {
  title: "Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    value: "18,000+",
    label: "orders delivered across all 16 regions",
    className: "max-w-54",
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone side by side. Check it in Light, Dark and System from the toolbar. */
export const Tones: Story = {
  render: (args) => (
    <div className="flex max-w-170 flex-col gap-2.5 md:flex-row md:gap-4">
      <StatCard {...args} tone="sage" className="flex-1" />
      <StatCard tone="amber" value="100%" label="of products bought direct from brands or licensed importers" className="flex-1" />
      <StatCard tone="lavender" value="4.8 / 5" label="average rating from verified buyers" className="flex-1" />
    </div>
  ),
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
