import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListingLayout } from "./ListingLayout";

const block = (label: string, className = "h-40") => (
  <div className={`flex items-center justify-center rounded-lg bg-surface font-sans text-sm text-text-muted ${className}`}>{label}</div>
);

const meta = {
  title: "Templates/ListingLayout",
  component: ListingLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    sidebar: block("FilterPanel", "h-196"),
    toolbar: block("ListingToolbar", "h-14"),
    children: block("ProductGrid", "h-300"),
    footer: block("PaginationBar · LoadMore", "h-20"),
  },
} satisfies Meta<typeof ListingLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
