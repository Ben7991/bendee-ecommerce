import type { Meta, StoryObj } from "@storybook/react-vite";

import { CategoryTile } from "./CategoryTile";

const categories = [
  { label: "Sleep & Stress", count: 14, tint: "sage" },
  { label: "Focus & Energy", count: 12, tint: "sun" },
  { label: "Gut & Digestion", count: 9, tint: "lavender" },
  { label: "Immunity", count: 11, tint: "amber" },
  { label: "Daily Essentials", count: 18, tint: "citrus" },
] as const;

const meta = {
  title: "Molecules/CategoryTile",
  component: CategoryTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", count: 14, children: "Sleep & Stress" },
} satisfies Meta<typeof CategoryTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tint as tiles (no-results page). */
export const Tiles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => (
        <CategoryTile key={category.label} href="#" tint={category.tint} count={category.count}>
          {category.label}
        </CategoryTile>
      ))}
    </div>
  ),
};

/** Rows (search overlay). */
export const Rows: Story = {
  render: () => (
    <div className="flex max-w-75 flex-wrap gap-2 md:flex-col">
      {categories.slice(0, 3).map((category) => (
        <CategoryTile key={category.label} href="#" variant="row" compactCount tint={category.tint} count={category.count}>
          {category.label}
        </CategoryTile>
      ))}
    </div>
  ),
};

export const Mobile: Story = { render: Tiles.render, globals: { viewport: { value: "mobile", isRotated: false } } };
