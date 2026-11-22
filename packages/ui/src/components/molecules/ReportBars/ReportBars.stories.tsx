import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportBars } from "./ReportBars";

const meta = {
  title: "Molecules/ReportBars",
  component: ReportBars,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { bars: [{ label: "Sleep & stress", value: "GHS 31,814 · 33%", compactValue: "GHS 31,814", share: 100 }, { label: "Greens & superfoods", value: "GHS 24,102 · 25%", share: 76 }, { label: "Rest of Ghana", value: "78%", share: 78, tone: "error" as const, valueTone: "error" as const }], mobileLimit: 2, more: <a href="#all">Show all 3</a> },
} satisfies Meta<typeof ReportBars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
