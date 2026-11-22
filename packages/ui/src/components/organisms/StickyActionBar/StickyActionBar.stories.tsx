import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { StickyActionBar } from "./StickyActionBar";

const meta = {
  title: "Organisms/StickyActionBar",
  component: StickyActionBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "mobile", isRotated: false } },
  args: {
    action: (
      <Button size="md" className="w-full py-4">
        Continue to payment <Icon name="arrowRight" size={16} />
      </Button>
    ),
    note: "Saved as you go — you can come back to it",
  },
} satisfies Meta<typeof StickyActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {};
