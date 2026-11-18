import type { Meta, StoryObj } from "@storybook/react-vite";

import { MinimalShell } from "./MinimalShell";

const meta = {
  title: "Templates/MinimalShell",
  component: MinimalShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    helpHref: "#",
    copyright: "© 2026 Jofak. All rights reserved.",
    tagline: "Clean, plant-powered supplements · Accra",
    children: <div className="flex flex-1 items-center justify-center p-10 font-sans text-text-muted">Page content</div>,
  },
} satisfies Meta<typeof MinimalShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
