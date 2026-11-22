import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import nodeResolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import preserveDirectives from "rollup-plugin-preserve-directives";

/*
 * Builds @repo/ui into dist/ for the apps and Storybook.
 *
 * - One ESM file per source module (preserveModules), so apps tree-shake per component and
 *   "use client" stays on exactly the files that declare it.
 * - Every dependency is external; apps install and dedupe React, Radix, etc.
 * - JS is not minified: Tailwind in each app scans dist/ for class names (see styles/theme.css).
 * - Type declarations come from `tsc -p tsconfig.build.json` (TypeScript 7 has no JS API for
 *   Rollup plugins to use).
 */

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "src");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];
const isExternal = (id) =>
  external.some((dep) => id === dep || id.startsWith(`${dep}/`));

/** Public entry points: src/lib and each atomic layer barrel. */
const input = {
  "lib/index": "src/lib/index.ts",
  ...Object.fromEntries(
    ["atoms", "molecules", "organisms", "templates"].map((layer) => [
      `components/${layer}/index`,
      `src/components/${layer}/index.ts`,
    ]),
  ),
};

/** Copies the stylesheets to dist/styles and rebuilds when they change in watch mode. */
function copyStyles() {
  const dir = path.join(src, "styles");
  return {
    name: "copy-styles",
    buildStart() {
      for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".css"))) {
        const full = path.join(dir, file);
        this.addWatchFile(full);
        this.emitFile({
          type: "asset",
          fileName: `styles/${file}`,
          source: fs.readFileSync(full, "utf8"),
        });
      }
    },
  };
}

export default defineConfig({
  input,
  external: isExternal,
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    entryFileNames: "[name].js",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ extensions: [".ts", ".tsx", ".js", ".mjs"] }),
    esbuild({
      target: "es2022",
      jsx: "automatic",
      // Not read from tsconfig: `strict` there would make esbuild prepend "use strict",
      // pushing "use client" out of first position. ESM is strict anyway.
      tsconfig: false,
      minify: false,
    }),
    preserveDirectives(),
    copyStyles(),
  ],
  onwarn(warning, warn) {
    // preserveDirectives re-adds "use client" after Rollup reports dropping it.
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
    // ...and Rollup then fails to map that same directive (line 1) back through the sourcemap.
    if (warning.code === "SOURCEMAP_ERROR" && warning.loc?.line === 1) return;
    // A layer with no components yet builds to an empty barrel; that is expected.
    if (warning.code === "EMPTY_BUNDLE") return;
    warn(warning);
  },
  watch: { clearScreen: false },
});
