import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { DeliveryCard } from "./DeliveryCard";

const meta = {
  title: "Molecules/DeliveryCard",
  component: DeliveryCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "surface" } },
  args: {
    location: "Accra · East Legon",
    detail: "Standard delivery · arrives tomorrow, Sat 14 Nov",
    action: <TextLink href="#" className="text-sm leading-xs">Change</TextLink>,
    className: "max-w-95",
  },
  decorators: [(Story) => <div className="bg-surface-subtle p-6"><Story /></div>],
} satisfies Meta<typeof DeliveryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
