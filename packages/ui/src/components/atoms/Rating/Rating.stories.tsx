import type { Meta, StoryObj } from "@storybook/react-vite";

import { Rating } from "./Rating";

const meta = {
  title: "Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { value: 4.9, count: 3214 },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutCount: Story = { args: { count: undefined } };
