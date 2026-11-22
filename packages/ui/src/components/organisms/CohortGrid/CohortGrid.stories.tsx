import type { Meta, StoryObj } from "@storybook/react-vite";

import { CohortGrid } from "./CohortGrid";

const meta = {
  title: "Organisms/CohortGrid",
  component: CohortGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Do customers come back?", description: "Share of each month’s new customers who ordered again", months: 3, rows: [{ label: "June 2026", compactLabel: "Jun", sub: "182 customers", values: [24, 18, 15] }, { label: "October 2026", compactLabel: "Oct", sub: "268 customers", values: [31, null, null] }] },
} satisfies Meta<typeof CohortGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
