import fs from "node:fs";
import path from "node:path";

import type { PlopTypes } from "@turbo/gen";

/*
 * `npm run generate:component` (or `turbo gen component` from anywhere in the repo).
 * Scaffolds a component in the atomic layer of your choice with the standard anatomy:
 *   src/components/<layer>/<Name>/{Name.tsx, Name.variants.ts?, Name.stories.tsx, Name.test.tsx, index.ts}
 * and registers it in the layer barrel. Turbo runs this from packages/ui, so paths are relative to it.
 */

const LAYERS = ["atoms", "molecules", "organisms", "templates"] as const;
type Layer = (typeof LAYERS)[number];

const LAYER_HINTS: Record<Layer, string> = {
  atoms: "atom      – smallest styled unit, imports no other component (Button, Badge, Input)",
  molecules: "molecule  – a few atoms doing one job (FormField, QuantityStepper)",
  organisms: "organism  – a distinct section of a screen (Header, ProductCard, MiniCart)",
  templates: "template  – page skeleton with slots, no data (StorefrontShell, CheckoutLayout)",
};

interface Answers {
  layer: Layer;
  name: string;
  element: string;
  variants: boolean;
  asChild: boolean;
  client: boolean;
  turbo: { paths: { workspace?: string; root: string } };
}

/** Adds `export * from "./Name";` to the layer barrel, keeping exports sorted. */
const registerInBarrel: PlopTypes.CustomActionFunction = (raw) => {
  const answers = raw as Answers;
  const base = answers.turbo.paths.workspace ?? process.cwd();
  const barrel = path.join(base, "src/components", answers.layer, "index.ts");
  const source = fs.readFileSync(barrel, "utf8");
  const header = source.match(/^\/\*[\s\S]*?\*\/\n/)?.[0] ?? "";
  const exportLine = `export * from "./${answers.name}";`;
  const exports = new Set(source.split("\n").filter((l) => l.startsWith("export * from")));
  exports.add(exportLine);
  const body = [...exports].sort((a, b) => a.localeCompare(b)).join("\n");
  fs.writeFileSync(barrel, `${header}${body}\n`);
  return `registered ${answers.name} in src/components/${answers.layer}/index.ts`;
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper("singular", (layer: string) => layer.replace(/s$/, ""));

  plop.setGenerator("component", {
    description: "Scaffold a @repo/ui component in an atomic design layer",
    prompts: [
      {
        type: "list",
        name: "layer",
        message: "Which layer?",
        choices: LAYERS.map((value) => ({ name: LAYER_HINTS[value], value })),
      },
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. QuantityStepper):",
        validate: (input: string) =>
          /^[A-Z][A-Za-z0-9]+$/.test(input) || "Use PascalCase: letters and digits, starting with a capital.",
      },
      {
        type: "input",
        name: "element",
        message: "Root HTML element (button, a, input, div, section, header…):",
        default: "div",
        validate: (input: string) => /^[a-z][a-z0-9]*$/.test(input) || "Use a lowercase HTML tag name.",
      },
      {
        type: "confirm",
        name: "variants",
        message: "Does it have visual variants (variant/size/tone)? Creates Name.variants.ts with cva.",
        default: true,
      },
      {
        type: "confirm",
        name: "asChild",
        message: "Support `asChild` (render a passed element such as next/link)?",
        default: false,
      },
      {
        type: "confirm",
        name: "client",
        message: 'Needs state, effects or event handlers ("use client")?',
        default: false,
      },
    ],
    actions: (data) => {
      const answers = data as Answers;
      const dir = "src/components/{{layer}}/{{name}}";
      const actions: PlopTypes.ActionType[] = [
        { type: "add", path: `${dir}/{{name}}.tsx`, templateFile: "templates/Component.tsx.hbs" },
        { type: "add", path: `${dir}/{{name}}.stories.tsx`, templateFile: "templates/Component.stories.tsx.hbs" },
        { type: "add", path: `${dir}/{{name}}.test.tsx`, templateFile: "templates/Component.test.tsx.hbs" },
        { type: "add", path: `${dir}/index.ts`, templateFile: "templates/index.ts.hbs" },
      ];
      if (answers.variants) {
        actions.splice(1, 0, {
          type: "add",
          path: `${dir}/{{name}}.variants.ts`,
          templateFile: "templates/Component.variants.ts.hbs",
        });
      }
      actions.push(registerInBarrel);
      return actions;
    },
  });
}
