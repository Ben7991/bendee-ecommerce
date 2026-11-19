import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon, TextLink } from "../../atoms";
import { SummaryCard } from "./SummaryCard";

const meta = {
  title: "Molecules/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Default address",
    action: <TextLink href="#">Manage</TextLink>,
    className: "max-w-85",
    children: <p className="text-sm leading-sm text-text-secondary">14 Lagos Avenue, East Legon</p>,
  },
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both tones. Check it in Light, Dark and System from the toolbar. */
export const Tones: Story = {
  render: (args) => (
    <div className="flex max-w-85 flex-col gap-4">
      <SummaryCard {...args} />
      <SummaryCard
        tone="feature"
        eyebrow="Subscription"
        action={<TextLink href="#" tone="inverse">Manage</TextLink>}
        footer={
          <>
            <Icon name="calendar" size={14} className="text-accent" /> Next delivery <strong>Tue 25 Nov</strong>
          </>
        }
      >
        <p className="text-md leading-sm font-semibold">Ashwagandha Tablets</p>
      </SummaryCard>
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
