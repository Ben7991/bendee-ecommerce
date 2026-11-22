import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerBuysMost } from "./CustomerBuysMost";

const meta = {
  title: "Organisms/CustomerBuysMost",
  component: CustomerBuysMost,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    meta: "Across 14 orders",
    products: [
      { id: "1", name: "Greens Daily", detail: "9 tubs · every ~4 wks" },
      { id: "2", name: "Magnesium Sleep", detail: "5 jars", tint: "sage" },
      { id: "3", name: "Ashwagandha", detail: "3 bottles", tint: "amber" },
    ],
  },
} satisfies Meta<typeof CustomerBuysMost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
