import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsShell } from "./SettingsShell";

const meta = {
  title: "Organisms/SettingsShell",
  component: SettingsShell,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { pageTitle: "Store profile", savedAt: "10:42", backHref: "/settings", nav: <nav>Sections</nav>, children: <input name="store" defaultValue="Jofak" aria-label="Store name" /> },
} satisfies Meta<typeof SettingsShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
