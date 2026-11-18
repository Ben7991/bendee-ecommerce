import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "../Icon";
import { Medallion } from "./Medallion";

const meta = {
  title: "Atoms/Medallion",
  component: Medallion,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { className: "size-42", coreClassName: "size-29.5" },
} satisfies Meta<typeof Medallion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 500 page. */
export const Sage: Story = { args: { children: <Icon name="refreshLeaf" size={60} /> } };
/** Maintenance page. */
export const Accent: Story = { args: { core: "accent", children: <Icon name="wrench" size={58} /> } };
