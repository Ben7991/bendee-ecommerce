import type { Meta, StoryObj } from "@storybook/react-vite";

import { CHANNELS } from "./data";
import { NotificationChannels } from "./NotificationChannels";

const meta = {
  title: "Organisms/NotificationChannels",
  component: NotificationChannels,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { channels: CHANNELS },
} satisfies Meta<typeof NotificationChannels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
