import type { Meta, StoryObj } from "@storybook/react-vite";

import type { ProductCardData } from "../ProductCard";
import { PromoStrip } from "../PromoStrip";
import { ProductGrid } from "./ProductGrid";

const products: ProductCardData[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha Tablets",
    details: "Stress & vitality · 120 tablets",
    shortDetails: "120 tablets",
    href: "#",
    price: 380,
    rating: 4.8,
    reviewCount: 2087,
    badge: { label: "Staff pick", variant: "light" },
    tint: "amber",
  },
  {
    id: "energy",
    name: "Energy Capsules",
    details: "Energy & stress support · 30 capsules",
    shortDetails: "30 capsules",
    href: "#",
    price: 320,
    compareAt: 390,
    rating: 4.9,
    reviewCount: 4560,
    badge: { label: "−18%", variant: "solid" },
    tint: "lavender",
  },
  {
    id: "nmnh",
    name: "NMNH 650mg",
    details: "NAD+ support · 90 capsules",
    shortDetails: "90 capsules",
    href: "#",
    price: 650,
    rating: 4.7,
    reviewCount: 1342,
    badge: { label: "New", variant: "light" },
    tint: "sun",
  },
  {
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
  {
    id: "probiotic",
    name: "Complete Probiotic",
    details: "9-in-1 gut support · 30 capsules",
    shortDetails: "30 capsules",
    href: "#",
    price: 480,
    rating: 4.8,
    reviewCount: 964,
    badge: { label: "Only 3 left", variant: "warning" },
    tint: "sun",
  },
  {
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
];

const meta = {
  title: "Organisms/ProductGrid",
  component: ProductGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    products,
    promo: (
      <PromoStrip
        eyebrow="Subscribe & save"
        title={
          <>
            Build a 3-product routine, <em>save 20%</em> every month.
          </>
        }
      />
    ),
  },
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutPromo: Story = { args: { promo: undefined } };
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
