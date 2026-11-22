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
export const Auth: Story = { args: { size: "auth" } };
export const Minimal: Story = { args: { size: "minimal" } };
/** Admin sidebar and admin mobile top bar. */
export const Admin: Story = { args: { size: "admin" } };
export const AdminCompact: Story = { args: { size: "adminCompact" } };
/** The admin icon rail: the mark alone, the name kept for screen readers. */
export const MarkOnly: Story = { args: { size: "admin", wordmarkClassName: "sr-only" } };

/** On feature surfaces such as the footer. */
export const Inverse: Story = {
  args: { tone: "inverse", size: "footer" },
  render: (args) => (
    <div className="rounded-2xl bg-feature p-8">
      <Logo {...args} />
    </div>
  ),
};
