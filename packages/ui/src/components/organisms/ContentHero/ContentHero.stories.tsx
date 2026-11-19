import type { Meta, StoryObj } from "@storybook/react-vite";

import { BreadcrumbItem, Breadcrumbs, SearchBar } from "../../molecules";
import { ContentHero } from "./ContentHero";

const meta = {
  title: "Organisms/ContentHero",
  component: ContentHero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Delivery & returns",
    description: "How we get your order to you, what it costs, and what to do if something isn't right. Last updated 2 Jan 2026.",
    compactDescription: "How we get your order to you, what it costs, and what to do if something isn't right. Updated 2 Jan 2026.",
    search: <SearchBar />,
    breadcrumbs: (
      <Breadcrumbs>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem current>Delivery & returns</BreadcrumbItem>
      </Breadcrumbs>
    ),
  },
} satisfies Meta<typeof ContentHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};

/** Paper mobile artboard width (390): the sage gradient top. */
export const Mobile: Story = {
  globals: { viewport: { value: "mobile", isRotated: false } },
};
