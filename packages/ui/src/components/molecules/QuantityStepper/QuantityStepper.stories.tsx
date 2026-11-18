import type { Meta, StoryObj } from "@storybook/react-vite";

import { QuantityStepper } from "./QuantityStepper";

const meta = {
  title: "Molecules/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { value: 2, label: "Energy Capsules" },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const AtMinimum: Story = { args: { value: 1 } };
export const Disabled: Story = { args: { value: 1, disabled: true } };
