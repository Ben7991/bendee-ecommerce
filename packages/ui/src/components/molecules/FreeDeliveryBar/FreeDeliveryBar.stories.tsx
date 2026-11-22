import type { Meta, StoryObj } from "@storybook/react-vite";

import { FreeDeliveryBar } from "./FreeDeliveryBar";

const meta = {
  title: "Molecules/FreeDeliveryBar",
  component: FreeDeliveryBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    message: (
      <>
        <strong>You&apos;ve unlocked free delivery</strong> to Accra · East Legon
      </>
    ),
    value: 100,
    progressLabel: "GHS 500 / GHS 500",
  },
} satisfies Meta<typeof FreeDeliveryBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = {};
export const Partway: Story = {
  args: {
    value: 64,
    progressLabel: "GHS 320 / GHS 500",
    message: (
      <>
        <strong>GHS 180 away</strong> from free delivery
      </>
    ),
  },
};
export const Inline: Story = {
  args: {
    variant: "inline",
    message: (
      <>
        <strong>Free delivery unlocked</strong> to Accra · East Legon
      </>
    ),
  },
};
