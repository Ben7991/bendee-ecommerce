import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordStrength } from "./PasswordStrength";

const checks = [
  { label: "8+ characters", met: true },
  { label: "Not found in known data leaks", met: true },
];

const meta = {
  title: "Molecules/PasswordStrength",
  component: PasswordStrength,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-105"><Story /></div>],
  args: { score: 3, label: "Strong", checks },
} satisfies Meta<typeof PasswordStrength>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Strong: Story = {};
export const VeryStrong: Story = { args: { score: 4, label: "Very strong" } };
export const Fair: Story = { args: { score: 2, label: "Fair", checks: [checks[0]!, { ...checks[1]!, met: false }] } };
export const Weak: Story = { args: { score: 1, label: "Weak", checks: [{ ...checks[0]!, met: false }, checks[1]!] } };
