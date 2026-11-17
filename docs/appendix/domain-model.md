# Appendix — Domain Model

Consolidated view of the entities described in the feature docs. Field lists are in each feature doc's _Data entities_ section; this page shows ownership and relationships.

## Entities by module

| Module          | Entities                                                                                                           | Defined in                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| catalog         | Product, ProductVariant, ProductOption, ProductMedia, Category, Collection, Brand                                  | [01](../01-storefront-discovery.md#4-data-entities), [04](../04-admin-catalog-inventory.md#4-data-entities)                                           |
| inventory       | Location, InventoryLevel, StockMovement, StockReservation, InventorySnapshot, Supplier                             | [04](../04-admin-catalog-inventory.md#4-data-entities), [02](../02-cart-checkout.md#4-data-entities)                                                  |
| content         | ContentBlock, Page, Menu                                                                                           | [01](../01-storefront-discovery.md#4-data-entities), [04](../04-admin-catalog-inventory.md#4-data-entities)                                           |
| cart / checkout | Cart, CartItem, Checkout                                                                                           | [02](../02-cart-checkout.md#4-data-entities)                                                                                                          |
| discounts       | Discount, DiscountRedemption                                                                                       | [02](../02-cart-checkout.md#4-data-entities)                                                                                                          |
| delivery / tax  | DeliveryZone, DeliveryMethod, PickupLocation, TaxComponent                                                         | [02](../02-cart-checkout.md#4-data-entities)                                                                                                          |
| orders          | Order, OrderItem, OrderStatusHistory, OrderNote, Fulfilment, CodRemittance                                         | [02](../02-cart-checkout.md#4-data-entities), [03](../03-customer-account.md#4-data-entities), [04](../04-admin-catalog-inventory.md#4-data-entities) |
| payments        | Payment, PaymentEvent, Refund                                                                                      | [02](../02-cart-checkout.md#4-data-entities), [03](../03-customer-account.md#4-data-entities)                                                         |
| returns         | ReturnRequest                                                                                                      | [03](../03-customer-account.md#4-data-entities)                                                                                                       |
| customers/auth  | Customer, AuthIdentity, OtpChallenge, RefreshToken, Address, Consent, CookieConsent                                | [03](../03-customer-account.md#4-data-entities), [06](../06-seo-marketing.md#4-data-entities)                                                         |
| reviews         | Review, ReviewVote, WishlistItem                                                                                   | [01](../01-storefront-discovery.md#4-data-entities)                                                                                                   |
| staff / audit   | StaffUser, Role, AuditLog, Setting                                                                                 | [04](../04-admin-catalog-inventory.md#4-data-entities)                                                                                                |
| notifications   | MessageTemplate, NotificationLog                                                                                   | [03](../03-customer-account.md#4-data-entities), [06](../06-seo-marketing.md#4-data-entities)                                                         |
| seo             | Redirect, NotFoundLog, SitemapFile (SeoMeta embedded on entities)                                                  | [06](../06-seo-marketing.md#4-data-entities)                                                                                                          |
| marketing       | RecoveryFlow, RecoveryEnrolment, RecoveryMessage, MarketingIntegration, ConversionDispatch                         | [06](../06-seo-marketing.md#4-data-entities)                                                                                                          |
| analytics       | AnalyticsEvent, Session, SearchQueryLog, DailySales, DailyProductStats, FunnelDaily, CustomerMetrics, ReportExport | [05](../05-analytics-reporting.md#6-data-entities)                                                                                                    |

## Core relationships

```mermaid
erDiagram
  CATEGORY ||--o{ CATEGORY : "parent of"
  CATEGORY ||--o{ PRODUCT : "primary category"
  BRAND ||--o{ PRODUCT : brands
  COLLECTION }o--o{ PRODUCT : groups
  PRODUCT ||--|{ PRODUCT_VARIANT : has
  PRODUCT ||--o{ PRODUCT_OPTION : defines
  PRODUCT ||--o{ PRODUCT_MEDIA : shows
  PRODUCT_VARIANT ||--o{ INVENTORY_LEVEL : "stocked at"
  LOCATION ||--o{ INVENTORY_LEVEL : holds
  PRODUCT_VARIANT ||--o{ STOCK_MOVEMENT : ledger

  CUSTOMER ||--o{ ADDRESS : saves
  CUSTOMER ||--o| CART : "active cart"
  CART ||--o{ CART_ITEM : contains
  CART_ITEM }o--|| PRODUCT_VARIANT : references
  CART ||--o| CHECKOUT : "checked out via"
  CHECKOUT }o--o| DELIVERY_METHOD : uses
  DELIVERY_ZONE ||--o{ DELIVERY_METHOD : offers

  CUSTOMER ||--o{ ORDER : places
  CHECKOUT ||--o| ORDER : creates
  ORDER ||--|{ ORDER_ITEM : contains
  ORDER_ITEM }o--|| PRODUCT_VARIANT : "snapshot of"
  ORDER ||--o{ PAYMENT : "paid by"
  PAYMENT ||--o{ REFUND : "refunded by"
  ORDER ||--o{ STOCK_RESERVATION : reserves
  ORDER ||--o{ ORDER_STATUS_HISTORY : tracks
  ORDER ||--o{ FULFILMENT : "fulfilled by"
  ORDER ||--o{ RETURN_REQUEST : "returned via"
  DISCOUNT ||--o{ DISCOUNT_REDEMPTION : "redeemed as"
  ORDER ||--o{ DISCOUNT_REDEMPTION : applies

  CUSTOMER ||--o{ REVIEW : writes
  PRODUCT ||--o{ REVIEW : receives
  CUSTOMER ||--o{ WISHLIST_ITEM : saves
  CUSTOMER ||--o{ CONSENT : grants

  RECOVERY_FLOW ||--o{ RECOVERY_ENROLMENT : enrols
  CART ||--o{ RECOVERY_ENROLMENT : "recovered by"
  RECOVERY_ENROLMENT ||--o{ RECOVERY_MESSAGE : sends

  ROLE ||--o{ STAFF_USER : assigned
  STAFF_USER ||--o{ AUDIT_LOG : performs
```

## Modelling rules

1. **Snapshots over references for history.** Orders copy product name, SKU, options, prices, tax components, addresses and delivery method at placement; later catalog edits never change past orders.
2. **Ledger for stock.** `InventoryLevel` is a cached projection; `StockMovement` is the immutable source of truth. Every write to levels happens in the same transaction as its movement.
3. **Money as integers** (pesewas) with an explicit `currency` column, even though only GHS is used today.
4. **Soft delete** (`deletedAt`) for customer-facing entities referenced by orders (products, variants, categories, customers); hard delete only for unreferenced drafts.
5. **UUID v7** primary keys (time-ordered) for all tables; human-friendly numbers (order `JFK-250001`, return `RMA-…`) as separate unique columns.
6. **Audit columns** on every table: `createdAt`, `updatedAt`, `createdBy`/`updatedBy` where staff-editable.
7. **Phone numbers** stored in E.164; emails lower-cased; both unique per customer where present.
