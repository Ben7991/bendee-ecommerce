import type { Meta, StoryObj } from "@storybook/react-vite";

import { BackupCodesDialog } from "./BackupCodesDialog";

const meta = {
  title: "Organisms/BackupCodesDialog",
  component: BackupCodesDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { open: true, codes: ["K7QM-2XPA", "9DLR-WN4E", "T3HF-8ZCU", "B6VY-QJ2M", "P4NA-7RKX", "E2WS-5GTD", "H8CJ-MU3L", "Z5RB-K9QW", "U7FX-2NPH", "M3YD-L6AE"], note: "Made just now · 10 of 10 left" },
} satisfies Meta<typeof BackupCodesDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

