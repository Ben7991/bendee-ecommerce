import type { Meta, StoryObj } from "@storybook/react-vite";

import { FunnelSteps } from "./FunnelSteps";

const meta = {
  title: "Organisms/FunnelSteps",
  component: FunnelSteps,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Purchase funnel", description: "14,710 sessions → 412 orders", steps: [{ name: "Session started", sessions: "14,710", rate: "100%", reached: 100, dropped: 0 }, { name: "Added to cart", sessions: "2,060", rate: "14.0%", reached: 14, dropped: 42, biggest: true, drop: { text: "−75.0%", compact: "6,180 dropped · 75.0% — biggest leak" } }, { name: "Order placed", sessions: "412", rate: "2.8%", reached: 2.8, dropped: 1.4, drop: { text: "−206 · 33.3%", compact: "206 dropped · 33.3%" } }] },
} satisfies Meta<typeof FunnelSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
