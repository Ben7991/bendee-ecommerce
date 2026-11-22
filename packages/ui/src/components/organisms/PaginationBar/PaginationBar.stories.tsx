import type { Meta, StoryObj } from "@storybook/react-vite";

import { PillSelect } from "../../molecules";
import { PaginationBar } from "./PaginationBar";

const meta = {
  title: "Organisms/PaginationBar",
  component: PaginationBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    page: 1,
    pageCount: 2,
    hrefFor: (page: number) => `?page=${page}`,
    perPage: (
      <PillSelect
        variant="compact"
        label="Products per page"
        options={[
          { value: "24", label: "24" },
          { value: "48", label: "48" },
        ]}
      />
    ),
  },
} satisfies Meta<typeof PaginationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LastPage: Story = { args: { page: 2 } };
export const ManyPages: Story = { args: { page: 6, pageCount: 12 } };
/** Hidden on mobile, which uses LoadMore. */
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
