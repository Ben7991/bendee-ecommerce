import type { Meta, StoryObj } from "@storybook/react-vite";

import { SecurityDialog } from "./SecurityDialog";

const meta = {
  title: "Molecules/SecurityDialog",
  component: SecurityDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { defaultOpen: true, icon: "lock", title: "Change your password", description: "Last changed 12 Oct", children: <p className="px-6 pb-6 text-sm">Body</p> },
} satisfies Meta<typeof SecurityDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

