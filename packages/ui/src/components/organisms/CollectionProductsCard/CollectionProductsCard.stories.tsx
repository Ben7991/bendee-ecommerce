import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionProductsCard } from "./CollectionProductsCard";

const meta = {
  title: "Organisms/CollectionProductsCard",
  component: CollectionProductsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    products: [
      { id: "grn", name: "Greens Daily", tags: ["skin"], category: "Beauty from within › Collagen", price: 140, onSale: false, addedDaysAgo: 10 },
      { id: "ash", name: "Ashwagandha · 60", tags: ["calm"], category: "Sleep & stress", price: 116, onSale: true, addedDaysAgo: 90 },
      { id: "enr", name: "Energy B · Berry", tags: ["hydration"], category: "Energy", price: 58, onSale: false, addedDaysAgo: 40 },
    ],
    categories: ["Beauty from within", "Beauty from within › Collagen", "Sleep & stress", "Energy"],
    defaultRules: [
      { field: "tag", value: ["skin", "hydration"] },
      { field: "category", value: ["Beauty from within › Collagen"] },
      { field: "sale", value: ["yes"] },
    ],
    matchesHref: "#",
  },
} satisfies Meta<typeof CollectionProductsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rules: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const ByHand: Story = { args: { defaultMode: "manual", defaultPicked: ["grn"] } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
