import type { Meta, StoryObj } from "@storybook/react-vite";

import { RateTable } from "./RateTable";

const meta = {
  title: "Molecules/RateTable",
  component: RateTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    caption: "Delivery fees and times by area",
    className: "max-w-170",
    rows: [
      { area: "Accra Central", fee: "GHS 25", arrives: "Next day" },
      { area: "Greater Accra outskirts", fee: "GHS 35", arrives: "1–2 days" },
      { area: "Kumasi", fee: "GHS 45", arrives: "2–3 days" },
      { area: "Store pickup, Osu", fee: "Free", arrives: "Same day", free: true },
    ],
  },
} satisfies Meta<typeof RateTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
