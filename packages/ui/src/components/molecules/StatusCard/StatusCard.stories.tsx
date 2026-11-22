import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusCard } from "./StatusCard";

const meta = {
  title: "Molecules/StatusCard",
  component: StatusCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    value: "6:00 AM GMT · Sat 15 Nov",
    remaining: { full: "about 2h 15m left", short: "~2h 15m" },
    progress: 45,
    started: "Started 2:00 AM",
    updated: { full: "Last updated 3:45 AM", short: "updated 3:45 AM" },
    className: "md:w-130",
  },
} satisfies Meta<typeof StatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
