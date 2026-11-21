import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionDetailsCard } from "./CollectionDetailsCard";

const meta = {
  title: "Organisms/CollectionDetailsCard",
  component: CollectionDetailsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    id: "details",
    defaultValue: { name: "Harmattan glow", deal: "Up to 20% off", description: "Dry season, dry skin. Collagen, greens and hydration picks to keep you glowing through the Harmattan." },
    banner: <span className="text-sm text-text-inverse">Packshots</span>,
  },
} satisfies Meta<typeof CollectionDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const NoBanner: Story = { args: { banner: undefined } };
/** The banner only; the fields open from the "Name & deal label" row (#details). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
