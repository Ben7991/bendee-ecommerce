import type { Meta, StoryObj } from "@storybook/react-vite";

import { FilterChip } from "./FilterChip";

const meta = {
  title: "Molecules/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: "GHS 150 – 700",
    "aria-label": "Remove filter: GHS 150 – 700",
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {(["sm", "md", "responsive"] as const).map((size) => (
        <FilterChip key={size} {...args} size={size}>
          Vegan
        </FilterChip>
      ))}
    </div>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <FilterChip {...args} asChild>
      <a href="#">Vegan</a>
    </FilterChip>
  ),
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
