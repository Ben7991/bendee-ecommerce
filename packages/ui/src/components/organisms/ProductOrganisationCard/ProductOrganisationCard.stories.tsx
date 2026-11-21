import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductOrganisationCard } from "./ProductOrganisationCard";

const meta = {
  title: "Organisms/ProductOrganisationCard",
  component: ProductOrganisationCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { manageCategoriesHref: "#", manageBrandsHref: "#", categories: [{ value: "energy", label: "Energy & sports" }, { value: "multi", label: "Vitamins & minerals › Multivitamins" }, { value: "sleep", label: "Sleep & stress" }], category: "energy", alsoIn: ["multi"], brands: [{ value: "sunbird", label: "Sunbird Nutrition", mark: { tone: "citrus", monogram: "S" } }, { value: "asaase", label: "Asaase Botanicals", mark: { tone: "primary", icon: "leaf" } }], brand: "sunbird", tags: ["vegan", "chewable", "sugar-free"], taxes: [{ value: "standard", label: "Standard (VAT + levies)" }, { value: "exempt", label: "Exempt" }], tax: "standard", className: "max-w-85" },
} satisfies Meta<typeof ProductOrganisationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tablet: Story = { globals: { viewport: { value: "tablet", isRotated: false } } };
export const Mobile: Story = { globals: { viewport: { value: "mobile", isRotated: false } } };
