import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchField } from "./SearchField";

const meta = {
  title: "Molecules/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { defaultValue: "stress", submitLabel: "Search" },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: "" } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
