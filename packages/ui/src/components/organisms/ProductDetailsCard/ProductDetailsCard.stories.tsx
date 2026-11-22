import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductDetailsCard } from "./ProductDetailsCard";

const meta = {
  title: "Organisms/ProductDetailsCard",
  component: ProductDetailsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Energy B-Complex", description: "<p>All eight B vitamins in one chewable tablet to help turn food into steady energy, without the crash of another coffee.</p><ul><li>Supports normal energy release and reduced tiredness</li><li>Vegan, no added sugar · 30 tablets, one a day</li></ul>", className: "max-w-187" },
} satisfies Meta<typeof ProductDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
