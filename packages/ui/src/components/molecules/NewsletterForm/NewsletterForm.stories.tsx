import type { Meta, StoryObj } from "@storybook/react-vite";

import { NewsletterForm } from "./NewsletterForm";

const meta = {
  title: "Molecules/NewsletterForm",
  component: NewsletterForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onSubmit: (event) => event.preventDefault(), className: "max-w-115" },
} satisfies Meta<typeof NewsletterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Your email for 15% off", submitLabel: "Join" },
};

export const OnFeature: Story = {
  args: { tone: "feature", hint: "Get 15% off your first order. Unsubscribe anytime." },
  render: (args) => (
    <div className="rounded-2xl bg-feature p-8">
      <NewsletterForm {...args} />
    </div>
  ),
};
