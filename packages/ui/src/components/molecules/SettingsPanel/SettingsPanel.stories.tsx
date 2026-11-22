import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsPanel } from "./SettingsPanel";

const meta = {
  title: "Molecules/SettingsPanel",
  component: SettingsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Standard delivery", toggle: { name: "standard", defaultChecked: true }, children: <p>Fee and arrival fields</p> },
} satisfies Meta<typeof SettingsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
