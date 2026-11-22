import type { Meta, StoryObj } from "@storybook/react-vite";

import { StockStatus } from "./StockStatus";

const meta = {
  title: "Molecules/StockStatus",
  component: StockStatus,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "In stock",
    note: "Order in the next 3h 20m for same-day dispatch",
  },
} satisfies Meta<typeof StockStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StockStatus label="In stock" note="Order in the next 3h 20m for same-day dispatch" />
      <StockStatus tone="warning" label="Only 3 left" note="Order soon" />
      <StockStatus tone="error" label="Sold out" note="We'll email you when it's back" />
    </div>
  ),
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
