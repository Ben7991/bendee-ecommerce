import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderActivity } from "./OrderActivity";

const meta = {
  title: "Organisms/OrderActivity",
  component: OrderActivity,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    events: [
      { id: "1", title: "Abena Mensah", detail: "added a note", time: "08:12", author: "Abena Mensah", note: "Called Ama. She'll be home after 2pm and has the cash ready. Hand to courier after lunch.", compactNote: "Called Ama. She'll be home after 2pm and has the cash ready." },
      { id: "2", title: "Processing started", detail: "by Abena Mensah", compactDetail: "by Abena", time: "08:05", tone: "warning" },
      { id: "3", title: "Flagged automatically", detail: "· COD over GHS 500, 2 failed deliveries", time: "07:58", tone: "error" },
      { id: "4", title: "SMS sent", detail: "· order confirmation to 024 ••• 5530", time: "07:58", tone: "muted" },
      { id: "5", title: "Order placed", detail: "· cash on delivery confirmed with SMS code", time: "07:58", tone: "brand" },
    ],
  },
} satisfies Meta<typeof OrderActivity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** "Add note" opens the composer; "Show all" expands the history. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
