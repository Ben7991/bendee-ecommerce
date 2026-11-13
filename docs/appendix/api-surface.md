# Appendix — API Surface

Every proposed endpoint, collected from the _API endpoints_ section of each feature doc. All paths are under the global `/api` prefix already configured in `apps/api/src/main.ts`; `GET /health` sits outside it. The feature doc is the source of truth for details — update it first, then regenerate this list.

Auth legend: `public` · `guest|customer` (cart token or customer session) · `customer` · `signature` (provider webhook) · staff permission strings (e.g. `orders:refund`, see [Platform §5](../07-platform-infrastructure.md#5-authentication--authorisation)).

## Platform

| Method & path | Auth                     | Purpose                                              |
| ------------- | ------------------------ | ---------------------------------------------------- |
| `GET /health` | public                   | Liveness check, outside the `/api` prefix (in place) |
| `GET /docs`   | public (protect in prod) | Swagger UI (in place)                                |

## Storefront & Discovery

Source: [01-storefront-discovery.md](../01-storefront-discovery.md#5-api-endpoints)

| Method & path                                          | Auth / permission | Purpose                                                                                                 |
| ------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------- |
| `GET /api/storefront/home`                             | public            | Active home content blocks (resolved)                                                                   |
| `GET /api/categories`                                  | public            | Category tree                                                                                           |
| `GET /api/categories/:slug`                            | public            | Category detail + SEO                                                                                   |
| `GET /api/collections/:slug`                           | public            | Collection detail                                                                                       |
| `GET /api/products`                                    | public            | PLP query: `category`, `collection`, `q`, facets, `sort`, `page`, `limit`; returns items + facet counts |
| `GET /api/products/:slug`                              | public            | PDP: product, variants, options, media, stock status, SEO                                               |
| `GET /api/products/:id/related`                        | public            | Related products (Phase 2)                                                                              |
| `GET /api/search/suggest?q=`                           | public            | Autocomplete (Phase 2)                                                                                  |
| `POST /api/search/click`                               | public            | Record search result click                                                                              |
| `GET /api/delivery/estimate?zoneId=&variantId=`        | public            | Fee and ETA for a zone                                                                                  |
| `GET /api/products/:id/reviews`                        | public            | Approved reviews + summary (Phase 2)                                                                    |
| `GET /api/me/wishlist` / `POST` / `DELETE /:productId` | customer          | Wishlist (Phase 2)                                                                                      |

## Cart & Checkout

Source: [02-cart-checkout.md](../02-cart-checkout.md#5-api-endpoints)

| Method & path                                   | Auth / permission     | Purpose                                         |
| ----------------------------------------------- | --------------------- | ----------------------------------------------- |
| `GET /api/cart`                                 | guest\|customer       | Current cart with recalculated totals & notices |
| `POST /api/cart/items`                          | guest\|customer       | Add `{variantId, quantity}`                     |
| `PATCH /api/cart/items/:itemId`                 | guest\|customer       | Update quantity                                 |
| `DELETE /api/cart/items/:itemId`                | guest\|customer       | Remove line                                     |
| `POST /api/cart/coupon`                         | guest\|customer       | Apply code                                      |
| `DELETE /api/cart/coupon`                       | guest\|customer       | Remove code                                     |
| `POST /api/cart/merge`                          | customer              | Merge guest cart (called after login)           |
| `GET /api/delivery/zones`                       | public                | Regions/cities/areas → zones                    |
| `GET /api/delivery/methods?region=&city=&area=` | public                | Available methods with fee & ETA for cart       |
| `GET /api/pickup-locations`                     | public                | Pickup points                                   |
| `POST /api/checkouts`                           | guest\|customer       | Create checkout from cart                       |
| `PATCH /api/checkouts/:id`                      | guest\|customer       | Update contact/address/method                   |
| `GET /api/checkouts/:id`                        | guest\|customer       | Checkout with totals                            |
| `POST /api/checkouts/:id/pay`                   | guest\|customer       | Initiate payment (Idempotency-Key)              |
| `POST /api/payments/:id/otp`                    | guest\|customer       | Submit OTP/PIN step if requested                |
| `GET /api/payments/:id`                         | guest\|customer       | Poll status                                     |
| `POST /api/webhooks/paystack`                   | signature             | Provider webhook                                |
| `GET /api/orders/:number/confirmation`          | guest token\|customer | Confirmation data                               |

## Customer Account & Post-Purchase

Source: [03-customer-account.md](../03-customer-account.md#5-api-endpoints)

| Method & path                                                   | Auth / permission | Purpose                       |
| --------------------------------------------------------------- | ----------------- | ----------------------------- |
| `POST /api/auth/otp/request`                                    | public            | Send OTP `{phone, purpose}`   |
| `POST /api/auth/otp/verify`                                     | public            | Verify OTP, sign in / sign up |
| `POST /api/auth/login`                                          | public            | Email + password              |
| `POST /api/auth/refresh`                                        | refresh cookie    | Rotate tokens                 |
| `POST /api/auth/logout`                                         | customer          | Revoke current session        |
| `POST /api/auth/logout-all`                                     | customer          | Revoke all sessions           |
| `POST /api/auth/password/forgot` / `reset`                      | public            | Password reset                |
| `GET /api/me` / `PATCH /api/me`                                 | customer          | Profile                       |
| `POST /api/me/phone/change`                                     | customer          | Change phone (OTP)            |
| `GET /api/me/addresses` / `POST` / `PATCH /:id` / `DELETE /:id` | customer          | Address book                  |
| `GET /api/me/orders`                                            | customer          | Order list                    |
| `GET /api/me/orders/:number`                                    | customer          | Order detail                  |
| `POST /api/me/orders/:number/reorder`                           | customer          | Reorder into cart             |
| `POST /api/me/orders/:number/cancel`                            | customer          | Cancel / request cancel       |
| `GET /api/me/orders/:number/invoice`                            | customer          | Invoice PDF                   |
| `GET /api/orders/track?number=&phone=` / `?token=`              | public            | Public tracking               |
| `POST /api/me/returns` / `GET /api/me/returns`                  | customer          | Returns (Phase 2)             |
| `POST /api/me/reviews` / `PATCH /:id` / `DELETE /:id`           | customer          | Reviews (Phase 2)             |
| `POST /api/reviews/:id/helpful`                                 | customer          | Helpful vote (Phase 2)        |
| `GET /api/me/preferences` / `PATCH`                             | customer          | Channels & consents           |
| `POST /api/me/data-export`                                      | customer          | Request export                |
| `DELETE /api/me`                                                | customer          | Delete account                |
| `GET /api/unsubscribe?token=`                                   | signed token      | One-click unsubscribe         |

## Admin, Catalog & Inventory

Source: [04-admin-catalog-inventory.md](../04-admin-catalog-inventory.md#5-api-endpoints)

| Method & path                                             | Auth / permission     | Purpose                       |
| --------------------------------------------------------- | --------------------- | ----------------------------- |
| `POST /api/admin/auth/login` / `POST /api/admin/auth/2fa` | public                | Staff sign-in + TOTP          |
| `GET/POST /api/admin/staff`, `PATCH/DELETE /:id`          | `staff:manage`        | Staff & invites               |
| `GET/POST /api/admin/roles`, `PATCH /:id`                 | `staff:manage`        | Roles (custom: Phase 2)       |
| `GET/POST /api/admin/products`                            | `products:read/write` | List / create                 |
| `GET/PATCH/DELETE /api/admin/products/:id`                | `products:*`          | Detail / update / delete      |
| `POST /api/admin/products/:id/duplicate`                  | `products:write`      | Duplicate                     |
| `POST /api/admin/products/bulk`                           | `products:write`      | Bulk actions                  |
| `PUT /api/admin/products/:id/variants`                    | `products:write`      | Upsert variant matrix         |
| `POST /api/admin/media/uploads`                           | `products:write`      | Get signed upload URL         |
| `POST /api/admin/imports` / `GET /:id`                    | `products:write`      | Bulk import (Phase 2)         |
| `GET /api/admin/exports/products`                         | `products:read`       | Export (Phase 2)              |
| `GET/POST/PATCH/DELETE /api/admin/categories[/:id]`       | `products:write`      | Categories                    |
| `PUT /api/admin/categories/tree`                          | `products:write`      | Reorder tree                  |
| `GET/POST/PATCH/DELETE /api/admin/collections[/:id]`      | `products:write`      | Collections                   |
| `GET/POST/PATCH /api/admin/brands[/:id]`                  | `products:write`      | Brands                        |
| `GET /api/admin/inventory`                                | `inventory:read`      | Levels with filters           |
| `POST /api/admin/inventory/adjustments`                   | `inventory:adjust`    | Adjust / receive stock        |
| `GET /api/admin/inventory/movements`                      | `inventory:read`      | Ledger                        |
| `POST /api/admin/inventory/counts` / `PATCH /:id`         | `inventory:adjust`    | Stock counts (Phase 2)        |
| `GET /api/admin/orders`                                   | `orders:read`         | List                          |
| `GET /api/admin/orders/:id`                               | `orders:read`         | Detail                        |
| `POST /api/admin/orders/:id/status`                       | `orders:fulfil`       | Transition status             |
| `POST /api/admin/orders/:id/fulfilments`                  | `orders:fulfil`       | Create/assign fulfilment      |
| `POST /api/admin/orders/:id/cancel`                       | `orders:cancel`       | Cancel                        |
| `POST /api/admin/orders/:id/refunds`                      | `orders:refund`       | Refund                        |
| `POST /api/admin/orders/:id/notes`                        | `orders:read`         | Add note                      |
| `GET /api/admin/orders/pick-list?ids=`                    | `orders:fulfil`       | Pick list / packing slips PDF |
| `GET/POST/PATCH /api/admin/riders[/:id]`                  | `orders:fulfil`       | Riders                        |
| `GET/POST /api/admin/cod-remittances`                     | `orders:fulfil`       | COD reconciliation            |
| `GET /api/admin/returns`, `POST /:id/transition`          | `orders:refund`       | RMA queue (Phase 2)           |
| `GET /api/admin/customers`, `GET/PATCH /:id`              | `customers:*`         | Customers                     |
| `GET/POST/PATCH/DELETE /api/admin/discounts[/:id]`        | `discounts:write`     | Discounts                     |
| `POST /api/admin/discounts/:id/codes`                     | `discounts:write`     | Bulk-generate codes           |
| `GET/PATCH /api/admin/reviews[/:id]`                      | `content:write`       | Moderate reviews (Phase 2)    |
| `GET/POST/PATCH/DELETE /api/admin/pages[/:id]`            | `content:write`       | Static pages                  |
| `GET/PUT /api/admin/content-blocks`                       | `content:write`       | Home/landing blocks           |
| `GET/PUT /api/admin/menus/:key`                           | `content:write`       | Menus                         |
| `GET/PATCH /api/admin/settings/:group`                    | `settings:write`      | Settings groups               |
| `GET/POST/PATCH /api/admin/delivery/zones[/:id]`          | `settings:write`      | Zones & methods               |
| `GET /api/admin/audit-logs`                               | `staff:manage`        | Audit log                     |
| `GET /api/admin/dashboard`                                | `reports:view`        | Dashboard summary             |

## Reporting & Analytics

Source: [05-analytics-reporting.md](../05-analytics-reporting.md#7-api-endpoints)

| Method & path                                  | Auth / permission     | Purpose                                          |
| ---------------------------------------------- | --------------------- | ------------------------------------------------ |
| `POST /api/events`                             | public (rate-limited) | Ingest client events (batch ≤ 50)                |
| `GET /api/admin/reports/sales/summary`         | `reports:view`        | KPI tiles + comparison                           |
| `GET /api/admin/reports/sales/timeseries`      | `reports:view`        | Revenue/orders over time                         |
| `GET /api/admin/reports/sales/breakdown?by=`   | `reports:view`        | category, product, payment, zone, source, device |
| `GET /api/admin/reports/funnel`                | `reports:view`        | Funnel with segments                             |
| `GET /api/admin/reports/products`              | `reports:view`        | Product performance                              |
| `GET /api/admin/reports/search`                | `reports:view`        | Search analytics                                 |
| `GET /api/admin/reports/aov`                   | `reports:view`        | AOV trend & distribution                         |
| `GET /api/admin/reports/customers/cohorts`     | `reports:view`        | Retention cohorts (Phase 2)                      |
| `GET /api/admin/reports/customers/clv`         | `reports:view`        | CLV by segment (Phase 2)                         |
| `GET /api/admin/reports/customers/rfm`         | `reports:view`        | RFM segments (Phase 2)                           |
| `GET /api/admin/reports/abandonment`           | `reports:view`        | Abandonment & recovery                           |
| `GET /api/admin/reports/inventory/stock`       | `reports:view`        | Stock on hand/value                              |
| `GET /api/admin/reports/inventory/turnover`    | `reports:view`        | Turnover, DOI, sell-through (Phase 2)            |
| `GET /api/admin/reports/discounts`             | `reports:view`        | Discount performance                             |
| `GET /api/admin/reports/tax`                   | `reports:view`        | Tax by component                                 |
| `GET /api/admin/reports/payments`              | `reports:view`        | Payments & COD                                   |
| `POST /api/admin/reports/exports` / `GET /:id` | `reports:view`        | Async CSV export                                 |
| `GET/POST /api/admin/reports/schedules`        | `reports:view`        | Scheduled digests (Phase 2)                      |

## SEO & Marketing

Source: [06-seo-marketing.md](../06-seo-marketing.md#5-api-endpoints)

| Method & path                                           | Auth / permission     | Purpose                              |
| ------------------------------------------------------- | --------------------- | ------------------------------------ |
| `GET /api/seo/resolve?path=`                            | public (web server)   | Resolve redirects / 410 for a path   |
| `GET /api/seo/sitemap-index`                            | public                | Sitemap index data (rendered by web) |
| `GET /api/seo/sitemaps/:name`                           | public                | Sitemap URL list                     |
| `GET /api/feeds/:provider`                              | public                | Product feed (Phase 2)               |
| `GET /api/cart/recover?token=`                          | public (signed token) | Restore cart from recovery link      |
| `POST /api/consent`                                     | public                | Save cookie consent                  |
| `POST /api/newsletter/subscribe`                        | public                | Newsletter (Phase 2)                 |
| `GET/PATCH /api/admin/settings/seo`                     | `settings:write`      | Templates & defaults                 |
| `GET/POST/PATCH/DELETE /api/admin/redirects[/:id]`      | `content:write`       | Redirect manager (Phase 2)           |
| `GET /api/admin/redirects/404s`                         | `content:write`       | 404 log (Phase 2)                    |
| `POST /api/admin/sitemaps/regenerate`                   | `content:write`       | Force regeneration                   |
| `GET/POST/PATCH /api/admin/marketing/flows[/:id]`       | `marketing:write`     | Recovery & lifecycle flows           |
| `GET /api/admin/marketing/enrolments`                   | `marketing:read`      | Enrolments & messages                |
| `GET/PATCH /api/admin/marketing/templates[/:id]`        | `marketing:write`     | Message templates                    |
| `GET/PATCH /api/admin/marketing/integrations/:provider` | `settings:write`      | Pixels & CAPI config                 |
| `GET /api/admin/marketing/integrations/:provider/debug` | `marketing:read`      | Recent dispatches                    |
