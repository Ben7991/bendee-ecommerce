import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductEditorForm } from "./ProductEditorForm";

const meta = {
  title: "Organisms/ProductEditorForm",
  component: ProductEditorForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: <input name="name" defaultValue="Energy B-Complex" aria-label="Name" className="h-11 rounded-sm border border-border px-3" /> },
} satisfies Meta<typeof ProductEditorForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Type in the field to see the unsaved changes bar; Discard puts it back. */
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** Collection editor: a light bar kept at the bottom below 1440px. */
export const Light: Story = { args: { variant: "light" } };
