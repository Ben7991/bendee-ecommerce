import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "../../atoms";
import { DetailRows } from "../DetailRows";
import { SectionCard } from "./SectionCard";

const rows = [
  { label: "Full name", value: "Ama Mensah" },
  { label: "Phone", value: "+233 24 412 7781" },
];

const meta = {
  title: "Molecules/SectionCard",
  component: SectionCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Your details", action: <TextLink href="#">Edit</TextLink>, className: "max-w-170", children: <DetailRows rows={rows} /> },
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Header ruled off, rows edge to edge. */
export const Flush: Story = { args: { flush: true, children: <DetailRows size="lg" rows={rows} /> } };

export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
