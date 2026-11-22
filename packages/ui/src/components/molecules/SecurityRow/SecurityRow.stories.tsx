import type { Meta, StoryObj } from "@storybook/react-vite";

import { SecurityRow } from "./SecurityRow";

const meta = {
  title: "Molecules/SecurityRow",
  component: SecurityRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { icon: "lock", title: "Password", description: "Changed 12 Oct · 41 days ago", compactDescription: "Changed 12 Oct", actions: <button type="button">Change password</button> },
} satisfies Meta<typeof SecurityRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Switched on: sage tile and a badge. */
export const On: Story = { args: { icon: "shieldCheck", iconTone: "sage", title: "Authenticator app", badge: "● On", description: "Google Authenticator · set up 2 Sep" } };
