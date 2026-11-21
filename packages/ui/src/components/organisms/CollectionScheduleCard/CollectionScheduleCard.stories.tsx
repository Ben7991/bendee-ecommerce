import type { Meta, StoryObj } from "@storybook/react-vite";

import { CollectionScheduleCard } from "./CollectionScheduleCard";

const meta = {
  title: "Organisms/CollectionScheduleCard",
  component: CollectionScheduleCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { defaultValue: { startsAt: "2026-11-01T00:00", endsAt: "2026-12-15T23:59" }, className: "max-w-85" },
} satisfies Meta<typeof CollectionScheduleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoEnd: Story = { args: { defaultValue: { startsAt: "2026-11-01T00:00" } } };
