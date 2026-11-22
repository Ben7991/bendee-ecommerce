import type { Meta, StoryObj } from "@storybook/react-vite";

import { BrandMark } from "./BrandMark";

const meta = {
  title: "Atoms/BrandMark",
  component: BrandMark,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { monogram: "A", serif: true, italic: true, tone: "amber" },
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Check Light, Dark and System. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <BrandMark {...args} />
      <BrandMark tone="primary" icon="leaf" />
      <BrandMark tone="info" monogram="CL" />
      <BrandMark tone="sun" icon="sun" round />
      <BrandMark tone="lavender" monogram="K" serif />
      <BrandMark tone="citrus" monogram="S" />
      <BrandMark tone="empty" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <BrandMark tone="primary" icon="leaf" size="sm" />
      <BrandMark tone="primary" icon="leaf" size="lg" />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
