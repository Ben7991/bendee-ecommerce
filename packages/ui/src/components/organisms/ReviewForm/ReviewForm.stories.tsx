import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { ReviewForm } from "./ReviewForm";

const meta = {
  title: "Organisms/ReviewForm",
  component: ReviewForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-186"><Story /></div>],
  args: {
    smsLabel: "Send order updates by SMS to +233 24 412 7781",
    compactSmsLabel: "Send order updates by SMS",
    notice: {
      title: "Keep your phone close",
      text: "After you tap Pay, MTN will send a prompt to 024 412 7781. Enter your MoMo PIN to approve GHS 1,254.60.",
      compactText: "MTN will send a prompt — enter your PIN to approve.",
    },
    payAction: (
      <Button size="xl" className="h-16 w-full gap-3 text-lg leading-base">
        <Icon name="padlock" size={18} /> Pay GHS 1,254.60 with MoMo
      </Button>
    ),
    legal: "By paying you agree to our Terms and Returns policy. Prices include VAT & levies.",
    totals: {
      subtotalLabel: "Subtotal · 4 items",
      subtotal: "GHS 1,394.00",
      discountLabel: "Discount (JOFAK10)",
      discount: "− GHS 139.40",
      deliveryLabel: "Delivery · Standard",
      delivery: "Free",
      total: "GHS 1,254.60",
      taxNote: "Includes VAT & levies of GHS 225.40",
    },
  },
} satisfies Meta<typeof ReviewForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
