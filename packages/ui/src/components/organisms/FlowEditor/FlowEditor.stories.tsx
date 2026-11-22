import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlowEditor } from "./FlowEditor";
import { sampleFlow } from "./fixtures";

const meta = {
  title: "Organisms/FlowEditor",
  component: FlowEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: sampleFlow,
  render: (args) => (
    <form onSubmit={(event) => event.preventDefault()}>
      <FlowEditor {...args} />
    </form>
  ),
} satisfies Meta<typeof FlowEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390): compact trigger and message with Edit links. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
