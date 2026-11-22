import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { value: 33, label: "Quiz progress" },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Admin stock level bars: brand, low (amber), sold out (red). */
export const StockLevels: Story = {
  render: (args) => (
    <div className="flex w-37.5 flex-col gap-3">
      <ProgressBar {...args} size="xs" value={100} />
      <ProgressBar {...args} size="xs" tone="warning" value={20} />
      <ProgressBar {...args} size="xs" tone="error" value={2} />
    </div>
  ),
};
