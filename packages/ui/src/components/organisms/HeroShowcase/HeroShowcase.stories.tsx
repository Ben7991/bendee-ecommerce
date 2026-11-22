import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeroShowcase } from "./HeroShowcase";

const meta = {
  title: "Organisms/HeroShowcase",
  component: HeroShowcase,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { product: { name: "Daily Greens", price: "GHS 450" } },
  render: (args) => (
    <div className="rounded-2xl bg-gradient-hero p-8">
      <HeroShowcase {...args} />
    </div>
  ),
} satisfies Meta<typeof HeroShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
