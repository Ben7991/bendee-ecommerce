import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderTable, type AdminOrder } from "./OrderTable";

const orders: AdminOrder[] = [
  { id: "251482", number: "JFK-251482", href: "#", placed: "Today, 08:42", customer: "Kwame Asante", phone: "024 ••• 4521", items: 3, amount: 412, total: "GHS 412.00", payment: { method: "MTN MoMo", compactMethod: "MoMo", status: "Paid", tone: "paid" }, status: { label: "To pack", tone: "info" }, delivery: { method: "Same day", area: "East Legon, Accra", compactArea: "East Legon" } },
  { id: "251480", number: "JFK-251480", href: "#", placed: "Today, 08:20", customer: "Esi Addo", phone: "050 ••• 2268", items: 1, amount: 96, total: "GHS 96.00", payment: { method: "Telecel Cash", status: "Awaiting approval", tone: "pending" }, status: { label: "Pending payment", tone: "neutral" }, delivery: { method: "Next day", area: "Asokwa, Kumasi" } },
  { id: "251477", number: "JFK-251477", href: "#", placed: "Today, 07:58", customer: "Ama Boateng", phone: "024 ••• 7781", flag: "2 failed deliveries", items: 4, amount: 596, total: "GHS 596.00", payment: { method: "Cash on delivery", compactMethod: "COD", status: "To collect", tone: "due" }, status: { label: "Processing", tone: "warning" }, delivery: { method: "Same day", area: "Madina, Accra", compactArea: "Madina" } },
  { id: "251471", number: "JFK-251471", href: "#", placed: "Yesterday, 18:05", customer: "Adwoa Sarpong", phone: "027 ••• 3054", items: 5, amount: 642.5, total: "GHS 642.50", payment: { method: "AirtelTigo Money", status: "Paid", tone: "paid" }, status: { label: "Out for delivery", tone: "lavender", note: "Handed to courier" }, delivery: { method: "Same day", area: "Comm. 25, Tema", compactArea: "Tema" } },
  { id: "251463", number: "JFK-251463", href: "#", placed: "Fri, 13 Nov", customer: "Akua Asante", phone: "024 ••• 1189", items: 1, amount: 129, total: "GHS 129.00", payment: { method: "MTN MoMo", status: "Paid", tone: "paid" }, status: { label: "Delivered", tone: "success" }, delivery: { method: "Next day", area: "Cape Coast" } },
  { id: "251460", number: "JFK-251460", href: "#", placed: "Fri, 13 Nov", customer: "Kojo Ampofo", phone: "059 ••• 4402", items: 3, amount: 384, total: "GHS 384.00", payment: { method: "Cash on delivery", status: "Not collected", tone: "pending" }, status: { label: "Delivery failed", tone: "error", note: "Retry Mon, 16 Nov" }, delivery: { method: "Same day", area: "Kasoa" } },
];

const meta = {
  title: "Organisms/OrderTable",
  component: OrderTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    orders,
    loadMoreHref: "#",
    bulkActions: [
      { value: "print", label: "Print pick lists" },
      { value: "pack", label: "Mark packed" },
      { value: "process", label: "Start processing", primary: true },
    ],
    pagination: { page: 1, pageCount: 129, range: "1–10", total: "1,284", hrefFor: () => "#", perPage: { value: 10, options: [10, 25, 50] } },
  },
} satisfies Meta<typeof OrderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tick rows for the bulk bar. All columns from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Items, Payment and Delivery drop out. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Cards and Load more. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
