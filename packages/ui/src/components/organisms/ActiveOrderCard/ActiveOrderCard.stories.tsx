import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { ActiveOrderCard } from "./ActiveOrderCard";

const meta = {
  title: "Organisms/ActiveOrderCard",
  component: ActiveOrderCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    number: "JFK-250184",
    meta: "Placed 13 Nov 2026 · 4 items",
    compactMeta: "13 Nov · 4 items · GHS 1,254.60",
    status: { label: "Packing", tone: "info" },
    items: [
      { id: "greens", tint: "sage" },
      { id: "ashwagandha", tint: "amber" },
      { id: "energy", tint: "lavender" },
    ],
    total: "GHS 1,254.60",
    arrival: (
      <>
        Arriving <strong>tomorrow, Sat 14 Nov</strong> to East Legon
      </>
    ),
    compactArrival: (
      <>
        Arriving <strong>tomorrow, Sat 14 Nov</strong>
      </>
    ),
    stage: 1,
    actions: (
      <>
        <Button size="xs" variant="secondary">View details</Button>
        <Button size="xs">Track order</Button>
      </>
    ),
    compactAction: <Button size="xs">Track order</Button>,
  },
} satisfies Meta<typeof ActiveOrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
