import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterButton } from "./FilterButton";

const meta = {
  title: "Molecules/FilterButton",
  component: FilterButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Status" },
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Open filters and an applied one. Check Light, Dark and System. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <FilterButton {...args} />
      <FilterButton {...args} label="Payment" />
      <FilterButton {...args} label="Delivery" />
      <FilterButton {...args} variant="applied" label="Last 7 days" />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
