import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaymentBadge } from "../../atoms";
import { StepCard } from "./StepCard";

const meta = {
  title: "Molecules/StepCard",
  component: StepCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-210 bg-surface-subtle p-6"><Story /></div>],
  args: {
    status: "done",
    number: 2,
    title: "Delivery",
    detail: "14 Lagos Avenue, East Legon, Accra · Opposite the Shell filling station, blue gate",
    compactDetail: "14 Lagos Ave, East Legon, Accra",
    meta: "Standard · arrives tomorrow, Sat 14 Nov · Free",
    compactMeta: "Standard · tomorrow, Sat 14 Nov · Free",
    editHref: "#",
  },
} satisfies Meta<typeof StepCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {};
export const DoneMobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const DoneWithBadge: Story = {
  args: { number: 3, title: "Payment", detail: "Mobile Money · +233 24 412 7781", compactDetail: "MTN MoMo · +233 24 412 7781", meta: undefined, leading: <PaymentBadge brand="mtn" size="xs" /> },
};
export const Pending: Story = { args: { status: "pending", number: 3, title: "Payment", hint: "MoMo, card or pay on delivery" } };
