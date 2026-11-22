import type { Meta, StoryObj } from "@storybook/react-vite";

import { SwitchField } from "./SwitchField";

const meta = {
  title: "Molecules/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Delivering to someone else?" },
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
