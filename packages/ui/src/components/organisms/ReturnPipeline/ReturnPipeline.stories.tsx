import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReturnPipeline } from "./ReturnPipeline";

const meta = {
  title: "Organisms/ReturnPipeline",
  component: ReturnPipeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    activeHref: "#open",
    stages: [
      { key: "requested", label: "Requested", count: 2, badge: "Needs decision", note: "Oldest 5h · reply within 24h", href: "#requested", tone: "attention" },
      { key: "awaiting", label: "Awaiting item", compactLabel: "Awaiting", count: 2, note: "1 drop-off · 1 partner pickup", href: "#awaiting" },
      { key: "received", label: "To inspect", compactLabel: "Inspect", count: 1, note: "Received yesterday", href: "#received" },
      { key: "inspected", label: "To refund", compactLabel: "Refund", count: 1, note: "GHS 90 ready", href: "#inspected" },
      { key: "closed", label: "Closed · 30 days", count: 18, note: "GHS 1,460 refunded", href: "#closed", tone: "closed" },
    ],
  },
} satisfies Meta<typeof ReturnPipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
