import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionGrid, type AdminCollection } from "./CollectionGrid";

const collections: AdminCollection[] = [
  { id: "1", name: "New arrivals", href: "#", status: { label: "Live", tone: "success" }, description: "Added in the last 30 days", footer: "9 products", kind: "Rule-based", summary: "Rule-based · 9 products", banner: { kind: "images", images: [null, null], tint: "sage" } },
  { id: "2", name: "Under GHS 150", href: "#", status: { label: "Live", tone: "success" }, description: "Price up to GHS 150, in stock", footer: "14 products", kind: "Rule-based", summary: "Rule-based · 14 products", banner: { kind: "text", text: "≤ GHS 150", compactText: "≤150", tint: "sun" } },
  { id: "3", name: "December gifting", href: "#", status: { label: "Starts 1 Dec", compactLabel: "1 Dec", tone: "info" }, description: "Gift sets under GHS 400", footer: "8 products", kind: "Manual", summary: "Manual · 8 · no banner yet", banner: { kind: "empty", uploadHref: "#" } },
  { id: "4", name: "Independence Day sale", href: "#", status: { label: "Ended", tone: "neutral" }, description: "Ended 7 Mar · link sends shoppers to the hub", footer: "Reuse for 2027", kind: "Rule-based", summary: "Rule-based · ended 7 Mar", banner: { kind: "text", text: "6 March", tint: "surface", serif: true }, ended: true },
];

const meta = {
  title: "Organisms/CollectionGrid",
  component: CollectionGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { collections },
} satisfies Meta<typeof CollectionGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Empty: Story = { args: { collections: [] } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
