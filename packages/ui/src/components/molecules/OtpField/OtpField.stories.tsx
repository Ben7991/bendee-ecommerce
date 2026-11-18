import type { Meta, StoryObj } from "@storybook/react-vite";

import { OtpField } from "./OtpField";

const meta = {
  title: "Molecules/OtpField",
  component: OtpField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-105"><Story /></div>],
} satisfies Meta<typeof OtpField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
/** Paper state: four digits typed, the fifth box active. */
export const PartlyFilled: Story = { args: { defaultValue: "4820" } };
export const Complete: Story = { args: { defaultValue: "482019" } };
export const Disabled: Story = { args: { defaultValue: "4820", disabled: true } };
