import type { Meta, StoryObj } from "@storybook/react-vite";

import { BrandLogo } from "./BrandLogo";

const meta = {
  title: "Atoms/BrandLogo",
  component: BrandLogo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "google" },
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = {};
export const Large: Story = { args: { size: 32 } };
