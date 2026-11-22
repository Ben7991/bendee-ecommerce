import type { Meta, StoryObj } from "@storybook/react-vite";

import { PillSelect } from "./PillSelect";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const meta = {
  title: "Molecules/PillSelect",
  component: PillSelect,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { options: sorts, prefix: "Sort:", label: "Sort products" },
} satisfies Meta<typeof PillSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex max-w-87.5 flex-col items-start gap-4">
      <PillSelect {...args} variant="inline" />
      <PillSelect
        variant="compact"
        label="Products per page"
        options={[
          { value: "24", label: "24" },
          { value: "48", label: "48" },
        ]}
      />
      <PillSelect {...args} prefix={undefined} variant="block" />
    </div>
  ),
};

export const Mobile: Story = {
  args: { variant: "block", prefix: undefined },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
