import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flag } from "./Flag";

const meta = {
  title: "Atoms/Flag",
  component: Flag,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { country: "GH" },
} satisfies Meta<typeof Flag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghana: Story = {};
export const Labelled: Story = { args: { label: "Ghana" } };
