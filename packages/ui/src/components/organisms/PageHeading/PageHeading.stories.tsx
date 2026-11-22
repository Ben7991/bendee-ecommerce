import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackLink } from "../../molecules";
import { PageHeading } from "./PageHeading";

const meta = {
  title: "Organisms/PageHeading",
  component: PageHeading,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: (
      <>
        Your <em>cart</em>
      </>
    ),
    description: "4 items · 1 needs your attention",
    action: <BackLink href="#">Continue shopping</BackLink>,
  },
} satisfies Meta<typeof PageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
