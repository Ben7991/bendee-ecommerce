import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberedSteps } from "./NumberedSteps";

const meta = {
  title: "Molecules/NumberedSteps",
  component: NumberedSteps,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-120",
    items: ["Unlock your phone and open the MoMo prompt", "Enter your MoMo PIN to approve GHS 1,254.60", "Stay on this page — we'll confirm automatically"],
  },
} satisfies Meta<typeof NumberedSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTitle: Story = { args: { title: "Usually one of these" } };
export const Compact: Story = { args: { compact: true } };
