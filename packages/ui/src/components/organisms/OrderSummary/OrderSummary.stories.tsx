import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { AppliedCode, DeliveryCard } from "../../molecules";
import { OrderSummary } from "./OrderSummary";

const meta = {
  title: "Organisms/OrderSummary",
  component: OrderSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    checkoutHref: "#",
    totals: {
      subtotalLabel: "Subtotal · 4 items",
      subtotal: "GHS 1,394.00",
      discountLabel: "Discount (JOFAK10)",
      discount: "− GHS 139.40",
      delivery: "Free",
      total: "GHS 1,254.60",
      taxNote: "Includes VAT & levies of GHS 225.40",
      savings: "You save GHS 425.40",
    },
    discount: <AppliedCode code="JOFAK10" description="10% off order" />,
    delivery: (
      <DeliveryCard
        location="Accra · East Legon"
        detail="Standard delivery · arrives tomorrow, Sat 14 Nov"
        action={<TextLink href="#" className="text-sm leading-xs">Change</TextLink>}
      />
    ),
  },
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
