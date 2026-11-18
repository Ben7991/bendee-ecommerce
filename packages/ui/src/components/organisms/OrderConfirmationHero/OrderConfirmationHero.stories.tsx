import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderConfirmationHero } from "./OrderConfirmationHero";

const meta = {
  title: "Organisms/OrderConfirmationHero",
  component: OrderConfirmationHero,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Order JFK-250184 · Paid",
    title: (
      <>
        Thank you, <em>Ama</em>
      </>
    ),
    description: (
      <>
        Your order is confirmed and arrives <strong>tomorrow, Sat 14 Nov</strong>.
        <br />
        We&apos;ve texted the details to +233 24 412 7781.
      </>
    ),
    compactDescription: (
      <>
        Arriving <strong>tomorrow, Sat 14 Nov</strong>.
        <br />
        Details sent to +233 24 412 7781.
      </>
    ),
  },
} satisfies Meta<typeof OrderConfirmationHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
