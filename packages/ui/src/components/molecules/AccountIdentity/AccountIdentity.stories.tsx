import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountIdentity } from "./AccountIdentity";

const meta = {
  title: "Molecules/AccountIdentity",
  component: AccountIdentity,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Ama Mensah", detail: "+233 24 412 7781" },
} satisfies Meta<typeof AccountIdentity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
