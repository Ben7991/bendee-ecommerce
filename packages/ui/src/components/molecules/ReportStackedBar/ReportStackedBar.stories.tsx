import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportStackedBar } from "./ReportStackedBar";

const meta = {
  title: "Molecules/ReportStackedBar",
  component: ReportStackedBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { segments: [{ label: "Cart only", value: "955", share: 58, tone: "soft" as const }, { label: "Contact details", value: "263", share: 16, tone: "strong" as const }, { label: "Payment failed", value: "87", share: 5.2, tone: "error" as const }], showShare: true },
} satisfies Meta<typeof ReportStackedBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
