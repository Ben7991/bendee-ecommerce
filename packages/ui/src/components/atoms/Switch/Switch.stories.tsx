import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./Switch";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { "aria-label": "Delivering to someone else?" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

/** Cookie settings. */
export const Large: Story = { args: { size: "lg", defaultChecked: true } };
