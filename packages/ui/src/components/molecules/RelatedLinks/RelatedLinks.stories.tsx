import type { Meta, StoryObj } from "@storybook/react-vite";

import { RelatedLink, RelatedLinks } from "./RelatedLinks";

const meta = {
  title: "Molecules/RelatedLinks",
  component: RelatedLinks,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: (
      <>
        <RelatedLink href="#" count={14}>
          Sleep & Stress
        </RelatedLink>
        <RelatedLink href="#" count={6}>
          Adaptogens
        </RelatedLink>
        <RelatedLink href="#" count={3}>
          Magnesium
        </RelatedLink>
        <RelatedLink href="#" external itemClassName="hidden md:block">
          Journal: Stress & sleep
        </RelatedLink>
      </>
    ),
  },
} satisfies Meta<typeof RelatedLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = {
  args: { className: "rounded-2xl bg-sage-200 p-5" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
