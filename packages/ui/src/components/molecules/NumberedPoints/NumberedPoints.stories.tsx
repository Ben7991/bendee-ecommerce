import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberedPoints } from "./NumberedPoints";

const meta = {
  title: "Molecules/NumberedPoints",
  component: NumberedPoints,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170",
    items: [
      {
        title: "Genuine, or your money back",
        text: "Every product comes straight from the brand or a licensed importer, with batch numbers we can trace.",
      },
      {
        title: "Stored cool, shipped fast",
        text: "Our Osu store room is air-conditioned around the clock.",
      },
      {
        title: "Straight answers from real people",
        text: "Our nutritionist and support team answer on WhatsApp.",
      },
    ],
  },
} satisfies Meta<typeof NumberedPoints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
