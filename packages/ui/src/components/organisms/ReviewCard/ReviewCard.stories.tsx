import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReviewCard } from "./ReviewCard";

const meta = {
  title: "Organisms/ReviewCard",
  component: ReviewCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-105",
    review: {
      quote: "I've tried every sleep aid out there. Three weeks on the Sleep Gummies and I'm finally waking up before my alarm — and actually feeling good.",
      author: "Amara O.",
      detail: "Verified buyer · Sleep Gummies",
      avatarTone: "light",
    },
  },
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {};
export const Accent: Story = {
  args: {
    tone: "accent",
    review: {
      quote: "The Greens taste genuinely good and my afternoon slump is gone. Subscribing was a no-brainer — it just shows up every month.",
      author: "Daniel K.",
      detail: "Subscriber · Daily Greens",
      avatarTone: "deep",
    },
  },
};
