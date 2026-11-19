import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionTile } from "./ActionTile";

const meta = {
  title: "Molecules/ActionTile",
  component: ActionTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { icon: "reorder", href: "#", description: "From your last 3 orders", children: "Reorder favourites", className: "max-w-80" },
} satisfies Meta<typeof ActionTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Row: Story = {
  render: () => (
    <div className="flex max-w-255 gap-4">
      <ActionTile href="#" icon="reorder" description="From your last 3 orders" className="flex-1">Reorder favourites</ActionTile>
      <ActionTile href="#" icon="heart" description="Refresh your routine in 60s" className="flex-1">Wellness quiz</ActionTile>
      <ActionTile href="#" icon="chat" description="Chat with us on WhatsApp" className="flex-1">Get help</ActionTile>
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
