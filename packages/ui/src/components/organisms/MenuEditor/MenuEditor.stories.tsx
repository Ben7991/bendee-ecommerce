import type { Meta, StoryObj } from "@storybook/react-vite";

import { headerProps, sampleFooter } from "./fixtures";
import { MenuEditor } from "./MenuEditor";

const meta = {
  title: "Organisms/MenuEditor",
  component: MenuEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { ...headerProps, onSave: () => undefined },
} satisfies Meta<typeof MenuEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderDesktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const HeaderTablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390): tap an item to edit it. */
export const HeaderMobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

export const Footer: Story = { args: { defaultValue: sampleFooter, published: { returns: "Returns & refunds policy", all: "All collections" }, selectedId: "returns" } };
