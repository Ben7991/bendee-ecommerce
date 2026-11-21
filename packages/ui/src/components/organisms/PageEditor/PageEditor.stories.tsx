import type { Meta, StoryObj } from "@storybook/react-vite";

import { samplePageEditor } from "./fixtures";
import { PageEditor } from "./PageEditor";

const meta = {
  title: "Organisms/PageEditor",
  component: PageEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { ...samplePageEditor, onSave: () => undefined, newPageAction: () => undefined },
} satisfies Meta<typeof PageEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390): pills, body, and status / address rows. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
