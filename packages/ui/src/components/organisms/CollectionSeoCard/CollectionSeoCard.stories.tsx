import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionSeoCard } from "./CollectionSeoCard";

const meta = {
  title: "Organisms/CollectionSeoCard",
  component: CollectionSeoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    domain: "jofak.com",
    defaultValue: { slug: "harmattan-glow", title: "Harmattan glow – up to 20% off | Jofak", description: "Collagen, greens and hydration picks for the dry season. Delivered across Accra in 24h." },
    className: "max-w-85",
  },
} satisfies Meta<typeof CollectionSeoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
