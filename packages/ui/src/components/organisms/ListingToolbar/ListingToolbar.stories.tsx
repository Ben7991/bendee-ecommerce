import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { FilterChip, PillSelect } from "../../molecules";
import { ListingToolbar } from "./ListingToolbar";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

const meta = {
  title: "Organisms/ListingToolbar",
  component: ListingToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    range: "1–24",
    total: 41,
    filters: (
      <Button size="md" className="w-full gap-2 p-3 md:w-auto md:py-2.5 md:pr-2.5 md:pl-4 xl:hidden">
        <Icon name="sliders" size={16} />
        Filters
      </Button>
    ),
    sort: <PillSelect label="Sort products" prefix="Sort:" options={sorts} />,
    compactSort: <PillSelect label="Sort products" variant="block" options={sorts} />,
    chips: (
      <>
        <FilterChip aria-label="Remove filter: GHS 150 – 700">GHS 150 – 700</FilterChip>
        <FilterChip aria-label="Remove filter: Vegan">Vegan</FilterChip>
      </>
    ),
    clearAction: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Clear all
      </a>
    ),
  },
} satisfies Meta<typeof ListingToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoFilters: Story = {
  args: { chips: undefined, clearAction: undefined },
};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};

/** Search results: no applied filters, "Showing 8 results". */
export const SearchResults: Story = {
  args: {
    chips: undefined,
    clearAction: undefined,
    summary: (
      <>
        Showing <strong>8</strong> results
      </>
    ),
  },
};
