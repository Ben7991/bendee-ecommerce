import type { Meta, StoryObj } from "@storybook/react-vite";

import { CustomerReview } from "./CustomerReview";

const meta = {
  title: "Organisms/CustomerReview",
  component: CustomerReview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    review: {
      author: "Kwame A.",
      verified: true,
      meta: "Accra · Lemon lime, 25 servings · 2 weeks ago",
      rating: 5,
      title: "Finally a greens powder I don't have to force down",
      body: "Lemon lime is genuinely refreshing with cold water. After three weeks my digestion is noticeably better.",
      helpfulCount: 42,
      avatarTone: "deep",
    },
    photos: [<div key="a" className="size-full bg-skin-300" />, <div key="b" className="size-full bg-sage-200" />],
    className: "max-w-220",
  },
} satisfies Meta<typeof CustomerReview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TextOnly: Story = {
  args: {
    photos: [],
    review: { ...meta.args.review, rating: 4, helpfulCount: undefined },
  },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
