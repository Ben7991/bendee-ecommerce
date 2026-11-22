import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, TextLink } from "../../atoms";
import { SubscriptionCard } from "./SubscriptionCard";

const change = <TextLink href="#">Change</TextLink>;

const meta = {
  title: "Organisms/SubscriptionCard",
  component: SubscriptionCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170",
    name: "Ashwagandha Tablets",
    status: { label: "Active", tone: "success" },
    meta: "120 tablets · Qty 1 · Every 30 days · since Jun 2026",
    thumb: { tint: "amber" },
    price: "GHS 304",
    compareAt: "GHS 380",
    saving: "You save 20%",
    compactSaving: "−20%",
    next: { label: "Next delivery", date: "Tue 25 Nov", when: "in 11 days" },
    compactNext: { title: "Next delivery Tue 25 Nov", detail: "MoMo prompt on 23 Nov · then 25 Dec" },
    settings: [
      { label: "Deliver to", value: "Home · East Legon", action: change },
      { label: "Pay with", value: "MTN MoMo •••• 7781", action: change },
      { label: "Frequency", value: "Every 30 days", action: change },
    ],
    upcoming: [
      { date: "Tue 25 Nov", detail: "MoMo prompt on 23 Nov", highlight: true },
      { date: "Thu 25 Dec", detail: "Scheduled" },
      { date: "Sat 24 Jan", detail: "Scheduled" },
    ],
    primaryAction: <Button size="xs">Skip next delivery</Button>,
    secondaryActions: (
      <>
        <Button size="xs" variant="secondary">Deliver now</Button>
        <Button size="xs" variant="secondary">Pause</Button>
      </>
    ),
    cancel: <TextLink href="#" tone="danger">Cancel subscription</TextLink>,
  },
} satisfies Meta<typeof SubscriptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A paused subscription. */
export const Compact: Story = {
  args: {
    variant: "compact",
    name: "Daily Greens Powder",
    status: { label: "Paused", tone: "warning" },
    meta: "Lemon lime · Every 60 days · GHS 360 · resumes Thu 1 Jan",
    compactMeta: "Every 60 days · resumes Thu 1 Jan",
    thumb: { tint: "sage" },
    action: <Button size="xs" variant="secondary">Resume now</Button>,
  },
};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
