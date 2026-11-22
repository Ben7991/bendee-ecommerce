import type { SeoTemplateEditorProps } from "./SeoTemplateEditor";

export const SEO_ARGS: SeoTemplateEditorProps = {
  tabs: [
    { label: "Products", href: "?tab=products", active: true },
    { label: "Categories", href: "?tab=categories" },
    { label: "Brands", href: "?tab=brands" },
  ],
  defaultValue: { title: "{name} – {brand} | Jofak", description: "description", image: "photo" },
  tokens: ["name", "brand", "category", "price", "size"],
  descriptionOptions: [{ value: "description", label: "First 155 characters of the product description" }],
  imageOptions: [{ value: "photo", label: "First product photo, cropped to 1200 × 630" }],
  sample: {
    values: { name: "Greens Daily · 30 servings", brand: "Asaase Botanicals" },
    path: "products › greens-daily",
    description: "A daily blend of moringa, spirulina and baobab to top up your greens.",
    image: "Product photo · 1200 × 630",
    price: "GHS 70",
  },
  note: "41 of 48 products use this template.",
};
