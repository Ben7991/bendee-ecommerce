import type { Meta, StoryObj } from "@storybook/react-vite";

import { CountBadge } from "./CountBadge";

const meta = {
  title: "Atoms/CountBadge",
  component: CountBadge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { count: 3 },
  render: (args) => (
    <span className="relative inline-flex size-11.5 rounded-full border border-border bg-bg">
      <CountBadge {...args} />
    </span>
  ),
} satisfies Meta<typeof CountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Capped: Story = { args: { count: 140 } };
