import { Fragment, type ComponentProps, type ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, ProductThumb, StatusChip, type ProductThumbProps, type StatusChipProps } from "../../atoms";

export interface StockMovement {
  id: string;
  /** "11:42". */
  time: string;
  /** "Ashwagandha Calm · 60 caps". */
  name: string;
  /** Tablet and mobile: "Ashwagandha Calm · 60". */
  compactName?: string;
  /** Under the name from 1440px: the staff note ("“Crushed lids found while packing”"). */
  note?: string;
  /** Tablet: what replaces a missing reference ("Shelf count"). */
  compactNote?: string;
  image?: ReactNode;
  tint?: ProductThumbProps["tint"];
  /** Units in (+) or out (−). */
  change: number;
  /** Received (success), Sale (neutral), Damaged (error), Return restock (lavender), Recount (warning). */
  type: { label: string; tone: NonNullable<StatusChipProps["tone"]>; compactLabel?: string };
  before: number;
  after: number;
  /** "Invoice ANS-3381" (no link) or "Order JFK-251490" (links); `compact` on mobile ("JFK-251490"). */
  reference?: { label: string; href?: string; compact?: string };
  /** "Abena M." or "System". */
  by: string;
}

export interface MovementDay {
  /** "Today · Sun 15 Nov". */
  label: string;
  movements: StockMovement[];
}

/** The packshot, or a plain item tile when there isn't one (gift wrap). */
function Thumb({ movement, size }: { movement: StockMovement; size: "mini" | "stock" }) {
  if (movement.image) return <ProductThumb size={size} bleed tint={movement.tint ?? "surface"} image={movement.image} />;
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center justify-center bg-surface text-text-muted", size === "mini" ? "size-9 rounded-10" : "size-12 rounded-sm md:size-11")}>
      <Icon name="hexagon" size={size === "mini" ? 16 : 20} />
    </span>
  );
}

const signed = (change: number) => (change > 0 ? `+${change}` : `−${Math.abs(change)}`);
const changeTone = (movement: StockMovement) =>
  movement.change > 0 ? "text-brand" : movement.type.tone === "error" ? "text-error" : "text-text";

/**
 * MovementTable (organism): the stock history, newest first and grouped by day (Paper Jofak -
 * Admin → Inventory → Movements). From 1440px when, variant (with the note), change, type, on hand
 * before → after, reference and who; tablet folds the reference and who under the variant;
 * mobile shows a card per day. Order and return references link. Footer: count and Load more.
 */
export interface MovementTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  days: MovementDay[];
  /** "Showing 7 of 214 movements this week". */
  summary?: string;
  /** Tablet: "7 of 214 this week". */
  compactSummary?: string;
  loadMoreHref?: string;
  emptyMessage?: string;
  "aria-label"?: string;
}

const head = "py-2.5 pr-4 text-left text-11 leading-4 font-semibold tracking-label text-text-muted uppercase";

export function MovementTable({
  linkAs: LinkAs = "a",
  days,
  summary,
  compactSummary,
  loadMoreHref,
  emptyMessage = "No stock movements in this period.",
  "aria-label": ariaLabel = "Stock movements",
  className,
  ...props
}: MovementTableProps) {
  const empty = days.every((day) => day.movements.length === 0);

  const reference = (movement: StockMovement, compact = false) => {
    const ref = movement.reference;
    if (!ref) return null;
    const label = compact ? (ref.compact ?? ref.label) : ref.label;
    return ref.href ? (
      <LinkAs href={ref.href} className="font-semibold text-brand hover:underline">
        {label}
      </LinkAs>
    ) : (
      <span>{label}</span>
    );
  };

  const onHand = (movement: StockMovement) => (
    <span className="text-sm leading-5 text-text-muted">
      {movement.before} → <span className="font-semibold text-text">{movement.after}</span>
    </span>
  );

  const chip = (movement: StockMovement) => (
    <StatusChip tone={movement.type.tone} className={cn("px-2.5 py-0.75 leading-5", movement.type.tone === "neutral" && "text-text-secondary")}>
      {movement.type.label}
    </StatusChip>
  );

  return (
    <section
      data-slot="movement-table"
      aria-label={ariaLabel}
      className={cn("flex flex-col gap-5 font-sans md:gap-0 md:overflow-clip md:rounded-lg md:border md:border-border-subtle", className)}
      {...props}
    >
      {empty && <p className="px-6 py-12 text-center text-14 leading-sm text-text-muted">{emptyMessage}</p>}

      {!empty && (
        <table className="hidden w-full border-collapse md:table">
          <thead className="bg-surface-subtle">
            <tr>
              <th scope="col" className={cn(head, "w-18 pl-4.5 xl:w-34 xl:pl-6")}>
                When
              </th>
              <th scope="col" className={head}>
                <span className="xl:hidden">Variant · Reference</span>
                <span className="hidden xl:inline">Variant</span>
              </th>
              <th scope="col" className={cn(head, "w-19 text-right xl:w-21.5")}>
                Change
              </th>
              <th scope="col" className={cn(head, "w-33 xl:w-41.5")}>
                Type
              </th>
              <th scope="col" className={cn(head, "w-24 pr-4.5 xl:w-28 xl:pr-4")}>
                On hand
              </th>
              <th scope="col" className={cn(head, "hidden w-46.5 xl:table-cell")}>
                Reference
              </th>
              <th scope="col" className={cn(head, "hidden w-31.5 pr-6 xl:table-cell")}>
                By
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <Fragment key={day.label}>
                <tr className="border-t border-border-subtle">
                  <th scope="rowgroup" colSpan={7} className="px-4.5 py-2 text-left text-xs leading-xs font-semibold text-text-secondary xl:px-6">
                    {day.label}
                  </th>
                </tr>
                {day.movements.map((movement) => (
                  <tr key={movement.id} className="border-t border-border-subtle">
                    <td className="py-3 pr-4 pl-4.5 text-sm leading-5 text-text-muted xl:pl-6">{movement.time}</td>
                    <td className="py-3 pr-4">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Thumb movement={movement} size="mini" />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-14 leading-5 font-semibold text-text">
                            <span className="xl:hidden">{movement.compactName ?? movement.name}</span>
                            <span className="hidden xl:inline">{movement.name}</span>
                          </span>
                          {movement.note && <span className="hidden text-xs leading-xs text-text-muted xl:block">{movement.note}</span>}
                          <span className="text-xs leading-xs text-text-muted xl:hidden">
                            {reference(movement) ?? movement.compactNote}
                            {movement.by !== "System" && ` · ${movement.by}`}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className={cn("py-3 pr-4 text-right text-14 leading-5 font-bold", changeTone(movement))}>{signed(movement.change)}</td>
                    <td className="py-3 pr-4">{chip(movement)}</td>
                    <td className="py-3 pr-4.5 xl:pr-4">{onHand(movement)}</td>
                    <td className="hidden py-3 pr-4 text-sm leading-5 text-text-secondary xl:table-cell">
                      {reference(movement) ?? <span className="text-text-muted">—</span>}
                    </td>
                    <td className="hidden py-3 pr-6 text-sm leading-5 text-text-secondary xl:table-cell">{movement.by}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Mobile: a card per day. */}
      {!empty &&
        days.map((day) => (
          <div key={day.label} className="flex flex-col gap-2.5 md:hidden">
            <h3 className="px-0.5 text-xs leading-xs font-semibold text-text-secondary">{day.label}</h3>
            <ul className="overflow-clip rounded-18 border border-border-subtle">
              {day.movements.map((movement) => (
                <li key={movement.id} className="flex items-center gap-3 border-border-subtle px-3.5 py-3 not-first:border-t">
                  <Thumb movement={movement} size="stock" />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-14 leading-5 font-semibold text-text">{movement.compactName ?? movement.name}</span>
                    <span className="flex min-w-0 items-center gap-1.5 text-xs leading-xs text-text-muted">
                      <StatusChip tone={movement.type.tone} size="sm" className={cn("py-0.5", movement.type.tone === "neutral" && "text-text-secondary")}>
                        {movement.type.compactLabel ?? movement.type.label}
                      </StatusChip>
                      <span className="truncate">
                        {movement.time} · {movement.reference ? (movement.reference.compact ?? movement.reference.label) : movement.by}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end">
                    <span className={cn("text-lg leading-5.5 font-bold", changeTone(movement))}>{signed(movement.change)}</span>
                    <span className="text-xs leading-xs text-text-muted">
                      {movement.before} → {movement.after}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {!empty && (summary || loadMoreHref) && (
        <div className="flex items-center justify-between gap-4 md:border-t md:border-border-subtle md:px-4.5 md:py-3.5 xl:px-6">
          <p className="text-sm leading-4.5 text-text-muted">
            {compactSummary ? (
              <>
                <span className="xl:hidden">{compactSummary}</span>
                <span className="hidden xl:inline">{summary}</span>
              </>
            ) : (
              summary
            )}
          </p>
          {loadMoreHref && (
            <LinkAs href={loadMoreHref} className="text-sm leading-4.5 font-semibold text-text hover:underline">
              Load more
            </LinkAs>
          )}
        </div>
      )}
    </section>
  );
}
