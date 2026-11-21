import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductMediaCard } from "./ProductMediaCard";

const meta = {
  title: "Organisms/ProductMediaCard",
  component: ProductMediaCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { images: [{ id: "1", image: null, tint: "sun" }, { id: "2", image: null, tint: "citrus" }, { id: "3", image: null, tint: "lavender" }], className: "max-w-187" },
} satisfies Meta<typeof ProductMediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Drag thumbnails to reorder; Add picks files. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
