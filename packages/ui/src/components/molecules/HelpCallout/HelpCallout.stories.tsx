import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { HelpCallout } from "./HelpCallout";

const meta = {
  title: "Molecules/HelpCallout",
  component: HelpCallout,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Still need help?",
    description: "Message us on WhatsApp, Mon–Sat, 8am–7pm. We usually reply within the hour.",
    action: (
      <Button size="sm" asChild>
        <a href="#">Chat on WhatsApp</a>
      </Button>
    ),
    className: "max-w-170",
  },
} satisfies Meta<typeof HelpCallout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both tones. Check it in Light, Dark and System from the toolbar. */
export const Tones: Story = {
  render: (args) => (
    <div className="flex max-w-170 flex-col gap-6">
      <HelpCallout {...args} tone="subtle" />
      <HelpCallout
        tone="feature"
        title="Not sure where to start?"
        description="Take the 60-second quiz and we'll suggest a routine."
        action={
          <Button size="sm" variant="accent" asChild>
            <a href="#">Take the quiz</a>
          </Button>
        }
      />
    </div>
  ),
};

/** Paper mobile artboard width (390): stacked, full-width action. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
