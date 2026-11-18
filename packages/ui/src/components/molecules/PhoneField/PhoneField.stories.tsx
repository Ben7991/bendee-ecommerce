import type { Meta, StoryObj } from "@storybook/react-vite";

import { PhoneField } from "./PhoneField";

const meta = {
  title: "Molecules/PhoneField",
  component: PhoneField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-95"><Story /></div>],
  args: { defaultValue: "24 412 7781" },
} satisfies Meta<typeof PhoneField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: undefined, placeholder: "24 123 4567" } };
