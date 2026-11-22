import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stars } from "./Stars";

const meta = {
  title: "Atoms/Stars",
  component: Stars,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Stars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OnAccent: Story = {
  render: () => (
    <div className="rounded-xl bg-accent p-6">
      <Stars className="text-on-accent" />
    </div>
  ),
};
