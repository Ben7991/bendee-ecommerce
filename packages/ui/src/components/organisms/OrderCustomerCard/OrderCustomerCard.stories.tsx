import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderCustomerCard } from "./OrderCustomerCard";

const meta = {
  title: "Organisms/OrderCustomerCard",
  component: OrderCustomerCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "Ama Boateng",
    stats: "4 orders · GHS 1,820 spent · since Mar 2026",
    compactStats: "4 orders",
    phone: { masked: "024 ••• 5530", full: "024 418 5530" },
    email: { masked: "a•••••@gmail.com", full: "ama.boateng@gmail.com" },
    profileHref: "#",
    className: "xl:w-90",
  },
} satisfies Meta<typeof OrderCustomerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Show" reveals the contact details. */
export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
