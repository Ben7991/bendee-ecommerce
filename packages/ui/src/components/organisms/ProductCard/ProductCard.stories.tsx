import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductCard } from "./ProductCard";

const meta = {
  title: "Organisms/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-78",
    product: {
      id: "greens",
      name: "Daily Greens Powder",
      shortName: "Daily Greens",
      details: "Lemon lime · 25 servings",
      shortDetails: "25 servings",
      href: "#",
      price: 450,
      compareAt: 520,
      rating: 4.9,
      reviewCount: 3214,
      badge: { label: "Bestseller", variant: "solid" },
      tint: "sage",
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StaffPick: Story = {
  args: {
    product: {
      id: "ashwagandha",
      name: "Ashwagandha Tablets",
      details: "Stress & vitality · 120 tablets",
      href: "#",
      price: 380,
      rating: 4.8,
      reviewCount: 2087,
      badge: { label: "Staff pick", variant: "light" },
      tint: "amber",
    },
  },
};
export const Mobile: Story = {
  args: { className: "max-w-42.5" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
