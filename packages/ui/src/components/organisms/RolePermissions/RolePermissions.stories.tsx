import type { Meta, StoryObj } from "@storybook/react-vite";

import { AREAS, ROLES } from "./data";
import { RolePermissions } from "./RolePermissions";

const meta = {
  title: "Organisms/RolePermissions",
  component: RolePermissions,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { roles: ROLES, areas: AREAS, tableHref: "?tab=roles" },
} satisfies Meta<typeof RolePermissions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Roles tab: the table at every width. */
export const Full: Story = { args: { full: true } };
