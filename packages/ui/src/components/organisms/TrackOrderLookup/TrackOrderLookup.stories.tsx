import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { TrackOrderLookup } from "./TrackOrderLookup";

const meta = {
  title: "Organisms/TrackOrderLookup",
  component: TrackOrderLookup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    action: "#",
    footer: (
      <>
        Have an account? <TextLink href="#">Sign in</TextLink> to see all your orders.
      </>
    ),
    hint: "Got a tracking link by SMS? Tap it to skip this step.",
  },
} satisfies Meta<typeof TrackOrderLookup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper: Track order — Not found. */
export const NotFound: Story = {
  args: {
    defaultOrder: "JFK-25018",
    defaultPhone: "24 412 7781",
    error: { title: "We couldn't find that order", description: "Check that the order number and phone match your confirmation SMS. 3 tries left." },
    orderError: "Order numbers start with JFK- followed by 6 digits.",
  },
};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
