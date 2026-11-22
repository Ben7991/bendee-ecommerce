import type { Meta, StoryObj } from "@storybook/react-vite";

import { PriceRange } from "./PriceRange";

const meta = {
  title: "Molecules/PriceRange",
  component: PriceRange,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { min: 0, max: 800, defaultValue: [150, 700], className: "max-w-68" },
} satisfies Meta<typeof PriceRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FullRange: Story = { args: { defaultValue: undefined } };
export const Mobile: Story = {
  args: { className: "max-w-87.5" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
