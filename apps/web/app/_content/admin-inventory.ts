import type {
  AdjustableVariant,
  AdminStat,
  LinkableOrder,
  MovementDay,
  ReceivableVariant,
  SavedView,
  SectionTab,
  StockItem,
  StockMovement,
} from "@repo/ui/organisms";

/*
 * Inventory sample data for /admin/inventory and /admin/inventory/movements (Paper "Jofak - Admin" →
 * Inventory), until the inventory API exists. Receive and Adjust open from the URL (?receive,
 * ?adjust=<variant>), so every row action is a link.
 *
 * Receiving and adjusting change a store kept in server memory (on globalThis, so server actions
 * and pages share it in dev): stock levels, the headline figures and the movements log update.
 * It resets when the server restarts.
 */

export const inventoryLocation = "Main store, Osu";
export const inventoryStaff = "Abena M.";

export const inventoryTabs: SectionTab[] = [
  { href: "/admin/inventory", label: "Stock levels" },
  { href: "/admin/inventory/movements", label: "Movements" },
];

export type StockFilter = "low" | "out";

interface SampleVariant {
  id: string;
  name: string;
  compactName: string;
  /** Receive-line name: "Ashwagandha · 60". */
  lineName: string;
  sku: string;
  shelf?: string;
  barcode?: string;
  /** Placeholder packshot id (public/placeholders/<image>.png). */
  image?: string;
  tint?: StockItem["tint"];
  tracked?: boolean;
  onHand: number;
  reserved: number;
  alertAt: number;
  unitCost: number;
  /** Bar fill, from the design. */
  level: number;
}

const seedVariants: SampleVariant[] = [
  {
    id: "ash-60",
    name: "Ashwagandha Calm · 60 caps",
    compactName: "Ashwagandha Calm · 60",
    lineName: "Ashwagandha · 60",
    sku: "JF-ASH-60",
    shelf: "B2",
    barcode: "6034001200601",
    image: "ashwagandha",
    tint: "amber",
    onHand: 2,
    reserved: 2,
    alertAt: 10,
    unitCost: 70,
    level: 2,
  },
  {
    id: "mag-30",
    name: "Magnesium Sleep · Gummies",
    compactName: "Magnesium Sleep",
    lineName: "Magnesium Sleep",
    sku: "JF-MAG-30",
    shelf: "A4",
    barcode: "6034001200304",
    image: "magnesium",
    tint: "sage",
    onHand: 5,
    reserved: 2,
    alertAt: 10,
    unitCost: 80,
    level: 15,
  },
  {
    id: "pro-30",
    name: "Daily Probiotic · 30 caps",
    compactName: "Daily Probiotic · 30",
    lineName: "Daily Probiotic · 30",
    sku: "JF-PRO-30",
    shelf: "B1",
    barcode: "6034001200502",
    image: "probiotic",
    tint: "lavender",
    onHand: 4,
    reserved: 0,
    alertAt: 10,
    unitCost: 90,
    level: 20,
  },
  {
    id: "enr-cit",
    name: "Energy B-Complex · Citrus",
    compactName: "Energy B · Citrus",
    lineName: "Energy B · Citrus",
    sku: "JF-ENR-CIT",
    shelf: "C1",
    barcode: "6034001200403",
    image: "energy",
    tint: "citrus",
    onHand: 7,
    reserved: 2,
    alertAt: 10,
    unitCost: 58,
    level: 25,
  },
  {
    id: "ash-120",
    name: "Ashwagandha Calm · 120 caps",
    compactName: "Ashwagandha Calm · 120",
    lineName: "Ashwagandha · 120",
    sku: "JF-ASH-120",
    shelf: "B2",
    barcode: "6034001201202",
    image: "ashwagandha",
    tint: "amber",
    onHand: 18,
    reserved: 0,
    alertAt: 10,
    unitCost: 125,
    level: 45,
  },
  {
    id: "enr-bry",
    name: "Energy B-Complex · Berry",
    compactName: "Energy B · Berry",
    lineName: "Energy B · Berry",
    sku: "JF-ENR-BRY",
    shelf: "C1",
    barcode: "6034001200410",
    image: "energy",
    tint: "lavender",
    onHand: 90,
    reserved: 2,
    alertAt: 10,
    unitCost: 58,
    level: 100,
  },
  {
    id: "grn-30",
    name: "Greens Daily · 30 servings",
    compactName: "Greens Daily",
    lineName: "Greens Daily · 30",
    sku: "JF-GRN-30",
    shelf: "C3",
    barcode: "6034001200106",
    image: "greens",
    tint: "surface",
    onHand: 130,
    reserved: 6,
    alertAt: 15,
    unitCost: 48,
    level: 100,
  },
  {
    id: "gift",
    name: "Gift wrap",
    compactName: "Gift wrap",
    lineName: "Gift wrap",
    sku: "JF-GIFT",
    tracked: false,
    onHand: 0,
    reserved: 0,
    alertAt: 0,
    unitCost: 0,
    level: 0,
  },
];

type SampleMovement = Omit<StockMovement, "image" | "name" | "compactName" | "tint"> & { variant: string; kind: MovementType };

interface InventoryStore {
  variants: SampleVariant[];
  /** Movements recorded since the server started, newest first (all today). */
  log: SampleMovement[];
  seq: number;
}

const memory = globalThis as typeof globalThis & { __jofakInventory?: InventoryStore };
const store = (): InventoryStore => (memory.__jofakInventory ??= { variants: structuredClone(seedVariants), log: [], seq: 0 });

const money = (value: number) => `GHS ${value.toLocaleString("en-GH")}`;
const availableOf = (variant: SampleVariant) => Math.max(0, variant.onHand - variant.reserved);
const statusOf = (variant: SampleVariant): StockItem["status"] => {
  const available = availableOf(variant);
  return available === 0 ? "out" : available <= variant.alertAt / 2 ? "low" : "ok";
};
const tracked = (variant: SampleVariant) => variant.tracked !== false;
/** The design's bar for untouched rows; otherwise available against four times the alert level. */
const levelOf = (variant: SampleVariant) => {
  const seed = seedVariants.find((item) => item.id === variant.id);
  if (seed && seed.onHand === variant.onHand && seed.reserved === variant.reserved) return variant.level;
  return Math.min(100, Math.round((availableOf(variant) / Math.max(1, variant.alertAt * 4)) * 100));
};

/* Headline figures: the design's totals (72 variants), moved by what changed in the sample. */
const DESIGN = { value: 48920, units: 3418, low: 5, out: 1 };

function totals(list: SampleVariant[]) {
  const counted = list.filter(tracked);
  return {
    value: counted.reduce((sum, variant) => sum + variant.onHand * variant.unitCost, 0),
    units: counted.reduce((sum, variant) => sum + availableOf(variant), 0),
    low: counted.filter((variant) => statusOf(variant) === "low").length,
    out: counted.filter((variant) => statusOf(variant) === "out").length,
  };
}

function figures() {
  const now = totals(store().variants);
  const seed = totals(seedVariants);
  return {
    value: DESIGN.value + now.value - seed.value,
    units: DESIGN.units + now.units - seed.units,
    low: DESIGN.low + now.low - seed.low,
    out: DESIGN.out + now.out - seed.out,
  };
}

export function inventoryStats(): AdminStat[] {
  const { value, units, low, out } = figures();
  return [
    {
      label: "Stock value at cost",
      compactLabel: "Value",
      value: value.toLocaleString("en-GH"),
      compactValue: `${(value / 1000).toFixed(1)}k`,
      currency: "GHS",
    },
    { label: "Units available", value: units.toLocaleString("en-GH"), hideOnMobile: true },
    { label: "Running low", compactLabel: "Low", value: String(low), tone: "warning" },
    { label: "Out of stock", compactLabel: "Out", value: String(out), tone: "error" },
  ];
}

export function stockViews(): (SavedView & { filter?: StockFilter })[] {
  const { low, out } = figures();
  return [
    { href: "/admin/inventory", label: "All" },
    { filter: "low", href: "/admin/inventory?stock=low", label: "Low", count: low, warning: true },
    { filter: "out", href: "/admin/inventory?stock=out", label: "Out", count: out, alert: true },
  ];
}

export interface InventoryItem extends Omit<StockItem, "image"> {
  image?: string;
}

/** Stock rows, with the row action's link built from the current list URL. */
export function findStock({ filter, q, base }: { filter?: StockFilter; q?: string; base: string }): InventoryItem[] {
  const query = q?.trim().toLowerCase();
  const join = base.includes("?") ? "&" : "?";
  const variants = store().variants;
  return variants
    .map((variant): InventoryItem => {
      const available = availableOf(variant);
      const status = statusOf(variant);
      const untracked = !tracked(variant);
      return {
        id: variant.id,
        name: variant.name,
        compactName: variant.compactName,
        detail: variant.shelf
          ? `${variant.sku} · Shelf ${variant.shelf}`
          : untracked
            ? `${variant.sku} · made to order`
            : `${variant.sku} · no shelf set`,
        image: variant.image,
        tint: variant.tint,
        tracked: tracked(variant),
        onHand: variant.onHand,
        reserved: variant.reserved,
        available,
        alertAt: variant.alertAt,
        value: money(variant.onHand * variant.unitCost),
        status,
        level: levelOf(variant),
        action: untracked
          ? { label: "Track", href: `${base}${join}adjust=${variant.id}&mode=count` }
          : status === "ok"
            ? { label: "Adjust", href: `${base}${join}adjust=${variant.id}` }
            : { label: "Receive", href: `${base}${join}receive=${variant.id}`, tone: "brand" },
      };
    })
    .filter((item) => !filter || (item.tracked !== false && (filter === "out" ? item.status === "out" : item.status === "low")))
    .filter(
      (item) =>
        !query ||
        [item.name, item.detail].some((field) => field.toLowerCase().includes(query)) ||
        variants.find((v) => v.id === item.id)?.barcode === q?.trim(),
    );
}

export const suppliers = [
  { value: "accra-nutrition", label: "Accra Nutrition Supply" },
  { value: "kumasi-green", label: "Kumasi Green Health" },
  { value: "adinkra", label: "Adinkra Apothecary" },
];

export type SampleReceivable = Omit<ReceivableVariant, "image"> & { image?: string };

export const receivableVariants = (): SampleReceivable[] =>
  store()
    .variants.filter(tracked)
    .map((variant) => ({
      id: variant.id,
      name: variant.lineName,
      sku: variant.sku,
      barcode: variant.barcode,
      image: variant.image,
      tint: variant.tint,
      onHand: variant.onHand,
      unitCost: variant.unitCost,
    }));

/** The delivery a Receive opens with: one suggested line for a row's variant, or the design's delivery from the page button. */
export function receiveDefaults(variantId?: string) {
  const variant = store().variants.find((item) => item.id === variantId && tracked(item));
  if (variant) {
    return {
      supplier: "",
      invoice: "",
      lines: [{ variantId: variant.id, quantity: Math.max(1, variant.alertAt * 4 - variant.onHand), unitCost: variant.unitCost }],
    };
  }
  return {
    supplier: "accra-nutrition",
    invoice: "ANS-3381",
    lines: [
      { variantId: "ash-60", quantity: 48, unitCost: 70 },
      { variantId: "mag-30", quantity: 36, unitCost: 80 },
      { variantId: "enr-cit", quantity: 60, unitCost: 58 },
    ],
  };
}

export type SampleAdjustable = Omit<AdjustableVariant, "image"> & { image?: string };

/** Every variant, untracked ones too (Track opens Set count to start counting them). */
export const adjustableVariants = (): SampleAdjustable[] =>
  store().variants.map((variant) => ({
    id: variant.id,
    name: variant.name,
    compactName: variant.compactName.replace(/ · .*/, ""),
    image: variant.image,
    tint: variant.tint,
    onHand: variant.onHand,
    reserved: variant.reserved,
    averageCost: variant.unitCost,
  }));

export const adjustReasons = {
  remove: [
    { value: "damaged", label: "Damaged" },
    { value: "expired", label: "Expired" },
    { value: "lost", label: "Lost" },
    { value: "recount", label: "Recount" },
    { value: "sample", label: "Sample" },
  ],
  add: [
    { value: "found", label: "Found in store" },
    { value: "order-cancelled", label: "Order cancelled" },
    { value: "supplier-extra", label: "Supplier extra" },
    { value: "other", label: "Other" },
  ],
};

/** Recent orders that contain each variant, for linking an adjustment. */
export const linkableOrders = (): Record<string, LinkableOrder[]> =>
  Object.fromEntries(
    adjustableVariants().map((variant) => {
      const name = variant.compactName ?? variant.name;
      const orders: LinkableOrder[] = [
        {
          number: "JFK-251490",
          status: { label: "To pack", tone: "info" },
          summary: `Efua Boateng · 3 × ${name} · today 09:40`,
          compactSummary: `Efua Boateng · 3 × ${name}`,
        },
        {
          number: "JFK-251487",
          status: { label: "Packed", tone: "warning" },
          summary: `Kwame Mensah · 1 × ${name} · today 08:15`,
          compactSummary: `Kwame Mensah · 1 × ${name}`,
        },
        {
          number: "JFK-251471",
          status: { label: "Out for delivery", tone: "lavender" },
          summary: `Ama Owusu · 2 × ${name} · yesterday`,
          compactSummary: `Ama Owusu · 2 × ${name}`,
        },
        {
          number: "JFK-251458",
          status: { label: "Delivered", tone: "success" },
          summary: `Yaw Darko · 1 × ${name} · 12 Nov`,
          compactSummary: `Yaw Darko · 1 × ${name}`,
        },
      ];
      return [variant.id, orders];
    }),
  );

/* Movements. */

export type MovementType = "received" | "sale" | "adjustment" | "return";

export const movementTypeOptions = [
  { value: "", label: "All types" },
  { value: "received", label: "Received" },
  { value: "sale", label: "Sales" },
  { value: "adjustment", label: "Adjustments" },
  { value: "return", label: "Returns" },
];

export const movementPeriodOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export const movementViews: (SavedView & { type?: MovementType })[] = [
  { href: "/admin/inventory/movements", label: "All" },
  { type: "received", href: "/admin/inventory/movements?type=received", label: "Received" },
  { type: "sale", href: "/admin/inventory/movements?type=sale", label: "Sales" },
  { type: "adjustment", href: "/admin/inventory/movements?type=adjustment", label: "Adjustments" },
  { type: "return", href: "/admin/inventory/movements?type=return", label: "Returns" },
];

const TODAY = "Today · Sun 15 Nov";

const sampleDays: { label: string; movements: SampleMovement[] }[] = [
  {
    label: TODAY,
    movements: [
      {
        id: "m-1",
        kind: "received",
        variant: "ash-60",
        time: "11:42",
        change: 48,
        type: { label: "Received", tone: "success" },
        before: 2,
        after: 50,
        reference: { label: "Invoice ANS-3381", compact: "ANS-3381" },
        by: "Abena M.",
      },
      {
        id: "m-2",
        kind: "received",
        variant: "mag-30",
        time: "11:42",
        change: 36,
        type: { label: "Received", tone: "success" },
        before: 5,
        after: 41,
        reference: { label: "Invoice ANS-3381", compact: "ANS-3381" },
        by: "Abena M.",
      },
      {
        id: "m-3",
        kind: "adjustment",
        variant: "grn-30",
        time: "10:15",
        note: "“Crushed lids found while packing”",
        change: -3,
        type: { label: "Damaged", tone: "error" },
        before: 130,
        after: 127,
        reference: { label: "Order JFK-251490", href: "/admin/orders/JFK-251490", compact: "JFK-251490" },
        by: "Abena M.",
      },
      {
        id: "m-4",
        kind: "sale",
        variant: "enr-bry",
        time: "09:58",
        change: -2,
        type: { label: "Sale", tone: "neutral" },
        before: 92,
        after: 90,
        reference: { label: "Order JFK-251482", href: "/admin/orders/JFK-251482", compact: "JFK-251482" },
        by: "System",
      },
    ],
  },
  {
    label: "Yesterday · Sat 14 Nov",
    movements: [
      {
        id: "m-5",
        kind: "return",
        variant: "pro-30",
        time: "17:20",
        change: 1,
        type: { label: "Return restock", tone: "lavender", compactLabel: "Return" },
        before: 3,
        after: 4,
        reference: { label: "Return RTN-0412", href: "/admin/returns/RTN-0412", compact: "RTN-0412" },
        by: "Kofi A.",
      },
      {
        id: "m-6",
        kind: "adjustment",
        variant: "ash-120",
        time: "16:05",
        note: "Shelf count found 2 extra",
        compactNote: "Shelf count",
        change: 2,
        type: { label: "Recount", tone: "warning" },
        before: 16,
        after: 18,
        by: "Kofi A.",
      },
      {
        id: "m-7",
        kind: "sale",
        variant: "ash-60",
        time: "14:31",
        change: -4,
        type: { label: "Sale", tone: "neutral" },
        before: 6,
        after: 2,
        reference: { label: "Order JFK-251467", href: "/admin/orders/JFK-251467", compact: "JFK-251467" },
        by: "System",
      },
    ],
  },
];

export const movementsSummary = { total: 214 };

export type SampleMovementDay = Omit<MovementDay, "movements"> & { movements: (Omit<StockMovement, "image"> & { image?: string })[] };

/** Older history: shown for 30 or 90 days, or after Load more. */
const olderDays: { label: string; movements: SampleMovement[] }[] = [
  {
    label: "Fri 6 Nov",
    movements: [
      {
        id: "m-8",
        kind: "received",
        variant: "grn-30",
        time: "10:05",
        change: 120,
        type: { label: "Received", tone: "success" },
        before: 22,
        after: 142,
        reference: { label: "Invoice KGH-1180", compact: "KGH-1180" },
        by: "Kofi A.",
      },
      {
        id: "m-9",
        kind: "sale",
        variant: "ash-120",
        time: "09:12",
        change: -2,
        type: { label: "Sale", tone: "neutral" },
        before: 20,
        after: 18,
        reference: { label: "Order JFK-251402", href: "/admin/orders/JFK-251402", compact: "JFK-251402" },
        by: "System",
      },
    ],
  },
  {
    label: "Thu 29 Oct",
    movements: [
      {
        id: "m-10",
        kind: "adjustment",
        variant: "pro-30",
        time: "15:40",
        note: "“Batch 2410 past best-before”",
        compactNote: "Batch 2410",
        change: -3,
        type: { label: "Expired", tone: "error" },
        before: 6,
        after: 3,
        by: "Abena M.",
      },
      {
        id: "m-11",
        kind: "adjustment",
        variant: "enr-cit",
        time: "11:18",
        note: "Weekly count, shelf C1",
        compactNote: "Shelf count",
        change: -1,
        type: { label: "Recount", tone: "warning" },
        before: 8,
        after: 7,
        by: "Kofi A.",
      },
    ],
  },
];

export interface MovementQuery {
  type?: MovementType;
  q?: string;
  period?: string;
  page?: number;
}

/** Whether the older sample days are in view (a longer period, or Load more). */
export const showsOlder = ({ period = "7d", page = 1 }: MovementQuery) => period !== "7d" || page >= 2;

export function findMovements(query: MovementQuery): SampleMovementDay[] {
  const { type, q } = query;
  const term = q?.trim().toLowerCase();
  const variants = store().variants;
  const [today, ...rest] = sampleDays;
  const days = [{ label: TODAY, movements: [...store().log, ...today!.movements] }, ...rest, ...(showsOlder(query) ? olderDays : [])];
  return days
    .map((day) => ({
      label: day.label,
      movements: day.movements
        .filter((movement) => !type || movement.kind === type)
        .map(({ kind: _kind, variant: variantId, ...movement }) => {
          const variant = variants.find((item) => item.id === variantId)!;
          return { ...movement, name: variant.name, compactName: variant.compactName, image: variant.image, tint: variant.tint };
        })
        .filter(
          (movement) =>
            !term ||
            [movement.name, movement.reference?.label ?? "", movement.note ?? ""].some((field) => field.toLowerCase().includes(term)),
        ),
    }))
    .filter((day) => day.movements.length > 0);
}

/** Movements recorded in this server session, for the "of N" counts. */
export const loggedCount = () => store().log.length;

/* Changes: what Receive and Adjust do to the store. */

const clock = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Accra" });

function log(movement: Omit<SampleMovement, "id" | "time">) {
  const state = store();
  state.seq += 1;
  state.log.unshift({ ...movement, id: `log-${state.seq}`, time: clock() });
}

/** A supplier delivery: adds each line to stock, folds its unit cost into the average and logs it. */
export function recordReceipt({
  supplier,
  invoice,
  lines,
  by,
}: {
  supplier?: string;
  invoice?: string;
  lines: { variantId: string; quantity: number; unitCost: number }[];
  by: string;
}) {
  const supplierLabel = suppliers.find((option) => option.value === supplier)?.label;
  for (const line of lines) {
    const variant = store().variants.find((item) => item.id === line.variantId && tracked(item));
    if (!variant || line.quantity <= 0) continue;
    const before = variant.onHand;
    const cost = line.unitCost > 0 ? line.unitCost : variant.unitCost;
    variant.unitCost = Math.round(((variant.unitCost * before + cost * line.quantity) / (before + line.quantity)) * 100) / 100;
    variant.onHand += line.quantity;
    log({
      kind: "received",
      variant: variant.id,
      change: line.quantity,
      type: { label: "Received", tone: "success" },
      before,
      after: variant.onHand,
      reference: invoice ? { label: `Invoice ${invoice}`, compact: invoice } : supplierLabel ? { label: supplierLabel } : undefined,
      by,
    });
  }
}

const REMOVE_TONE: Record<string, StockMovement["type"]["tone"]> = {
  damaged: "error",
  expired: "error",
  lost: "error",
  recount: "warning",
  sample: "neutral",
};

/** Remove or add units with a reason, or set a shelf count (which also starts tracking an untracked item). */
export function recordAdjustment({
  variantId,
  mode,
  quantity,
  counted,
  reason,
  order,
  note,
  by,
}: {
  variantId: string;
  mode: "remove" | "add" | "count";
  quantity: number;
  counted: number;
  reason: string;
  order?: string;
  note?: string;
  by: string;
}) {
  const variant = store().variants.find((item) => item.id === variantId);
  if (!variant) return;
  const before = variant.onHand;
  const startTracking = !tracked(variant);
  let change: number;
  let type: StockMovement["type"];
  if (mode === "count") {
    change = Math.max(0, counted) - before;
    type = startTracking ? { label: "Tracking started", tone: "success" } : { label: "Recount", tone: "warning" };
    if (startTracking) {
      variant.tracked = true;
      variant.alertAt = 5;
    }
  } else if (mode === "remove") {
    change = -Math.min(Math.max(1, quantity), before);
    const label = adjustReasons.remove.find((item) => item.value === reason)?.label ?? "Removed";
    type = { label, tone: REMOVE_TONE[reason] ?? "neutral" };
  } else {
    change = Math.max(1, quantity);
    type = { label: adjustReasons.add.find((item) => item.value === reason)?.label ?? "Added", tone: "success" };
  }
  if (change === 0 && !startTracking) return;
  variant.onHand = before + change;
  log({
    kind: "adjustment",
    variant: variant.id,
    change,
    type,
    before,
    after: variant.onHand,
    note: note ? `“${note}”` : undefined,
    compactNote: note ? type.label : undefined,
    reference: order ? { label: `Order ${order}`, href: `/admin/orders/${order}`, compact: order } : undefined,
    by,
  });
}

/**
 * A return's effect on stock: `restock` puts the units back on the shelf; `writeoff` records units
 * that never come back (no return needed, or failed inspection). A write-off doesn't change the
 * count on hand (those units already left with the sale) but logs the loss against the return.
 */
export function recordReturnStock({
  variantId,
  quantity,
  kind,
  returnId,
  note,
  by,
}: {
  variantId: string;
  quantity: number;
  kind: "restock" | "writeoff";
  returnId: string;
  note?: string;
  by: string;
}) {
  const variant = store().variants.find((item) => item.id === variantId && tracked(item));
  if (!variant || quantity <= 0) return;
  const before = variant.onHand;
  if (kind === "restock") variant.onHand += quantity;
  log({
    kind: "return",
    variant: variant.id,
    change: kind === "restock" ? quantity : -quantity,
    type:
      kind === "restock" ? { label: "Return restock", tone: "lavender", compactLabel: "Return" } : { label: "Written off", tone: "error" },
    before,
    after: variant.onHand,
    note: note ? `“${note}”` : undefined,
    compactNote: note ? "Return" : undefined,
    reference: { label: `Return ${returnId}`, href: `/admin/returns/${returnId}`, compact: returnId },
    by,
  });
}
