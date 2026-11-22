import fs from "node:fs";
import path from "node:path";

/**
 * URL of a dev-only placeholder image, or null when it isn't there (fresh clone, CI, deploys).
 * See scripts/copy-placeholders.mjs. Server-only.
 */
export function placeholderSrc(file: string): string | null {
  const onDisk = path.join(process.cwd(), "public/placeholders", file);
  return fs.existsSync(onDisk) ? `/placeholders/${file}` : null;
}
