import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { OrderDetailHeader } from "./OrderDetailHeader";

const meta = {
  title: "Organisms/OrderDetailHeader",
  component: OrderDetailHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    backHref: "#",
    number: "JFK-251477",
    status: { label: "Processing", tone: "warning" },
    payment: { label: "Cash on delivery · to collect", compactLabel: "COD · to collect" },
    meta: "Placed today at 07:58 on the website · 4 items · Same-day delivery",
    total: "GHS 596.00",
    placed: "Today, 07:58",
    actions: (
      <>
        <Button variant="secondary" size="sm" className="h-11 gap-2">
          <Icon name="printer" size={16} /> Print packing slip
        </Button>
        <Button size="sm" className="h-11 gap-2">
          <Icon name="packCheck" size={16} /> Mark packed
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof OrderDetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
