import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReasonPicker } from "./ReasonPicker";

const meta = {
  title: "Molecules/ReasonPicker",
  component: ReasonPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "reason",
    defaultValue: "customer",
    options: [
      { value: "customer", label: "Customer asked to cancel" },
      { value: "unreachable", label: "Couldn't reach customer" },
      { value: "stock", label: "Out of stock" },
      { value: "fraud", label: "Suspected fraud" },
      { value: "other", label: "Other" },
    ],
    className: "max-w-120",
  },
} satisfies Meta<typeof ReasonPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NothingChosen: Story = { args: { defaultValue: undefined } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
