import type { Meta, StoryObj } from "@storybook/react-vite";

import { PillRadioGroup } from "./PillRadioGroup";

const meta = {
  title: "Molecules/PillRadioGroup",
  component: PillRadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Send order updates by",
    defaultValue: "sms",
    options: [
      { value: "sms", label: "SMS" },
      { value: "whatsapp", label: "WhatsApp", tag: "Soon", disabled: true },
      { value: "email", label: "Email" },
    ],
  },
} satisfies Meta<typeof PillRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
