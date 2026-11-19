import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentSection } from "./ContentSection";

const meta = {
  title: "Molecules/ContentSection",
  component: ContentSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Returns and refunds",
    className: "max-w-170",
    children: (
      <p>
        For hygiene reasons we can only take back products that are unopened and still sealed. Request a return from{" "}
        <a href="#">your orders</a>.
      </p>
    ),
  },
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both sizes. Check it in Light, Dark and System from the toolbar. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex max-w-170 flex-col gap-10">
      <ContentSection {...args} size="lg" />
      <ContentSection {...args} size="md" title="1. Who we are" />
    </div>
  ),
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
