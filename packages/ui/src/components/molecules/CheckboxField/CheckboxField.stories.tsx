import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckboxField } from "./CheckboxField";

const meta = {
  title: "Molecules/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Email me wellness notes and offers. Unsubscribe anytime." },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { label: "Keep me signed in on this device", defaultChecked: true } };
