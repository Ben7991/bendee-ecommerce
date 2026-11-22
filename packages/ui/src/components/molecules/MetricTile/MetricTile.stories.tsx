import type { Meta, StoryObj } from "@storybook/react-vite";

import { MetricTile } from "./MetricTile";

const meta = {
  title: "Molecules/MetricTile",
  component: MetricTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { value: "4", label: "Orders placed", compactLabel: "Orders", className: "w-60" },
} satisfies Meta<typeof MetricTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both tones. */
export const Tones: Story = {
  render: () => (
    <div className="flex gap-4">
      <MetricTile value="3" label="Saved addresses" className="flex-1" />
      <MetricTile tone="brand" value="GHS 312" label="Saved with discounts" compactLabel="Saved" className="flex-1" />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
