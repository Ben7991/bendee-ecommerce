import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsField } from "./SettingsField";

const meta = {
  title: "Molecules/SettingsField",
  component: SettingsField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Largest order allowed", name: "codLimit", defaultValue: "600", prefix: "GHS", hint: "Bigger orders must be paid by MoMo or card" },
} satisfies Meta<typeof SettingsField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

export const ReadOnly: Story = { args: { label: "SMS sender name", defaultValue: "JOFAK", mono: true, readOnly: true, aside: <span className="text-success">Approved</span> } };
