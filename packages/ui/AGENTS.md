# @repo/ui — rules for agents

Full guide: [README.md](./README.md). These rules are not optional.

1. **All UI components live in `packages/ui/src/components/<layer>/`.** Never create presentational
   components in `apps/*`; apps only compose `@repo/ui` components with data.
2. **Atomic layers:** atoms → molecules → organisms → templates. A layer imports only from layers
   below it and from `src/lib`. Pages are Next.js routes in `apps/web`, not components here.
   Unsure? Use the "Which layer is it?" checklist in the README and choose the lower layer.
3. **Scaffold with the generator**, non-interactively:
   `npx turbo gen component --args <layer> <Name> <element> <variants:true|false> <asChild:true|false> <client:true|false>`
   e.g. `npx turbo gen component --args atoms Button button true true false` (run from `packages/ui`).
   Then fill in the generated files; keep their structure.
4. **Design source of truth is Paper**, file "Jofak" → Design System → 02 — Components (admin:
   "Jofak - Admin"). Read exact values with `get_jsx` / `get_computed_styles`; never guess from
   screenshots. Check the dark copy ("02 — Components (dark)") too.
5. **Tokens only:** Tailwind classes from `src/styles/theme.css`. No hex colours, no arbitrary values
   (`p-[13px]`), no inline style colours, no `--color-dark-*`. Spacing is a 4px grid (`size-11.5` =
   46px); in-between type/radius steps are px-named (`text-14`, `rounded-22`). Missing token → stop
   and ask; it is a design-system change. Text on lime is `text-on-accent`; one-off dark tweaks use
   `dark:`. Icons come from the `Icon` atom (Paper's icon set), not an icon library.
6. **Variants with cva** in `<Name>.variants.ts`, prop names `variant` / `size` / `tone` / `asChild`
   / `disabled` / `loading`. Always accept `className` and merge it last with `cn()`.
7. **Interactive behaviour on Radix UI** (Dialog for modals/sheets/drawers, Popover, Select, Tabs,
   Toast, Tooltip, Checkbox, RadioGroup, Switch…). Add the `@radix-ui/react-*` package to
   `packages/ui` with an exact version.
8. **No `next/*` imports.** Atoms/molecules take links via `asChild`; organisms take a `linkAs`
   component; images are ReactNode slots. Theme mode comes from `ThemeProvider` / `useTheme` in `lib`.
9. **Every breakpoint and theme:** mobile 390, tablet 768, desktop 1440; light, dark and System.
10. **Apps use the Rollup build** in `dist/` via the package exports. Never import
    `@repo/ui/src/...` or add `transpilePackages`; new public entry points need both a Rollup
    `input` and a package.json `exports` entry. Keep class names as literal strings (Tailwind in
    the apps scans the unminified `dist/`).
11. **Done means:** story with all variants, test passing, exported from the layer index, and
    `npm run lint -w @repo/ui && npm run check-types -w @repo/ui && npm run test -w @repo/ui && npm run build -w @repo/ui` clean.
