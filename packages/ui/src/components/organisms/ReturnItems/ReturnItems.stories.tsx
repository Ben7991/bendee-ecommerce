import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "../../atoms";
import { ReturnItems } from "./ReturnItems";

const meta = {
  title: "Organisms/ReturnItems",
  component: ReturnItems,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-165",
    defaultSelected: ["greens"],
    defaultReason: "damaged",
    reasons: [
      { value: "damaged", label: "Arrived damaged" },
      { value: "wrong", label: "Not what I ordered" },
      { value: "unopened", label: "Changed my mind (unopened)" },
    ],
    items: [
      {
        id: "greens",
        name: "Daily Greens Powder",
        detail: "Lemon lime · paid GHS 405.00 after discount",
        compactDetail: "Paid GHS 405.00",
        tint: "sage",
        quantity: "Qty 1 of 1",
        compactQuantity: "1 of 1",
        photos: [null, <Icon key="p" name="image" size={28} className="m-auto text-text-muted" />],
      },
      { id: "ashwagandha", name: "Ashwagandha Tablets", detail: "Unopened items only", tint: "amber" },
      { id: "energy", name: "Energy Capsules", detail: "2 bought · choose how many", tint: "lavender" },
    ],
  },
} satisfies Meta<typeof ReturnItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
