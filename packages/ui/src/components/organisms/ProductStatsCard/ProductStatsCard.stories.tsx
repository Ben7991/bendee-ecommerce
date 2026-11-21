import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductStatsCard } from "./ProductStatsCard";

const meta = {
  title: "Organisms/ProductStatsCard",
  component: ProductStatsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { stats: [{ value: "71", label: "units sold" }, { value: "8,236", label: "GHS revenue" }, { value: "50%", label: "margin" }], reportsHref: "#", className: "max-w-85" },
} satisfies Meta<typeof ProductStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
