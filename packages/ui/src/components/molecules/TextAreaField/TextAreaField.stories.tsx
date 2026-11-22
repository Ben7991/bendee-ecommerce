import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextAreaField } from "./TextAreaField";

const meta = {
  title: "Molecules/TextAreaField",
  component: TextAreaField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Delivery note (optional)", placeholder: "e.g. Call when you reach the junction", className: "max-w-186" },
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
