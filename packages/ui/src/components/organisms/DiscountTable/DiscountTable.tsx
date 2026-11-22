import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, ProgressBar, StatusChip, type StatusChipProps } from "../../atoms";

export interface AdminDiscount {
  href: string;
  method: "code" | "automatic";
  /** The code ("WELCOME10", "AKOS-••••") or the automatic offer's name. */
  title: string;
  /** Bulk codes: "40 codes". */
  batch?: string;
  /** Desktop, under the title: "New customer welcome". Automatic offers say "Automatic · no code needed". */
  note: string;
  /** Tablet, under the title: "Greens Daily only · ends 30 Nov". */
  compactNote: string;
  /** Mobile, under the title when there is no use limit: "First order · 148 used". */
  mobileNote: string;
  /** "20% off", "Free delivery". */
  value: string;
  /** Tablet: "Free deliv.". */
  compactValue?: string;
  /** Mobile: "Free". */
  mobileValue?: string;
  /** "First order only", "Greens Daily only". */
  conditions: string;
  /** A product packshot beside the conditions. */
  conditionImage?: ReactNode;
  uses: number;
  /** Total uses allowed (draws a bar). */
  limit?: number;
  /** Without a limit: "no limit", "1 per customer". */
  usesNote?: string;
  /** "GHS 31,200". */
  revenue: string;
  /** Undefined: no end date. */
  ends?: { date: string; left?: string };
  status: { label: string; tone: NonNullable<StatusChipProps["tone"]> };
  /** Ends within days: amber notes, and the first one leads the mobile list as a card. */
  endingSoon?: boolean;
}

/**
 * DiscountTable (organism): the discounts list (Paper Jofak - Admin → Discounts). From 1440px a
 * table — code chip or ⚡ automatic name, type, conditions, uses (with a bar when limited),
 * revenue, end date and status — with an optional footer ("Next up: …"); tablet drops to code,
 * type, uses and status; mobile is a compact list led by the first ending-soon discount as an
 * amber card with `extend` (e.g. an Extend button). Each row links to its editor.
 */
export interface DiscountTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  discounts: AdminDiscount[];
  /** Desktop footer: "Next up: DECEMBER · starts 1 Dec · View scheduled". */
  footer?: ReactNode;
  /** Mobile ending-soon card action. */
  extend?: (discount: AdminDiscount) => ReactNode;
  emptyMessage?: string;
}

const HEAD = "text-11 leading-4 font-semibold tracking-overline text-text-muted uppercase";

function CodeChip({ discount, size = "md", onTint = false }: { discount: AdminDiscount; size?: "md" | "sm"; onTint?: boolean }) {
  if (discount.method === "automatic") {
    return (
      <span className="flex min-w-0 items-center gap-1.5">
        <Icon name="bolt" size={14} strokeWidth={1.4} className="shrink-0 text-lavender-text" />
        <span className="truncate text-14 leading-5 font-semibold text-text">{discount.title}</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn(
          "border border-dashed border-text-muted/50 font-mono font-semibold tracking-code text-text",
          onTint ? "bg-bg" : "bg-surface-subtle",
          size === "md" ? "rounded-8 px-2 py-0.5 text-sm leading-5" : "rounded-7 px-1.75 py-px text-xs leading-4.5",
        )}
      >
        {discount.title}
      </span>
      {discount.batch && <span className="text-xs leading-xs font-semibold text-text-muted">{discount.batch}</span>}
    </span>
  );
}

function Uses({ discount, wide }: { discount: AdminDiscount; wide: boolean }) {
  const percent = discount.limit ? (discount.uses / discount.limit) * 100 : 0;
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-sm leading-4.5 font-semibold text-text">
        {discount.uses}{" "}
        <span className="font-medium text-text-muted">
          {discount.limit ? `/ ${discount.limit}` : wide ? `· ${discount.usesNote ?? "no limit"}` : "uses"}
        </span>
      </span>
      {discount.limit !== undefined && (
        <ProgressBar value={percent} label={`${discount.title} uses`} size="xs" className={cn("bg-surface-subtle", wide ? "w-30" : "w-20")} />
      )}
    </span>
  );
}

const noteTone = (discount: AdminDiscount) =>
  discount.endingSoon ? "font-semibold text-warning-text" : discount.method === "automatic" ? "font-semibold text-lavender-text" : "text-text-muted";

export function DiscountTable({
  linkAs: LinkAs = "a",
  discounts,
  footer,
  extend,
  emptyMessage = "No discounts here.",
  className,
  ...props
}: DiscountTableProps) {
  const spotlight = discounts.find((discount) => discount.endingSoon);
  const mobile = discounts.filter((discount) => discount !== spotlight);

  if (discounts.length === 0) {
    return (
      <section data-slot="discount-table" className={cn("rounded-18 border border-border-subtle px-5 py-10 text-center font-sans", className)} {...props}>
        <p className="text-sm leading-4.5 text-text-muted">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section data-slot="discount-table" className={cn("flex flex-col gap-3.5 font-sans md:gap-0", className)} {...props}>
      {/* Mobile: the ending-soon card. */}
      {spotlight && (
        <div className="flex flex-col gap-2.5 rounded-18 border-field border-warning bg-tint-sun/30 p-3.5 md:hidden">
          <LinkAs href={spotlight.href} className="flex flex-col gap-2.5">
            <span className="flex items-center justify-between gap-3">
              <CodeChip discount={spotlight} size="sm" onTint />
              <span className="text-base leading-5 font-semibold text-text">{spotlight.value}</span>
            </span>
            <span className="text-sm leading-4.5 text-text-secondary">
              {spotlight.conditions} · {spotlight.uses} used
            </span>
          </LinkAs>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs leading-xs font-semibold text-warning-text">
              {spotlight.ends ? `Ends ${spotlight.ends.date}${spotlight.ends.left ? ` · ${spotlight.ends.left}` : ""}` : "Ending soon"}
            </span>
            {extend?.(spotlight)}
          </div>
        </div>
      )}

      <div className="overflow-clip rounded-18 border border-border-subtle md:rounded-lg">
        {/* Desktop column heads. */}
        <div aria-hidden className="hidden items-center gap-3.5 bg-surface-subtle px-5 py-2.5 xl:flex">
          <span className={cn(HEAD, "flex-1")}>Discount</span>
          <span className={cn(HEAD, "w-30 shrink-0")}>Type</span>
          <span className={cn(HEAD, "w-42.5 shrink-0")}>Conditions</span>
          <span className={cn(HEAD, "w-37.5 shrink-0")}>Uses</span>
          <span className={cn(HEAD, "w-25 shrink-0 text-right")}>Revenue</span>
          <span className={cn(HEAD, "w-27.5 shrink-0")}>Ends</span>
          <span className={cn(HEAD, "w-24 shrink-0")}>Status</span>
          <span className="w-7 shrink-0" />
        </div>

        <ul className="flex flex-col">
          {discounts.map((discount) => {
            const hiddenOnMobile = discount === spotlight;
            return (
              <li
                key={discount.href}
                className={cn(
                  "border-t border-border-subtle first:border-t-0 xl:first:border-t",
                  hiddenOnMobile && "hidden md:block",
                  // On mobile the spotlight is lifted out; the next row loses its rule.
                  spotlight && mobile[0] === discount && "max-md:border-t-0",
                )}
              >
                <LinkAs
                  href={discount.href}
                  className="flex items-center gap-3 px-3.5 py-3 hover:bg-surface-subtle md:px-4 md:py-3.5 xl:gap-3.5 xl:px-5"
                >
                  {/* Title and notes. */}
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex xl:hidden">
                      <CodeChip discount={discount} size="sm" />
                    </span>
                    <span className="hidden xl:flex">
                      <CodeChip discount={discount} />
                    </span>
                    {discount.limit !== undefined ? (
                      <span className="flex items-center gap-2 md:hidden">
                        <ProgressBar
                          value={(discount.uses / discount.limit) * 100}
                          label={`${discount.title} uses`}
                          size="xs"
                          className="w-18 shrink-0 bg-surface-subtle"
                        />
                        <span className="text-xs leading-xs text-text-muted">
                          {discount.uses} / {discount.limit}
                          {discount.ends && ` · ends ${discount.ends.date}`}
                        </span>
                      </span>
                    ) : (
                      <span className={cn("text-xs leading-xs md:hidden", discount.method === "automatic" ? "font-semibold text-lavender-text" : "text-text-muted")}>
                        {discount.mobileNote}
                      </span>
                    )}
                    <span className={cn("hidden text-xs leading-xs md:block xl:hidden", noteTone(discount))}>{discount.compactNote}</span>
                    <span
                      className={cn(
                        "hidden text-xs leading-xs xl:block",
                        discount.method === "automatic" ? "font-semibold text-lavender-text" : "text-text-muted",
                      )}
                    >
                      {discount.note}
                    </span>
                  </span>

                  {/* Value. */}
                  <span className="shrink-0 text-14 leading-5 font-semibold text-text md:w-21 xl:w-30">
                    <span className="md:hidden">{discount.mobileValue ?? discount.value}</span>
                    <span className="hidden md:inline xl:hidden">{discount.compactValue ?? discount.value}</span>
                    <span className="hidden xl:inline">{discount.value}</span>
                  </span>

                  {/* Conditions (desktop). */}
                  <span className="hidden w-42.5 shrink-0 items-center gap-2 xl:flex">
                    {discount.conditionImage && (
                      <span className="relative size-6 shrink-0 overflow-hidden rounded-6 bg-surface-subtle">{discount.conditionImage}</span>
                    )}
                    <span className="text-sm leading-4.5 text-text-secondary">{discount.conditions}</span>
                  </span>

                  {/* Uses. */}
                  <span className="hidden w-24 shrink-0 md:block xl:hidden">
                    <Uses discount={discount} wide={false} />
                  </span>
                  <span className="hidden w-37.5 shrink-0 xl:block">
                    <Uses discount={discount} wide />
                  </span>

                  {/* Revenue and end (desktop). */}
                  <span className="hidden w-25 shrink-0 text-right text-14 leading-5 font-semibold text-text xl:block">{discount.revenue}</span>
                  <span className="hidden w-27.5 shrink-0 flex-col xl:flex">
                    <span className="text-sm leading-4.5 text-text-secondary">{discount.ends?.date ?? "No end date"}</span>
                    {discount.ends?.left && (
                      <span className={cn("text-xs leading-xs", discount.endingSoon ? "font-semibold text-warning-text" : "text-text-muted")}>
                        {discount.ends.left}
                      </span>
                    )}
                  </span>

                  {/* Status. */}
                  <span className="hidden w-23 shrink-0 justify-end md:flex xl:w-24 xl:justify-start">
                    <StatusChip tone={discount.status.tone} className="px-2.25 py-0.5 text-xs leading-5">
                      {discount.status.label}
                    </StatusChip>
                  </span>
                  <span aria-hidden className="hidden w-7 shrink-0 justify-end text-text-muted xl:flex">
                    <Icon name="more" size={16} />
                  </span>
                </LinkAs>
              </li>
            );
          })}
        </ul>

        {footer && (
          <div className="hidden items-center justify-between gap-4 border-t border-border-subtle px-5 py-3.5 text-sm leading-4.5 text-text-muted xl:flex">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}
