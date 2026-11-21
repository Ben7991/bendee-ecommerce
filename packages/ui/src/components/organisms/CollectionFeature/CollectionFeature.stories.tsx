import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionFeature } from "./CollectionFeature";

const meta = {
  title: "Organisms/CollectionFeature",
  component: CollectionFeature,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Harmattan glow",
    description: "Up to 20% off · skin & hydration · rule-based · 12 products",
    compactDescription: "Up to 20% off · 12 products · ends 15 Dec",
    stats: [
      { label: "Ends", value: "15 Dec" },
      { label: "Views · 7 days", value: "3,412" },
      { label: "Revenue · 7 days", value: "GHS 14,280" },
    ],
    editHref: "#",
    packshots: [{ image: null, tint: "sage" }, { image: null, tint: "amber" }, { image: null, tint: "citrus" }],
  },
} satisfies Meta<typeof CollectionFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
