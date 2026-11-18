import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { placeholder: "Your email address", "aria-label": "Email address" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inverse: Story = {
  args: { tone: "inverse" },
  render: (args) => (
    <div className="rounded-xl bg-feature p-6">
      <Input {...args} />
    </div>
  ),
};
