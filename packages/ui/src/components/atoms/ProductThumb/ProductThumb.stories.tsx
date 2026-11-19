import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductThumb } from "./ProductThumb";

const meta = {
  title: "Atoms/ProductThumb",
  component: ProductThumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { tint: "sage", size: "sm" },
} satisfies Meta<typeof ProductThumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every tint and size. Check it in Light, Dark and System from the toolbar. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-3">
        {(["xs", "sm", "md", "lg", "xl", "square", "photo"] as const).map((size) => (
          <ProductThumb key={size} size={size} />
        ))}
      </div>
      <div className="flex items-end gap-3">
        {(["sage", "amber", "lavender", "sun", "surface"] as const).map((tint) => (
          <ProductThumb key={tint} tint={tint} />
        ))}
        <ProductThumb size="lg" quantity={2} />
        <ProductThumb dimmed tint="amber" />
      </div>
      <div className="flex">
        <ProductThumb size="xs" ring />
        <ProductThumb size="xs" ring tint="amber" className="-ml-2.5" />
        <ProductThumb size="xs" ring tint="lavender" className="-ml-2.5" />
      </div>
    </div>
  ),
};

/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
