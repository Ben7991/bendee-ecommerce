import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon, IconButton } from "../../atoms";
import { AppBar } from "./AppBar";

const meta = {
  title: "Molecules/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Addresses",
    back: (
      <IconButton asChild label="Back to your account" size="md" className="size-10">
        <a href="#">
          <Icon name="chevronLeft" size={16} />
        </a>
      </IconButton>
    ),
    action: (
      <IconButton label="Add address" variant="solid" size="md" className="size-10">
        <Icon name="plus" size={16} />
      </IconButton>
    ),
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
