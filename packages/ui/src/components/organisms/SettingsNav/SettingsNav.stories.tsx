import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsNav } from "./SettingsNav";

const meta = {
  title: "Organisms/SettingsNav",
  component: SettingsNav,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { groups: [{ label: "Store", items: [{ href: "/s/profile", label: "Store profile" }, { href: "/s/taxes", label: "Taxes" }] }, { label: "Team", items: [{ href: "/s/staff", label: "Staff & roles", count: 6 }] }], activeHref: "/s/profile" },
} satisfies Meta<typeof SettingsNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** The mobile settings home. */
export const Menu: Story = { args: { variant: "menu" }, globals: { viewport: { value: "mobile", isRotated: false } } };
