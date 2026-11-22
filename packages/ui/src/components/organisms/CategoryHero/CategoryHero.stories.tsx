import type { Meta, StoryObj } from "@storybook/react-vite";

import { BreadcrumbItem, Breadcrumbs, CategoryPill, CategoryPills, SearchBar } from "../../molecules";
import { CategoryHero } from "./CategoryHero";

const goals = [
  { label: "All", count: 64 },
  { label: "Sleep & Stress", count: 14 },
  { label: "Focus & Energy", count: 12 },
  { label: "Gut & Digestion", count: 9 },
  { label: "Immunity", count: 11 },
  { label: "Daily Essentials", count: 18 },
];

const meta = {
  title: "Organisms/CategoryHero",
  component: CategoryHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: (
      <>
        All <em>supplements</em>
      </>
    ),
    description: "Clinically-dosed, third-party tested formulas for sleep, focus, gut health and everyday vitality.",
    compactDescription: "64 products · tested for purity & potency",
    count: 64,
    search: <SearchBar placeholder="Search supplements…" className="h-11" />,
    breadcrumbs: (
      <Breadcrumbs>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Shop</BreadcrumbItem>
        <BreadcrumbItem current itemClassName="hidden md:flex">
          All supplements
        </BreadcrumbItem>
      </Breadcrumbs>
    ),
    pills: (
      <CategoryPills aria-label="Shop by goal">
        {goals.map((goal, index) => (
          <CategoryPill key={goal.label} href="#" active={index === 0} count={goal.count}>
            {goal.label}
          </CategoryPill>
        ))}
      </CategoryPills>
    ),
    className: "md:p-3 xl:p-4",
  },
} satisfies Meta<typeof CategoryHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
