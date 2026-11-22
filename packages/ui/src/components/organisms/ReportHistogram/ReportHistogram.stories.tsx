import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportHistogram } from "./ReportHistogram";

const meta = {
  title: "Organisms/ReportHistogram",
  component: ReportHistogram,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Order values around the free-delivery line", description: "Orders by value", bins: [{ label: "<100", value: 52 }, { label: "250–299", value: 38 }, { label: "300–349", value: 71, highlight: true }, { label: "500+", value: 23 }], markerBefore: 2 },
} satisfies Meta<typeof ReportHistogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
