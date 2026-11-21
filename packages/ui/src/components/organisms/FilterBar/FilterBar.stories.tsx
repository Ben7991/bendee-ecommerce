import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterButton } from "../../molecules";
import { FilterBar } from "./FilterBar";

const meta = {
  title: "Organisms/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    searchLabel: "Search orders",
    placeholder: "Order no., phone, name or email",
    compactPlaceholder: "Order no., phone or name",
    appliedCount: 1,
    sort: {
      defaultValue: "newest",
      options: [
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
        { value: "total", label: "Highest total" },
      ],
    },
    children: (
      <>
        <FilterButton label="Status" />
        <FilterButton label="Payment" />
        <FilterButton label="Delivery" />
        <FilterButton variant="applied" label="Last 7 days" />
      </>
    ),
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One row from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Search on its own row. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Tap the filter button to show the pills and sort. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
