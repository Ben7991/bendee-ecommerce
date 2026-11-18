import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { HeroShowcase } from "../HeroShowcase";
import { SiteHeader } from "../SiteHeader";
import { HomeHero } from "./HomeHero";

const meta = {
  title: "Organisms/HomeHero",
  component: HomeHero,
  tags: ["autodocs"],
  args: {
    header: (
      <SiteHeader
        navLinks={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Collections", href: "/collections" },
        ]}
        activeHref="/"
        favouritesCount={6}
        bagCount={3}
      />
    ),
    rating: { value: "4.9", count: "12,480" },
    title: (
      <>
        Daily rituals for a body that feels <em>naturally</em> well.
      </>
    ),
    lede: {
      short: "Clean, clinically-dosed supplements from whole-plant ingredients — tested and delivered monthly.",
      full: "Clean, clinically-dosed supplements made from whole-plant ingredients — third-party tested and delivered to your door every month.",
    },
    benefits: [
      "Third-party tested for purity & potency",
      "No synthetic fillers, dyes or additives",
      "Free shipping & 60-day money-back promise",
    ],
    actions: (
      <>
        <Button arrow>Shop Bestsellers</Button>
        <Button arrow variant="secondary">Take the 2-min Quiz</Button>
      </>
    ),
    compactActions: (
      <>
        <Button arrow size="sm">Shop now</Button>
        <Button arrow size="sm" variant="secondary">Take the quiz</Button>
      </>
    ),
    showcase: <HeroShowcase product={{ name: "Daily Greens", price: "GHS 450" }} />,
  },
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
