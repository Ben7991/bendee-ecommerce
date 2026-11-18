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
export const SoldOut: Story = {
  args: {
    product: {
      id: "magnesium",
      name: "Magnesium Bisglycinate",
      details: "Rest · relax · reset · 90 capsules",
      shortDetails: "90 capsules",
      href: "#",
      price: 340,
      rating: 4.8,
      reviewCount: 1876,
      badge: { label: "Sold out", variant: "inverse" },
      tint: "sage",
      soldOut: true,
    },
  },
};
/** On the favourites page: filled heart (on mobile too) and a bell for sold-out items on mobile. */
export const Saved: Story = {
  args: {
    saved: true,
    compactNotify: "icon",
    product: {
      id: "energy",
      name: "Energy Capsules",
      details: "Energy & stress support · 30 capsules",
      shortDetails: "30 capsules",
      href: "#",
      price: 320,
      compareAt: 390,
      rating: 4.9,
      reviewCount: 4560,
      badge: { label: "Price dropped GHS 70", shortLabel: "Price drop", variant: "solid" },
      tint: "lavender",
    },
  },
};
export const Mobile: Story = {
  args: { className: "max-w-42.5" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
