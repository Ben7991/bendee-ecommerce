import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentNav, ContentNavItem, ContentSection } from "../../molecules";
import { ContentHero } from "../../organisms";
import { ContentLayout } from "./ContentLayout";

const pages = ["About Jofak", "FAQ", "Delivery & returns", "Privacy policy", "Terms of sale", "Contact us"];

const meta = {
  title: "Templates/ContentLayout",
  component: ContentLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    hero: <ContentHero title="Delivery & returns" description="How we get your order to you, and what it costs." />,
    nav: (
      <ContentNav>
        {pages.map((page) => (
          <ContentNavItem key={page} href="#" active={page === "Delivery & returns"}>
            {page}
          </ContentNavItem>
        ))}
      </ContentNav>
    ),
    children: (
      <>
        <ContentSection title="Delivery fees and times">
          <p>You'll see the exact fee at checkout once you pick your area.</p>
        </ContentSection>
        <ContentSection title="Returns and refunds">
          <p>For hygiene reasons we can only take back products that are unopened and still sealed.</p>
        </ContentSection>
      </>
    ),
  },
} satisfies Meta<typeof ContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
