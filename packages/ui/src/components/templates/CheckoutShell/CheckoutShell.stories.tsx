import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckoutShell } from "./CheckoutShell";

const box = (label: string, className = "h-60") => (
  <div className={`flex items-center justify-center rounded-lg border border-border-subtle bg-bg font-sans text-sm text-text-muted ${className}`}>{label}</div>
);

const meta = {
  title: "Templates/CheckoutShell",
  component: CheckoutShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    header: box("CheckoutHeader", "h-22 rounded-none"),
    title: (
      <>
        Almost <em>there</em>
      </>
    ),
    subtitle: "Checking out as a guest",
    summaryStrip: box("Summary strip", "h-11 rounded-none"),
    sidebar: box("CheckoutSummary", "h-200 w-110"),
    children: (
      <>
        {box("Done step", "h-22")}
        {box("Active step", "h-150")}
      </>
    ),
  },
} satisfies Meta<typeof CheckoutShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Steps: Story = {};
export const Center: Story = { args: { layout: "center", children: box("PaymentStatusCard", "h-175 w-140") } };
