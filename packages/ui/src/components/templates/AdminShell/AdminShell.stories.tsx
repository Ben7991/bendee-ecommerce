import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminShell } from "./AdminShell";

const meta = {
  title: "Templates/AdminShell",
  component: AdminShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    sidebar: <aside className="hidden w-19 shrink-0 border-r border-border-subtle bg-surface-subtle md:block xl:w-62" />,
    topBar: <header className="h-15 shrink-0 border-b border-border-subtle bg-surface-subtle md:h-17" />,
    tabBar: <nav className="fixed inset-x-0 bottom-0 h-19 border-t border-border-subtle bg-surface-subtle md:hidden" />,
    children: (
      <>
        <div className="h-24 rounded-lg bg-surface" />
        <div className="h-64 rounded-lg bg-surface" />
      </>
    ),
  },
} satisfies Meta<typeof AdminShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
