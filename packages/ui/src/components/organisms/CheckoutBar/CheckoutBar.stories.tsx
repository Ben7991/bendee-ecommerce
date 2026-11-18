import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckoutBar } from "./CheckoutBar";

const meta = {
  title: "Organisms/CheckoutBar",
  component: CheckoutBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { label: "Total · 4 items", total: "GHS 1,254.60", checkoutHref: "#" },
  globals: { viewport: { value: "mobile", isRotated: false } },
} satisfies Meta<typeof CheckoutBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {};
