import type { Meta, StoryObj } from "@storybook/react-vite";

import { AddTile } from "./AddTile";

const meta = {
  title: "Molecules/AddTile",
  component: AddTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", children: "Add a new address", description: "Home, work or a loved one's place", className: "max-w-125" },
} satisfies Meta<typeof AddTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex max-w-125 flex-col gap-4">
      <AddTile {...args} size="lg" />
      <AddTile href="#" size="sm">Subscribe to another product</AddTile>
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
