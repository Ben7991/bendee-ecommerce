import type { Meta, StoryObj } from "@storybook/react-vite";

import { FaqList } from "./FaqList";

const meta = {
  title: "Organisms/FaqList",
  component: FaqList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "max-w-170",
    defaultOpen: ["arrive"],
    groups: [
      {
        title: "Orders & delivery",
        items: [
          {
            id: "arrive",
            question: "When will my order arrive?",
            answer: (
              <>
                Orders placed before 2pm on a weekday leave the same day. <a href="#">See all delivery fees</a>
              </>
            ),
            searchText: "delivery kumasi accra",
          },
          { id: "cancel", question: "Can I change or cancel my order?", answer: "Yes, until it's packed." },
        ],
      },
      {
        title: "Payments",
        items: [{ id: "methods", question: "Which payment methods do you accept?", answer: "MoMo, cards and bank transfer.", searchText: "momo card" }],
      },
    ],
  },
} satisfies Meta<typeof FaqList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** All closed. */
export const Closed: Story = { args: { defaultOpen: [] } };

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
