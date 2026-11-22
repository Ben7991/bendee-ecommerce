import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionRow } from "./ActionRow";

const meta = {
  title: "Molecules/ActionRow",
  component: ActionRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { icon: "closeCircle", tone: "danger", children: "Cancel order" },
} satisfies Meta<typeof ActionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tone. Check Light, Dark and System. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-90 flex-col gap-1">
      <ActionRow icon="padlock" tone="muted" disabled>
        Edit order · locked once processing starts
      </ActionRow>
      <ActionRow icon="closeCircle" tone="danger">
        Cancel order
      </ActionRow>
      <ActionRow icon="printer">Print invoice</ActionRow>
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
