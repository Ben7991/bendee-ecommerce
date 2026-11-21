import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReturnReview } from "./ReturnReview";

const meta = {
  title: "Organisms/ReturnReview",
  component: ReturnReview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    backHref: "#",
    number: "RTN-0418",
    status: { label: "Requested · needs decision", compactLabel: "Requested", tone: "warning" },
    meta: "Efua Boateng · order JFK-251455 · requested today 08:12 · day 2 of 7 in the return window",
    compactMeta: "Efua Boateng VIP · JFK-251455 · today 08:12 · day 2 of 7",
    mobileMeta: "Efua Boateng · JFK-251455 · day 2 of 7",
    decision: {
      hint: "Customer is told by SMS",
      defaultMethod: "none",
      defaultMessage: "Sorry about that, Efua. No need to send it back, your refund is on its way.",
      methods: [
        { value: "dropoff", label: "Drop-off", mobileLabel: "Drop-off at Osu store", description: "Customer brings it to Main store, Osu", compactDescription: "At Main store, Osu" },
        { value: "pickup", label: "Partner pickup", mobileLabel: "Delivery partner pickup", description: "Book with the delivery partner, then add the date", compactDescription: "Book, then add date" },
        {
          value: "none",
          label: "No return needed",
          mobileLabel: "No return needed",
          description: "Photos are enough. Refund now, item is written off",
          compactDescription: "Write off, refund now",
          mobileDescription: "Logged as Damaged · refund now",
          note: "No stock comes back, so 1 unit is logged as Damaged in inventory with this return as the reference.",
          compactNote: "1 unit will be logged as Damaged in inventory, referencing RTN-0418.",
        },
      ],
    },
    refund: { lines: [{ label: "Magnesium Sleep × 1", amount: 80 }], deliveryFee: 25, method: "MTN 024 ••• 4521 via Paystack", shortMethod: "MoMo", compactMethod: "MoMo · 024 ••• 4521", brand: "mtn" },
    customer: { name: "Efua Boateng", tag: "VIP", stats: "14 orders · GHS 3,940 lifetime", profileHref: "#", pastReturns: "1 in 14 orders" },
    timeline: [
      { id: "1", title: "Return requested with 2 photos", detail: "Today 08:12 · by customer", current: true },
      { id: "2", title: "Order delivered", detail: "13 Nov 15:40 · delivery partner" },
    ],
    primary: { label: "Approve & refund {amount}", intent: "approve", icon: "check" },
    secondary: { label: "Reject", intent: "reject" },
  },
} satisfies Meta<typeof ReturnReview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Requested: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const AwaitingItem: Story = {
  args: { decision: undefined, status: { label: "Awaiting item", tone: "lavender" }, primary: { label: "Mark as received", intent: "received" }, secondary: undefined },
};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
/** An exchange: nothing is refunded. */
export const Exchange: Story = { args: { refund: undefined, primary: { label: "Approve exchange", intent: "approve", icon: "check" } } };
