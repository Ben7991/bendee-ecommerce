import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChipGroup } from "../../molecules";
import { FilterPanel } from "../FilterPanel";
import { FilterDialog } from "./FilterDialog";

const panel = (
  <FilterPanel
    facets={[
      {
        kind: "checkboxes",
        id: "type",
        label: "Product type",
        options: [
          { value: "capsules", label: "Capsules", count: 28 },
          { value: "tablets", label: "Tablets", count: 9 },
          { value: "powders", label: "Powders", count: 12 },
        ],
      },
      {
        kind: "price",
        id: "price",
        label: "Price (GHS)",
        min: 0,
        max: 800,
        defaultValue: [150, 700],
      },
      {
        kind: "chips",
        id: "diet",
        label: "Dietary",
        defaultValue: ["vegan"],
        options: [
          { value: "vegan", label: "Vegan" },
          { value: "sugar-free", label: "Sugar free" },
        ],
      },
    ]}
  />
);

const meta = {
  title: "Organisms/FilterDialog",
  component: FilterDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    appliedCount: 2,
    summary: "2 applied · 41 results",
    submitLabel: "Show 41 results",
    sort: (
      <ChipGroup
        type="single"
        required
        variant="primary"
        aria-label="Sort by"
        defaultValue="featured"
        options={[
          { value: "featured", label: "Featured" },
          { value: "newest", label: "Newest" },
          { value: "best-selling", label: "Best selling" },
        ]}
      />
    ),
    children: panel,
  },
} satisfies Meta<typeof FilterDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  args: { open: true },
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const NoneApplied: Story = {
  args: { appliedCount: 0, summary: "41 results" },
};
export const Mobile: Story = {
  args: { open: true },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
