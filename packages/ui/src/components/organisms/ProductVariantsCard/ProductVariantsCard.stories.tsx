import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductVariantsCard } from "./ProductVariantsCard";

const meta = {
  title: "Organisms/ProductVariantsCard",
  component: ProductVariantsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { editOptionsHref: "#", addOptionHref: "#", options: [{ name: "Flavour", values: ["Citrus", "Berry", "Mango"] }], variants: [{ id: "cit", name: "Citrus", sku: "JF-ENR-CIT", tint: "citrus", price: "116.00", cost: "GHS 58.00", stock: 5, low: true }, { id: "bry", name: "Berry", sku: "JF-ENR-BRY", tint: "lavender", price: "116.00", cost: "GHS 58.00", stock: 88 }, { id: "mng", name: "Mango", sku: "JF-ENR-MNG", tint: "sun", price: "99.00", was: "116.00", cost: "GHS 58.00", stock: 54 }], className: "max-w-187" },
} satisfies Meta<typeof ProductVariantsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Edit a price to see it highlighted. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
