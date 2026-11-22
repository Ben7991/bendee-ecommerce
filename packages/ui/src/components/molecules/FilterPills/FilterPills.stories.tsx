import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterPill, FilterPills } from "./FilterPills";

const meta = {
  title: "Molecules/FilterPills",
  component: FilterPills,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <FilterPills {...args} aria-label="Filter orders">
      <FilterPill href="#" active>All · 4</FilterPill>
      <FilterPill href="#">In progress</FilterPill>
      <FilterPill href="#">Delivered</FilterPill>
      <FilterPill href="#">Cancelled</FilterPill>
    </FilterPills>
  ),
} satisfies Meta<typeof FilterPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
