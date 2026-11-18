import type { Meta, StoryObj } from "@storybook/react-vite";

import { SupplementFacts } from "./SupplementFacts";

const meta = {
  title: "Organisms/SupplementFacts",
  component: SupplementFacts,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    serving: "Serving size 1 scoop (9.4 g) · 25 servings per container",
    rows: [
      { name: "Calories", amount: "35" },
      { name: "Dietary fibre", amount: "2 g", dailyValue: "7%" },
      { name: "Vitamin C", amount: "60 mg", dailyValue: "67%" },
      { name: "Organic greens blend", amount: "5.2 g", dailyValue: "†" },
      { name: "Probiotics", amount: "7 billion CFU", dailyValue: "†" },
    ],
    footnote: "† Daily value not established. Other ingredients: monk fruit, natural lemon & lime flavour, citric acid.",
    className: "max-w-130",
  },
} satisfies Meta<typeof SupplementFacts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Bare: Story = { args: { bare: true } };
export const Mobile: Story = {
  args: { bare: true },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
