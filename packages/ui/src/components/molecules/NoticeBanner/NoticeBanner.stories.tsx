import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { NoticeBanner } from "./NoticeBanner";

const meta = {
  title: "Molecules/NoticeBanner",
  component: NoticeBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "This sale ended on Sat 31 Jan",
    description: "Prices are back to normal. 9 of the 12 picks are still in stock below.",
    action: (
      <Button size="xs" variant="secondary" className="gap-2">
        See current offers <Icon name="arrowRight" size={14} />
      </Button>
    ),
  },
} satisfies Meta<typeof NoticeBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
