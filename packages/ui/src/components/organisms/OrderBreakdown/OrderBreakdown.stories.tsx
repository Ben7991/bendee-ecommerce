import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon, TextLink } from "../../atoms";
import { OrderBreakdown } from "./OrderBreakdown";

const items = [
  { id: "greens", name: "Daily Greens Powder", detail: "Lemon lime · 25 servings", price: "GHS 450", quantity: 1, tint: "sage" as const },
  { id: "ashwagandha", name: "Ashwagandha Tablets", detail: "Subscribe & save · every 30 days", price: "GHS 304", quantity: 1, tint: "amber" as const },
  { id: "energy", name: "Energy Capsules", detail: "30 capsules · GHS 320 each", price: "GHS 640", quantity: 2, tint: "lavender" as const },
];

const meta = {
  title: "Organisms/OrderBreakdown",
  component: OrderBreakdown,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-95",
    items,
    rows: [
      { label: "Subtotal", value: "GHS 1,394.00" },
      { label: "Discount (JOFAK10)", value: "− GHS 139.40", highlight: true },
      { label: "Delivery · Standard", value: "Free", highlight: true },
    ],
    total: { label: "Total paid", value: "GHS 1,254.60" },
    actions: (
      <Button size="md" className="gap-2">
        <Icon name="reorder" size={15} /> Reorder these items
      </Button>
    ),
    footer: (
      <>
        Already on its way, so it can't be cancelled. <TextLink tone="muted" href="#">Request a return</TextLink> after delivery.
      </>
    ),
    compact: { items, title: "4 items · GHS 1,254.60", detail: "Paid · MTN MoMo •••• 7781", action: <TextLink href="#">Details</TextLink> },
  },
} satisfies Meta<typeof OrderBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Return status: total first, no items. */
export const Refund: Story = {
  args: {
    title: "Your refund",
    items: undefined,
    totalFirst: true,
    total: { label: "Amount", value: "GHS 405.00" },
    rows: [
      { label: "Refund to", value: "MTN MoMo •••• 7781" },
      { label: "Pickup cost", value: "Free", highlight: true },
    ],
    note: "Refunds land within 3 days of the item reaching us.",
    compact: undefined,
    footer: undefined,
  },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Public tracking: a titled list with the paid total (Paper Track order → Result). */
export const Tracking: Story = {
  args: { title: "In this order", titleAside: "4 items", rows: [], totalSize: "sm", total: { label: "Paid with MTN MoMo", value: "GHS 1,254.60" }, actions: undefined, footer: undefined, compact: undefined },
};
