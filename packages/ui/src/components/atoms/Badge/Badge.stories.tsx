import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: "Bestseller" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnSurfaces: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex gap-2 rounded-xl bg-sage-100 p-4">
        <Badge>Bestseller</Badge>
        <Badge>−18%</Badge>
        <Badge variant="light">Staff pick</Badge>
        <Badge variant="neutral">6 products</Badge>
        <Badge variant="warning">Only 3 left</Badge>
        <Badge size="sm">Bestseller</Badge>
      </div>
      <div className="flex gap-2 rounded-xl bg-gradient-feature p-4">
        <Badge variant="glass" size="lg">8 products</Badge>
        <Badge variant="accent" size="lg">Deeper sleep</Badge>
        <Badge variant="outline" size="lg">Less stress</Badge>
      </div>
    </div>
  ),
};
