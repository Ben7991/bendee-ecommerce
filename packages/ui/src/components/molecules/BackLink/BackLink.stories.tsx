import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackLink } from "./BackLink";

const meta = {
  title: "Molecules/BackLink",
  component: BackLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", children: "Back to sign in" },
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Short: Story = { args: { children: "Back" } };
export const Brand: Story = { args: { tone: "brand", children: "Continue shopping" } };
