import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms";
import { ChipGroup, PillSelect } from "../../molecules";
import { CustomerReview } from "../CustomerReview";
import { ProductReviews } from "./ProductReviews";

const meta = {
  title: "Organisms/ProductReviews",
  component: ProductReviews,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: (
      <>
        Loved by <em>3,214</em> routines
      </>
    ),
    average: 4.9,
    count: 3214,
    shares: [88, 9, 2, 1, 0],
    writeAction: (
      <Button variant="secondary" size="md" className="w-full">
        Write a review
      </Button>
    ),
    compactWriteAction: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Write a review
      </a>
    ),
    filters: (
      <ChipGroup
        type="single"
        required
        variant="primary"
        aria-label="Filter reviews"
        defaultValue="all"
        options={[
          { value: "all", label: "All" },
          { value: "photos", label: "With photos (214)" },
          { value: "verified", label: "Verified only" },
        ]}
      />
    ),
    sort: <PillSelect variant="compact" prefix="Sort:" label="Sort reviews" options={[{ value: "helpful", label: "Most helpful" }]} />,
    reviews: [
      <CustomerReview
        key="1"
        review={{
          author: "Kwame A.",
          verified: true,
          meta: "Accra · 2 weeks ago",
          rating: 5,
          title: "Finally a greens powder I like",
          body: "Refreshing with cold water.",
          helpfulCount: 42,
          avatarTone: "deep",
        }}
      />,
      <CustomerReview
        key="2"
        review={{
          author: "Efua M.",
          verified: true,
          meta: "Kumasi · 1 month ago",
          rating: 4,
          title: "Great value on subscription",
          body: "The 50-serving tub works out cheaper.",
        }}
      />,
    ],
    moreAction: (
      <a href="#" className="font-sans text-sm leading-xs font-semibold text-brand underline">
        Show more reviews
      </a>
    ),
    compactMoreAction: (
      <Button variant="secondary" size="md" className="w-full">
        See all 3,214 reviews
      </Button>
    ),
  },
} satisfies Meta<typeof ProductReviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
