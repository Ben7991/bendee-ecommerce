import type { Meta, StoryObj } from "@storybook/react-vite";

import { CountBadge } from "../CountBadge";
import { Icon } from "../Icon";
import { IconButton } from "./IconButton";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Search", children: <Icon name="search" /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The header action row: outline buttons and the solid bag with count badges. */
export const HeaderActions: Story = {
  render: () => (
    <div className="flex items-center gap-2.5">
      <IconButton label="Search"><Icon name="search" /></IconButton>
      <IconButton label="Account"><Icon name="user" /></IconButton>
      <IconButton label="Favourites, 6 items">
        <Icon name="heart" />
        <CountBadge count={6} />
      </IconButton>
      <IconButton label="Bag, 3 items" variant="solid">
        <Icon name="bag" />
        <CountBadge count={3} />
      </IconButton>
    </div>
  ),
};
