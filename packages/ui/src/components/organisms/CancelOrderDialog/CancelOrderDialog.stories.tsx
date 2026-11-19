import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, TextLink } from "../../atoms";
import { CancelOrderDialog } from "./CancelOrderDialog";

const meta = {
  title: "Organisms/CancelOrderDialog",
  component: CancelOrderDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    description: "JFK-250184 · we haven't started packing yet",
    defaultReason: "change",
    reasons: [
      { value: "mistake", label: "Ordered by mistake" },
      { value: "change", label: "Want to change items or quantity" },
      { value: "slow", label: "Delivery is too slow" },
      { value: "cheaper", label: "Found it cheaper elsewhere" },
      { value: "other", label: "Something else" },
    ],
    refund: {
      brand: "mtn",
      text: (
        <>
          <strong>GHS 1,254.60 refunded</strong> to MTN MoMo •••• 7781. Usually arrives within 1–3 days.
        </>
      ),
    },
    help: (
      <>
        Just want to change something? <TextLink href="#">Chat with us</TextLink> — we can often edit it for you.
      </>
    ),
  },
} satisfies Meta<typeof CancelOrderDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Closed, opened from its trigger. */
export const WithTrigger: Story = {
  args: { open: undefined, trigger: <Button variant="dangerOutline" size="sm">Cancel order</Button> },
};

/** Paper mobile artboard width (390): the bottom sheet. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
