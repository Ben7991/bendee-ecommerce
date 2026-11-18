import type { Meta, StoryObj } from "@storybook/react-vite";

import { Illustration, ILLUSTRATION_NAMES } from "./Illustration";

const meta = {
  title: "Atoms/Illustration",
  component: Illustration,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "moon", className: "size-40" },
  argTypes: { name: { control: "select", options: ILLUSTRATION_NAMES } },
} satisfies Meta<typeof Illustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="inline-flex rounded-xl bg-gradient-feature p-6">
      <Illustration {...args} />
    </div>
  ),
};

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {ILLUSTRATION_NAMES.map((name) => (
        <div key={name} className="flex size-48 items-center justify-center rounded-xl bg-gradient-feature p-4">
          <Illustration name={name} className="size-full" />
        </div>
      ))}
    </div>
  ),
};
