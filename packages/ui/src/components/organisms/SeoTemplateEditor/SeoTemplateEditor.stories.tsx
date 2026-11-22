import type { Meta, StoryObj } from "@storybook/react-vite";

import { SEO_ARGS } from "./data";
import { SeoTemplateEditor } from "./SeoTemplateEditor";

const meta = {
  title: "Organisms/SeoTemplateEditor",
  component: SeoTemplateEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: SEO_ARGS,
} satisfies Meta<typeof SeoTemplateEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** A tab with small print and an extra setting, and a tinted share image. */
export const WithExtra: Story = {
  args: {
    descriptionHint: "If there’s no intro: “Shop {product_count} {name} products at Jofak…”",
    extra: <p className="text-sm">Hide filtered and sorted lists from Google</p>,
    sample: { ...SEO_ARGS.sample, imageTone: "lavender", image: "Category banner · 1200 × 630", shareTitle: "Sleep & stress supplements in Ghana" },
  },
};
