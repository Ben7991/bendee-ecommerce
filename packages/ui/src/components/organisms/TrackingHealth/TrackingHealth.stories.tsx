import type { Meta, StoryObj } from "@storybook/react-vite";

import { TrackingHealth } from "./TrackingHealth";
import { sampleTracking } from "./fixtures";

const meta = {
  title: "Organisms/TrackingHealth",
  component: TrackingHealth,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: sampleTracking,
} satisfies Meta<typeof TrackingHealth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Debug events open: the latest events and which trackers got them. */
export const WithEvents: Story = {
  args: {
    events: [
      { id: "e1", time: "10:42", label: "Purchase · JFK-251502 · GHS 236", tracker: "Meta", received: true },
      { id: "e2", time: "10:42", label: "Purchase · JFK-251502 · GHS 236", tracker: "GA4", received: false },
    ],
  },
};
