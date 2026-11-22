import type { Meta, StoryObj } from "@storybook/react-vite";

import { CategoryTree, type CategoryNode } from "./CategoryTree";

const nodes: CategoryNode[] = [
  { id: "vitamins", name: "Vitamins & minerals", count: 34, children: [{ id: "multi", name: "Multivitamins", count: 12 }, { id: "iron", name: "Iron & B12", count: 8 }, { id: "vitc", name: "Vitamin C", count: 7 }, { id: "zinc", name: "Zinc", count: 7 }] },
  { id: "beauty", name: "Beauty from within", count: 18, children: [{ id: "collagen", name: "Collagen", count: 7, children: [{ id: "marine", name: "Marine collagen", count: 3 }] }, { id: "skin", name: "Skin & hair", count: 11 }] },
  { id: "sleep", name: "Sleep & stress", count: 14, children: [{ id: "ash", name: "Ashwagandha", count: 5 }, { id: "aids", name: "Sleep aids", count: 9 }] },
  { id: "greens", name: "Greens & superfoods", count: 9 },
  { id: "energy", name: "Energy & sports", count: 15, children: [{ id: "electrolytes", name: "Electrolytes", count: 6 }, { id: "pre", name: "Pre-workout", count: 0, hidden: true }] },
];

const meta = {
  title: "Organisms/CategoryTree",
  component: CategoryTree,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { nodes, selectedId: "collagen", defaultExpanded: ["beauty", "collagen", "sleep", "energy"], hrefFor: () => "#", newHref: "#", onReorder: () => {} },
} satisfies Meta<typeof CategoryTree>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag a row by its handle above a sibling; find, expand and collapse. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
