import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { id: "keep" },
  render: (args) => (
    <div className="flex items-center gap-2.5">
      <Checkbox {...args} />
      <label htmlFor={args.id} className="font-sans text-sm leading-sm text-text-secondary">
        Keep me signed in on this device
      </label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
/** Some rows selected (table header). */
export const Indeterminate: Story = { args: { checked: "indeterminate" } };
