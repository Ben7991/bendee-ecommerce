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
