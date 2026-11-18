import type { Meta, StoryObj } from "@storybook/react-vite";

import { Notice } from "./Notice";

const meta = {
  title: "Molecules/Notice",
  component: Notice,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Good news — a price dropped since you added it",
    compactTitle: "Good news — a price dropped",
    children: "Energy Capsules is now GHS 320 (was GHS 390). Your total has been updated.",
    compactText: "Energy Capsules is now GHS 320 (was GHS 390). Your total is updated.",
  },
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
