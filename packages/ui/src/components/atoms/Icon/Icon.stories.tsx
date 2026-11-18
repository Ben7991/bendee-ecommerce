import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon, ICON_NAMES } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "heart", size: 24 },
  argTypes: { name: { control: "select", options: ICON_NAMES } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The full set. Colour follows the surrounding text colour. */
export const AllIcons: Story = {
  render: (args) => (
    <div className="grid grid-cols-6 gap-6 text-text">
      {ICON_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon {...args} name={name} />
          <code className="text-xs text-text-muted">{name}</code>
        </div>
      ))}
    </div>
  ),
};
