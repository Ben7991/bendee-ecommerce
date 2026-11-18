import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorefrontShell } from "./StorefrontShell";

const meta = {
  title: "Templates/StorefrontShell",
  component: StorefrontShell,
  tags: ["autodocs"],
  args: {
    children: <div className="flex h-96 items-center justify-center rounded-2xl bg-gradient-hero font-sans text-text">Page sections</div>,
    footer: <div className="flex h-48 items-center justify-center rounded-2xl bg-feature font-sans text-text-inverse">Footer</div>,
  },
} satisfies Meta<typeof StorefrontShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
