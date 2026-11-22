import type { Meta, StoryObj } from "@storybook/react-vite";

import { BreadcrumbItem, Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: (
      <>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Shop</BreadcrumbItem>
        <BreadcrumbItem current>All supplements</BreadcrumbItem>
      </>
    ),
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The PLP drops the current page on mobile ("Home › Shop"). */
export const Mobile: Story = {
  args: {
    children: (
      <>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Shop</BreadcrumbItem>
        <BreadcrumbItem current itemClassName="hidden md:flex">
          All supplements
        </BreadcrumbItem>
      </>
    ),
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
