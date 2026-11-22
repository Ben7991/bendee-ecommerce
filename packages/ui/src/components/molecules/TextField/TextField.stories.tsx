import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { TextField } from "./TextField";

const meta = {
  title: "Molecules/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-105"><Story /></div>],
  args: { label: "Email", type: "email", defaultValue: "ama.mensah@gmail.com" },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: undefined, placeholder: "you@example.com" } };
export const WithLabelAction: Story = {
  args: { label: "Password", type: "password", labelAction: <TextLink href="#" className="text-sm leading-xs">Forgot password?</TextLink> },
};
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "ama.mensah@", hint: "Enter a valid email address", hintTone: "error" },
};
export const Disabled: Story = { args: { disabled: true } };
