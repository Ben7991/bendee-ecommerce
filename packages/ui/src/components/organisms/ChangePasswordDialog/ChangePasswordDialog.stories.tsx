import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChangePasswordDialog } from "./ChangePasswordDialog";

const meta = {
  title: "Organisms/ChangePasswordDialog",
  component: ChangePasswordDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { open: true, lastChanged: "Last changed 12 Oct", otherDevices: "iPhone · Safari", forbidden: ["Abena", "Mensah", "abena"] },
} satisfies Meta<typeof ChangePasswordDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** After a failed attempt. */
export const WithError: Story = { args: { error: "That isn’t your current password." } };
