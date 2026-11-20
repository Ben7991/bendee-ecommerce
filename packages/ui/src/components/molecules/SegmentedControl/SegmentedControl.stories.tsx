import type { Meta, StoryObj } from "@storybook/react-vite";

import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Date range",
    defaultValue: "today",
    options: [
      { value: "today", label: "Today" },
      { value: "7d", label: "7 days" },
      { value: "30d", label: "30 days" },
      { value: "custom", label: "Custom", hideOnMobile: true },
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** "Custom" hides below 768px. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
