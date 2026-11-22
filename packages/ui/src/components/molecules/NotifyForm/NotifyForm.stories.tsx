import type { Meta, StoryObj } from "@storybook/react-vite";

import { NotifyForm } from "./NotifyForm";

const meta = {
  title: "Molecules/NotifyForm",
  component: NotifyForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof NotifyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
