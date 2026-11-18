import type { Meta, StoryObj } from "@storybook/react-vite";

import { CategoryTile } from "../../molecules";
import { PopularCategories } from "./PopularCategories";

const categories = [
  { label: "Sleep & Stress", count: 14, tint: "sage" },
  { label: "Focus & Energy", count: 12, tint: "sun" },
  { label: "Gut & Digestion", count: 9, tint: "lavender" },
  { label: "Immunity", count: 11, tint: "amber" },
  { label: "Daily Essentials", count: 18, tint: "citrus" },
] as const;

const meta = {
  title: "Organisms/PopularCategories",
  component: PopularCategories,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    children: categories.map((category) => (
      <CategoryTile key={category.label} href="#" tint={category.tint} count={category.count}>
        {category.label}
      </CategoryTile>
    )),
  },
} satisfies Meta<typeof PopularCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
