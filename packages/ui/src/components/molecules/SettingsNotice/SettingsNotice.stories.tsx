import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsNotice } from "./SettingsNotice";

const meta = {
  title: "Molecules/SettingsNotice",
  component: SettingsNotice,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { tone: "warning" as const, children: "Rates are set here, not in code. Confirm any change with your accountant." },
} satisfies Meta<typeof SettingsNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
