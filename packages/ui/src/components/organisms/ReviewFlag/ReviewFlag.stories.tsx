import type { Meta, StoryObj } from "@storybook/react-vite";

import { ReviewFlag } from "./ReviewFlag";

const meta = {
  title: "Organisms/ReviewFlag",
  component: ReviewFlag,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Flagged for review: high-value cash on delivery",
    compactTitle: "Flagged: high-value COD",
    body: "Two failed deliveries to this phone in the last 60 days, and the order is over the GHS 500 COD limit. Call the customer to confirm before handing it over.",
    compactBody: "2 failed deliveries to this phone and over the GHS 500 limit. Call before handing over.",
    actions: (
      <>
        <a href="#" className="hidden h-9 items-center px-3.5 text-sm font-semibold md:flex">
          View history
        </a>
        <button type="button" className="h-9 rounded-full bg-bg px-4 text-sm font-semibold text-text">
          Mark as reviewed
        </button>
      </>
    ),
  },
} satisfies Meta<typeof ReviewFlag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
