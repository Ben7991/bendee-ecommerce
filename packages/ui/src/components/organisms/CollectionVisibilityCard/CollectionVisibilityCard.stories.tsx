import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionVisibilityCard } from "./CollectionVisibilityCard";

const meta = {
  title: "Organisms/CollectionVisibilityCard",
  component: CollectionVisibilityCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    toggles: [
      { name: "active", label: "Active", description: "Page and rails can show it", defaultChecked: true, hideOnMobile: true },
      { name: "listed", label: "List on Offers hub", description: "Off: reachable by link only", defaultChecked: true },
      { name: "featured", label: "Featured banner", description: "Top of the hub · only one at a time", compactDescription: "Top of the hub · one at a time", defaultChecked: true },
    ],
    rows: [
      { label: "Name & deal label", value: "Harmattan glow · Up to 20% off", href: "#details" },
      { label: "Schedule", value: "1 Nov – 15 Dec 2026", href: "#schedule" },
      { label: "SEO", value: "/collections/harmattan-glow", href: "#seo" },
    ],
    className: "max-w-85",
  },
} satisfies Meta<typeof CollectionVisibilityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** The settings list: rows that open the other cards, and two switches. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
