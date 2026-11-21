import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductEditorHeader } from "./ProductEditorHeader";

const meta = {
  title: "Organisms/ProductEditorHeader",
  component: ProductEditorHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { backHref: "#", name: "Energy B-Complex", status: { label: "Active", tone: "success" }, meta: "Live since 2 Sep · last edited by Abena, today 09:14", previewHref: "#", duplicateHref: "#" },
} satisfies Meta<typeof ProductEditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
