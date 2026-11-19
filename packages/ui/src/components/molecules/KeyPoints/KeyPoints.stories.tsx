import type { Meta, StoryObj } from "@storybook/react-vite";

import { KeyPoints } from "./KeyPoints";

const meta = {
  title: "Molecules/KeyPoints",
  component: KeyPoints,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "The short version",
    className: "max-w-170",
    items: [
      "We only collect what we need to deliver your order and look after your account.",
      "We never sell your details. We share them only with the partners who make your order happen.",
      "Marketing messages and ad cookies are off until you say yes.",
    ],
  },
} satisfies Meta<typeof KeyPoints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
