import type { Meta, StoryObj } from "@storybook/react-vite";

import { MEMBERS } from "./data";
import { StaffTable } from "./StaffTable";

const meta = {
  title: "Organisms/StaffTable",
  component: StaffTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { members: MEMBERS, selectedId: "akosua" },
} satisfies Meta<typeof StaffTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

