import type { Meta, StoryObj } from "@storybook/react-vite";

import { AccountIdentity, AccountNav, AccountNavItem } from "../../molecules";
import { AccountLayout } from "./AccountLayout";

const nav = (
  <AccountNav>
    {["Overview", "Orders", "Subscriptions", "Addresses"].map((section) => (
      <AccountNavItem key={section} href="#" active={section === "Orders"}>
        {section}
      </AccountNavItem>
    ))}
  </AccountNav>
);

const meta = {
  title: "Templates/AccountLayout",
  component: AccountLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    header: <div className="p-5 font-sans text-sm text-text-muted">Site header</div>,
    tabs: nav,
    sidebar: (
      <>
        <AccountIdentity name="Ama Mensah" detail="+233 24 412 7781" />
        {nav}
      </>
    ),
    children: <div className="h-80 rounded-lg bg-surface-subtle" />,
  },
} satisfies Meta<typeof AccountLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
