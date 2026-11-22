import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchBar } from "./SearchBar";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { className: "md:w-140", onSubmit: (event) => event.preventDefault() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
