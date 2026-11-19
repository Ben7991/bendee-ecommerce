import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionCard } from "./CollectionCard";

const meta = {
  title: "Molecules/CollectionCard",
  component: CollectionCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    href: "#",
    tint: "citrus",
    badge: "15% off gift sets",
    meta: "Ends Sat 14 Feb",
    compactMeta: "15% off · Ends Sat 14 Feb",
    metaTone: "deal",
    description: "Wrapped, with a handwritten note. Delivered to them, not you.",
    count: "8 products",
    children: "Valentine's gift sets",
    className: "max-w-104",
  },
} satisfies Meta<typeof CollectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** An everyday collection: no badge, quiet meta. */
export const Everyday: Story = {
  args: { tint: "sage", badge: undefined, meta: "Updated every Monday", compactMeta: undefined, metaTone: "quiet", children: "New arrivals", count: "14 products" },
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
