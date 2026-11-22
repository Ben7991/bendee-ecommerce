import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductStatusCard } from "./ProductStatusCard";

const meta = {
  title: "Organisms/ProductStatusCard",
  component: ProductStatusCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { status: "active", scheduleHref: "#", className: "max-w-85" },
} satisfies Meta<typeof ProductStatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Draft: Story = { args: { status: "draft" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
