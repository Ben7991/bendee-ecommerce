import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminStats } from "./AdminStats";

const meta = {
  title: "Organisms/AdminStats",
  component: AdminStats,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    "aria-label": "Customers at a glance",
    stats: [
      { label: "Total customers", value: "1,284", note: "+86 this month", compactNote: "+86" },
      { label: "Repeat customers", value: "38%", note: "+3 pts" },
      { label: "Avg. lifetime value", value: "612", currency: "GHS" },
      { label: "No order in 90+ days", value: "211", tone: "warning" },
    ],
  },
} satisfies Meta<typeof AdminStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The customer list's summary (hidden on mobile). */
export const Summary: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };

/** A customer's figures. */
export const Profile: Story = {
  args: {
    variant: "profile",
    "aria-label": "Customer figures",
    stats: [
      { label: "Lifetime value", value: "3,940", currency: "GHS", note: "Top 5% of customers" },
      { label: "Orders", value: "14", note: "1 partly refunded", noteTone: "muted" },
      { label: "Average order", value: "281", currency: "GHS", note: "Orders every ~19 days", noteTone: "muted" },
      { label: "Last order", value: "Today", note: "JFK-251490 · 09:40" },
    ],
  },
};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const ProfileMobile: Story = { ...Profile, globals: { viewport: { value: "mobile", isRotated: false } } };
