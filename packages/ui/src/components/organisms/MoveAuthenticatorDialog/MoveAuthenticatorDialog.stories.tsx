import type { Meta, StoryObj } from "@storybook/react-vite";

import { MoveAuthenticatorDialog } from "./MoveAuthenticatorDialog";

const meta = {
  title: "Organisms/MoveAuthenticatorDialog",
  component: MoveAuthenticatorDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { open: true, step: 2, secret: "JFK4 7QX2 M9PL 3RWA", qr: <span className="size-34 bg-text" />, backHref: "?step=1" },
} satisfies Meta<typeof MoveAuthenticatorDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Step 1: confirm with a code from the current phone. */
export const ConfirmIt: Story = { args: { step: 1 } };
/** Step 3: a code from the new phone. */
export const NewCode: Story = { args: { step: 3, error: "Enter the 6-digit code your new phone shows." } };
