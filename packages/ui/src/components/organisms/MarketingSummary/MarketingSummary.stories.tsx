import type { Meta, StoryObj } from "@storybook/react-vite";

import { MarketingSummary } from "./MarketingSummary";
import { sampleSummary } from "./fixtures";

const meta = {
  title: "Organisms/MarketingSummary",
  component: MarketingSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: sampleSummary,
} satisfies Meta<typeof MarketingSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390): one dark card. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
