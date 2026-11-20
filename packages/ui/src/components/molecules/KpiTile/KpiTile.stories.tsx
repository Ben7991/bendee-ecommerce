import type { Meta, StoryObj } from "@storybook/react-vite";

import { KpiTile } from "./KpiTile";

const meta = {
  title: "Molecules/KpiTile",
  component: KpiTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Orders",
    value: "37",
    delta: { label: "+8.8%", tone: "up" },
    comparison: "34 last Sunday",
    trend: [6, 5, 10, 8, 13, 11, 16, 14, 18],
    className: "max-w-70 rounded-lg border border-border-subtle",
  },
} satisfies Meta<typeof KpiTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone and direction. Check it in Light, Dark and System from the toolbar. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-4">
      <KpiTile
        {...args}
        tone="feature"
        label="Revenue today"
        currency="GHS"
        value="4,820.00"
        delta={{ label: "+12.4%", tone: "up" }}
        comparison="vs last Sunday"
      />
      <KpiTile {...args} />
      <KpiTile
        {...args}
        label="Conversion rate"
        value="2.8%"
        delta={{ label: "−0.4 pts", tone: "down" }}
        comparison="1,322 sessions"
        trend={[16, 18, 15, 16, 12, 14, 10, 11, 9]}
      />
    </div>
  ),
};

/** Mobile: smaller figure, no comparison line or sparkline. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
