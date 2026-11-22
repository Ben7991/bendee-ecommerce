import type { Meta, StoryObj } from "@storybook/react-vite";

import { AnnouncementBar } from "./AnnouncementBar";

const meta = {
  title: "Organisms/AnnouncementBar",
  component: AnnouncementBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    items: [
      { icon: "truck", label: "Delivery in Accra within 24h" },
      { icon: "phone", label: "Pay with MoMo or card" },
      { icon: "shieldCheck", label: "Free delivery over GHS 500" },
    ],
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
