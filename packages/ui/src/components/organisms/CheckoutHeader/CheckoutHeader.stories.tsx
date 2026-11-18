import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { CheckoutHeader } from "./CheckoutHeader";

const meta = {
  title: "Organisms/CheckoutHeader",
  component: CheckoutHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { steps: ["Contact", "Delivery", "Payment", "Review & pay"], current: 1, nextLabel: "Next: Payment" },
} satisfies Meta<typeof CheckoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
export const Payment: Story = { args: { mode: "payment", current: 3 } };
export const Done: Story = {
  args: {
    mode: "done",
    help: (
      <>
        Need help? <TextLink href="#" className="no-underline">Chat on WhatsApp</TextLink>
      </>
    ),
  },
};
