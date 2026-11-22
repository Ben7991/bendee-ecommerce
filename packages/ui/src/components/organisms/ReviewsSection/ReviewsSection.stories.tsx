import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReviewsSection } from "./ReviewsSection";

const meta = {
  title: "Organisms/ReviewsSection",
  component: ReviewsSection,
  tags: ["autodocs"],
  args: {
    eyebrow: "Real results",
    title: (
      <>
        Small rituals, <em>big shifts.</em>
      </>
    ),
    stats: [
      { value: "93%", label: "sleep better within 3 weeks" },
      { value: "4.9★", label: "average from 12k+ reviews" },
    ],
    reviews: [
      { quote: "I've tried every sleep aid out there. Three weeks on the Sleep Gummies and I'm finally waking up before my alarm — and actually feeling good.", author: "Amara O.", detail: "Verified buyer · Sleep Gummies", avatarTone: "light" },
      { quote: "The Greens taste genuinely good and my afternoon slump is gone. Subscribing was a no-brainer — it just shows up every month.", author: "Daniel K.", detail: "Subscriber · Daily Greens", avatarTone: "deep" },
    ],
  },
} satisfies Meta<typeof ReviewsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
