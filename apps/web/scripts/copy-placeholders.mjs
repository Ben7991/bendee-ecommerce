/*
 * Copies the design placeholder images into public/placeholders for local development.
 *
 * They are third-party images (other brands' packaging, stock photos) kept in
 * docs/design/assets so they never ship: public/placeholders is gitignored, and the page
 * renders tinted tiles when a file is missing. Replace with licensed Jofak photography before
 * launch (see docs/design/assets/README.md).
 */
import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(appRoot, "../../docs/design/assets");
const target = path.join(appRoot, "public/placeholders");

const files = {
  "hero.jpg": "hero/option-d-sunny-gummies.jpg",
  "greens.png": "products/greens.png",
  "ashwagandha.png": "products/ashwagandha.png",
  "energy.png": "products/energy.png",
  "nmnh.png": "products/nmnh.png",
};

if (!fs.existsSync(source)) {
  console.log("[placeholders] docs/design/assets not found; pages will show tinted tiles.");
  process.exit(0);
}

fs.mkdirSync(target, { recursive: true });
let copied = 0;
for (const [name, from] of Object.entries(files)) {
  const src = path.join(source, from);
  const dest = path.join(target, name);
  if (!fs.existsSync(src)) continue;
  if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) continue;
  fs.copyFileSync(src, dest);
  copied += 1;
}
console.log(`[placeholders] ${copied} updated in public/placeholders (dev-only, not committed).`);
