import type { Meta, StoryObj } from "@storybook/react-vite";

import { Price } from "./Price";

const meta = {
  title: "Atoms/Price",
  component: Price,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { amount: 450 },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OnSale: Story = { args: { compareAt: 520 } };
export const Mobile: Story = { args: { size: "md" } };
