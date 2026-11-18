import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductLayout } from "./ProductLayout";

const block = (label: string, className = "h-40") => (
  <div className={`flex items-center justify-center rounded-lg bg-surface font-sans text-sm text-text-muted ${className}`}>{label}</div>
);

const meta = {
  title: "Templates/ProductLayout",
  component: ProductLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    breadcrumbs: block("Breadcrumbs", "h-4 w-90"),
    backLink: block("Back to results", "h-4 w-26"),
    gallery: block("ProductGallery", "h-150"),
    buyBox: block("ProductBuyBox", "h-268"),
    children: block("Benefits · Details · Reviews · Rails", "mx-5 h-60 md:mx-8 xl:mx-14"),
  },
} satisfies Meta<typeof ProductLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
