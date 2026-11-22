import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckList } from "./CheckList";

const meta = {
  title: "Molecules/CheckList",
  component: CheckList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: [
      "Third-party tested for purity & potency",
      "No synthetic fillers, dyes or additives",
      "Free shipping & 60-day money-back promise",
    ],
  },
} satisfies Meta<typeof CheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
