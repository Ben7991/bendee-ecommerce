import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconBadge } from "./IconBadge";

const meta = {
  title: "Atoms/IconBadge",
  component: IconBadge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { icon: "key" },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconBadge icon="key" />
      <IconBadge icon="lock" />
      <IconBadge icon="mail" />
      <IconBadge icon="mailCheck" iconSize={30} />
    </div>
  ),
};

/** The lime 72px badge on Track an order. */
export const Accent: Story = { args: { icon: "truck", tone: "accent", size: "lg", iconSize: 34 } };
