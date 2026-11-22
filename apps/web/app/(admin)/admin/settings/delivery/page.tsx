import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { ReportList, SettingsCard, SettingsField, SettingsNotice, SettingsPanel, SettingsToggle } from "@repo/ui/molecules";
import { ReportTable } from "@repo/ui/organisms";

import { addZoneAction, saveZoneAction } from "../../../../_actions/admin-settings";
import { settings } from "../../../../_content/admin-settings";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "Delivery & pickup" };

type SearchParams = Promise<{ zone?: string; saved?: string }>;

/** /admin/settings/delivery (Paper "Jofak - Admin" → Settings → Delivery & pickup). Pick a zone to edit it. */
export default async function AdminDeliverySettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { zone: zoneId, saved } = await searchParams;
  const { delivery, savedAt } = settings();
  const zone = delivery.zones.find((item) => item.id === zoneId) ?? delivery.zones[0]!;
  const ghs = (value: number) => `GHS ${value}`;

  return (
    <SettingsForm
      key={`${zone.id}-${saved ?? ""}`}
      pageTitle="Delivery & pickup"
      savedAt={savedAt}
      backHref="/admin/settings"
      action={saveZoneAction.bind(null, zone.id)}
      nav={<SettingsSections active="/admin/settings/delivery" />}
      mobileBar={
        <button formAction={addZoneAction} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-base leading-5 font-semibold text-on-primary">
          <Icon name="plus" size={16} strokeWidth={2} /> Add delivery zone
        </button>
      }
    >
      <SettingsNotice>
        Orders go out through your courier partner. Jofak doesn’t assign riders — an order moves to <strong>Handed to courier</strong> when you pass it on.
      </SettingsNotice>
      <ReportTable
        linkAs={Link}
        title="Delivery zones"
        description="The customer’s area decides the zone, fee and arrival date"
        action={
          <button formAction={addZoneAction} className="hidden h-9.5 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle md:flex">
            <Icon name="plus" size={12} strokeWidth={1.8} /> Add zone
          </button>
        }
        columns={[
          { key: "zone", label: "Zone" },
          { key: "standard", label: "Standard", width: "w-32" },
          { key: "express", label: "Express", width: "w-36", wide: true },
          { key: "free", label: "Free over", width: "w-24" },
          { key: "cod", label: "On delivery", width: "w-24" },
        ]}
        rows={delivery.zones.map((item) => ({
          id: item.id,
          href: `/admin/settings/delivery?zone=${item.id}`,
          tone: item.id === zone.id ? ("selected" as const) : undefined,
          lead: { title: item.name, sub: `${item.areas}${item.areaCount > 4 ? ` +${item.areaCount - 4}` : ""}` },
          cells: {
            standard: item.standard.on ? <span className="flex flex-col"><span className="font-semibold text-text">{ghs(item.standard.fee)}</span><span className="text-xs leading-xs text-text-muted">{item.standard.eta.replace(" working", "").replace(" – ", "–")}</span></span> : "Off",
            express: item.express.on ? <span className="flex flex-col"><span className="font-semibold text-text">{ghs(item.express.fee)}</span><span className="text-xs leading-xs text-text-muted">Same day by {item.express.cutoff.split(" ")[0]}</span></span> : "Off",
            free: item.freeOver ? { text: ghs(item.freeOver), tone: "strong" as const } : "—",
            cod: item.cod ? { text: "Yes", tone: "brand" as const } : "No",
          },
          mobile: {
            value: <span className="flex flex-col items-end"><span>{ghs(item.standard.fee)}</span><span className="text-xs leading-xs font-regular text-text-muted">{item.standard.eta.replace(" working days", " days").replace(" – ", "–")}</span></span>,
            meta: [...(item.express.on ? [{ text: `Express ${ghs(item.express.fee)}`, tone: "brand" as const }] : []), ...(item.cod ? [{ text: "Pay on delivery", tone: "brand" as const }] : [])],
          },
        }))}
      />
      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <SettingsCard eyebrow="Editing zone" title={zone.name} action={<span>{zone.areaCount} areas ›</span>} className={zoneId ? "xl:flex-1" : "hidden md:flex xl:flex-1"}>
          <SettingsPanel title="Standard delivery" toggle={{ name: "standard", defaultChecked: zone.standard.on }}>
            <div className="flex flex-col gap-3 md:flex-row">
              <SettingsField label="Fee" name="standardFee" type="number" prefix="GHS" defaultValue={String(zone.standard.fee)} />
              <SettingsField label="Arrives in" name="standardEta" defaultValue={zone.standard.eta} />
            </div>
          </SettingsPanel>
          <SettingsPanel title="Express · same day" toggle={{ name: "express", defaultChecked: zone.express.on }}>
            <div className="flex flex-col gap-3 md:flex-row">
              <SettingsField label="Fee" name="expressFee" type="number" prefix="GHS" defaultValue={String(zone.express.fee)} />
              <SettingsField label="Order before" name="expressCutoff" defaultValue={zone.express.cutoff} placeholder="12:00 · Mon–Sat" />
            </div>
          </SettingsPanel>
          <div className="flex flex-col gap-3 md:flex-row">
            <SettingsField label="Free delivery over" name="freeOver" type="number" prefix="GHS" defaultValue={zone.freeOver ? String(zone.freeOver) : ""} placeholder="No free delivery" />
            <SettingsField label="Heavy-order surcharge" name="surcharge" defaultValue={zone.surcharge} />
          </div>
          <SettingsToggle title="Allow pay on delivery" description={`Courier collects cash or MoMo · limit GHS ${settings().payments.codLimit}`} name="cod" defaultChecked={zone.cod} />
        </SettingsCard>
        <div className="flex flex-col gap-3.5 md:gap-4 xl:w-80 xl:shrink-0">
          <SettingsCard title="Store pickup" action={<span>+ Add</span>}>
            <div className="flex gap-3 rounded-14 bg-surface-subtle p-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-10 bg-sage-100 text-brand">
                <Icon name="mapPin" size={16} strokeWidth={1.4} />
              </span>
              <span className="flex flex-col">
                <span className="text-14 leading-5 font-semibold text-text">Jofak Osu</span>
                <span className="text-xs leading-xs text-text-muted">{settings().profile.address.split(",").slice(0, 2).join(",")} · free</span>
                <span className="text-xs leading-xs text-text-secondary">Mon–Sat 9:00–18:00 · ready in 2 h</span>
              </span>
            </div>
          </SettingsCard>
          <SettingsCard title="No-delivery days" description="Arrival dates skip Sundays and these days" action={<span>+ Add</span>}>
            <ReportList rows={delivery.holidays.map((day) => ({ id: day.name, title: day.name, value: day.date, valueTone: "muted" as const }))} />
          </SettingsCard>
        </div>
      </div>
    </SettingsForm>
  );
}
