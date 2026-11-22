import type { Meta, StoryObj } from "@storybook/react-vite";

import { ENTRY } from "./data";
import { AuditEntry } from "./AuditEntry";

const meta = {
  title: "Organisms/AuditEntry",
  component: AuditEntry,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: ENTRY,
} satisfies Meta<typeof AuditEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** A sentence instead of field changes. */
export const Note: Story = { args: { changes: [], note: "Invite sent to nana@jofak.com as Marketing." } };
