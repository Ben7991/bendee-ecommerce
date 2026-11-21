import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionEditorHeader } from "./CollectionEditorHeader";

const meta = {
  title: "Organisms/CollectionEditorHeader",
  component: CollectionEditorHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { backHref: "#", name: "Harmattan glow", status: { label: "Live · ends 15 Dec", tone: "success" }, featured: true, urlPrefix: "jofak.com/collections/", slug: "harmattan-glow", viewHref: "#" },
} satisfies Meta<typeof CollectionEditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
