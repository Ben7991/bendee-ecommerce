import type { Meta, StoryObj } from "@storybook/react-vite";

import { BrandTable, type AdminBrand } from "./BrandTable";

const brands: AdminBrand[] = [
  { id: "adinkra", name: "Adinkra Apothecary", slug: "adinkra-apothecary", mark: { tone: "amber", monogram: "A", serif: true, italic: true }, count: 5 },
  { id: "asaase", name: "Asaase Botanicals", slug: "asaase-botanicals", mark: { tone: "primary", icon: "leaf" }, count: 9 },
  { id: "coastline", name: "Coastline Labs", slug: "coastline-labs", mark: { tone: "info", monogram: "CL" }, count: 7 },
  { id: "harmattan", name: "Harmattan Labs", slug: "harmattan-labs", mark: { tone: "sun", icon: "sun", round: true }, count: 6 },
  { id: "kente", name: "Kente Naturals", slug: "kente-naturals", mark: { tone: "lavender", monogram: "K", serif: true }, count: 4 },
  { id: "sunbird", name: "Sunbird Nutrition", slug: "sunbird-nutrition", mark: { tone: "citrus", monogram: "S" }, count: 8 },
  { id: "volta", name: "Volta Vitality", slug: "volta-vitality", mark: { tone: "empty" }, count: 0, note: "No logo yet" },
];

const meta = {
  title: "Organisms/BrandTable",
  component: BrandTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { brands, total: 12, selectedId: "asaase", hrefFor: () => "#", showAllHref: "#" },
} satisfies Meta<typeof BrandTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
