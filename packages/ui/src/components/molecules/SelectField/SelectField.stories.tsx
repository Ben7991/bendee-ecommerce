import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectField } from "./SelectField";

const meta = {
  title: "Molecules/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Region",
    className: "max-w-60",
    defaultValue: "greater-accra",
    options: [
      { value: "greater-accra", label: "Greater Accra" },
      { value: "ashanti", label: "Ashanti" },
      { value: "central", label: "Central" },
    ],
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
