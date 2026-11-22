import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchDialog } from "./SearchDialog";

const meta = {
  title: "Organisms/SearchDialog",
  component: SearchDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    suggestions: ["stress", "stress and sleep", "stress relief gummies", "strength & recovery", "sleep", "magnesium"],
    recent: ["magnesium", "vitamin d3"],
    products: [
      { id: "ashwagandha", name: "Ashwagandha Tablets", href: "#", meta: "Stress & vitality · ★ 4.8", price: 380, tint: "amber" },
      { id: "energy", name: "Energy Capsules", href: "#", meta: "Energy & stress support · ★ 4.9", price: 320, compareAt: 390, tint: "lavender" },
      { id: "greens", name: "Daily Greens Powder", href: "#", meta: "With ashwagandha for stress · ★ 4.9", price: 450, tint: "sage" },
      { id: "magnesium", name: "Magnesium Bisglycinate", href: "#", meta: "Rest · relax · reset", price: 340, tint: "sage", soldOut: true, keywords: ["stress"] },
    ],
    categories: [
      { label: "Sleep & Stress", href: "#", count: 14, tint: "sage" },
      { label: "Adaptogens", href: "#", count: 6, tint: "amber", keywords: ["stress"] },
      { label: "Strength & Recovery", href: "#", count: 5, tint: "lavender", keywords: ["stre"] },
    ],
  },
} satisfies Meta<typeof SearchDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the search button and type "stre". */
export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { args: { trigger: "bar" }, globals: { viewport: { value: "mobile", isRotated: false } } };
