import babelParser from "@babel/eslint-parser";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    // Babel 8's extension-based TSX detection does not reach @babel/eslint-parser,
    // so JSX parsing is switched on explicitly for .tsx files.
    files: ["**/*.tsx"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-typescript"],
          plugins: ["@babel/plugin-syntax-jsx"],
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      // Babel does not resolve TypeScript types, so these core rules misfire on type names.
      // TypeScript (tsc --noEmit with noUnusedLocals/noUnusedParameters) covers them instead.
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  pluginReactHooks.configs.flat.recommended,
];
