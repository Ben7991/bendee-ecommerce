import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { StickyBuyBar } from "./StickyBuyBar";

const meta = {
  title: "Organisms/StickyBuyBar",
  component: StickyBuyBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    price: 450,
    compareAt: 520,
    actions: (
      <>
        <Button variant="secondary" size="md" className="flex-1 px-3">
          Add to cart
        </Button>
        <Button size="md" className="flex-1 px-3">
          Buy now
        </Button>
      </>
    ),
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
} satisfies Meta<typeof StickyBuyBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {};
export const FullPrice: Story = { args: { compareAt: undefined } };
