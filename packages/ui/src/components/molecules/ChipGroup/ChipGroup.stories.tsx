import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChipGroup } from "./ChipGroup";

const diets = [
  { value: "vegan", label: "Vegan" },
  { value: "sugar-free", label: "Sugar free" },
  { value: "gluten-free", label: "Gluten free" },
  { value: "non-gmo", label: "Non-GMO" },
];

const meta = {
  title: "Molecules/ChipGroup",
  component: ChipGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    type: "multiple",
    "aria-label": "Dietary",
    options: diets,
    defaultValue: ["vegan"],
    className: "max-w-68",
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Multi-select facet, lime when selected. */
export const Default: Story = {};

/** "Sort by" in the tablet filter drawer: one choice, evergreen. */
export const Sort: Story = {
  args: {
    type: "single",
    required: true,
    variant: "primary",
    "aria-label": "Sort by",
    defaultValue: "featured",
    className: "max-w-84",
    options: [
      { value: "featured", label: "Featured" },
      { value: "newest", label: "Newest" },
      { value: "best-selling", label: "Best selling" },
      { value: "price-asc", label: "Price ↑" },
      { value: "price-desc", label: "Price ↓" },
    ],
  },
};

/** Price presets: small, single, can be cleared. */
export const Small: Story = {
  args: {
    type: "single",
    size: "sm",
    "aria-label": "Price presets",
    defaultValue: undefined,
    options: [
      { value: "0-200", label: "Under 200" },
      { value: "200-400", label: "200 – 400" },
      { value: "400-", label: "400+" },
    ],
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
