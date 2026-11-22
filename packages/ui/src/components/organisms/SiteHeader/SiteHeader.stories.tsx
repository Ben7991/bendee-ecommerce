import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuDrawer } from "../MenuDrawer";
import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Organisms/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/collections" },
    ],
    activeHref: "/",
    favouritesCount: 6,
    bagCount: 3,
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };

/** The real menu: pass a MenuDrawer through `menu` (see Organisms/MenuDrawer). */
export const WithMenuDrawer: Story = {
  args: {
    menu: (
      <MenuDrawer
        activeHref="/"
        primaryLinks={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Collections", href: "/collections", badge: "Sale" },
        ]}
      />
    ),
  },
  globals: { viewport: { value: "tablet", isRotated: false } },
};
