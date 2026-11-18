import type { Meta, StoryObj } from "@storybook/react-vite";

import { NotFoundHero } from "./NotFoundHero";

const meta = {
  title: "Organisms/NotFoundHero",
  component: NotFoundHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Page not found",
    title: (
      <>
        This page has <em>wandered off</em>
      </>
    ),
    description: {
      short: "The link may be old, or the product may have moved. Try a search or pick up from one of these.",
      full: "The link may be old, or the product may have moved. Search for what you need, or pick up from one of these.",
    },
    primaryAction: { label: "Back to homepage", href: "#" },
    secondaryAction: { label: "Shop all supplements", href: "#" },
    quickLinks: [
      { label: "Bestsellers", href: "#bestsellers" },
      { label: "Sleep & Stress", href: "#sleep" },
      { label: "Track an order", href: "#track" },
      { label: "Help centre", href: "#help" },
    ],
  },
} satisfies Meta<typeof NotFoundHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
