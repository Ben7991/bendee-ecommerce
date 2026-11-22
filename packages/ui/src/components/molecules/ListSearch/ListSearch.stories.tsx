import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListSearch } from "./ListSearch";

const meta = {
  title: "Molecules/ListSearch",
  component: ListSearch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Search customers",
    placeholder: "Name, phone or email",
    filtersHref: "#filters",
  },
} satisfies Meta<typeof ListSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithQuery: Story = { args: { defaultQuery: "Efua" } };

export const WithoutFilters: Story = { args: { filtersHref: undefined } };

export const Desktop: Story = { args: { fieldClassName: "xl:w-70" }, globals: { viewport: { value: "desktop", isRotated: false } } };

/** Filters moves inside the field. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
