import type { Meta, StoryObj } from "@storybook/react-vite";

import { PillNav, PillNavItem } from "./PillNav";

const meta = {
  title: "Molecules/PillNav",
  component: PillNav,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Primary" },
  render: (args) => (
    <PillNav {...args}>
      <PillNavItem href="#" active>Home</PillNavItem>
      <PillNavItem href="#">Shop</PillNavItem>
      <PillNavItem href="#">Collections</PillNavItem>
    </PillNav>
  ),
} satisfies Meta<typeof PillNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
