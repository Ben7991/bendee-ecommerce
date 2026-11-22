import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportTable } from "./ReportTable";

const meta = {
  title: "Organisms/ReportTable",
  component: ReportTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Product performance", description: "Views → added to cart → bought", action: <a href="#all">All 48 products ›</a>, columns: [{ key: "product", label: "Product" }, { key: "views", label: "Views", width: "w-20", align: "right" as const }, { key: "atc", label: "Add-to-cart", width: "w-37.5" }, { key: "returns", label: "Returns", width: "w-20", align: "right" as const, wide: true }], rows: [{ id: "g", lead: { title: "Greens Daily · 30 servings", sub: "Greens & superfoods", thumb: "sage" }, cells: { views: "3,120", atc: { bar: 85, text: "14.2%", tone: "strong" as const }, returns: "0.7%" }, mobile: { value: "GHS 9,940", meta: [{ text: "3,120 views" }, { text: "14.2% add to cart", tone: "strong" as const }] } }, { id: "c", tone: "error" as const, lead: { title: "Collagen Glow · 30 sachets", sub: "Collagen", thumb: "citrus" }, cells: { views: "2,610", atc: { bar: 30, barTone: "error" as const, text: "5.0%", tone: "error" as const }, returns: { text: "3.4%", tone: "error" as const } } }] },
} satisfies Meta<typeof ReportTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
