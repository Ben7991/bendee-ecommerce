import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerTable, type AdminCustomer } from "./CustomerTable";

const customers: AdminCustomer[] = [
  { id: "1", name: "Akosua Frimpong", href: "#", phone: "020 ••• 1187", location: "Spintex, Accra", tone: "lavender", tags: [{ label: "VIP", tone: "accent" }, { label: "Wholesale", tone: "neutral" }], orders: 22, spent: "GHS 6,120", lastOrder: "10 Nov", marketing: ["SMS", "WA"] },
  { id: "2", name: "Efua Boateng", href: "#", phone: "024 ••• 4521", location: "Osu, Accra", tone: "sage", tags: [{ label: "VIP", tone: "accent" }], orders: 14, spent: "GHS 3,940", lastOrder: "Today, 09:40", compactLastOrder: "Today", marketing: ["SMS", "WA"] },
  { id: "3", name: "Ama Owusu", href: "#", phone: "024 ••• 7703", location: "Comm. 25, Tema", compactLocation: "Tema", tone: "citrus", tags: [{ label: "New", tone: "info" }], orders: 1, spent: "GHS 210", lastOrder: "Yesterday", marketing: ["WA"] },
  { id: "4", name: "Nana Adjei", href: "#", phone: "050 ••• 2268", location: "Madina, Accra", compactLocation: "Madina", guest: true, tags: [], orders: 2, spent: "GHS 345", lastOrder: "3 Nov", marketing: [] },
  { id: "5", name: "Abena Owusu-Ansah", href: "#", phone: "026 ••• 5104", location: "Cape Coast", tone: "neutral", tags: [{ label: "Inactive", tone: "warning" }], orders: 3, spent: "GHS 520", lastOrder: "2 Aug", inactiveDays: 105, marketing: ["SMS", "WA"] },
];

const meta = {
  title: "Organisms/CustomerTable",
  component: CustomerTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { customers, range: "1–8", total: "1,284", note: "phone numbers are masked; opening a profile is logged", nextHref: "#" },
} satisfies Meta<typeof CustomerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { customers: [], range: "0", total: "0", nextHref: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
