import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon } from "../../atoms";
import { SegmentedControl } from "../../molecules";
import { AdminPageHeader } from "./AdminPageHeader";

const meta = {
  title: "Organisms/AdminPageHeader",
  component: AdminPageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "Sunday, 15 November · Accra",
    title: "Good morning,",
    highlight: "Abena",
    actions: (
      <>
        <SegmentedControl
          aria-label="Date range"
          options={[
            { value: "today", label: "Today" },
            { value: "7d", label: "7 days" },
            { value: "30d", label: "30 days" },
            { value: "custom", label: "Custom", hideOnMobile: true },
          ]}
        />
        <Button size="sm" aria-label="Add product">
          <Icon name="plus" size={14} />
          <span className="hidden md:inline">Add product</span>
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof AdminPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { eyebrow: undefined, highlight: undefined, title: "Orders", actions: undefined } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
