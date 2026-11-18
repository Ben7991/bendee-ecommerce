import type { Meta, StoryObj } from "@storybook/react-vite";

import { Eyebrow } from "./Eyebrow";

const meta = {
  title: "Atoms/Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Shop by goal" },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnFeature: Story = {
  args: { tone: "accent", children: "Personalised for you" },
  render: (args) => (
    <div className="rounded-xl bg-feature p-6">
      <Eyebrow {...args} />
    </div>
  ),
};
