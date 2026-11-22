import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentNav, ContentNavItem } from "./ContentNav";

const pages = ["About Jofak", "FAQ", "Delivery & returns", "Privacy policy", "Terms of sale", "Contact us"];

const meta = {
  title: "Molecules/ContentNav",
  component: ContentNav,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <ContentNav {...args} className="xl:w-60">
      {pages.map((page) => (
        <ContentNavItem key={page} href="#" active={page === "Delivery & returns"}>
          {page}
        </ContentNavItem>
      ))}
    </ContentNav>
  ),
} satisfies Meta<typeof ContentNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sidebar from 1440px; resize the viewport for the pills. */
export const Default: Story = {};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
