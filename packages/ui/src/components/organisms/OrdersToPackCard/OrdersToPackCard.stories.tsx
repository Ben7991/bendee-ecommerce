import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrdersToPackCard } from "./OrdersToPackCard";

const meta = {
  title: "Organisms/OrdersToPackCard",
  component: OrdersToPackCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    count: 9,
    viewAllHref: "#",
    printHref: "#",
    orders: [
      { number: "JFK-251482", href: "#", placed: "08:42", customer: "Kwame Asante", area: "East Legon, Accra", items: 3, payment: { label: "Paid · MoMo", tone: "success" }, delivery: "Same day", total: "GHS 412.00" },
      { number: "JFK-251479", href: "#", placed: "08:15", customer: "Efua Owusu", area: "Adum, Kumasi", items: 1, payment: { label: "Cash on delivery", tone: "warning" }, delivery: "Courier", total: "GHS 168.00" },
      { number: "JFK-251477", href: "#", placed: "07:58", customer: "Ama Boateng", area: "Airport Hills, Accra", flag: "2 failed deliveries", items: 4, payment: { label: "Cash on delivery", tone: "warning" }, delivery: "Same day", total: "GHS 596.00" },
      { number: "JFK-251474", href: "#", placed: "Yesterday", customer: "Yaw Darko", area: "Osu, Accra", items: 2, payment: { label: "Paid · Card", tone: "success" }, delivery: "Pickup", total: "GHS 245.00" },
      { number: "JFK-251470", href: "#", placed: "Yesterday", customer: "Akosua Frimpong", area: "Tema Comm. 25", items: 2, payment: { label: "Paid · MoMo", tone: "success" }, delivery: "Next day", total: "GHS 289.00" },
    ],
  },
} satisfies Meta<typeof OrdersToPackCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All six columns from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** Items and Delivery drop out. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Rows with the customer first, and a full-width print button. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
