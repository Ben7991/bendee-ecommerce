import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportKpis } from "./ReportKpis";

const meta = {
  title: "Organisms/ReportKpis",
  component: ReportKpis,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { variant: "compact", kpis: [{ label: "Gross revenue", value: "GHS 96,408", delta: { text: "14.2%", direction: "up" as const, good: true }, trend: [3, 4, 3, 6, 5, 8], tone: "dark" as const }, { label: "Conversion", value: "2.8%", delta: { text: "0.2 pts", direction: "down" as const, good: false }, trend: [6, 5, 6, 4, 4, 3] }, { label: "Refunds", value: "GHS 1,460", delta: { text: "6.1%", direction: "down" as const, good: true } }] },
} satisfies Meta<typeof ReportKpis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

export const Standard: Story = {
  args: {
    variant: "standard",
    kpis: [
      { label: "Products that sold", value: "46", suffix: "of 48", note: "1,036 units" },
      { label: "Needs attention", value: "6 low · 2 out", note: "2 slow movers", tone: "sun" },
    ],
  },
};
