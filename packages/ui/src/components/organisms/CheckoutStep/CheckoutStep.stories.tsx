import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { CheckoutStep } from "./CheckoutStep";

const meta = {
  title: "Organisms/CheckoutStep",
  component: CheckoutStep,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-210 bg-surface-subtle p-6"><Story /></div>],
  args: {
    number: 2,
    title: "Delivery",
    description: "Where should we bring your order?",
    compactTitle: (
      <>
        Where to <em>deliver?</em>
      </>
    ),
    children: <div className="h-40 rounded-md bg-surface" />,
    footer: (
      <>
        <p className="font-sans text-sm text-text-muted">Saved to this checkout — you can come back to it.</p>
        <Button size="md" className="py-4 md:px-7">
          Continue to payment <Icon name="arrowRight" size={16} />
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof CheckoutStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
