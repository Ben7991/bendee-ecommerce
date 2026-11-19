import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon, IconButton, TextLink } from "../../atoms";
import { OrderHistory } from "./OrderHistory";

const reorder = (
  <Button size="xs" variant="secondary" className="gap-1.5">
    <Icon name="reorder" size={13} /> Reorder
  </Button>
);

const meta = {
  title: "Organisms/OrderHistory",
  component: OrderHistory,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    rows: [
      {
        id: "1",
        number: "JFK-249702",
        meta: "28 Oct 2026 · 2 items",
        status: { label: "Delivered", tone: "success" },
        items: [{ id: "a", tint: "sage" }, { id: "b", tint: "sun" }],
        total: "GHS 930.00",
        action: reorder,
        compactTitle: "Greens + Probiotic",
        compactMeta: (
          <>
            <strong className="text-brand">Delivered</strong> · 28 Oct · GHS 930
          </>
        ),
        compactAction: (
          <IconButton label="Reorder JFK-249702" size="lg" className="size-10">
            <Icon name="reorder" size={15} />
          </IconButton>
        ),
      },
      {
        id: "2",
        number: "JFK-247530",
        meta: "14 Sep 2026 · 1 item",
        status: { label: "Refunded", tone: "neutral" },
        items: [{ id: "c", tint: "amber" }],
        total: "GHS 380.00",
        refunded: true,
        action: <TextLink href="#">Details</TextLink>,
        compactTitle: "Ashwagandha Tablets",
        compactMeta: (
          <>
            <strong>Refunded</strong> · 14 Sep · GHS 380
          </>
        ),
        compactAction: <Icon name="chevronRight" size={15} className="text-text-muted" />,
      },
    ],
  },
} satisfies Meta<typeof OrderHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
