import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductReadyCard } from "./ProductReadyCard";

const meta = {
  title: "Organisms/ProductReadyCard",
  component: ProductReadyCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { checks: [{ label: "At least one image", done: true }, { label: "Every variant has a price and SKU", done: true }, { label: "Main category chosen", done: true }, { label: "Description written", done: true }], className: "max-w-85" },
} satisfies Meta<typeof ProductReadyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NotReady: Story = { args: { checks: [{ label: "At least one image", done: false }, { label: "Every variant has a price and SKU", done: true }, { label: "Main category chosen", done: false }, { label: "Description written", done: true }] } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
