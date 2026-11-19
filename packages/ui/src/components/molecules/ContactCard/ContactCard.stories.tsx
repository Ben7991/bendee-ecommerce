import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { ContactCard } from "./ContactCard";

const meta = {
  title: "Molecules/ContactCard",
  component: ContactCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    icon: "call",
    title: "Call us",
    detail: "+233 30 000 0000",
    note: "Standard network rates apply.",
    className: "max-w-83",
  },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both tones. Check it in Light, Dark and System from the toolbar. */
export const Tones: Story = {
  render: (args) => (
    <div className="grid max-w-170 gap-4 md:grid-cols-2">
      <ContactCard
        tone="feature"
        icon="whatsapp"
        title="WhatsApp"
        detail="+233 20 000 0000"
        badge="Replies in ~1 hour"
        action={
          <Button size="xs" variant="secondary" asChild>
            <a href="#">Start a chat</a>
          </Button>
        }
      />
      <ContactCard {...args} className="" />
    </div>
  ),
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
