import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { PromoStrip } from "./PromoStrip";

const meta = {
  title: "Organisms/PromoStrip",
  component: PromoStrip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Subscribe & save",
    title: (
      <>
        Build a 3-product routine, <em>save 20%</em> every month.
      </>
    ),
    action: (
      <Button asChild arrow variant="accent" size="md" className="gap-3.5 font-semibold">
        <a href="#">Build my bundle</a>
      </Button>
    ),
  },
} satisfies Meta<typeof PromoStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
