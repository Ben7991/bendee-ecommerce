import type { Meta, StoryObj } from "@storybook/react-vite";

import { RichTextField } from "./RichTextField";

const meta = {
  title: "Molecules/RichTextField",
  component: RichTextField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "description",
    label: "Description",
    defaultValue:
      "<p>All eight B vitamins in one chewable tablet to help turn food into steady energy, without the crash of another coffee.</p><ul><li>Supports normal energy release and reduced tiredness</li><li>Vegan, no added sugar · 30 tablets, one a day</li></ul>",
    className: "max-w-175",
  },
} satisfies Meta<typeof RichTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: "" } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
