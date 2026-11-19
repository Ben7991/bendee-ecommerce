import type { Meta, StoryObj } from "@storybook/react-vite";

import { BulletList } from "./BulletList";

const meta = {
  title: "Molecules/BulletList",
  component: BulletList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170 font-sans text-md leading-6.5 text-text-secondary",
    items: [
      "Request a return within 14 days of delivery from your orders.",
      "Our courier collects it, or you can drop it at our Osu store.",
      "Refunds go back to the MoMo wallet or card you paid with, within 5 working days of us receiving the item.",
    ],
  },
} satisfies Meta<typeof BulletList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
