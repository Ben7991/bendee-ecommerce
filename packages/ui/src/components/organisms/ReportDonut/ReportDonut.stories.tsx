import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportDonut } from "./ReportDonut";

const meta = {
  title: "Organisms/ReportDonut",
  component: ReportDonut,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Payment health", description: "1,084 payment attempts via Paystack", center: { value: "88%", label: "succeeded" }, segments: [{ label: "Succeeded", value: 954, tone: "success" as const }, { label: "Failed", value: 87, tone: "error" as const }, { label: "Abandoned", value: 43, tone: "warning" as const }] },
} satisfies Meta<typeof ReportDonut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
