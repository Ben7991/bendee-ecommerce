import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportList } from "./ReportList";

const meta = {
  title: "Molecules/ReportList",
  component: ReportList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows: [{ id: "1", rank: "1", title: "Greens Daily · 30 servings", sub: "142 units", value: "GHS 9,940" }, { id: "2", title: "At risk", sub: "Quiet ~118 days", value: "96", dot: "warning" as const, highlight: true }] },
} satisfies Meta<typeof ReportList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
