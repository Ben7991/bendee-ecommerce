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
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
