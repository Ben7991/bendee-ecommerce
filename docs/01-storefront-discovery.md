# 01 — Customer Storefront & Discovery

## 1. Summary & goals

The storefront is the public, SEO-indexed face of Jofak: home page, category and collection pages, product listing with filters, product detail pages, search and recommendations. It must be fast on mid-range Android phones over mobile data and make it obvious what a product costs **delivered**.

**Success metrics**

| Metric                     | Definition                                      | Target  |
| -------------------------- | ----------------------------------------------- | ------- |
| PDP view rate              | Sessions with ≥ 1 product view / sessions       | ≥ 55 %  |
| Search usage → add-to-cart | Searches followed by add-to-cart within session | ≥ 12 %  |
| Zero-result search rate    | Searches with 0 results / searches              | < 8 %   |
| Mobile LCP (p75)           | Largest Contentful Paint, field data            | < 2.5 s |
| Bounce rate on PLP         | Single-page sessions landing on PLP             | < 45 %  |

## 2. Personas

Ama (mobile shopper), Kwame (returning buyer), Efua (guest), Diaspora buyer, search-engine crawlers. Staff configure content via [Admin](./04-admin-catalog-inventory.md).

## 3. Sub-features

### 3.1 Home page & merchandising — `MVP`

Configurable landing page composed of content blocks managed in admin (see `ADM` CMS).

**User stories**

- As a shopper, I see current promotions and featured products so I can quickly find deals.
- As a marketer, I can reorder home blocks and schedule a banner for a sale period without a deploy.

**Functional requirements**

| ID       | Requirement                                                                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SF-FR-01 | Home page renders an ordered list of blocks: hero banner/carousel, category tiles, product collection rail, promo strip, rich text, USP bar (e.g. "Pay with MoMo", "Delivery in Accra in 24h"). |
| SF-FR-02 | Each block has `startsAt`/`endsAt`; expired blocks are hidden without a deploy.                                                                                                                 |
| SF-FR-03 | Collection rails show up to N in-stock products by default; out-of-stock products are hidden unless the block opts in.                                                                          |
| SF-FR-04 | Announcement bar supports a single line of text + link, dismissible per session.                                                                                                                |

**Business rules**: Hero images must have mobile and desktop variants; alt text is mandatory. Max 5 carousel slides.

**Edge cases**: all blocks expired → fall back to default "Featured" collection; collection with zero eligible products → block hidden.

### 3.2 Category tree & collections — `MVP`

- **Categories** are a hierarchical taxonomy (max depth 3, e.g. _Women › Shoes › Sandals_). A product has one **primary** category (used for breadcrumbs and canonical URL) and may belong to more.
- **Collections** are curated or rule-based groupings independent of the tree (e.g. "New arrivals", "Under GHS 100", "Independence Day sale").

| ID       | Requirement                                                                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SF-FR-05 | Mega-menu / drawer navigation built from the category tree, cached and invalidated on change.                                                                    |
| SF-FR-06 | Category page = category header (name, description, banner) + PLP (3.3) scoped to category and descendants.                                                      |
| SF-FR-07 | Rule-based collections support conditions on tag, category, price range, `createdAt` within N days, on-sale flag. Manual collections have a staff-defined order. |
| SF-FR-08 | Breadcrumbs on category and product pages follow the primary category path.                                                                                      |
| SF-FR-08a | Collections hub at `/collections` ("Offers & collections"): one featured collection as a banner, then cards for every other active, listed collection (image, title, deal label, end date, product count), then "shop by need" links to categories. Ended or unlisted collections are hidden. The collection page breadcrumb links here, and an ended collection's "See current offers" button points here. |

**Edge cases**: deactivated category → 301 to parent; product whose only category is deactivated stays reachable by URL but is excluded from navigation.

### 3.3 Product listing page (PLP), filters & sorting — `MVP`

| ID       | Requirement                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SF-FR-09 | Product cards show image, name, price (sale price with struck-through compare-at price), rating stars (Phase 2), "Low stock"/"Sold out" badge, and quick add-to-cart for single-variant products.                           |
| SF-FR-10 | Facets: category, price range (slider + presets), brand, attribute options (size, colour, material…), availability (in stock), on sale, rating (Phase 2). Facet counts reflect the current filter set.                      |
| SF-FR-11 | Sort: relevance (search only), featured (default), newest, price low→high, price high→low, best selling, top rated (Phase 2).                                                                                               |
| SF-FR-12 | Pagination with "Load more" on mobile and numbered pages for crawlers (`?page=2` with `rel=canonical` to self). Default page size 24, max 48.                                                                               |
| SF-FR-13 | Filter state is encoded in the URL (`?color=red&size=42&price=50-200`) so it is shareable and back-button safe. Filtered URLs are `noindex` except whitelisted SEO landing combinations (see [SEO](./06-seo-marketing.md)). |
| SF-FR-14 | Variant-aware: filtering by `size=42` only shows products with an in-stock or back-orderable size-42 variant; the card image switches to the matching colour when filtering by colour.                                      |

**Business rules**: Hidden/draft products never appear. Sold-out products sort to the end unless the merchant disables that behaviour.

**Edge cases**: zero results after filters → show "No matches" with one-click removal of last filter and suggested categories; price facet with single price → hide slider.

### 3.4 Product detail page (PDP) — `MVP`

| ID       | Requirement                                                                                                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SF-FR-15 | Image gallery (zoom on desktop, swipe on mobile), optional video; images are served responsive (AVIF/WebP, `srcset`).                                                                                                            |
| SF-FR-16 | Variant selector by option (e.g. Colour swatches, Size buttons). Unavailable combinations are disabled; selection updates price, SKU, stock badge, gallery and URL (`?variant=<id>`).                                            |
| SF-FR-17 | Price block: current price, compare-at price, "You save GHS X (Y %)", "Price includes VAT".                                                                                                                                      |
| SF-FR-18 | Stock messaging: `In stock`, `Only N left` (threshold configurable, default 5), `Sold out`, `Pre-order — ships {date}`.                                                                                                          |
| SF-FR-19 | Delivery estimator: shopper picks region/area (remembered in a cookie) and sees fee and ETA (e.g. "Accra: GHS 25, tomorrow"). Uses the same rules as checkout ([02 §3.4](./02-cart-checkout.md#34-delivery-options--fees--mvp)). |
| SF-FR-20 | Quantity selector capped at available stock and per-product max-per-order.                                                                                                                                                       |
| SF-FR-21 | Add to cart (stays on page, opens mini-cart drawer) and Buy now (adds and goes to checkout).                                                                                                                                     |
| SF-FR-22 | Tabs/accordions: description (rich text), specifications (attribute table), delivery & returns policy, reviews.                                                                                                                  |
| SF-FR-23 | "Share on WhatsApp" and copy-link buttons; share URL includes UTM parameters.                                                                                                                                                    |
| SF-FR-24 | Related products rail (same primary category, overlapping tags; excludes current, out-of-stock) — `Phase 2`.                                                                                                                     |
| SF-FR-25 | Emits `product_viewed` analytics event with product, variant and price.                                                                                                                                                          |

**Edge cases**: product archived → 410 or 301 to category (merchant choice); variant ID in URL no longer exists → default variant; price changed while page open → corrected at add-to-cart and in cart with a notice.

### 3.5 Search — `MVP` (basic) / `Phase 2` (advanced)

| ID       | Requirement                                                                                                                                    | Phase   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| SF-FR-26 | Full-text search over product name, SKU, brand, tags, category names, description (weighted in that order).                                    | MVP     |
| SF-FR-27 | Results page reuses PLP with facets and "relevance" sort.                                                                                      | MVP     |
| SF-FR-28 | Search queries are logged (query, result count, clicked product) for analytics and synonym tuning.                                             | MVP     |
| SF-FR-29 | Autocomplete after 2 characters: up to 5 product suggestions with image + price, 3 categories, recent searches (local only). Debounced 200 ms. | Phase 2 |
| SF-FR-30 | Typo tolerance and synonyms managed in admin (e.g. "sneakers" ⇄ "canvas", "phone" ⇄ "mobile").                                                 | Phase 2 |
| SF-FR-31 | Zero-result page suggests spelling corrections, popular categories and best sellers.                                                           | MVP     |

**Implementation note**: start with PostgreSQL full-text search + `pg_trgm`; move to Meilisearch/Typesense when autocomplete and typo tolerance land (see [Platform §7](./07-platform-infrastructure.md#7-search)).

### 3.6 Recommendations — `Phase 2` / `Phase 3`

- **Related products** (Phase 2): rule-based, PDP.
- **Recently viewed** (Phase 2): last 12 products stored client-side (and on the account when logged in).
- **Best sellers / trending** (Phase 2): from order data, rolling 30 days, per category.
- **Frequently bought together** (Phase 3): co-occurrence in orders, minimum support threshold, shown on PDP and cart.
- **Personalised** (Phase 3): based on view/purchase history.

### 3.7 Reviews & ratings (display) — `Phase 2`

Submission and moderation are in [03 §3.8](./03-customer-account.md#38-reviews--ratings-submission--phase-2) and [04](./04-admin-catalog-inventory.md).

| ID       | Requirement                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| SF-FR-32 | PDP shows average rating, count, distribution histogram, and paginated approved reviews (newest / most helpful / rating). |
| SF-FR-33 | "Verified purchase" badge when the reviewer has a delivered order containing the product.                                 |
| SF-FR-34 | Review photos (max 4) displayed in a gallery.                                                                             |
| SF-FR-35 | Aggregate rating is exposed as `AggregateRating` JSON-LD only when count ≥ 1.                                             |

### 3.8 Wishlist — `Phase 2`

Heart icon on cards and PDP. Guests: stored locally, merged into account on login. Customers: stored server-side, optional "back in stock" and "price drop" notifications.

### 3.9 Performance & accessibility — `MVP`

| ID        | Requirement                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| SF-NFR-01 | Server-rendered (React Server Components / ISR) pages for home, category, PDP; revalidated on catalog change via tag-based revalidation. |
| SF-NFR-02 | JS budget for PDP ≤ 170 KB gzipped on first load; images lazy-loaded below the fold.                                                     |
| SF-NFR-03 | Lighthouse mobile performance ≥ 85, accessibility ≥ 95 on home, PLP, PDP.                                                                |
| SF-NFR-04 | WCAG 2.1 AA: keyboard navigation, focus states, colour contrast, labelled controls, alt text.                                            |
| SF-NFR-05 | Works with a "data saver" mode: lower-quality images when `Save-Data` header is present.                                                 |

## 4. Data entities

| Entity           | Key fields                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Product`        | id, slug, name, description, brandId, primaryCategoryId, status (`draft`/`active`/`archived`), tags[], attributes{}, seo{}, createdAt, publishedAt |
| `ProductVariant` | id, productId, sku, optionValues{}, price, compareAtPrice, weightGrams, barcode, isDefault, position                                               |
| `ProductOption`  | id, productId, name (Size, Colour), values[]                                                                                                       |
| `ProductMedia`   | id, productId, variantIds[], url, altText, type (`image`/`video`), position                                                                        |
| `Category`       | id, parentId, slug, name, description, bannerMediaId, position, isActive, seo{}                                                                    |
| `Collection`     | id, slug, name, type (`manual`/`rule`), rules{}, sortOrder, isActive, seo{}, description, bannerMediaId, dealLabel, startsAt, endsAt, isFeatured, isListed |
| `Brand`          | id, slug, name, logoUrl                                                                                                                            |
| `InventoryLevel` | variantId, locationId, onHand, reserved, available (derived)                                                                                       |
| `ContentBlock`   | id, page, type, payload{}, position, startsAt, endsAt                                                                                              |
| `SearchQueryLog` | id, sessionId, query, resultCount, clickedProductId, createdAt                                                                                     |
| `Review`         | id, productId, customerId, orderItemId, rating, title, body, media[], status, helpfulCount                                                         |
| `WishlistItem`   | customerId, productId, variantId, createdAt                                                                                                        |

See [Domain model](./appendix/domain-model.md).

## 5. API endpoints

Module: `catalog`, `search`, `content`, `reviews`, `wishlist`.

| Method & path                                          | Auth     | Purpose                                                                                                 |
| ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `GET /api/storefront/home`                             | public   | Active home content blocks (resolved)                                                                   |
| `GET /api/categories`                                  | public   | Category tree                                                                                           |
| `GET /api/categories/:slug`                            | public   | Category detail + SEO                                                                                   |
| `GET /api/collections`                                 | public   | Active, listed collections for the hub (featured first, then `sortOrder`), with product counts          |
| `GET /api/collections/:slug`                           | public   | Collection detail                                                                                       |
| `GET /api/products`                                    | public   | PLP query: `category`, `collection`, `q`, facets, `sort`, `page`, `limit`; returns items + facet counts |
| `GET /api/products/:slug`                              | public   | PDP: product, variants, options, media, stock status, SEO                                               |
| `GET /api/products/:id/related`                        | public   | Related products (Phase 2)                                                                              |
| `GET /api/search/suggest?q=`                           | public   | Autocomplete (Phase 2)                                                                                  |
| `POST /api/search/click`                               | public   | Record search result click                                                                              |
| `GET /api/delivery/estimate?zoneId=&variantId=`        | public   | Fee and ETA for a zone                                                                                  |
| `GET /api/products/:id/reviews`                        | public   | Approved reviews + summary (Phase 2)                                                                    |
| `GET /api/me/wishlist` / `POST` / `DELETE /:productId` | customer | Wishlist (Phase 2)                                                                                      |

## 6. Domain events

| Event                 | Emitted when                    | Consumers                                                 |
| --------------------- | ------------------------------- | --------------------------------------------------------- |
| `product_viewed`      | PDP rendered (client analytics) | Analytics funnel, recently viewed, pixels (`ViewContent`) |
| `product_list_viewed` | PLP/category rendered           | Analytics                                                 |
| `search_performed`    | Search executed                 | Analytics, search tuning                                  |
| `wishlist_item_added` | Wishlist add                    | Marketing (back-in-stock/price drop)                      |

Consumes: `ProductPublished`, `ProductUpdated`, `InventoryChanged`, `CategoryUpdated` → cache/ISR revalidation and search re-indexing.

## 7. UI surfaces (`apps/web`)

| Route                 | Page                             |
| --------------------- | -------------------------------- |
| `/`                   | Home                             |
| `/c/[...slugPath]`    | Category (e.g. `/c/women/shoes`) |
| `/collections`        | Collections hub (Offers & collections) |
| `/collections/[slug]` | Collection                       |
| `/p/[slug]`           | Product detail                   |
| `/search?q=`          | Search results                   |
| `/wishlist`           | Wishlist (Phase 2)               |

## 8. Acceptance criteria (MVP)

- **Given** a product with variants Red/42 (in stock) and Red/43 (sold out), **when** a shopper selects Red, **then** size 43 is shown disabled and size 42 selectable, and the URL updates to `?variant=<Red-42 id>`.
- **Given** a PLP filtered by `color=red`, **when** the shopper reloads or shares the URL, **then** the same filters and results are shown.
- **Given** a search for an unknown term, **when** results are empty, **then** the page suggests popular categories and the query is logged with `resultCount = 0`.
- **Given** a product's price changes in admin, **when** the change is saved, **then** the PDP and category pages reflect the new price within 60 seconds.
- **Given** a shopper selected "Kumasi" in the delivery estimator, **when** they open another PDP, **then** the Kumasi fee and ETA are pre-selected.

## 9. Open questions

1. Should sold-out products remain visible (with "Notify me") or be hidden entirely?
2. Is pre-order / back-order needed at launch?
3. Brand facet: does the catalog have meaningful brands?
4. URL scheme preference: `/p/slug` vs `/products/slug` (affects SEO; decide before launch, never change after).
