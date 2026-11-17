# Jofak — Feature Documentation

This directory holds the product and technical specification for **Jofak**, a single-vendor B2C e-commerce platform built for the Ghanaian / West African market.

The docs describe _what_ we are building and _how_ we intend to build it. They are the reference for scoping work, writing tickets, designing the API (`apps/api`, NestJS) and the storefront/admin (`apps/web`, Next.js).

## Contents

| #   | Document                                                      | Scope                                                                             |
| --- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 00  | [Overview](./00-overview.md)                                  | Vision, personas, assumptions, roadmap, non-goals                                 |
| 01  | [Storefront & Discovery](./01-storefront-discovery.md)        | Home, categories, listing, product page, search, recommendations, reviews display |
| 02  | [Cart & Checkout](./02-cart-checkout.md)                      | Cart, discounts, delivery, tax, payments (MoMo/card/COD), order creation          |
| 03  | [Customer Account & Post-Purchase](./03-customer-account.md)  | Auth, profile, addresses, orders, tracking, returns/refunds, reviews, privacy     |
| 04  | [Admin, Catalog & Inventory](./04-admin-catalog-inventory.md) | RBAC, products, variants, inventory, orders & fulfilment, discounts, CMS, audit   |
| 05  | [Reporting & Analytics](./05-analytics-reporting.md)          | Sales dashboards, funnel, AOV, CLV, abandonment, inventory turnover               |
| 06  | [SEO & Marketing Integrations](./06-seo-marketing.md)         | Meta tags, slugs, sitemaps, JSON-LD, abandoned-cart recovery, ad pixels           |
| 07  | [Platform & Infrastructure](./07-platform-infrastructure.md)  | Architecture, API conventions, auth, events, jobs, notifications, security, NFRs  |

### Appendices

- [Domain model](./appendix/domain-model.md) — consolidated entities and relationships
- [API surface](./appendix/api-surface.md) — every proposed endpoint, grouped by module
- [Events catalog](./appendix/events-catalog.md) — domain events, producers and consumers
- [Glossary](./appendix/glossary.md) — terms and abbreviations

## UI components

All UI is built in [`packages/ui`](./packages/ui) with atomic design (atoms → molecules → organisms → templates), Tailwind v4 + cva on the Jofak tokens, and Radix UI primitives. Read [packages/ui/README.md](./packages/ui/README.md) before adding a component, and scaffold new ones with `npm run generate:component`. Browse them with `npm run storybook`.

## How to read a feature doc

Every feature document (01–06) follows the same structure:

1. **Summary & goals** — why the area exists and how we measure success
2. **Personas** — who uses it
3. **Sub-features** — description, user stories, functional requirements, business rules, edge cases, priority
4. **Data entities** — key entities and fields touched
5. **API endpoints** — proposed NestJS routes (all under the global `/api` prefix)
6. **Domain events** — emitted and consumed
7. **UI surfaces** — Next.js routes
8. **Acceptance criteria** — Given/When/Then for MVP items
9. **Open questions**

## Conventions

- **Requirement IDs** are prefixed per area and numbered: `SF-` storefront, `CHK-` checkout, `ACC-` account, `ADM-` admin, `ANL-` analytics, `SEO-` SEO/marketing, `PLT-` platform. Example: `CHK-FR-07`. Reference these IDs in tickets and PRs.
- **Priority / phase**

  | Tag       | Meaning                                     |
  | --------- | ------------------------------------------- |
  | `MVP`     | Required for public launch                  |
  | `Phase 2` | First iteration after launch (≈ 1–3 months) |
  | `Phase 3` | Later / nice-to-have, revisit with data     |

- **Money** is stored as integer minor units (pesewas; 1 GHS = 100 pesewas) and shown in examples as `GHS 120.00`.
- **Endpoints** are written as `METHOD /api/...`. Auth column values: `public`, `customer`, `guest|customer` (cart token or session), `staff:<permission>`.
- **Technology choices** are recommendations unless stated as already in place. What exists today is listed in [Platform & Infrastructure](./07-platform-infrastructure.md#1-current-state).
- Diagrams use Mermaid.

## Status

| Field        | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| Doc version  | 0.1 (draft)                                                       |
| Last updated | 2026-11-12                                                        |
| Codebase     | Scaffold only — NestJS API with config + Swagger, Next.js web app |
