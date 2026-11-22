import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuPicker } from "./MenuPicker";

const meta = {
  title: "Organisms/MenuPicker",
  component: MenuPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    menus: [
      { href: "/admin/content/menus/header", title: "Header menu", note: "6 items · 1 unpublished change", changed: true },
      { href: "/admin/content/menus/footer", title: "Footer menu", note: "3 columns · 13 links · published" },
    ],
    activeHref: "/admin/content/menus/header",
    tip: "“Shop by need” fills itself from your categories — reorder them in Categories.",
  },
} satisfies Meta<typeof MenuPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
