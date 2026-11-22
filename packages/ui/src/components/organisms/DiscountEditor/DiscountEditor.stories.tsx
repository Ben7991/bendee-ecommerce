import type { Meta, StoryObj } from "@storybook/react-vite";

import { DiscountEditor } from "./DiscountEditor";
import { editorProps } from "./fixtures";

const meta = {
  title: "Organisms/DiscountEditor",
  component: DiscountEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: editorProps,
  render: (args) => (
    <form onSubmit={(event) => event.preventDefault()}>
      <DiscountEditor {...args} />
    </form>
  ),
} satisfies Meta<typeof DiscountEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };

/** Paper mobile artboard width (390): settings rows open their cards. */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** An automatic offer: a name instead of a code. */
export const Automatic: Story = {
  args: {
    title: "Free delivery over GHS 300",
    defaultValue: { ...editorProps.defaultValue, method: "automatic", name: "Free delivery over GHS 300", type: "delivery", scope: "order", targets: [], minSpend: 300, totalUses: null, perCustomer: null, endsAt: null },
  },
};
