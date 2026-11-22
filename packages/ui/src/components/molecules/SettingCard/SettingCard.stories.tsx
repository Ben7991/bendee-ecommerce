import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { SettingCard } from "./SettingCard";

const meta = {
  title: "Molecules/SettingCard",
  component: SettingCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    icon: "download",
    title: "Download your data",
    description: "Profile, addresses, orders, reviews and consent history. Ready within 24 hours — we'll email you a link.",
    compactDescription: "Ready within 24 hours · we'll email a link",
    action: <Button size="sm">Request export</Button>,
    className: "max-w-255",
  },
} satisfies Meta<typeof SettingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both tones. Check it in Light, Dark and System from the toolbar. */
export const Tones: Story = {
  render: (args) => (
    <div className="flex max-w-255 flex-col gap-6">
      <SettingCard {...args} />
      <SettingCard
        tone="danger"
        icon="trash"
        title="Delete my account"
        description="You'll be signed out right away. You have 30 days to change your mind."
        note="Order records are kept without your name or contact details."
        action={
          <Button size="sm" variant="outline" className="border-field border-error text-error">
            Delete account
          </Button>
        }
      />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
