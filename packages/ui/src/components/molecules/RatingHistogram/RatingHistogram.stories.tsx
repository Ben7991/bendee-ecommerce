import type { Meta, StoryObj } from "@storybook/react-vite";

import { RatingHistogram } from "./RatingHistogram";

const meta = {
  title: "Molecules/RatingHistogram",
  component: RatingHistogram,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { shares: [88, 9, 2, 1, 0], className: "max-w-90" },
} satisfies Meta<typeof RatingHistogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
