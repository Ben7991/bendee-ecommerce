import type { Meta, StoryObj } from "@storybook/react-vite";

import { GROUPS } from "./data";
import { AuditLog } from "./AuditLog";

const meta = {
  title: "Organisms/AuditLog",
  component: AuditLog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { groups: GROUPS },
} satisfies Meta<typeof AuditLog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** No entries match the filters. */
export const Empty: Story = { args: { groups: [] } };
