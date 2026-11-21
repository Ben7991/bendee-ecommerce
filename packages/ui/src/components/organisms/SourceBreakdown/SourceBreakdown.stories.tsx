import type { Meta, StoryObj } from "@storybook/react-vite";

import { SourceBreakdown } from "./SourceBreakdown";
import { sampleSources } from "./fixtures";

const meta = {
  title: "Organisms/SourceBreakdown",
  component: SourceBreakdown,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { sources: sampleSources, note: "Last touch · 412 orders", report: { href: "/admin/reports" } },
} satisfies Meta<typeof SourceBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
