import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionMatchesCard } from "./CollectionMatchesCard";

const meta = {
  title: "Organisms/CollectionMatchesCard",
  component: CollectionMatchesCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    count: 12,
    note: "2 out of stock are hidden on the store",
    seeAllHref: "#",
    products: [
      { id: "1", name: "Greens Daily", detail: "GHS 140 · tag: skin", tint: "sage" },
      { id: "2", name: "Ashwagandha · 60", detail: "On sale · GHS 116", tone: "sale", tint: "amber" },
      { id: "3", name: "Energy B · Berry", detail: "GHS 58 · tag: hydration", tint: "citrus" },
      { id: "4", name: "Daily Probiotic", detail: "Out of stock · hidden", tone: "hidden" },
    ],
  },
} satisfies Meta<typeof CollectionMatchesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const NoMatches: Story = { args: { count: 0, products: [], note: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
