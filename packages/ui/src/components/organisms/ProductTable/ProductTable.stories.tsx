import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductTable, type AdminProduct } from "./ProductTable";

const products: AdminProduct[] = [
  { id: "ash", name: "Ashwagandha Calm", href: "#", tint: "amber", variants: "2 variants", brand: { label: "Adinkra Apothecary", href: "#" }, status: { label: "Active", tone: "success" }, category: { name: "Ashwagandha", parent: "Sleep & stress" }, stock: { label: "60 caps sold out", detail: "120 caps: 18 left", tone: "error" }, price: "GHS 145–260", compactPrice: "GHS 145+", sold: 86 },
  { id: "grn", name: "Greens Daily", href: "#", tint: "sage", variants: "1 variant", brand: { label: "Asaase Botanicals", href: "#" }, status: { label: "Active", tone: "success" }, category: { name: "Greens & superfoods", parent: "Top level" }, stock: { label: "124 in stock", detail: "~3 months", tone: "ok" }, price: "GHS 96.00", compactPrice: "GHS 96", sold: 40 },
  { id: "vit", name: "Vitamin C + Zinc", href: "#", missingImage: true, issue: "2 things to fix before publishing", compactIssue: "Needs a photo and a category", status: { label: "Draft", tone: "neutral" }, category: null, stock: { label: "60 in stock", tone: "muted" }, price: "GHS 88.00", compactPrice: "GHS 88", sold: null },
  { id: "col", name: "Collagen Glow", href: "#", tint: "citrus", variants: "2 flavours", brand: { label: "Kente Naturals", href: "#" }, status: { label: "Scheduled", tone: "lavender", note: "Goes live Fri, 20 Nov" }, category: { name: "Collagen", parent: "Beauty from within" }, stock: { label: "200 in stock", tone: "ok" }, price: "GHS 210.00", compactPrice: "GHS 210", sold: null },
  { id: "iron", name: "Iron + Folate for Women", href: "#", tint: "surface", note: "Archived 2 Oct · URL redirects to Iron & B12", status: { label: "Archived", tone: "neutral" }, category: { name: "Iron & B12", parent: "Vitamins & minerals" }, stock: { label: "0 in stock", tone: "muted" }, price: "GHS 75.00", sold: null, archived: true },
];

const meta = {
  title: "Organisms/ProductTable",
  component: ProductTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    products,
    bulkActions: [
      { value: "archive", label: "Archive" },
      { value: "publish", label: "Set active", primary: true },
    ],
    pagination: { page: 1, pageCount: 6, range: "1–8", total: "48", hrefFor: () => "#" },
  },
} satisfies Meta<typeof ProductTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tick rows for the bulk bar. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Category and Sold drop out. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Cards. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
