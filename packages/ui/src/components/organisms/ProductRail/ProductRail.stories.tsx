import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductRail } from "./ProductRail";

const meta = {
  title: "Organisms/ProductRail",
  component: ProductRail,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Popular right now",
    title: "Start with a bestseller",
    products: [
      { id: "ashwagandha", name: "Ashwagandha Tablets", shortName: "Ashwagandha", details: "Stress & vitality · 120 tablets", shortDetails: "120 tablets", href: "#", price: 380, rating: 4.8, reviewCount: 2087, badge: { label: "Staff pick", variant: "light" }, tint: "amber" },
      { id: "energy", name: "Energy Capsules", details: "Energy & stress support · 30 capsules", shortDetails: "30 capsules", href: "#", price: 320, compareAt: 390, rating: 4.9, reviewCount: 4560, badge: { label: "−18%", variant: "solid" }, tint: "lavender" },
      { id: "nmnh", name: "NMNH 650mg", details: "NAD+ support · 90 capsules", shortDetails: "90 capsules", href: "#", price: 650, rating: 4.7, reviewCount: 1342, badge: { label: "New", variant: "light" }, tint: "sun" },
      { id: "probiotic", name: "Complete Probiotic", details: "9-in-1 gut support · 30 capsules", shortDetails: "30 capsules", href: "#", price: 480, rating: 4.8, reviewCount: 964, badge: { label: "Only 3 left", variant: "warning" }, tint: "sun" },
    ],
  },
} satisfies Meta<typeof ProductRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** "Viewed products" on the PDP: a rule above, a description and a Clear link. */
export const Viewed: Story = {
  args: {
    eyebrow: "Just for you",
    divided: true,
    description: "Pick up where you left off — based on your browsing on this device.",
    action: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Clear history
      </a>
    ),
  },
};
