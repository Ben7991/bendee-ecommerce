import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerPreferences } from "./CustomerPreferences";

const meta = {
  title: "Organisms/CustomerPreferences",
  component: CustomerPreferences,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="grid max-w-90 gap-4 md:max-w-none md:grid-cols-2 xl:max-w-90 xl:grid-cols-1">
        <Story />
      </div>
    ),
  ],
  args: {
    consent: [
      { channel: "sms", label: "SMS offers", compactLabel: "SMS", badge: "SMS", on: true },
      { channel: "whatsapp", label: "WhatsApp", on: true },
      { channel: "email", label: "Email", on: false },
    ],
    consentNote: "Opted in at checkout, 4 Mar 2025. Only the customer can turn consent on.",
    tags: [
      { label: "VIP", tone: "accent" },
      { label: "Greens subscriber", tone: "neutral" },
    ],
    removeTag: "#",
    addTagHref: "#",
    account: [
      { label: "Export customer data", compactLabel: "Export data", href: "#export" },
      { label: "Resend verification", href: "#verify" },
      { label: "Disable account", href: "#disable", danger: true },
      { label: "Delete data on request", compactLabel: "Delete data", href: "#delete", danger: true },
    ],
    mobileNote: "Export, disable or delete data from the ⋯ menu. Revealing contact details is logged.",
  },
} satisfies Meta<typeof CustomerPreferences>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const NoTags: Story = { args: { tags: [] } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
