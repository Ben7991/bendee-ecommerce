import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsToggle } from "./SettingsToggle";

const meta = {
  title: "Molecules/SettingsToggle",
  component: SettingsToggle,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "AT Money", description: "Below the 70% alert level since 9 Nov · check Reports", compactDescription: "Below 70% alert level", descriptionTone: "error", leading: "AT", leadingTone: "lavender", stat: "68% success", compactStat: "68%", statTone: "error", name: "at", defaultChecked: true },
} satisfies Meta<typeof SettingsToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
