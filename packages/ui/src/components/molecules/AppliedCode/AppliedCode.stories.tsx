import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppliedCode } from "./AppliedCode";

const meta = {
  title: "Molecules/AppliedCode",
  component: AppliedCode,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { code: "JOFAK10", description: "10% off order", className: "max-w-95" },
} satisfies Meta<typeof AppliedCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
