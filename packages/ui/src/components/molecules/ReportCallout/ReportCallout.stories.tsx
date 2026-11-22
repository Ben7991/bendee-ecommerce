import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportCallout } from "./ReportCallout";

const meta = {
  title: "Molecules/ReportCallout",
  component: ReportCallout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { eyebrow: "Biggest leak", title: "75% of product viewers never add to cart", children: "Worst products: Energy B-Complex and Collagen Glow.", actions: [{ label: "View product funnel", href: "#funnel" }, { label: "Open Collagen Glow", href: "#glow" }] },
} satisfies Meta<typeof ReportCallout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
