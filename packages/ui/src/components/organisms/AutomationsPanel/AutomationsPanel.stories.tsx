import type { Meta, StoryObj } from "@storybook/react-vite";

import { AutomationsPanel } from "./AutomationsPanel";
import { samplePanel } from "./fixtures";

const meta = {
  title: "Organisms/AutomationsPanel",
  component: AutomationsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: samplePanel,
} satisfies Meta<typeof AutomationsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
