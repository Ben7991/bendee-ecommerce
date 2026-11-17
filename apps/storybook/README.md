# @repo/storybook

Storybook 10 (`@storybook/react-vite`) for the components in [`@repo/ui`](../../packages/ui).

## Run it

From the repo root:

```bash
npx turbo run storybook        # builds @repo/ui, then Storybook on http://localhost:6006 with ui in watch mode
npx turbo run build-storybook  # builds @repo/ui, then the static build in apps/storybook/storybook-static
```

The root `package.json` also has `npm run storybook` and `npm run build-storybook` shortcuts.

## How it is set up

- **A separate app, not inside `packages/ui`.** `@repo/ui` is a source-only internal package (its `exports` point straight at `src/*.tsx`, there is no build step). Keeping Storybook in `apps/storybook` follows the Turborepo Storybook guide, keeps Storybook and Vite dependencies out of the package the apps consume, and means editing a story never invalidates the `web` build cache. The workspace is named `@repo/storybook` because a workspace named `storybook` would shadow the `storybook` npm package in `node_modules`.
- **Stories**: component stories live next to their component in `packages/ui/src/components/<layer>/<Name>/<Name>.stories.tsx`; token stories live here in `src/foundations/`. Each has the `autodocs` tag (set globally in `.storybook/preview.tsx`). The sidebar is ordered Foundations → Atoms → Molecules → Organisms → Templates.
- **Styles**: `src/storybook.css` imports Tailwind and `@repo/ui/styles.css` (`packages/ui/src/styles/theme.css`, the Jofak tokens as a Tailwind theme), compiled by `@tailwindcss/vite` — the same chain the apps use. Fonts (Inter Tight, Instrument Serif) load from Google Fonts in `.storybook/preview-head.html`.
- **Theme toolbar**: Light / Dark / System. Light and Dark set `data-theme` on `<html>`. System removes it so `prefers-color-scheme` decides. In dark, the semantic tokens (`--color-bg`, `--color-text`, `--color-primary`, …) resolve to their `--color-dark-*` twins. **Foundations → Colors** shows every semantic token.
- **Viewports**: Mobile · 390, Tablet · 768 and Desktop · 1440 (the Paper artboard widths) in the viewport toolbar.

## Turbo tasks

The package scripts are named after the root tasks (`storybook`, `build-storybook`), so a plain `turbo run build` or `turbo run dev` does not start Storybook.

- `storybook`: `dependsOn: ["^build"]` (root `turbo.json`), and `with: ["@repo/ui#dev"]` (`apps/storybook/turbo.json`) so ui rebuilds while you work. `cache: false`, `persistent: true`.
- `build-storybook`: `dependsOn: ["^build"]`, `outputs: ["storybook-static/**"]`. A second run with no changes is a full cache hit.

`@repo/ui` is consumed as its Rollup build (`dist/`) for the stylesheet; component stories import their component from `packages/ui/src` directly, and `src/storybook.css` adds `@source` for that folder so story-only classes are generated.

## Adding a component

Run `npm run generate:component` and follow [packages/ui/README.md](../../packages/ui/README.md). The generator creates the story next to the component.
