import type { Meta, StoryObj } from "@storybook/react-vite";

import { SavedViews } from "./SavedViews";

const meta = {
  title: "Organisms/SavedViews",
  component: SavedViews,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    activeHref: "/admin/orders",
    saveView: { href: "#" },
    views: [
      { href: "/admin/orders", label: "All", count: "1,284" },
      { href: "/admin/orders?view=to-pack", label: "To pack", count: 9 },
      { href: "/admin/orders?view=ready-for-pickup", label: "Ready for pickup", count: 5 },
      { href: "/admin/orders?view=out-for-delivery", label: "Out for delivery", count: 11 },
      { href: "/admin/orders?view=cod-to-collect", label: "COD to collect", count: 6 },
      { href: "/admin/orders?view=flagged", label: "Flagged", count: 2, alert: true },
    ],
  },
} satisfies Meta<typeof SavedViews>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Underlined tabs with Save view from 1440px. */
export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const ToPack: Story = { args: { activeHref: "/admin/orders?view=to-pack" } };
/** Scrolls sideways when the tabs don't fit. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** A row of chips. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
