import type { Meta, StoryObj } from "@storybook/react-vite";

import { CartLayout } from "./CartLayout";

const block = (label: string, className = "h-40") => (
  <div className={`flex items-center justify-center rounded-lg bg-surface font-sans text-sm text-text-muted ${className}`}>{label}</div>
);

const meta = {
  title: "Templates/CartLayout",
  component: CartLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    notices: block("FreeDeliveryBar · Notice", "h-20"),
    lines: block("CartLines", "h-96"),
    summary: block("OrderSummary", "h-150 xl:w-110"),
  },
} satisfies Meta<typeof CartLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
