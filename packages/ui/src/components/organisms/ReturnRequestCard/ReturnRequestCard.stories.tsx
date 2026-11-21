import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReturnRequestCard } from "./ReturnRequestCard";

const meta = {
  title: "Organisms/ReturnRequestCard",
  component: ReturnRequestCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    item: {
      name: "Magnesium Sleep · Gummies",
      compactName: "Magnesium Sleep × 1",
      detail: "1 of 1 bought · paid GHS 80 after 10% discount",
      compactDetail: "Paid GHS 80 · wants refund to MoMo",
      tint: "sage",
    },
    reason: { label: "Damaged", tone: "error" },
    quote: "The lid was cracked when it arrived and some gummies had spilled into the bag. I'd like a refund please.",
    compactQuote: "The lid was cracked when it arrived and some gummies had spilled into the bag.",
    photos: [
      { image: null, href: "#1" },
      { image: null, href: "#2" },
    ],
    wants: "Refund to MoMo (original method)",
  },
} satisfies Meta<typeof ReturnRequestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const WithoutPhotos: Story = { args: { photos: [], reason: { label: "Changed mind", tone: "neutral" } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
