import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReturnProgress } from "./ReturnProgress";

const labels = ["Requested", "Approved", "Item back", "Inspected", "Refunded"];

const meta = {
  title: "Organisms/ReturnProgress",
  component: ReturnProgress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    next: "approve or reject",
    steps: labels.map((label, index) => ({ label, state: index === 0 ? "current" : "upcoming" })),
  },
} satisfies Meta<typeof ReturnProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Requested: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Inspected: Story = {
  args: { next: "refund", steps: labels.map((label, index) => ({ label, state: index < 3 ? "done" : index === 3 ? "current" : "upcoming" })) },
};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
