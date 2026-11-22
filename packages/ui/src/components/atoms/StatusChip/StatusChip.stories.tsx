import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusChip } from "./StatusChip";

const meta = {
  title: "Atoms/StatusChip",
  component: StatusChip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Paid · MoMo" },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Check it in Light, Dark and System from the toolbar. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <StatusChip {...args} tone="success">Paid · MoMo</StatusChip>
      <StatusChip {...args} tone="warning">Cash on delivery</StatusChip>
      <StatusChip {...args} tone="error">−0.4 pts</StatusChip>
      <StatusChip {...args} tone="accent">+12.4%</StatusChip>
      <StatusChip {...args} tone="neutral">Pending payment</StatusChip>
      <StatusChip {...args} tone="info">To pack</StatusChip>
      <StatusChip {...args} tone="lavender">Out for delivery</StatusChip>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {(["sm", "md", "count", "lg", "tag"] as const).map((size) => (
        <StatusChip key={size} {...args} size={size}>
          {size}
        </StatusChip>
      ))}
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
