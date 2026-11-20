import { cva } from "class-variance-authority";

import type { VariantProps } from "../../../lib";

/**
 * Admin sidebar items (Paper Jofak - Admin → Sidebar / Sidebar (rail)).
 * `responsive`: a 48×44 icon cell on the tablet rail, a full 40px row from 1440px.
 * `rail`: always the icon cell (desktop with the sidebar collapsed).
 */
export const adminNavItemVariants = cva(
  "group/nav relative flex shrink-0 items-center rounded-sm font-sans transition-colors",
  {
    variants: {
      layout: {
        responsive: "h-11 w-12 justify-center xl:h-10 xl:w-auto xl:justify-start xl:gap-3 xl:px-3",
        rail: "h-11 w-12 justify-center",
      },
      active: {
        true: "bg-accent text-on-accent",
        false: "text-text-muted hover:bg-surface-subtle hover:text-text",
      },
    },
    defaultVariants: { layout: "responsive", active: false },
  },
);

export const adminNavLabelVariants = cva("sr-only", {
  variants: {
    layout: {
      responsive: "xl:not-sr-only xl:flex-1 xl:text-14 xl:leading-sm",
      rail: "",
    },
    active: {
      true: "font-semibold text-on-accent",
      false: "font-medium text-text-secondary group-hover/nav:text-text",
    },
  },
  defaultVariants: { layout: "responsive", active: false },
});

export const adminNavCountVariants = cva(
  "absolute top-0.5 right-0 min-w-4.5 rounded-full bg-primary px-1.25 py-px text-center text-11 leading-3.5 font-bold text-text-inverse",
  {
    variants: {
      layout: {
        responsive:
          "xl:static xl:min-w-6 xl:bg-surface xl:px-1.75 xl:py-0.5 xl:text-xs xl:leading-xs xl:font-semibold xl:text-text",
        rail: "",
      },
    },
    defaultVariants: { layout: "responsive" },
  },
);

export const adminNavDotVariants = cva("absolute top-2 right-2.25 size-2 rounded-full border-2 border-bg bg-warning", {
  variants: {
    layout: {
      responsive: "xl:static xl:mr-2 xl:border-0",
      rail: "",
    },
  },
  defaultVariants: { layout: "responsive" },
});

export type AdminNavItemVariantProps = VariantProps<typeof adminNavItemVariants>;
