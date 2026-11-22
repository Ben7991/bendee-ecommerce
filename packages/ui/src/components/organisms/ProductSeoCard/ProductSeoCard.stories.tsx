import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductSeoCard } from "./ProductSeoCard";

const meta = {
  title: "Organisms/ProductSeoCard",
  component: ProductSeoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Energy B-Complex Chewables, 30 Tablets", slug: "energy-b-complex", description: "All eight B vitamins in one chewable to help turn food into steady energy. Vegan, no added sugar. Same-day delivery in Accra.", className: "max-w-187" },
} satisfies Meta<typeof ProductSeoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Type to update the preview and counters. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
