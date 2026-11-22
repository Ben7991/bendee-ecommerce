import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentHealthCard } from "./PaymentHealthCard";

const meta = {
  title: "Organisms/PaymentHealthCard",
  component: PaymentHealthCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    summary: "Last 24 hours · 412 payment attempts",
    rate: "90%",
    methods: [
      { name: "MTN MoMo", share: 52, successRate: "94%", tone: "primary" },
      { name: "Telecel Cash", share: 18, successRate: "68%", tone: "warning", degraded: true },
      { name: "AirtelTigo Money", share: 12, successRate: "91%", tone: "brand" },
      { name: "Card", share: 18, successRate: "97%", tone: "muted" },
    ],
    alert: (
      <>
        <strong className="font-semibold">Telecel Cash is below 70%</strong> since 09:00. Likely a network issue, so customers are being
        offered other methods.
      </>
    ),
    className: "xl:w-90",
  },
} satisfies Meta<typeof PaymentHealthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Healthy: Story = { args: { alert: undefined, methods: [{ name: "MTN MoMo", share: 100, successRate: "96%", tone: "primary" }], rate: "96%" } };
/** Legend in two columns beside the donut. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
