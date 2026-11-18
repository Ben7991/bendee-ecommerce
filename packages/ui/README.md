# @repo/ui — Jofak component library

Every piece of UI for Jofak (storefront now, admin later) is built here, using **atomic design**,
**Tailwind v4 + cva** for styling and **Radix UI** primitives for interactive behaviour.
Apps (`apps/web`, …) only compose these components with data; they do not define their own.

- Design source of truth: Paper file **"Jofak"** → **Design System** page
  (01 — Foundations, 02 — Components, plus the dark copies). Admin: Paper file "Jofak - Admin".
- Tokens: [`src/styles/theme.css`](src/styles/theme.css).
- Browse components: `npm run storybook` from the repo root (http://localhost:6006).

---

## 1. Layers

```
templates   page skeletons with slots          StorefrontShell, CheckoutLayout, AccountLayout, MinimalShell
   ↑
organisms   a distinct section of a screen     Header, Footer, ProductCard, MiniCartDrawer, FilterSheet, CookieBanner
   ↑
molecules   a few atoms doing one job          FormField, QuantityStepper, SearchBar, RatingStars, SegmentedControl
   ↑
atoms       smallest styled unit               Button, IconButton, Text, Heading, Icon, Badge, Input, Checkbox, Price
   ↑
lib         helpers, no UI                     cn, cva, Slot, shared types
```

**Pages are not here.** A page is a Next.js route in `apps/web/app/**` that fills a template with
real data (fetching, server actions, routing all live in the app).

| Layer     | May import                     | Must not                                                   |
| --------- | ------------------------------ | ---------------------------------------------------------- |
| atoms     | `lib`, Radix                   | import any other component                                 |
| molecules | atoms, `lib`, Radix            | import organisms / templates                               |
| organisms | atoms, molecules, `lib`, Radix | import templates                                           |
| templates | everything below               | fetch data, hold business state, hard-code real copy/data |

These rules are enforced by ESLint (`npm run lint -w @repo/ui`), see `eslint.config.mjs`.

### Which layer is it?

1. Can it be split into smaller meaningful components? **No → atom.**
2. Is it a small group of atoms that does exactly one job and is reused in many places
   (label + input + hint + error; − qty +)? **→ molecule.**
3. Is it a recognisable region of a screen that would make sense on its own
   (header, product card, mini-cart, filter panel, footer)? **→ organism.**
4. Does it arrange organisms into a page layout with slots (`children`, `aside`, `header`)? **→ template.**

When in doubt, pick the **lower** layer and promote later. Never import "up" to save time:
move the shared piece down a layer instead.

## 2. Anatomy of a component

Always create components with the generator, never by hand:

```bash
npm run generate:component
```

It asks for the layer, name, root element, whether it has variants, `asChild` and `"use client"`,
then writes:

```
src/components/<layer>/<Name>/
  <Name>.tsx            component (named export, React 19 `ref` as a prop, no forwardRef)
  <Name>.variants.ts    cva() definition + <Name>VariantProps   (only with variants)
  <Name>.stories.tsx    Storybook: title "<Layer>/<Name>", autodocs, variants, mobile
  <Name>.test.tsx       Vitest + Testing Library
  index.ts              public exports of the folder
```

and adds `export * from "./<Name>";` to `src/components/<layer>/index.ts`.

Rules for the files:

- **One public component per folder.** Private sub-parts may live in the folder but are not exported.
- **Import other components through their folder or layer index** (`"../Button"`, `"../../atoms"`),
  never their private files (`"../Button/Button.variants"`). Lint enforces it.
- Root element gets `data-slot="<kebab-name>"` so parents and tests can target it.
- Every component accepts `className` and spreads the native props of its root element
  (`ComponentProps<"button">`, …). `className` is always merged **last** with `cn()`.
- `"use client"` only when the component itself needs state, effects, refs or handlers. Prefer
  server-safe components and push interactivity to the smallest atom/molecule that needs it.

## 3. Styling

- **Tokens only.** Tailwind's default palettes and type/radius scales are reset, so only Jofak
  classes exist: `bg-primary text-on-primary rounded-full px-6 py-3 text-base font-semibold`.
  `bg-red-500` or `text-[15px]` produce no CSS, and lint rejects raw hex and arbitrary values.
  Arbitrary _variants_ for state are fine: `data-[state=open]:bg-surface`.
- **Spacing is a 4px grid** (`--spacing: 4px`): `p-6` = 24px, `size-11.5` = 46px, `leading-4.5` =
  18px, `left-37.5` = 150px. Use quarter steps for Paper's odd values; never `p-[13px]`.
- **Core scales use t-shirt names** (`text-sm`, `rounded-xl`). Component values that sit between
  core steps are **named by pixel value**: `text-10 · 11 · 14 · 17 · 19 · 22 · 24 · 28 · 40 · 56 · 64`,
  `rounded-14 · 18 · 22 · 26`. Set `leading-*` explicitly with those sizes. Extra tracking:
  `tracking-heading · compact · subtle · caps`.
- **Elevation and gradients are tokens too:** `shadow-xs · chip · card · brand · overlay · drawer`;
  `bg-gradient-hero · feature · feature-wide · sun · citrus · skin-light · skin-deep`;
  `scrollbar-none` for touch carousels. Drawer motion: `animate-drawer-in · drawer-out · fade-in · fade-out`.
- A value that is missing is a design-system change: add it to Paper and to `theme.css` (and
  `src/lib/cn.ts` for a new scale step so class merging knows it), never inline in a component.
- **Variants via cva only**, in `<Name>.variants.ts`. Standard prop vocabulary:
  | Prop       | Meaning                                  | Values (typical)                    |
  | ---------- | ---------------------------------------- | ----------------------------------- |
  | `variant`  | visual style                             | `primary`, `secondary`, `ghost`, …  |
  | `size`     | dimensions                               | `sm`, `md`, `lg`                    |
  | `tone`     | semantic colour                          | `neutral`, `success`, `warning`, `error`, `info` |
  | `asChild`  | render the passed child instead          | boolean                             |
  | `disabled` / `loading` | state                        | boolean                             |
- **Theming is automatic.** Use semantic colours (`bg-bg`, `bg-surface`, `text-text-muted`,
  `border-border`, `bg-primary`, `text-brand`, `bg-feature`, `text-on-feature-muted`…), never
  `--color-dark-*`. They flip to dark under `data-theme="dark"` or the OS setting.
  - Text on lime (`bg-accent`) is always `text-on-accent`: lime stays lime in dark.
  - For a one-off that has no semantic token (illustration colours), use the `dark:` variant,
    which follows the same Light / Dark / System rules: `text-citrus-950 dark:text-text`.
  - Check every component in the Paper "· dark" artboards, not just light.
- Jofak design rules from Paper: one sprout-lime accent (`bg-accent`) and one Instrument Serif
  italic word (`font-serif italic`) per view, pill buttons (`rounded-full`), no shadows on plain white.
- Responsive: design widths are mobile **390**, tablet **768**, desktop **1440**. Write mobile-first
  and use `md:` (≥768) and `xl:` (≥1440); `sm:` is ≥390 and `lg:` ≥1024.

## 4. Behaviour and accessibility

- Anything with focus management or keyboard interaction is built on **Radix UI**: Dialog (modals,
  sheets, drawers), Popover, DropdownMenu, Select, Tabs, Toast, Tooltip, Checkbox, RadioGroup, Switch,
  Accordion. Install the specific `@radix-ui/react-*` package in `packages/ui` when you need it.
- Style Radix state with data attributes: `data-[state=open]:…`, `data-[disabled]:…`.
- **Framework-agnostic:** no `next/*` imports. Links and images come from the app:
  - atoms/molecules take an element through `asChild`:
    ```tsx
    <Button asChild arrow>
      <Link href="/shop">Shop now</Link>
    </Button>
    ```
  - organisms that render many links take the link component as `linkAs` (type `LinkComponent`
    from `@repo/ui/lib`, default `<a>`): `<SiteHeader linkAs={Link} … />`. A server component
    can't pass `linkAs` to a client organism, so wrap those in a small `"use client"` file in the
    app (see `apps/web/app/_components/bestsellers.tsx`).
  - images are slots (`image`, `photo`): pass `next/image` with `fill`.
- Icon-only controls need an `aria-label`. Focus ring comes from `base.css` (`:focus-visible`);
  don't remove outlines.
- Respect `prefers-reduced-motion` (handled globally in `base.css`).

### Theme mode (Light / Dark / System)

Provided by `@repo/ui/lib`:

```tsx
// app/layout.tsx
import { ThemeProvider, themeScript } from "@repo/ui/lib";

<html lang="en" suppressHydrationWarning>
  <head>
    {/* applies the saved choice before first paint: no flash */}
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  </head>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

- Light/Dark set `data-theme` on `<html>`; System removes it so `prefers-color-scheme` decides.
- The choice lives in `localStorage` (`jofak-theme`), syncs across tabs, and `onModeChange` on
  the provider is the hook for saving it to the customer's account later.
- UI: the `ThemeSwitch` molecule (footer, and later Account → Appearance). Read state with
  `useTheme()` → `{ mode, resolvedTheme, setMode }`.

## 5. Stories and tests

- Stories live next to the component and are picked up by `apps/storybook`. Show every variant
  and size, and check them in **Light / Dark / System** (toolbar) and the **Mobile · Tablet ·
  Desktop** viewports.
- Tests use Vitest + Testing Library (`npm run test -w @repo/ui`). Query by role first
  (`getByRole("button", { name: "Add to cart" })`), cover variants that change behaviour,
  events, `asChild`, and disabled/loading states.

## 6. Using the library in an app

```css
/* app/globals.css */
@import "tailwindcss";
@import "@repo/ui/styles.css";
```

```tsx
import { Button } from "@repo/ui/atoms";
import { ProductCard } from "@repo/ui/organisms";
import { StorefrontShell } from "@repo/ui/templates";
import { cn } from "@repo/ui/lib";
```

Entry points: `@repo/ui/atoms`, `/molecules`, `/organisms`, `/templates`, `/lib`, `/styles.css`.
Apps consume the **built** package in `dist/` (see §7), never `src/`.

## 7. Build and dev workflow

`@repo/ui` is a compiled package, bundled with **Rollup** ([rollup.config.mjs](rollup.config.mjs)):

- `src/**` → `dist/**` as unminified ESM, one file per module (`preserveModules`), so apps
  tree-shake per component and `"use client"` stays on exactly the files that declare it.
  esbuild compiles TS/JSX; `tsc -p tsconfig.build.json` emits `.d.ts` files (TypeScript 7 has no
  JS API for Rollup plugins). Stories and tests are not built.
- All dependencies (React, Radix, cva, clsx, tailwind-merge) stay external.
- `src/styles/*.css` are copied to `dist/styles/`. They are Tailwind **source**, not compiled CSS:
  each app's own Tailwind build reads the theme and scans `dist/` for class names (`@source "../"`
  in `theme.css`), so every app has one Tailwind pipeline and no duplicated utilities.

| Command (repo root)               | What it does                                                         |
| --------------------------------- | -------------------------------------------------------------------- |
| `npm run build -w @repo/ui`       | bundle with Rollup and emit types, overwriting `dist/` in place      |
| `npm run build:clean -w @repo/ui` | delete `dist/` first (only with no dev server running)               |
| `npm run dev`                     | builds ui once, then watches it (JS + types) alongside the apps      |
| `npm run storybook`               | builds ui once, then runs Storybook with ui in watch mode            |
| `npx turbo run build`             | ui builds first (`^build`), then the apps                            |

Turbo handles the ordering: `dev`, `storybook`, `build` and `check-types` all depend on `^build`,
and `packages/ui/turbo.json` runs `dev:types` next to `dev`. If an app reports
`Cannot find module '@repo/ui/…'`, `dist/` is missing: run `npm run build -w @repo/ui`.
`build` deliberately does not delete `dist/` first, so a build can run while a dev server is
reading it; use `build:clean` to clear out files of removed components.

In Storybook, component stories import their component from **source** (fast HMR), while the
stylesheet comes from `dist/`. Unit tests (`vitest`) also run against source.

## 8. Definition of done

A component is finished when:

- [ ] Built from the Paper component, with values copied via Paper `get_jsx` /
      `get_computed_styles` (not read off screenshots).
- [ ] Lives in the right layer and was scaffolded with the generator.
- [ ] Uses tokens only; variants in cva; `className` merged last.
- [ ] Works at 390, 768 and 1440, in light, dark and System.
- [ ] Keyboard and screen-reader friendly (Radix where applicable, labels on icon buttons).
- [ ] Stories cover all variants/states; tests pass.
- [ ] `npm run lint -w @repo/ui`, `npm run check-types -w @repo/ui`, `npm run test -w @repo/ui` and
      `npm run build -w @repo/ui` are clean.
- [ ] Exported from its layer `index.ts`.
