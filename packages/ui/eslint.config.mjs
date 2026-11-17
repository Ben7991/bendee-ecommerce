import { config } from "@repo/eslint-config/react-internal";

/*
 * Atomic design guard rails for @repo/ui. See README.md → "Layer rules".
 * A layer may only import from layers below it:
 *   templates → organisms → molecules → atoms → lib
 */

const LAYERS = ["atoms", "molecules", "organisms", "templates"];

/** no-restricted-imports patterns that apply to every file in src/. */
const sharedPatterns = [
  {
    group: ["next", "next/*", "@next/*"],
    message:
      "@repo/ui is framework-agnostic. Accept the element via `asChild` (Radix Slot) and let the app pass next/link or next/image.",
  },
  {
    group: ["@repo/ui", "@repo/ui/*"],
    message: "Use a relative import inside @repo/ui (self-imports create cycles).",
  },
  {
    // ../Button/Button.variants or ../../atoms/Button/Button — reach only through the folder index.
    regex: "^(\\.\\./)+(components/)?((atoms|molecules|organisms|templates)/)?[A-Z][A-Za-z0-9]*/.+",
    caseSensitive: true,
    message:
      "Import another component through its folder index (e.g. '../Button' or '../../atoms'), not its private files.",
  },
];

/** Builds the per-layer override that forbids importing from higher layers. */
function layerRule(layer) {
  const index = LAYERS.indexOf(layer);
  const higher = LAYERS.slice(index + 1);
  const allowed = [...LAYERS.slice(0, index), "lib"].join(", ");
  const patterns = [...sharedPatterns];
  if (higher.length > 0) {
    patterns.push({
      group: higher.flatMap((h) => [`**/${h}`, `**/${h}/**`]),
      message: `${layer} may only import from: ${allowed}. Move the shared piece down a layer or build this component higher up.`,
    });
  }
  return {
    files: [`src/components/${layer}/**/*.{ts,tsx}`],
    rules: { "no-restricted-imports": ["error", { patterns }] },
  };
}

const TOKEN_MESSAGE =
  "Use a Jofak token class (see src/styles/theme.css) instead of raw colours or arbitrary values. If a value is missing, add it to the Paper design system and theme.css first.";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  { ignores: ["dist/**", "coverage/**", "turbo/generators/templates/**"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: sharedPatterns }],
      "no-restricted-syntax": [
        "error",
        // Raw hex colours in class strings or styles: "#fff", "bg-[#0f3d2a]".
        { selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]", message: TOKEN_MESSAGE },
        { selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]", message: TOKEN_MESSAGE },
        // Tailwind arbitrary values: "p-[13px]", "text-[15px]". Arbitrary variants such as
        // "data-[state=open]:" (followed by a colon) stay allowed for Radix state styling.
        { selector: "Literal[value=/[a-z]-\\[[^\\]]*\\](?!:)/]", message: TOKEN_MESSAGE },
        { selector: "TemplateElement[value.raw=/[a-z]-\\[[^\\]]*\\](?!:)/]", message: TOKEN_MESSAGE },
      ],
    },
  },
  ...LAYERS.map(layerRule),
];
