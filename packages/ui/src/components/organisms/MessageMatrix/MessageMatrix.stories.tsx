import type { Meta, StoryObj } from "@storybook/react-vite";

import { MESSAGES } from "./data";
import { MessageMatrix } from "./MessageMatrix";

const meta = {
  title: "Organisms/MessageMatrix",
  component: MessageMatrix,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { messages: MESSAGES, description: "Sent automatically · cart reminders live in Marketing" },
} satisfies Meta<typeof MessageMatrix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
