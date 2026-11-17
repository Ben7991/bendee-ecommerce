# @repo/storybook

Storybook 10 (`@storybook/react-vite`) for the components in [`@repo/ui`](../../packages/ui).

## Run it

From the repo root:

```bash
npx turbo run storybook        # dev server on http://localhost:6006
npx turbo run build-storybook  # static build in apps/storybook/storybook-static (cached by Turbo)
```

The root `package.json` also has `npm run storybook` and `npm run build-storybook` shortcuts.

## How it is set up

- **A separate app, not inside `packages/ui`.** `@repo/ui` is a source-only internal package (its `exports` point straight at `src/*.tsx`, there is no build step). Keeping Storybook in `apps/storybook` follows the Turborepo Storybook guide, keeps Storybook and Vite dependencies out of the package the apps consume, and means editing a story never invalidates the `web` build cache. The workspace is named `@repo/storybook` because a workspace named `storybook` would shadow the `storybook` npm package in `node_modules`.
- **Stories** live in `src/stories/*.stories.tsx`. Each has the `autodocs` tag (set globally in `.storybook/preview.tsx`), so every component gets a Docs page with a props table and controls.
- **Design tokens** come from `@repo/ui/styles.css` (`packages/ui/src/styles/tokens.css`), copied from the Paper file "Jofak". Fonts (Inter Tight, Instrument Serif) load from Google Fonts in `.storybook/preview-head.html`.
- **Theme toolbar**: Light / Dark / System. Light and Dark set `data-theme` on `<html>`. System removes it so `prefers-color-scheme` decides. In dark, the semantic tokens (`--color-bg`, `--color-text`, `--color-primary`, …) resolve to their `--color-dark-*` twins. **Foundations → Colors** shows every semantic token.
- **Example styling**: the current `@repo/ui` components (`Button`, `Card`, `Code`) are unstyled and take a `className`. The stories style them with demo classes in `src/stories/jofak-examples.css`, which are built on the tokens and are not part of `@repo/ui`. Each component also has an `Unstyled` story.

## Turbo tasks

In the root `turbo.json`:

- `storybook`: `cache: false`, `persistent: true`.
- `build-storybook`: `dependsOn: ["^build"]`, `outputs: ["storybook-static/**"]`. A second run with no changes is a full cache hit.

## Adding a component

1. Add the component to `packages/ui/src/<name>.tsx`. It is exported as `@repo/ui/<name>`.
2. Add `src/stories/<Name>.stories.tsx` with `component`, default `args` and one story per variant or state.
