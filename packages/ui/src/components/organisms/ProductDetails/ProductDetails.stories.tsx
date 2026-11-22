import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductDetails } from "./ProductDetails";

const meta = {
  title: "Organisms/ProductDetails",
  component: ProductDetails,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    sections: [
      {
        id: "description",
        title: "Description",
        defaultOpen: true,
        content: <p>Daily Greens is the easiest habit you&apos;ll keep. One scoop delivers a full serving of leafy greens.</p>,
      },
      {
        id: "facts",
        title: "Supplement facts",
        mobileOnly: true,
        content: <p>Facts table</p>,
      },
      {
        id: "how-to-use",
        title: "How to use",
        content: <p>Stir one scoop into 250 ml of cold water.</p>,
      },
      {
        id: "specifications",
        title: "Specifications",
        content: <p>25 servings · 235 g</p>,
      },
      {
        id: "delivery",
        title: "Delivery & returns",
        content: <p>Next-day delivery in Accra.</p>,
      },
    ],
    aside: (
      <div className="flex h-110 items-center justify-center rounded-xl border border-border font-sans text-sm text-text-muted">
        SupplementFacts
      </div>
    ),
  },
} satisfies Meta<typeof ProductDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
