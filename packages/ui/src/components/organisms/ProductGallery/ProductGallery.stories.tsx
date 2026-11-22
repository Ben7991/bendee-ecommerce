import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductGallery } from "./ProductGallery";

const tile = (label: string) => (
  <div className="flex size-full items-center justify-center rounded-xl bg-sage-200 font-sans text-xs text-text-muted">{label}</div>
);
const photo = (label: string) => (
  <div className="flex size-full items-center justify-center bg-skin-300 font-sans text-xs text-text">{label}</div>
);

const meta = {
  title: "Organisms/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Daily Greens Powder images",
    badges: [
      { label: "Bestseller", variant: "solid" },
      { label: "Save 13%", variant: "light" },
    ],
    items: [
      { id: "front", label: "Front of the tub", image: tile("Front") },
      { id: "back", label: "Back of the tub", image: tile("Back") },
      {
        id: "lifestyle",
        label: "Morning ritual",
        kind: "photo",
        image: photo("Photo"),
      },
      {
        id: "video",
        label: "Mixing video",
        kind: "video",
        image: photo("Video"),
      },
      {
        id: "howto",
        label: "How to use",
        kind: "howto",
        caption: "Stir one scoop into 250 ml of cold water or juice, once a day.",
      },
    ],
    className: "xl:max-w-175",
  },
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = {
  globals: { viewport: { value: "tablet", isRotated: false } },
};
export const Mobile: Story = {
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "mobile", isRotated: false } },
};
