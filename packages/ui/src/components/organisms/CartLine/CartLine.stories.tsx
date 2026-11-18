import type { Meta, StoryObj } from "@storybook/react-vite";

import { CartLine } from "./CartLine";

const meta = {
  title: "Organisms/CartLine",
  component: CartLine,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-204"><Story /></div>],
  args: {
    item: {
      id: "greens",
      name: "Daily Greens Powder",
      href: "#",
      details: "Lemon lime · 25 servings · One-time purchase",
      compactDetails: "Lemon lime · 25 servings · One-time",
      unitPrice: 450,
      compareAtUnitPrice: 520,
      quantity: 1,
      lineTotal: 450,
      compareAtLineTotal: 520,
      tint: "sage",
      action: { label: "Switch to subscribe & save 20%", href: "#" },
    },
  },
} satisfies Meta<typeof CartLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const MiniCart: Story = { args: { layout: "compact", dense: true } };
export const SoldOut: Story = {
  args: {
    item: {
      id: "magnesium",
      name: "Magnesium Bisglycinate",
      href: "#",
      details: "",
      unitPrice: 340,
      quantity: 1,
      lineTotal: 0,
      tint: "sage",
      soldOut: true,
      action: { label: "Notify me when it's back", href: "#", inMiniCart: true },
    },
  },
};
