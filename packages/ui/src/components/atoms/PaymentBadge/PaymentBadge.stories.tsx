import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentBadge } from "./PaymentBadge";

const meta = {
  title: "Atoms/PaymentBadge",
  component: PaymentBadge,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { brand: "mtn" },
} satisfies Meta<typeof PaymentBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1.5">
      <PaymentBadge brand="mtn" />
      <PaymentBadge brand="telecel" />
      <PaymentBadge brand="airteltigo" />
      <PaymentBadge brand="visa" />
      <PaymentBadge brand="mastercard" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5"><PaymentBadge brand="mtn" size="sm" /><PaymentBadge brand="telecel" size="sm" /><PaymentBadge brand="airteltigo" size="sm" /><PaymentBadge brand="visa" size="sm" /></div>
      <div className="flex gap-1.5"><PaymentBadge brand="mtn" size="xs" /></div>
    </div>
  ),
};
