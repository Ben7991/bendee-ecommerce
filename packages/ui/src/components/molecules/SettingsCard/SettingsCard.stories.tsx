import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsCard } from "./SettingsCard";

const meta = {
  title: "Molecules/SettingsCard",
  component: SettingsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Brand", description: "Shown on the storefront, receipts, emails and SMS", action: <a href="/settings/delivery">+ Add</a>, children: <p>Fields</p> },
} satisfies Meta<typeof SettingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
