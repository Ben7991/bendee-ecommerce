import type { Meta, StoryObj } from "@storybook/react-vite";

import { CategoryPill, CategoryPills } from "./CategoryPills";

const goals = [
  { label: "All", count: 64 },
  { label: "Sleep & Stress", count: 14 },
  { label: "Focus & Energy", count: 12 },
  { label: "Gut & Digestion", count: 9 },
  { label: "Immunity", count: 11 },
  { label: "Daily Essentials", count: 18 },
];

const meta = {
  title: "Molecules/CategoryPills",
  component: CategoryPills,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Shop by goal",
    className: "rounded-2xl bg-sage-200 p-6",
    children: goals.map((goal, index) => (
      <CategoryPill key={goal.label} href="#" active={index === 0} count={goal.count}>
        {goal.label}
      </CategoryPill>
    )),
  },
} satisfies Meta<typeof CategoryPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
