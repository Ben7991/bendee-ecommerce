import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusBadge, TextLink } from "../../atoms";
import { DetailRows } from "./DetailRows";

const rows = [
  { label: "Full name", value: "Ama Mensah" },
  { label: "Phone", value: "+233 24 412 7781", badge: <StatusBadge size="sm" tone="success" marker="check" label="Verified" /> },
  { label: "Date of birth", value: "Not added · get a birthday treat", muted: true, action: <TextLink href="#">Add</TextLink> },
];

const meta = {
  title: "Molecules/DetailRows",
  component: DetailRows,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { rows, className: "max-w-150" },
} satisfies Meta<typeof DetailRows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Both sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex max-w-200 flex-col gap-8">
      <DetailRows {...args} size="md" />
      <DetailRows {...args} size="lg" className="rounded-lg border border-border-subtle" />
    </div>
  ),
};

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
