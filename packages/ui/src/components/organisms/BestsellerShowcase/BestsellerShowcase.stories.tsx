import type { Meta, StoryObj } from "@storybook/react-vite";

import { BestsellerShowcase } from "./BestsellerShowcase";

const meta = {
  title: "Organisms/BestsellerShowcase",
  component: BestsellerShowcase,
  tags: ["autodocs"],
  args: {
    title: "Loved by 50,000+ routines",
    compactTitle: "Bestsellers",
    shopAllHref: "#",
    filters: ["All", "Capsules", "Powders", "Gummies", "Bundles"].map((label) => ({ value: label.toLowerCase(), label })),
    products: [
      { id: "greens", name: "Daily Greens Powder", shortName: "Daily Greens", details: "Lemon lime · 25 servings", shortDetails: "25 servings", href: "#", price: 450, compareAt: 520, rating: 4.9, reviewCount: 3214, badge: { label: "Bestseller", variant: "solid" }, tint: "sage", category: "powders", showOnMobile: true },
      { id: "ashwagandha", name: "Ashwagandha Tablets", details: "Stress & vitality · 120 tablets", href: "#", price: 380, rating: 4.8, reviewCount: 2087, badge: { label: "Staff pick", variant: "light" }, tint: "amber", category: "capsules" },
      { id: "energy", name: "Energy Capsules", details: "Energy & stress support · 30 capsules", shortDetails: "30 capsules", href: "#", price: 320, compareAt: 390, rating: 4.9, reviewCount: 4560, badge: { label: "−18%", variant: "solid" }, tint: "lavender", category: "capsules", showOnMobile: true },
      { id: "nmnh", name: "NMNH 650mg", details: "NAD+ support · 90 capsules", href: "#", price: 650, rating: 4.7, reviewCount: 1342, badge: { label: "New", variant: "light" }, tint: "sun", category: "capsules" },
    ],
  },
} satisfies Meta<typeof BestsellerShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
