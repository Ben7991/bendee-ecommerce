import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdjustStockDialog } from "./AdjustStockDialog";

const meta = {
  title: "Organisms/AdjustStockDialog",
  component: AdjustStockDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    variant: { id: "grn-30", name: "Greens Daily · 30 servings", compactName: "Greens Daily", onHand: 130, reserved: 6, averageCost: 48 },
    defaultQuantity: 3,
    reasons: {
      remove: [
        { value: "damaged", label: "Damaged" },
        { value: "expired", label: "Expired" },
        { value: "lost", label: "Lost" },
        { value: "recount", label: "Recount" },
        { value: "sample", label: "Sample" },
      ],
      add: [
        { value: "found", label: "Found in store" },
        { value: "cancelled", label: "Order cancelled" },
        { value: "supplier-extra", label: "Supplier extra" },
        { value: "other", label: "Other" },
      ],
    },
    noteRequiredFor: ["damaged"],
    orders: [
      { number: "JFK-251490", status: { label: "To pack", tone: "info" }, summary: "Efua Boateng · 3 × Greens Daily · today 09:40", compactSummary: "Efua Boateng · 3 × Greens Daily" },
      { number: "JFK-251487", status: { label: "Packed", tone: "warning" }, summary: "Kwame Mensah · 1 × Greens Daily · today 08:15" },
      { number: "JFK-251471", status: { label: "Out for delivery", tone: "lavender" }, summary: "Ama Owusu · 2 × Greens Daily · yesterday" },
      { number: "JFK-251458", status: { label: "Delivered", tone: "success" }, summary: "Yaw Darko · 1 × Greens Daily · 12 Nov" },
    ],
    defaultOrder: "JFK-251490",
    searchAllOrdersHref: "#",
    staffName: "Abena M.",
  },
} satisfies Meta<typeof AdjustStockDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Remove: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Add: Story = { args: { defaultMode: "add", defaultQuantity: 5, defaultOrder: undefined } };
export const SetCount: Story = { args: { defaultMode: "count" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
/** Opened from the page's Adjust stock: pick the product first. */
export const ChooseProduct: Story = {
  args: {
    variants: [
      { id: "grn-30", name: "Greens Daily · 30 servings", compactName: "Greens Daily", onHand: 130, reserved: 6, averageCost: 48 },
      { id: "ash-120", name: "Ashwagandha Calm · 120 caps", compactName: "Ashwagandha Calm", onHand: 18, reserved: 0, averageCost: 125 },
    ],
  },
};
