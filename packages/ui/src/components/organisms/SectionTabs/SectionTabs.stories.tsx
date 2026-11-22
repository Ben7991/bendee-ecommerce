import type { Meta, StoryObj } from "@storybook/react-vite";

import { SectionTabs } from "./SectionTabs";

const meta = {
  title: "Organisms/SectionTabs",
  component: SectionTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Catalog",
    activeHref: "/admin/products",
    tabs: [
      { href: "/admin/products", label: "All products", compactLabel: "Products", count: 48 },
      { href: "/admin/products/categories", label: "Categories", count: 19 },
      { href: "/admin/products/brands", label: "Brands", count: 12 },
    ],
  },
} satisfies Meta<typeof SectionTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Categories: Story = { args: { activeHref: "/admin/products/categories" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** A segmented control. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
