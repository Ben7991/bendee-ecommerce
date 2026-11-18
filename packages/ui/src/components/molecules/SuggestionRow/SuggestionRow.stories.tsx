import type { Meta, StoryObj } from "@storybook/react-vite";

import { SuggestionRow } from "./SuggestionRow";

const meta = {
  title: "Molecules/SuggestionRow",
  component: SuggestionRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Ashwagandha Tablets", href: "#", meta: "★ 4.8 · GHS 380", tint: "amber", className: "max-w-100" },
} satisfies Meta<typeof SuggestionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
