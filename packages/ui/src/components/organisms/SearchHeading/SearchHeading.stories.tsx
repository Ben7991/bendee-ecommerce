import type { Meta, StoryObj } from "@storybook/react-vite";

import { RelatedLink, RelatedLinks, SearchField } from "../../molecules";
import { SearchHeading } from "./SearchHeading";

const meta = {
  title: "Organisms/SearchHeading",
  component: SearchHeading,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    search: <SearchField defaultValue="stress" submitLabel="Search" />,
    title: (
      <>
        8 results for <em>“stress”</em>
      </>
    ),
    description: "Matching product names, ingredients and benefits.",
    related: (
      <RelatedLinks>
        <RelatedLink href="#" count={14}>
          Sleep & Stress
        </RelatedLink>
        <RelatedLink href="#" count={6}>
          Adaptogens
        </RelatedLink>
        <RelatedLink href="#" external itemClassName="hidden md:block">
          Journal: Stress & sleep
        </RelatedLink>
      </RelatedLinks>
    ),
  },
} satisfies Meta<typeof SearchHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResults: Story = {
  args: {
    search: <SearchField defaultValue="ashwaganda gumies" submitLabel="Search" />,
    title: (
      <>
        No results for <em>“ashwaganda gumies”</em>
      </>
    ),
    description: (
      <>
        Did you mean <a href="#">ashwagandha gummies</a>? We have 2 matches.
      </>
    ),
    related: undefined,
  },
};
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
