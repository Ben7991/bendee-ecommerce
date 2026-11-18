import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { AccountPrompt } from "./AccountPrompt";

const meta = {
  title: "Organisms/AccountPrompt",
  component: AccountPrompt,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-220",
    title: "Save your details for next time",
    description: "Create an account with your phone number — no password, we'll text you a code. Track orders and reorder in one tap.",
    compactDescription: "No password — we'll text you a code. Track orders and reorder in one tap.",
    action: <Button variant="accent" size="md">Create account</Button>,
  },
} satisfies Meta<typeof AccountPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
