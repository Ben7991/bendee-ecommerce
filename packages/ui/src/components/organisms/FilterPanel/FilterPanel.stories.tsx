import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterPanel, type FilterFacet } from "./FilterPanel";

const sampleFacets: FilterFacet[] = [
  {
    kind: "checkboxes",
    id: "type",
    label: "Product type",
    options: [
      { value: "capsules", label: "Capsules", count: 28 },
      { value: "tablets", label: "Tablets", count: 9 },
      { value: "powders", label: "Powders", count: 12 },
      { value: "gummies", label: "Gummies", count: 8 },
      { value: "liquids", label: "Liquids & drops", count: 7 },
    ],
  },
  {
    kind: "price",
    id: "price",
    label: "Price (GHS)",
    min: 0,
    max: 800,
    defaultValue: [150, 700],
    presets: [
      { value: "0-200", label: "Under 200" },
      { value: "200-400", label: "200 – 400" },
      { value: "400-", label: "400+" },
    ],
  },
  {
    kind: "chips",
    id: "diet",
    label: "Dietary",
    defaultValue: ["vegan"],
    options: [
      { value: "vegan", label: "Vegan" },
      { value: "sugar-free", label: "Sugar free" },
      { value: "gluten-free", label: "Gluten free" },
      { value: "non-gmo", label: "Non-GMO" },
    ],
  },
  {
    kind: "switches",
    id: "availability",
    options: [
      { value: "in-stock", label: "In stock only" },
      { value: "on-sale", label: "On sale" },
    ],
  },
];

const meta = {
  title: "Organisms/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    facets: sampleFacets,
    title: "Filters",
    clearAction: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Clear all
      </a>
    ),
    className: "max-w-68",
  },
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Desktop sidebar. */
export const Default: Story = {};

/** Inside the filter sheet / drawer: no heading row. */
export const InDialog: Story = {
  args: { title: undefined, clearAction: undefined, className: "max-w-84" },
};

export const Mobile: Story = {
  args: { title: undefined, clearAction: undefined, className: undefined },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
