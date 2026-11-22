import type { Meta, StoryObj } from "@storybook/react-vite";

import { FulfilmentProgress } from "./FulfilmentProgress";

const meta = {
  title: "Organisms/FulfilmentProgress",
  component: FulfilmentProgress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    steps: [
      { label: "Confirmed", detail: "COD verified by SMS · 07:58", compactDetail: "07:58", state: "done" },
      { label: "Processing", detail: "Started by Abena · 08:05", compactDetail: "Abena · 08:05", state: "current" },
      { label: "Packed", detail: "Next step", state: "upcoming" },
      { label: "Handed to courier", detail: "Add tracking no.", state: "upcoming" },
      { label: "Delivered", detail: "Due by 18:00", state: "upcoming" },
    ],
  },
} satisfies Meta<typeof FulfilmentProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The strip (tablet and desktop). */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** The mobile summary. */
export const Compact: Story = { args: { variant: "compact" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
