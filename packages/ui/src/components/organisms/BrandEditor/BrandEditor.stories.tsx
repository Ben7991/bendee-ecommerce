import type { Meta, StoryObj } from "@storybook/react-vite";

import { BrandEditor } from "./BrandEditor";

const meta = {
  title: "Organisms/BrandEditor",
  component: BrandEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "Asaase Botanicals", slug: "asaase-botanicals", mark: { tone: "primary", icon: "leaf" }, count: 9, productsHref: "#", className: "xl:w-90" },
} satisfies Meta<typeof BrandEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** No products: Delete is available. */
export const Unused: Story = { args: { name: "Volta Vitality", slug: "volta-vitality", mark: { tone: "empty" }, hasLogo: false, count: 0 } };
/** The mobile bottom sheet. */
export const Sheet: Story = { args: { presentation: "sheet", open: true }, globals: { viewport: { value: "mobile", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
