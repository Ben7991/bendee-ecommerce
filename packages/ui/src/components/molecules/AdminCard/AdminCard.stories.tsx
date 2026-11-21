import type { Meta, StoryObj } from "@storybook/react-vite";

import { AdminCard } from "./AdminCard";

const meta = {
  title: "Molecules/AdminCard",
  component: AdminCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Details", children: <p className="text-14 text-text-secondary">Card content</p>, className: "max-w-150" },
} satisfies Meta<typeof AdminCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Heading, eyebrow and flush. Check Light, Dark and System. */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <AdminCard {...args} meta={<span className="text-text-muted">Drag to reorder · the first image is the cover</span>} title="Media" />
      <AdminCard {...args} variant="eyebrow" title="Status" className="max-w-85" />
      <AdminCard {...args} flush title="Options and variants" />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
