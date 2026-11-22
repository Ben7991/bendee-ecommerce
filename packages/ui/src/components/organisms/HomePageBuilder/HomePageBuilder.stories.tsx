import type { Meta, StoryObj } from "@storybook/react-vite";

import { sampleBlocks } from "./fixtures";
import { HomePageBuilder } from "./HomePageBuilder";

const meta = {
  title: "Organisms/HomePageBuilder",
  component: HomePageBuilder,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    blocks: sampleBlocks,
    selectedId: "hero",
    blockHref: (id: string) => `?block=${id}`,
    collections: ["Harmattan glow", "New arrivals", "December gifting"],
    onSave: () => undefined,
    onReorder: () => undefined,
    addAction: () => undefined,
  },
} satisfies Meta<typeof HomePageBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390): the block list. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
