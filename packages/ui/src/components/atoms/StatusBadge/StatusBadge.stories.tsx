import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Atoms/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Packing" },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone and size. Check it in Light, Dark and System from the toolbar. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          <StatusBadge size={size} tone="info" label="Packing" />
          <StatusBadge size={size} tone="success" label="Delivered" />
          <StatusBadge size={size} tone="neutral" label="Refunded" />
          <StatusBadge size={size} tone="warning" label="Paused" />
          <StatusBadge size={size} tone="accent" label="Out for delivery" />
          <StatusBadge size={size} tone="success" marker="check" label="Verified" />
          <StatusBadge size={size} tone="warning" marker="none" label="Not verified" />
        </div>
      ))}
    </div>
  ),
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
