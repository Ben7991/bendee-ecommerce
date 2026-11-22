import type { Meta, StoryObj } from "@storybook/react-vite";

import { TaskTile } from "./TaskTile";

const meta = {
  title: "Molecules/TaskTile",
  component: TaskTile,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { href: "#", icon: "box", value: "9", label: "Orders to pack", className: "w-54" },
} satisfies Meta<typeof TaskTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Check it in Light, Dark and System from the toolbar. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <TaskTile {...args} />
      <TaskTile {...args} icon="scooter" value="11" label="Out for delivery" />
      <TaskTile {...args} tone="citrus" icon="card" value="3" label="Failed payments, 24 h" />
      <TaskTile
        {...args}
        tone="sun"
        icon="banknote"
        value={
          <>
            <span className="text-14 text-text-secondary">GHS </span>1,240
          </>
        }
        label="Cash on delivery to remit"
      />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
