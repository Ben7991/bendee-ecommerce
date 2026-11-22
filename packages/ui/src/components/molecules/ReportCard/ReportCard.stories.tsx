import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportCard } from "./ReportCard";

const meta = {
  title: "Molecules/ReportCard",
  component: ReportCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Top products", description: "This period", action: <a href="#all">See all 10 ›</a>, children: <p>Content</p> },
} satisfies Meta<typeof ReportCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
