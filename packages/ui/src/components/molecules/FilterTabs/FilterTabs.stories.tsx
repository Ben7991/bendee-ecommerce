import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { FilterTabs } from "./FilterTabs";

const options = ["All", "Capsules", "Powders", "Gummies", "Bundles"].map((label) => ({
  value: label.toLowerCase(),
  label,
}));

const meta = {
  title: "Molecules/FilterTabs",
  component: FilterTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { options, value: "all", onValueChange: () => {}, "aria-label": "Filter bestsellers" },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <FilterTabs {...args} value={value} onValueChange={setValue} />;
  },
} satisfies Meta<typeof FilterTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
