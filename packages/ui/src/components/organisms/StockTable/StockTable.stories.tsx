import type { Meta, StoryObj } from "@storybook/react-vite";

import { StockTable, type StockItem } from "./StockTable";

const items: StockItem[] = [
  { id: "ash-60", name: "Ashwagandha Calm · 60 caps", compactName: "Ashwagandha Calm · 60", detail: "JF-ASH-60 · Shelf B2", tint: "amber", onHand: 2, reserved: 2, available: 0, alertAt: 10, value: "GHS 140", status: "out", level: 2, action: { label: "Receive", href: "#", tone: "brand" } },
  { id: "mag", name: "Magnesium Sleep · Gummies", detail: "JF-MAG-30 · Shelf A4", tint: "sage", onHand: 5, reserved: 2, available: 3, alertAt: 10, value: "GHS 400", status: "low", level: 15, action: { label: "Receive", href: "#", tone: "brand" } },
  { id: "grn", name: "Greens Daily · 30 servings", detail: "JF-GRN-30 · Shelf C3", tint: "surface", onHand: 130, reserved: 6, available: 124, alertAt: 15, value: "GHS 6,240", status: "ok", level: 100, action: { label: "Adjust", href: "#" } },
  { id: "gift", name: "Gift wrap", detail: "JF-GIFT · made to order", tracked: false, onHand: 0, reserved: 0, available: 0, alertAt: 0, value: "—", status: "ok", level: 0, action: { label: "Track", href: "#" } },
];

const meta = {
  title: "Organisms/StockTable",
  component: StockTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { items },
} satisfies Meta<typeof StockTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { items: [] } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
