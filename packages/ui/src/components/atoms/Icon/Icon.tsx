import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../lib";

interface IconDefinition {
  viewBox: string;
  /** Default stroke width; 0 means the icon is filled. */
  strokeWidth: number;
  body: ReactNode;
}

/* Jofak icon set, copied from the Paper components. Strokes/fills use currentColor. */
const ICONS = {
  search: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </>
    ),
  },
  user: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </>
    ),
  },
  heart: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  },
  bag: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <path d="M6 7h12l-1 13H7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </>
    ),
  },
  menu: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: <path d="M4 7h16M4 12h16M4 17h10" />,
  },
  chevronRight: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M9 6l6 6-6 6" />,
  },
  chevronLeft: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M15 6l-6 6 6 6" />,
  },
  arrowRight: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M5 12h14M13 6l6 6-6 6" />,
  },
  eye: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  eyeOff: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M4 4l16 16" />
      </>
    ),
  },
  key: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12l8-8M16 7l2.5 2.5M18.5 4.5L21 7" />
      </>
    ),
  },
  lock: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15.5" r="1.5" className="fill-brand stroke-none" />
      </>
    ),
  },
  mail: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M4 7.5l8 5.5 8-5.5" />
      </>
    ),
  },
  mailCheck: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <path d="M20 12V8a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 8v8a2.5 2.5 0 0 0 2.5 2.5H12" />
        <path d="M5 7.5l7 5 7-5" />
        <circle cx="18" cy="17.5" r="4" className="fill-accent stroke-none" />
        <path d="M16.3 17.6l1.2 1.2 2.2-2.4" strokeWidth="1.6" className="stroke-primary" />
      </>
    ),
  },
  phone: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
  shield: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />,
  },
  refresh: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />,
  },
  wrench: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.7,
    body: <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2l-5.6 5.6a1.6 1.6 0 0 0 2.3 2.3l5.6-5.6a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.2-.6-.6-2.2z" />,
  },
  chat: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M5 18l1.2-3.6A7.5 7.5 0 1 1 9.6 18z" />,
  },
  receipt: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  shieldCheck: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: (
      <>
        <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  /** Refresh arrow around a leaf: the 500 page emblem. */
  refreshLeaf: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M20 12a8 8 0 1 1-2.34-5.66" />
        <path d="M20 4v4h-4" />
        <path
          d="M12 16.5c-1.9-1-3-2.6-3-4.4 0-1.6.9-2.8.9-2.8s1.6.7 2.1 2.6c.5-1.9 2.1-2.6 2.1-2.6s.9 1.2.9 2.8c0 1.8-1.1 3.4-3 4.4z"
          className="fill-brand stroke-none"
        />
      </>
    ),
  },
  minus: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.6,
    body: <path d="M5 12h14" />,
  },
  trash: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />,
  },
  tag: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <path d="M20 12l-8 8-9-9V3h8z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  mapPin: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  padlock: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  info: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </>
    ),
  },
  stopwatch: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.6,
    body: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4.2l2.6 1.6M9.5 2.8h5" />
      </>
    ),
  },
  /** Bag with a leaf inside: the empty-cart emblem. */
  bagLeaf: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.6,
    body: (
      <>
        <path d="M6 7h12l-1 13H7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
        <path d="M12 11c-1.6 1.2-1.6 3.6 0 5 1.6-1.4 1.6-3.8 0-5z" className="fill-brand stroke-none" />
      </>
    ),
  },
  chevronDown: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M6 9l6 6 6-6" />,
  },
  chevronUp: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.2,
    body: <path d="M6 15l6-6 6 6" />,
  },
  /** Gallery zoom button. */
  zoomIn: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
      </>
    ),
  },
  /** Video thumbnails. */
  play: {
    viewBox: "0 0 24 24",
    strokeWidth: 0,
    body: <path d="M7 4l13 8-13 8z" />,
  },
  /** "How to use" tile: a scoop tub. */
  scoop: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M6 8h12l-1.5 12h-9zM9 4h6v4H9z" />,
  },
  link: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  },
  whatsapp: {
    viewBox: "0 0 24 24",
    strokeWidth: 0,
    body: (
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5z" />
    ),
  },
  /** Benefit cards (PDP). */
  sprout: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M12 3c-4 4-6 7-6 10a6 6 0 0 0 12 0c0-3-2-6-6-10zM12 21v-8" />,
  },
  gut: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12c1.5-2 2.5-2 4 0s2.5 2 4 0" />
      </>
    ),
  },
  bolt: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  },
  shieldTick: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6zM9 12l2 2 4-4" />,
  },
  /** "Featured ⇅" sort button on mobile. */
  sort: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.4,
    body: <path d="M7 10l5-5 5 5M7 14l5 5 5-5" />,
  },
  /** Filters buttons and the filter panel heading. */
  sliders: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="10" cy="12" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
  },
  locate: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
  },
  cash: {
    viewBox: "0 0 24 24",
    strokeWidth: 1.8,
    body: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  },
  returns: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />,
  },
  close: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: <path d="M6 6l12 12M18 6L6 18" />,
  },
  truck: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
        {/* Wheels are filled with the page colour so the body line doesn't cross them. */}
        <circle cx="7" cy="17.5" r="1.8" className="fill-bg" />
        <circle cx="17" cy="17.5" r="1.8" className="fill-bg" />
      </>
    ),
  },
  help: {
    viewBox: "0 0 24 24",
    strokeWidth: 2,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01" />
      </>
    ),
  },
  arrowUpRight: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.4,
    body: <path d="M7 17L17 7M9 7h8v8" />,
  },
  plus: {
    viewBox: "0 0 24 24",
    strokeWidth: 2.4,
    body: <path d="M12 5v14M5 12h14" />,
  },
  check: {
    viewBox: "0 0 24 24",
    strokeWidth: 3,
    body: <path d="M5 12l5 5 9-10" />,
  },
  star: {
    viewBox: "0 0 24 24",
    strokeWidth: 0,
    body: (
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.5l7.1-.6z" />
    ),
  },
  sun: {
    viewBox: "0 0 16 16",
    strokeWidth: 1.5,
    body: (
      <>
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M3.4 12.6L4.5 11.5M11.5 4.5L12.6 3.4" />
      </>
    ),
  },
  moon: {
    viewBox: "0 0 16 16",
    strokeWidth: 1.5,
    body: <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5A5.8 5.8 0 1 0 13.5 9.6Z" />,
  },
  monitor: {
    viewBox: "0 0 16 16",
    strokeWidth: 1.5,
    body: (
      <>
        <rect x="1.75" y="2.5" width="12.5" height="8.5" rx="1.5" />
        <path d="M5.5 14H10.5M8 11V14" />
      </>
    ),
  },
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

/**
 * Icon (atom). Jofak's own icon set from Paper → Design System → 02 — Components.
 * Colour comes from `currentColor`, so set it with a text-* class on the icon or its parent.
 * Decorative by default; pass `label` when the icon is the only content conveying meaning.
 */
export interface IconProps extends Omit<ComponentProps<"svg">, "children"> {
  name: IconName;
  /** Rendered width and height in px. */
  size?: number;
  /** Override the icon's default stroke width. */
  strokeWidth?: number;
  /** Accessible name. Without it the icon is hidden from assistive tech. */
  label?: string;
}

export function Icon({ name, size = 18, strokeWidth, label, className, ...props }: IconProps) {
  const icon: IconDefinition = ICONS[name];
  const filled = icon.strokeWidth === 0;
  return (
    <svg
      data-slot="icon"
      data-icon={name}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : (strokeWidth ?? icon.strokeWidth)}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("inline-block shrink-0", className)}
      {...props}
    >
      {icon.body}
    </svg>
  );
}
