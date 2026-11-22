import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProfileIdentity } from "./ProfileIdentity";

const meta = {
  title: "Molecules/ProfileIdentity",
  component: ProfileIdentity,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "Abena Mensah",
    role: "Owner",
    meta: "abena@jofak.com · joined 2 Sep 2026 · last signed in today 07:58 from Osu",
    tabletMeta: "abena@jofak.com · joined 2 Sep 2026",
    compactMeta: "Joined 2 Sep 2026",
  },
} satisfies Meta<typeof ProfileIdentity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
/** Paper mobile artboard width (390). */
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
