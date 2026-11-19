import type { Meta, StoryObj } from "@storybook/react-vite";

import { PreferenceToggle } from "./PreferenceToggle";

const meta = {
  title: "Molecules/PreferenceToggle",
  component: PreferenceToggle,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Email newsletter", description: "Opted in 13 Nov 2026 at checkout", defaultChecked: true },
} satisfies Meta<typeof PreferenceToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** On, off and disabled, stacked as in the card. */
export const States: Story = {
  render: () => (
    <div className="max-w-200 rounded-lg border border-border-subtle">
      <PreferenceToggle title="Email newsletter" description="Opted in 13 Nov 2026 at checkout" defaultChecked />
      <PreferenceToggle title="SMS offers" description="Reply STOP to any message to opt out" />
      <PreferenceToggle title="WhatsApp offers" description="Coming soon" disabled />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
