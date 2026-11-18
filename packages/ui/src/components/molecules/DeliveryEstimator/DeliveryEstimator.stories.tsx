import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeliveryEstimator } from "./DeliveryEstimator";

const meta = {
  title: "Molecules/DeliveryEstimator",
  component: DeliveryEstimator,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    location: "Accra · East Legon",
    action: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Change
      </a>
    ),
    options: [
      { label: "Standard delivery", value: "Tomorrow · GHS 25" },
      { label: "Pickup · Osu store", value: "Today · Free" },
    ],
    note: "Add GHS 50 more for free delivery",
    className: "max-w-135",
  },
} satisfies Meta<typeof DeliveryEstimator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
