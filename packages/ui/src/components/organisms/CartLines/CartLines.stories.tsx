import type { Meta, StoryObj } from "@storybook/react-vite";

import { CartLines } from "./CartLines";

const meta = {
  title: "Organisms/CartLines",
  component: CartLines,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-204"><Story /></div>],
  args: {
    items: [
      { id: "greens", name: "Daily Greens Powder", href: "#", details: "Lemon lime · 25 servings · One-time purchase", compactDetails: "Lemon lime · 25 servings · One-time", unitPrice: 450, compareAtUnitPrice: 520, quantity: 1, lineTotal: 450, compareAtLineTotal: 520, tint: "sage", action: { label: "Switch to subscribe & save 20%", href: "#" } },
      { id: "energy", name: "Energy Capsules", href: "#", details: "30 capsules · One-time purchase", compactDetails: "30 capsules · One-time · GHS 320 each", unitPrice: 320, compareAtUnitPrice: 390, quantity: 2, lineTotal: 640, compareAtLineTotal: 780, tint: "lavender", action: { label: "Switch to subscribe & save 20%", href: "#" } },
      { id: "magnesium", name: "Magnesium Bisglycinate", href: "#", details: "", unitPrice: 340, quantity: 1, lineTotal: 0, tint: "sage", soldOut: true, action: { label: "Notify me when it's back", href: "#", inMiniCart: true } },
    ],
  },
} satisfies Meta<typeof CartLines>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
