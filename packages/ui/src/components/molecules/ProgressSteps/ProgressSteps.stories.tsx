import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressSteps } from "./ProgressSteps";

const meta = {
  title: "Molecules/ProgressSteps",
  component: ProgressSteps,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-150",
    steps: [
      { title: "Order placed & paid", time: "Fri 13 Nov, 10:42", state: "done" },
      { title: "Packed at our Accra hub", time: "Fri 13 Nov, 16:10", state: "done" },
      { title: "Out for delivery", detail: "Handed to our delivery partner — we'll text you when it's close", time: "Today, 09:20", state: "current" },
      { title: "Delivered", time: "Expected by 13:00", state: "upcoming" },
    ],
  },
} satisfies Meta<typeof ProgressSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The return status size. */
export const Small: Story = {
  args: {
    size: "sm",
    steps: [
      { title: "Return requested", time: "Mon 09:15", state: "done" },
      { title: "Approved", time: "Mon 14:40", state: "done" },
      { title: "Pickup", time: "Tue 10–14:00", state: "current" },
      { title: "Received & checked", state: "upcoming" },
      { title: "Refunded", time: "Within 3 days", state: "upcoming" },
    ],
  },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
