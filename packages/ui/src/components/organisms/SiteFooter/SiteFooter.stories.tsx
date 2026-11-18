import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeProvider } from "../../../lib";
import { SiteFooter } from "./SiteFooter";

const meta = {
  title: "Organisms/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  decorators: [(Story) => <ThemeProvider><Story /></ThemeProvider>],
  args: {
    newsletterTitle: (
      <>
        Wellness notes, <em>once a week.</em>
      </>
    ),
    newsletterHint: "Get 15% off your first order. Unsubscribe anytime.",
    tagline: "Clean, plant-powered supplements for everyday balance. Made in small batches, tested every time.",
    columns: [
      { title: "Shop", links: [{ label: "All products", href: "#1" }, { label: "Bundles", href: "#2" }, { label: "Subscriptions", href: "#3" }, { label: "Gift cards", href: "#4" }] },
      { title: "Learn", links: [{ label: "Ingredients", href: "#5" }, { label: "Lab results", href: "#6" }, { label: "Journal", href: "#7" }, { label: "Wellness quiz", href: "#8" }] },
      { title: "Help", links: [{ label: "Shipping & returns", href: "#9" }, { label: "Track order", href: "#10" }, { label: "FAQ", href: "#11" }, { label: "Contact us", href: "#12" }] },
    ],
    copyright: "© 2026 Jofak. All rights reserved.",
    shortCopyright: "© 2026 Jofak",
    disclaimer: "*These statements have not been evaluated by the FDA.",
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
