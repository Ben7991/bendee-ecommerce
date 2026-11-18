import type { Meta, StoryObj } from "@storybook/react-vite";

import { ShareLinks } from "./ShareLinks";

const meta = {
  title: "Molecules/ShareLinks",
  component: ShareLinks,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    url: "https://jofak.com/products/daily-greens-powder?utm_source=share",
    message: "Daily Greens Powder on Jofak:",
    note: "FDA disclaimer applies*",
    className: "max-w-135",
  },
} satisfies Meta<typeof ShareLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
