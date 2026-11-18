import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoCard } from "./InfoCard";

const meta = {
  title: "Molecules/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    icon: "truck",
    title: "Already placed an order?",
    children: "It's safe and on its way. We'll keep texting you updates.",
    className: "max-w-85",
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithReference: Story = {
  args: {
    icon: "receipt",
    title: "Still not working?",
    children: (
      <>
        WhatsApp us and quote ref <strong>7F3A-21C9</strong>.
      </>
    ),
  },
};
