import type { Meta, StoryObj } from "@storybook/react-vite";

import { OPTIONS } from "./data";
import { RoleOptions } from "./RoleOptions";

const meta = {
  title: "Molecules/RoleOptions",
  component: RoleOptions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "role", options: OPTIONS, defaultValue: "fulfilment" },
} satisfies Meta<typeof RoleOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

