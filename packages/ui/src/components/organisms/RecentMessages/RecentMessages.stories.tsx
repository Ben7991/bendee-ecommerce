import type { Meta, StoryObj } from "@storybook/react-vite";

import { RecentMessages } from "./RecentMessages";
import { sampleMessages } from "./fixtures";

const meta = {
  title: "Organisms/RecentMessages",
  component: RecentMessages,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { messages: sampleMessages, viewAll: { href: "#all" } },
} satisfies Meta<typeof RecentMessages>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
