# Appendix — Events Catalog

Two kinds of events flow through Jofak:

- **Domain events** (`PascalCase`) — emitted by API modules after a state change commits, written to the transactional outbox and delivered to consumers via the job queue ([Platform §6](../07-platform-infrastructure.md#6-events-jobs--scheduling)). At-least-once delivery: consumers must be idempotent.
- **Analytics events** (`snake_case`) — behavioural events for funnels and pixels, ingested at `POST /api/events` (client) or recorded server-side ([05 §4.2](../05-analytics-reporting.md#42-conversion-funnel-tracking--mvp)).

Every event carries: `eventId` (UUID), `name`, `occurredAt`, `version`, `actor` (`customer`/`guest`/`staff`/`system` + id), `payload`.

## Domain events

| Event                  | Producer (module)   | Key payload                                               | Consumers                                                                                            | Doc    |
| ---------------------- | ------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| `ProductPublished`     | catalog             | productId, slug                                           | Storefront revalidation, search index, sitemap, product feeds                                        | 04     |
| `ProductUpdated`       | catalog             | productId, changedFields[]                                | Revalidation, search index, sitemap (`lastmod`), feeds                                               | 04     |
| `ProductArchived`      | catalog             | productId, slug, redirectTo                               | Revalidation, search index removal, sitemap, redirects                                               | 04     |
| `PriceChanged`         | catalog             | variantId, oldPrice, newPrice                             | Wishlist price-drop alerts, analytics, feeds                                                         | 04     |
| `CategoryUpdated`      | catalog             | categoryId, oldPath, newPath                              | Navigation cache, redirects, sitemap                                                                 | 04     |
| `InventoryChanged`     | inventory           | variantId, locationId, onHand, available                  | Storefront availability, search index, feeds                                                         | 04     |
| `StockReserved`        | inventory           | orderId, items[], expiresAt                               | Inventory reservation expiry timer                                                                   | 02     |
| `StockReleased`        | inventory           | orderId, items[], reason                                  | Storefront availability                                                                              | 02     |
| `StockLow`             | inventory           | variantId, available, threshold                           | Staff alert digest, dashboard                                                                        | 04     |
| `StockOut`             | inventory           | variantId                                                 | Staff alert, storefront badge, feeds                                                                 | 04     |
| `BackInStock`          | inventory           | variantId, available                                      | Back-in-stock notifications (Phase 2)                                                                | 04     |
| `CartItemAdded`        | cart                | cartId, variantId, quantity, price                        | Analytics (`add_to_cart`), pixels                                                                    | 02     |
| `CartItemRemoved`      | cart                | cartId, variantId, quantity                               | Analytics (`remove_from_cart`)                                                                       | 02     |
| `CheckoutStarted`      | checkout            | checkoutId, cartId, value                                 | Analytics funnel, pixels (`InitiateCheckout`), abandonment                                           | 02     |
| `CartAbandoned`        | marketing (job)     | cartId, value, contact, stage                             | Recovery flow engine, analytics                                                                      | 06     |
| `CheckoutAbandoned`    | marketing (job)     | checkoutId, stage                                         | Recovery flow engine, analytics                                                                      | 06     |
| `PaymentInitiated`     | payments            | paymentId, orderId, method, network, amount               | Analytics, reservation timer                                                                         | 02     |
| `PaymentSucceeded`     | payments            | paymentId, orderId, amount, providerRef                   | Orders (→ paid), inventory commit, notifications                                                     | 02     |
| `PaymentFailed`        | payments            | paymentId, orderId, reason                                | Notifications (retry link), payment-failed recovery, analytics                                       | 02     |
| `OrderPlaced`          | orders              | orderId, number, customerId, totals, items[], attribution | Fulfilment queue, analytics, pixels/CAPI (`Purchase`), stop recovery, customer metrics, coupon usage | 02     |
| `OrderExpired`         | orders (job)        | orderId                                                   | Inventory release, abandonment                                                                       | 02     |
| `OrderStatusChanged`   | orders / fulfilment | orderId, from, to, actor                                  | Customer notifications, analytics, tracking page                                                     | 03, 04 |
| `FulfilmentDispatched` | fulfilment          | orderId, courier, trackingNumber                          | SMS "on its way" + tracking link if any                                                                              | 04     |
| `OrderCancelled`       | orders              | orderId, reason, actor                                    | Refunds, inventory restock, notifications, analytics                                                 | 03     |
| `ReturnRequested`      | returns             | returnId, orderId, items[]                                | Support queue, notifications                                                                         | 03     |
| `ReturnStatusChanged`  | returns             | returnId, from, to                                        | Notifications, inventory restock on `received`                                                       | 03     |
| `RefundIssued`         | payments            | refundId, orderId, amount                                 | Analytics (net sales), notifications                                                                 | 03, 04 |
| `CustomerRegistered`   | auth                | customerId, channel                                       | Analytics, welcome flow, pixels (`CompleteRegistration`)                                             | 03     |
| `CustomerLoggedIn`     | auth                | customerId                                                | Cart merge, analytics                                                                                | 03     |
| `ConsentChanged`       | customers           | customerId/anonymousId, channel, granted                  | Marketing audiences, pixel loading, recovery eligibility                                             | 03, 06 |
| `CustomerDeleted`      | privacy (job)       | customerId                                                | Search index, ESP/SMS contact lists, analytics anonymisation                                         | 03     |
| `ReviewSubmitted`      | reviews             | reviewId, productId, rating                               | Moderation queue                                                                                     | 03     |
| `RecoveryMessageSent`  | marketing           | enrolmentId, step, channel                                | Analytics                                                                                            | 06     |
| `RecoveryLinkClicked`  | marketing           | enrolmentId                                               | Attribution, analytics                                                                               | 06     |
| `CartRecovered`        | marketing           | enrolmentId, orderId, value                               | Analytics (recovered revenue)                                                                        | 06     |
| `RedirectsChanged`     | seo                 | paths[]                                                   | Web middleware redirect cache                                                                        | 06     |
| `SitemapRegenerated`   | seo (job)           | files[]                                                   | Search Console ping (Phase 2)                                                                        | 06     |
| `SettingsChanged`      | settings            | group, keys[]                                             | Config cache invalidation                                                                            | 04     |

## Analytics events

Defined with properties in [05 §4.2](../05-analytics-reporting.md#42-conversion-funnel-tracking--mvp); pixel mappings in [06 §3.7](../06-seo-marketing.md#37-ad-pixel-tracking--conversions-apis--mvp-browser-pixels--phase-2-server-side).

`session_started`, `page_viewed`, `product_list_viewed`, `product_viewed`, `search_performed`, `wishlist_item_added`, `add_to_cart`, `remove_from_cart`, `checkout_started`, `delivery_info_added`, `payment_initiated`, `payment_failed`, `order_placed`.

## Versioning rules

1. Adding optional payload fields is non-breaking; removing or renaming requires a new `version` and dual-publishing during migration.
2. Consumers ignore unknown fields.
3. Event names are past tense and never reused for different meanings.
