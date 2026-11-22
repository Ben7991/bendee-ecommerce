import type { Meta, StoryObj } from "@storybook/react-vite";

import { TablePagination } from "./TablePagination";

const meta = {
  title: "Molecules/TablePagination",
  component: TablePagination,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { page: 1, pageCount: 129, range: "1–10", total: "1,284", hrefFor: () => "#", perPage: { value: 10, options: [10, 25, 50] } },
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const MiddlePage: Story = { args: { page: 6, perPage: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
