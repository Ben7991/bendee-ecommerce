import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReturnTable, type AdminReturn } from "./ReturnTable";

const returns: AdminReturn[] = [
  {
    id: "RTN-0418",
    href: "#",
    age: "2h ago",
    attention: true,
    customer: { name: "Efua Boateng", tag: "VIP" },
    order: { number: "JFK-251455", href: "#" },
    item: { name: "Magnesium Sleep", quantity: 1, tint: "sage" },
    reason: { label: "Damaged", tone: "error" },
    photos: 2,
    wants: "Refund",
    value: "GHS 80",
    status: { label: "Requested", tone: "warning" },
    next: { label: "Review", href: "#", primary: true },
  },
  {
    id: "RTN-0415",
    href: "#",
    age: "1 day",
    customer: { name: "Ama Owusu" },
    order: { number: "JFK-251440", href: "#" },
    item: { name: "Greens Daily", quantity: 1 },
    reason: { label: "Changed mind", tone: "neutral" },
    wants: "Refund",
    value: "GHS 70",
    status: { label: "Awaiting item", tone: "lavender", note: "Drop-off at Osu store", compactNote: "Drop-off" },
    next: { label: "Received", intent: "received" },
  },
  {
    id: "RTN-0412",
    href: "#",
    age: "4 days",
    customer: { name: "Nana Adjei", guest: true },
    order: { number: "JFK-251397", href: "#" },
    item: { name: "Daily Probiotic", quantity: 1, tint: "lavender" },
    reason: { label: "Wrong item sent", tone: "neutral" },
    wants: "Refund",
    value: "GHS 90",
    status: { label: "Inspected · OK", tone: "success", note: "Restocked +1 · COD → MoMo", compactNote: "GHS 90" },
    next: { label: "Refund", intent: "refund", primary: true },
  },
];

const meta = {
  title: "Organisms/ReturnTable",
  component: ReturnTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { returns, summary: "3 open returns · customers are notified by SMS at every step", footerLink: { label: "View closed", href: "#" } },
} satisfies Meta<typeof ReturnTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { returns: [], emptyMessage: "No open returns." } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
