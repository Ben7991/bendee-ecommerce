import type { Meta, StoryObj } from "@storybook/react-vite";

import { Initials } from "./Initials";

const meta = {
  title: "Atoms/Initials",
  component: Initials,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Ama Mensah" },
} satisfies Meta<typeof Initials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Initials {...args} size="md" />
      <Initials {...args} size="lg" />
      <Initials {...args} size="staff" />
      <Initials {...args} size="customer" />
      <Initials {...args} size="activity" />
      <Initials {...args} size="row" />
      <Initials {...args} size="profile" />
      <Initials {...args} size="note" />
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(["sage", "lavender", "amber", "info", "citrus", "neutral"] as const).map((tone) => (
        <Initials key={tone} {...args} size="row" tone={tone} />
      ))}
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
