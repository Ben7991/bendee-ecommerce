import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logo } from "./Logo";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = { args: { size: "header" } };

export const Compact: Story = { args: { size: "compact" } };
export const Menu: Story = { args: { size: "menu" } };

/** On feature surfaces such as the footer. */
export const Inverse: Story = {
  args: { tone: "inverse", size: "footer" },
  render: (args) => (
    <div className="rounded-2xl bg-feature p-8">
      <Logo {...args} />
    </div>
  ),
};
