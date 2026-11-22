import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReportLineChart } from "./ReportLineChart";

const meta = {
  title: "Organisms/ReportLineChart",
  component: ReportLineChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Revenue over time", description: "Daily gross revenue · best day Sat 8 Nov, GHS 5,120", current: [2800, 2600, 3200, 3000, 3600, 3400, 4100, 5100, 4300, 4800, 4900], previous: [2400, 2200, 2700, 2600, 3000, 2900, 3300, 3100, 3400, 3500, 3600], max: 6000, yTicks: ["6k", "4k", "2k", "0"], xLabels: ["16 Oct", "23 Oct", "30 Oct", "6 Nov", "14 Nov"], legend: { current: "This period · GHS 96,408", previous: "Previous 30 days · GHS 84,420" }, highlight: 7, grains: [{ label: "Day", href: "?grain=day", active: true }, { label: "Week", href: "?grain=week" }, { label: "Month", href: "?grain=month" }] },
} satisfies Meta<typeof ReportLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
