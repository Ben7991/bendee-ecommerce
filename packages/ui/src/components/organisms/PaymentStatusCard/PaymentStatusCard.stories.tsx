import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, TextLink } from "../../atoms";
import { PaymentStatusCard } from "./PaymentStatusCard";

const meta = {
  title: "Organisms/PaymentStatusCard",
  component: PaymentStatusCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    tone: "pending",
    title: (
      <>
        Approve on your <em>phone</em>
      </>
    ),
    description: (
      <>
        We sent a request for <strong>GHS 1,254.60</strong> to
        <br />
        MTN MoMo <strong>024 412 7781</strong>
      </>
    ),
    status: { label: "Waiting for approval", detail: "2:41 left" },
    steps: { items: ["Unlock your phone and open the MoMo prompt", "Enter your MoMo PIN to approve GHS 1,254.60", "Stay on this page — we'll confirm automatically"] },
    hint: (
      <>
        No prompt? Dial <strong>*170#</strong> → My Wallet → My Approvals
      </>
    ),
    actions: (
      <>
        <Button size="md" variant="outline" disabled className="h-11.5 text-text-muted">
          Resend prompt in 0:18
        </Button>
        <TextLink href="#" className="flex h-11.5 items-center justify-center text-base">
          Use another payment method
        </TextLink>
      </>
    ),
    footnote: "Order JFK-250184 · your items are reserved for 15 minutes",
  },
} satisfies Meta<typeof PaymentStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {};
export const Failed: Story = {
  args: {
    tone: "error",
    title: (
      <>
        Payment didn&apos;t go <em>through</em>
      </>
    ),
    description: (
      <>
        The MoMo request for <strong>GHS 1,254.60</strong> wasn&apos;t approved in time.
        <br />
        Don&apos;t worry — your cart and details are saved.
      </>
    ),
    status: { label: "No money was taken from your wallet" },
    steps: { title: "Usually one of these", items: ["The prompt expired before it was approved", "Wrong PIN, or not enough MoMo balance", "A network delay — trying again usually works"] },
  },
};
