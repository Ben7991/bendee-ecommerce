import type { Meta, StoryObj } from "@storybook/react-vite";

import { GoalGrid } from "./GoalGrid";

const goal = (slug: string, productCount: number) => ({ href: `/collections/${slug}`, productCount });

const meta = {
  title: "Organisms/GoalGrid",
  component: GoalGrid,
  tags: ["autodocs"],
  args: {
    title: (
      <>
        Gentle support for every part of <em>your day.</em>
      </>
    ),
    compactTitle: (
      <>
        Support for every part of <em>your day.</em>
      </>
    ),
    blurb: "Formulas built around how you want to feel — rested, focused, balanced and resilient.",
    viewAllHref: "/shop",
    goals: {
      sleep: goal("sleep", 8),
      focus: goal("focus", 6),
      gut: goal("gut", 5),
      immunity: goal("immunity", 4),
    },
  },
} satisfies Meta<typeof GoalGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
