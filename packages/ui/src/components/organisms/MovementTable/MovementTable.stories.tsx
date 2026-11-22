import type { Meta, StoryObj } from "@storybook/react-vite";

import { MovementTable, type MovementDay } from "./MovementTable";

const days: MovementDay[] = [
  {
    label: "Today · Sun 15 Nov",
    movements: [
      { id: "1", time: "11:42", name: "Ashwagandha Calm · 60 caps", compactName: "Ashwagandha Calm · 60", tint: "amber", change: 48, type: { label: "Received", tone: "success" }, before: 2, after: 50, reference: { label: "Invoice ANS-3381", compact: "ANS-3381" }, by: "Abena M." },
      { id: "2", time: "10:15", name: "Greens Daily · 30 servings", compactName: "Greens Daily · 30", note: "“Crushed lids found while packing”", change: -3, type: { label: "Damaged", tone: "error" }, before: 130, after: 127, reference: { label: "Order JFK-251490", href: "#", compact: "JFK-251490" }, by: "Abena M." },
      { id: "3", time: "09:58", name: "Energy B-Complex · Berry", compactName: "Energy B · Berry", tint: "lavender", change: -2, type: { label: "Sale", tone: "neutral" }, before: 92, after: 90, reference: { label: "Order JFK-251482", href: "#", compact: "JFK-251482" }, by: "System" },
    ],
  },
  {
    label: "Yesterday · Sat 14 Nov",
    movements: [
      { id: "4", time: "17:20", name: "Daily Probiotic · 30 caps", compactName: "Daily Probiotic · 30", tint: "lavender", change: 1, type: { label: "Return restock", tone: "lavender", compactLabel: "Return" }, before: 3, after: 4, reference: { label: "Return RTN-0412", href: "#", compact: "RTN-0412" }, by: "Kofi A." },
      { id: "5", time: "16:05", name: "Ashwagandha Calm · 120 caps", compactName: "Ashwagandha Calm · 120", note: "Shelf count found 2 extra", compactNote: "Shelf count", tint: "amber", change: 2, type: { label: "Recount", tone: "warning" }, before: 16, after: 18, by: "Kofi A." },
    ],
  },
];

const meta = {
  title: "Organisms/MovementTable",
  component: MovementTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { days, summary: "Showing 5 of 214 movements this week", compactSummary: "5 of 214 this week", loadMoreHref: "#" },
} satisfies Meta<typeof MovementTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { days: [] } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
