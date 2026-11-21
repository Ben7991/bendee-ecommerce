import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderMoreMenu } from "../OrderMoreMenu";
import { CustomerProfileHeader } from "./CustomerProfileHeader";

const meta = {
  title: "Organisms/CustomerProfileHeader",
  component: CustomerProfileHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    backHref: "#",
    name: "Efua Boateng",
    tag: { label: "VIP", tone: "accent" },
    meta: "Customer since 4 Mar 2025 · Account active · Phone verified",
    compactMeta: "Since 4 Mar 2025 · Active · Phone verified",
    mobileMeta: "Since Mar 2025 · Active · Verified",
    addNoteHref: "#notes",
    more: (
      <OrderMoreMenu
        label="Customer actions"
        triggerClassName="size-9 md:size-10.5 xl:size-11"
        items={[
          { label: "Export customer data", href: "#", icon: "export" },
          { label: "Disable account", href: "#", icon: "closeCircle", tone: "danger" },
        ]}
      />
    ),
  },
} satisfies Meta<typeof CustomerProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const WithoutTag: Story = { args: { tag: undefined, tone: "lavender", name: "Akosua Frimpong" } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
