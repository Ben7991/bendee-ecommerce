import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemePicker } from "./ThemePicker";

const meta = {
  title: "Organisms/ThemePicker",
  component: ThemePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-255",
    note: "System matches your phone or computer, and switches at night if your device does. You can also change this from the footer on any page.",
  },
} satisfies Meta<typeof ThemePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Wired to the toolbar's theme: picking a card changes the whole preview. */
export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
