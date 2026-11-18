import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Organisms/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    icon: "bagLeaf",
    title: (
      <>
        Your cart is <em>empty</em>
      </>
    ),
    description: "Nothing here yet. Start with our bestsellers, or take a 60-second quiz to find what fits your routine.",
    primaryAction: { label: "Shop bestsellers", href: "#" },
    secondaryAction: { label: "Take the wellness quiz", href: "#" },
    note: (
      <>
        Added items before? <TextLink href="#">Sign in</TextLink> to bring back your saved cart.
      </>
    ),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyCart: Story = {};
export const EmptyCartMobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const ExpiredLink: Story = {
  args: {
    icon: "stopwatch",
    title: "This cart link has expired",
    description: "Links in our reminders stay open for 7 days, so this one has run out. If you were signed in when you shopped, your items are still saved in your account.",
    primaryAction: { label: "Sign in to see your cart", href: "#" },
    secondaryAction: { label: "Shop bestsellers", href: "#" },
    note: (
      <>
        Already paid? <TextLink href="#">Track your order</TextLink> instead.
      </>
    ),
  },
};
export const Panel: Story = {
  args: {
    size: "panel",
    title: (
      <>
        Nothing in here <em>yet</em>
      </>
    ),
    description: "Add something you love. Orders over GHS 500 ship free across Accra.",
    className: "mx-auto max-w-103 px-6",
  },
};
