import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar tone="light" />
      <Avatar tone="deep" />
      <span className="flex">
        <Avatar size="sm" tone="medium" />
        <Avatar size="sm" tone="dark" className="-ml-2" />
        <Avatar size="sm" tone="pale" className="-ml-2" />
      </span>
    </div>
  ),
};
