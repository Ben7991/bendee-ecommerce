import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusPill } from "./StatusPill";

const meta = {
  title: "Atoms/StatusPill",
  component: StatusPill,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Scheduled maintenance · in progress", compactLabel: "Maintenance in progress" },
} satisfies Meta<typeof StatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
