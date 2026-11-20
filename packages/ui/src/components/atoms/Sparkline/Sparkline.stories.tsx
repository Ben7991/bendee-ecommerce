import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sparkline } from "./Sparkline";

const meta = {
  title: "Atoms/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { values: [5, 8, 6, 13, 11, 16, 14, 20, 21] },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Accent sits on the evergreen revenue tile. Check Light, Dark and System. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Sparkline {...args} tone="brand" />
      <Sparkline {...args} tone="error" values={[16, 18, 15, 16, 12, 14, 10, 11, 9]} />
      <span className="rounded-md bg-primary p-3">
        <Sparkline {...args} tone="accent" />
      </span>
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
