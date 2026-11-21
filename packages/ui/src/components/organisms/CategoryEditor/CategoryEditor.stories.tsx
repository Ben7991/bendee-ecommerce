import type { Meta, StoryObj } from "@storybook/react-vite";

import { CategoryEditor } from "./CategoryEditor";

const meta = {
  title: "Organisms/CategoryEditor",
  component: CategoryEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    trail: "Beauty from within ›",
    defaultValue: { name: "Collagen", slug: "collagen", parent: "beauty", description: "Marine and bovine collagen powders and capsules for skin, hair and joints.", active: true },
    parents: [
      { value: "", label: "Top level" },
      { value: "beauty", label: "Beauty from within" },
      { value: "sleep", label: "Sleep & stress" },
    ],
    banner: {},
    seo: { title: "Collagen supplements in Ghana | Jofak", href: "#" },
    addSubcategoryHref: "#",
    deleteNote: { title: "Delete Collagen?", body: "Move its 7 products and Marine collagen first. Categories with products can be hidden, not deleted.", action: { label: "Move products…", href: "#" } },
    className: "xl:w-100",
  },
} satisfies Meta<typeof CategoryEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: { value: "desktop", isRotated: false } } };
/** The mobile bottom sheet. */
export const Sheet: Story = { args: { presentation: "sheet", open: true }, globals: { viewport: { value: "mobile", isRotated: false } } };
export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
