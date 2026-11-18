import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordField } from "./PasswordField";

const meta = {
  title: "Molecules/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-105"><Story /></div>],
  args: { label: "Password", defaultValue: "harmattan-reset" },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NewPassword: Story = {
  args: {
    label: "New password",
    autoComplete: "new-password",
    strength: {
      score: 4,
      label: "Very strong",
      checks: [
        { label: "8+ characters", met: true },
        { label: "Not found in known data leaks", met: true },
      ],
    },
  },
};

export const Confirmed: Story = { args: { label: "Confirm new password", matched: true } };
