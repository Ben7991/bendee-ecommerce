import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectPill } from "./SelectPill";

const meta = {
  title: "Molecules/SelectPill",
  component: SelectPill,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Movement type",
    name: "type",
    options: [
      { value: "", label: "All types" },
      { value: "received", label: "Received" },
      { value: "sale", label: "Sales" },
    ],
  },
} satisfies Meta<typeof SelectPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcon: Story = {
  args: { label: "Period", name: "period", icon: "calendar", options: [{ value: "7d", label: "Last 7 days" }, { value: "30d", label: "Last 30 days" }] },
};
/** 44px page-header button (marketing period). */
export const Large: Story = { args: { ...WithIcon.args, size: "lg" } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
