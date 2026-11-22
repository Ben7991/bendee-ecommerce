import type { PillSelectOption } from "@repo/ui/molecules";
import type { ProductCardData } from "@repo/ui/organisms";

import { shopProducts } from "./shop";

/*
 * Sample favourites for the static favourites page (Paper "Jofak" → Favourites). There's no
 * wishlist API yet (docs/01-storefront-discovery.md §3.8); hearts don't change anything.
 */

export type FavouriteStatus = "price-dropped" | "back-in-stock" | "out-of-stock";

export interface Favourite {
  product: ProductCardData;
  status?: FavouriteStatus;
}

const card = (id: string) => shopProducts.find((product) => product.id === id)!;
const priceDrop = (product: ProductCardData) => ({
  label: `Price dropped GHS ${product.compareAt! - product.price}`,
  shortLabel: "Price drop",
  variant: "solid" as const,
});

/** In Paper's order (most recently saved first). */
export const favourites: Favourite[] = [
  { product: card("ashwagandha") },
  { product: { ...card("energy"), badge: priceDrop(card("energy")) }, status: "price-dropped" },
  { product: card("nmnh") },
  { product: { ...card("greens"), badge: priceDrop(card("greens")) }, status: "price-dropped" },
  { product: { ...card("probiotic"), badge: { label: "Back in stock", variant: "solid" } }, status: "back-in-stock" },
  { product: card("magnesium"), status: "out-of-stock" },
];

export const statusFilters: { value: FavouriteStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "price-dropped", label: "Price dropped" },
  { value: "back-in-stock", label: "Back in stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export const favouriteSorts: PillSelectOption[] = [
  { value: "recent", label: "Recently saved" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" },
];
