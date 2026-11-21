"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useId, useMemo, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "../../../lib";
import { Icon, ProductThumb, type ProductThumbProps } from "../../atoms";
import { QuantityStepper } from "../../molecules";

export interface ReceivableVariant {
  id: string;
  /** Short name for the line: "Ashwagandha · 60". */
  name: string;
  /** "JF-ASH-60". */
  sku: string;
  barcode?: string;
  image?: ReactNode;
  tint?: ProductThumbProps["tint"];
  onHand: number;
  /** Last unit cost, prefilled on a new line. */
  unitCost: number;
}

export interface ReceiveLine {
  variantId: string;
  quantity: number;
  unitCost: number;
}

/**
 * ReceiveStockSheet (organism): book a supplier delivery into stock (Paper Jofak - Admin →
 * Receive stock). Supplier and invoice, a scan-or-search field that adds a line (Enter adds the
 * best match; a scanned barcode matches exactly), and per line a quantity, unit cost and the
 * on-hand result. The latest line is highlighted. A side panel from 768px, a bottom sheet on
 * mobile (supplier and invoice show in the subtitle there). Posts `supplier`, `invoice`, and
 * `quantity:<id>` / `cost:<id>` per line to `action`.
 */
export interface ReceiveStockSheetProps extends Omit<ComponentProps<"div">, "children" | "defaultValue"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** "Main store, Osu". */
  location: string;
  variants: ReceivableVariant[];
  suppliers: { value: string; label: string }[];
  defaultSupplier?: string;
  defaultInvoice?: string;
  defaultLines?: ReceiveLine[];
  action?: string | ((formData: FormData) => void | Promise<void>);
  fields?: Record<string, string>;
  currency?: string;
}

const money = (value: number) => value.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ReceiveStockSheet({
  open,
  onOpenChange,
  location,
  variants,
  suppliers,
  defaultSupplier = "",
  defaultInvoice = "",
  defaultLines = [],
  action,
  fields = {},
  currency = "GHS",
  className,
  ...props
}: ReceiveStockSheetProps) {
  const id = useId();
  const search = useRef<HTMLInputElement>(null);
  const [supplier, setSupplier] = useState(defaultSupplier);
  const [invoice, setInvoice] = useState(defaultInvoice);
  const [lines, setLines] = useState(defaultLines);
  const [latest, setLatest] = useState<string | undefined>(defaultLines.at(-1)?.variantId);
  const [query, setQuery] = useState("");
  const [browsing, setBrowsing] = useState(false);
  const [scanning, setScanning] = useState(false);

  const byId = useMemo(() => new Map(variants.map((variant) => [variant.id, variant])), [variants]);
  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return browsing ? variants : [];
    return variants.filter((variant) => [variant.name, variant.sku, variant.barcode ?? ""].some((field) => field.toLowerCase().includes(term)));
  }, [query, browsing, variants]);

  const units = lines.reduce((sum, line) => sum + line.quantity, 0);
  const cost = lines.reduce((sum, line) => sum + line.quantity * line.unitCost, 0);
  const supplierLabel = suppliers.find((option) => option.value === supplier)?.label;

  const add = (variant: ReceivableVariant) => {
    setLines((current) =>
      current.some((line) => line.variantId === variant.id)
        ? current.map((line) => (line.variantId === variant.id ? { ...line, quantity: line.quantity + 1 } : line))
        : [...current, { variantId: variant.id, quantity: 1, unitCost: variant.unitCost }],
    );
    setLatest(variant.id);
    setQuery("");
    setBrowsing(false);
    search.current?.focus();
  };

  const update = (variantId: string, change: Partial<ReceiveLine>) =>
    setLines((current) => current.map((line) => (line.variantId === variantId ? { ...line, ...change } : line)));

  const onSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const term = query.trim().toLowerCase();
    const exact = variants.find((variant) => variant.barcode === query.trim() || variant.sku.toLowerCase() === term);
    const pick = exact ?? matches[0];
    if (pick) add(pick);
  };

  const label = "text-sm leading-4.5 font-semibold text-text";
  const field = "h-10.5 w-full rounded-sm border border-border bg-bg px-3 text-14 leading-4.5 text-text outline-none focus:border-primary dark:focus:border-brand";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-evergreen-950/45 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/65" />
        <Dialog.Content
          data-slot="receive-stock-sheet"
          aria-describedby={`${id}-subtitle`}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            search.current?.focus();
          }}
          className={cn(
            "fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl bg-bg font-sans text-text shadow-panel-up outline-none dark:bg-surface",
            "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
            "md:inset-y-0 md:top-0 md:right-0 md:left-auto md:w-140 md:rounded-none md:shadow-panel-left",
            "md:data-[state=closed]:animate-panel-out md:data-[state=open]:animate-panel-in",
            className,
          )}
          {...props}
        >
          <form action={action} className="flex min-h-0 flex-1 flex-col">
            {Object.entries(fields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))}
            {lines.map((line) => (
              <input key={line.variantId} type="hidden" name={`cost:${line.variantId}`} value={line.unitCost.toFixed(2)} />
            ))}

            <span aria-hidden className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-sage-200 md:hidden" />
            <header className="flex shrink-0 items-start gap-3.5 border-b border-border-subtle px-5 pt-3.5 pb-3.5 md:px-6 md:pt-6 md:pb-4.5">
              <span aria-hidden className="hidden size-11 shrink-0 items-center justify-center rounded-14 bg-sage-100 text-brand md:flex">
                <Icon name="stockReceive" size={20} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-1">
                <Dialog.Title className="text-lg leading-6 font-semibold tracking-compact text-text md:text-xl md:leading-6.5">Receive stock</Dialog.Title>
                <p id={`${id}-subtitle`} className="text-sm leading-4.5 text-text-muted md:text-14 md:leading-5">
                  <span className="md:hidden">{[supplierLabel, invoice].filter(Boolean).join(" · ") || `Add a delivery to ${location}`}</span>
                  <span className="hidden md:inline">Add a delivery to {location}</span>
                </p>
              </div>
              <Dialog.Close
                aria-label="Close"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-subtle max-md:size-9 max-md:bg-surface max-md:text-text"
              >
                <Icon name="close" size={16} strokeWidth={1.6} />
              </Dialog.Close>
            </header>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4 md:gap-4.5 md:px-6 md:py-5">
              <div className="hidden gap-3 md:flex">
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <label htmlFor={`${id}-supplier`} className={label}>
                    Supplier <span className="font-regular text-text-muted">(optional)</span>
                  </label>
                  <span className="relative">
                    <select id={`${id}-supplier`} name="supplier" value={supplier} onChange={(event) => setSupplier(event.target.value)} className={cn(field, "appearance-none pr-8")}>
                      <option value="">No supplier</option>
                      {suppliers.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronDown" size={12} strokeWidth={1.6} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-muted" />
                  </span>
                </span>
                <span className="flex w-45 shrink-0 flex-col gap-1.5">
                  <label htmlFor={`${id}-invoice`} className={label}>
                    Invoice no.
                  </label>
                  <input id={`${id}-invoice`} name="invoice" value={invoice} onChange={(event) => setInvoice(event.target.value)} autoComplete="off" className={field} />
                </span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setScanning(true);
                    requestAnimationFrame(() => search.current?.focus());
                  }}
                  className={cn(
                    "flex h-12.5 w-full items-center justify-center gap-2.5 rounded-14 border border-dashed border-text text-base leading-5 font-semibold text-text md:hidden",
                    scanning && "hidden",
                  )}
                >
                  <Icon name="scan" size={18} />
                  Scan next item
                </button>
                <span
                  className={cn(
                    "h-11.5 items-center gap-2.5 rounded-full border-field border-primary pr-1.5 pl-3.5 md:flex dark:border-brand",
                    scanning ? "flex" : "hidden",
                  )}
                >
                  <Icon name="scan" size={18} className="text-text" />
                  <input
                    ref={search}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={onSearchKey}
                    placeholder="Scan a barcode or search a product"
                    aria-label="Scan a barcode or search a product"
                    aria-controls={`${id}-results`}
                    aria-expanded={matches.length > 0}
                    role="combobox"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent text-14 leading-4.5 text-text outline-none placeholder:text-text-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setBrowsing(!browsing)}
                    aria-pressed={browsing}
                    className="flex h-8.5 shrink-0 items-center rounded-full bg-surface px-3.5 text-sm leading-4 font-semibold text-text hover:bg-sage-100"
                  >
                    Browse
                  </button>
                </span>
                {matches.length > 0 && (
                  <ul
                    id={`${id}-results`}
                    role="listbox"
                    aria-label="Products"
                    className="absolute inset-x-0 top-full z-10 mt-2 max-h-72 overflow-y-auto rounded-md border border-border-subtle bg-bg py-1 shadow-card dark:bg-surface"
                  >
                    {matches.map((variant) => (
                      <li key={variant.id} role="option" aria-selected={false}>
                        <button type="button" onClick={() => add(variant)} className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left hover:bg-surface-subtle">
                          <ProductThumb size="mini" bleed tint={variant.tint ?? "surface"} image={variant.image} />
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-14 leading-5 font-semibold text-text">{variant.name}</span>
                            <span className="text-xs leading-xs text-text-muted">
                              {variant.sku} · {variant.onHand} on hand
                            </span>
                          </span>
                          <Icon name="plus" size={14} className="text-text-muted" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {lines.length === 0 ? (
                <p className="rounded-md border border-dashed border-border px-4 py-8 text-center text-14 leading-sm text-text-muted">
                  Scan or search to add the first item.
                </p>
              ) : (
                <div className="flex flex-col overflow-clip rounded-md border border-border-subtle">
                  <div className="hidden items-center gap-2.5 bg-surface-subtle px-3.5 py-2 text-11 leading-4 font-semibold tracking-label text-text-muted uppercase md:flex">
                    <span className="flex-1">Item</span>
                    <span className="w-27 text-center">Qty</span>
                    <span className="w-23">Unit cost</span>
                    <span className="w-4.5" />
                  </div>
                  <ul>
                    {lines.map((line) => {
                      const variant = byId.get(line.variantId);
                      if (!variant) return null;
                      const isLatest = line.variantId === latest;
                      return (
                        <li
                          key={line.variantId}
                          className={cn(
                            "grid grid-cols-2 items-center gap-x-2.5 gap-y-2.5 border-border-subtle px-3.5 py-3 not-first:border-t md:flex md:border-t",
                            isLatest && "bg-sage-50",
                          )}
                        >
                          <span className="col-span-2 flex min-w-0 items-center gap-2.5 md:flex-1">
                            <ProductThumb size="line" bleed tint={variant.tint ?? "surface"} image={variant.image} />
                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate text-14 leading-5 font-semibold text-text">{variant.name}</span>
                              <span className="text-xs leading-xs text-text-muted">
                                {isLatest ? "Just scanned · " : "On hand "}
                                {variant.onHand} → <span className="font-bold text-brand">{variant.onHand + line.quantity}</span>
                              </span>
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${variant.name}`}
                              onClick={() => setLines((current) => current.filter((item) => item.variantId !== line.variantId))}
                              className="shrink-0 text-evergreen-300 hover:text-error md:hidden"
                            >
                              <Icon name="close" size={14} strokeWidth={1.6} />
                            </button>
                          </span>
                          <QuantityStepper
                            variant="outline"
                            value={line.quantity}
                            min={1}
                            max={9999}
                            label={variant.name}
                            name={`quantity:${line.variantId}`}
                            onValueChange={(quantity) => update(line.variantId, { quantity })}
                            onDecrement={() => update(line.variantId, { quantity: Math.max(1, line.quantity - 1) })}
                            onIncrement={() => update(line.variantId, { quantity: line.quantity + 1 })}
                            className={cn("h-10 w-full md:h-9 md:w-26", isLatest && "border-field border-primary dark:border-brand")}
                          />
                          <label className="flex h-10 items-center gap-1 rounded-sm border border-border bg-bg px-3 focus-within:border-primary md:h-9 md:w-23 md:rounded-10 md:px-2.5">
                            <span className="text-sm leading-3.5 text-text-muted md:text-11">{currency}</span>
                            <input
                              type="text"
                              inputMode="decimal"
                              aria-label={`Unit cost of ${variant.name}`}
                              defaultValue={line.unitCost.toFixed(2)}
                              onChange={(event) => update(line.variantId, { unitCost: Number(event.target.value.replace(/[^\d.]/g, "")) || 0 })}
                              className="w-0 min-w-0 flex-1 bg-transparent text-base leading-5 text-text outline-none md:text-sm md:leading-4"
                            />
                          </label>
                          <button
                            type="button"
                            aria-label={`Remove ${variant.name}`}
                            onClick={() => setLines((current) => current.filter((item) => item.variantId !== line.variantId))}
                            className="hidden w-4.5 shrink-0 justify-center text-evergreen-300 hover:text-error md:flex"
                          >
                            <Icon name="close" size={14} strokeWidth={1.6} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <p className="hidden gap-2.5 rounded-14 bg-surface-subtle px-3.5 py-3 text-sm leading-4.5 text-text-secondary md:flex">
                <Icon name="info" size={16} className="mt-0.5 shrink-0" />
                Unit costs update each item&apos;s average cost, which feeds margin reports. Each line is saved in the stock history with your name.
              </p>
            </div>

            <footer className="flex shrink-0 flex-col gap-3 border-t border-border-subtle px-5 pt-4 pb-6 md:flex-row md:items-center md:justify-between md:bg-surface-subtle md:px-6 md:pb-5">
              <div className="flex items-baseline justify-between gap-3 md:flex-col md:items-start md:gap-0">
                <p className="text-sm leading-4.5 font-semibold text-text md:text-base md:leading-5">
                  {units} {units === 1 ? "unit" : "units"} · {lines.length} {lines.length === 1 ? "item" : "items"}
                </p>
                <p className="text-sm leading-4.5 text-text-muted">
                  {currency} {money(cost)} at cost
                </p>
              </div>
              <div className="flex gap-2.5">
                <Dialog.Close className="hidden h-11 items-center rounded-full border border-border bg-bg px-4.5 text-14 leading-4.5 font-semibold text-text hover:bg-surface-subtle md:flex">
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={units === 0}
                  className="flex h-13 flex-1 items-center justify-center rounded-full bg-primary px-5 text-base leading-5 font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-muted md:h-11 md:flex-none md:text-14 md:leading-4.5"
                >
                  Receive {units} {units === 1 ? "unit" : "units"}
                </button>
              </div>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
