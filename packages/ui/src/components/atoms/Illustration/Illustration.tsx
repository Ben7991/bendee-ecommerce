import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

interface IllustrationDefinition {
  viewBox: string;
  body: ReactNode;
}

/* Decorative artwork from the Paper Home page. Colours are palette tokens via fill-/stroke- classes. */
const ILLUSTRATIONS = {
  /** Hero rays behind the photo. */
  sunburst: {
    viewBox: "0 0 520 520",
    body: (
      <g className="stroke-white/75" strokeWidth="34" strokeLinecap="round" fill="none">
        <line x1="260" y1="40" x2="260" y2="120" />
        <line x1="370" y1="70" x2="330" y2="140" />
        <line x1="450" y1="150" x2="380" y2="190" />
        <line x1="150" y1="70" x2="190" y2="140" />
        <line x1="70" y1="150" x2="140" y2="190" />
      </g>
    ),
  },
  /** Sleep goal: crescent moon with halo and stars. */
  moon: {
    viewBox: "0 0 300 300",
    body: (
      <>
        <circle cx="160" cy="140" r="110" className="fill-accent/8" />
        <path d="M200 70A80 80 0 1 0 230 200A64 64 0 1 1 200 70Z" className="fill-accent" />
        <circle cx="90" cy="80" r="3" className="fill-white" />
        <circle cx="60" cy="150" r="2" className="fill-white/60" />
        <circle cx="250" cy="250" r="2.5" className="fill-white/70" />
      </>
    ),
  },
  /** Focus goal: sun. */
  sun: {
    viewBox: "0 0 180 180",
    body: (
      <>
        <circle cx="90" cy="90" r="38" className="fill-sun-400" />
        <path
          d="M90 20v16M90 144v16M20 90h16M144 90h16M40 40l11 11M129 129l11 11M140 40l-11 11M51 129l-11 11"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className="stroke-sun-400"
        />
      </>
    ),
  },
  /** Gut goal: leaf. */
  leaf: {
    viewBox: "0 0 240 260",
    body: (
      <>
        <path d="M40 250C20 140 80 50 230 20C220 150 150 230 40 250Z" className="fill-evergreen-900/90" />
        <path d="M40 250C100 170 160 100 230 20" fill="none" strokeWidth="2" className="stroke-accent/50" />
        <circle cx="70" cy="80" r="16" className="fill-evergreen-900/15" />
        <circle cx="40" cy="130" r="9" className="fill-evergreen-900/15" />
      </>
    ),
  },
  /** Immunity goal: orange slice. */
  orange: {
    viewBox: "0 0 200 200",
    body: (
      <>
        <circle cx="100" cy="100" r="62" className="fill-citrus-500" />
        <circle cx="100" cy="100" r="50" className="fill-citrus-300" />
        <path
          d="M100 50v100M50 100h100M65 65l70 70M135 65l-70 70"
          fill="none"
          strokeWidth="3"
          className="stroke-citrus-500"
        />
        <circle cx="100" cy="100" r="8" className="fill-citrus-100" />
      </>
    ),
  },
  /** Quiz banner: concentric rings. */
  rings: {
    viewBox: "0 0 620 620",
    body: (
      <g fill="none" strokeWidth="2">
        <circle cx="310" cy="310" r="300" className="stroke-accent/8" />
        <circle cx="310" cy="310" r="220" className="stroke-accent/12" />
        <circle cx="310" cy="310" r="140" className="stroke-accent/16" />
      </g>
    ),
  },
} satisfies Record<string, IllustrationDefinition>;

export type IllustrationName = keyof typeof ILLUSTRATIONS;
export const ILLUSTRATION_NAMES = Object.keys(ILLUSTRATIONS) as IllustrationName[];

/**
 * Illustration (atom): decorative artwork. Always aria-hidden; size and position it with
 * className (it fills its box, keeping the aspect ratio).
 */
export interface IllustrationProps extends Omit<ComponentProps<"svg">, "children"> {
  name: IllustrationName;
}

export function Illustration({ name, className, ...props }: IllustrationProps) {
  const art: IllustrationDefinition = ILLUSTRATIONS[name];
  return (
    <svg
      data-slot="illustration"
      data-illustration={name}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={art.viewBox}
      aria-hidden
      focusable="false"
      className={cn("pointer-events-none shrink-0", className)}
      {...props}
    >
      {art.body}
    </svg>
  );
}
