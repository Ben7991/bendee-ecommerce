import type { Metadata } from "next";

import { ReportList, SettingsCard, SettingsField, SettingsNotice, SettingsToggle } from "@repo/ui/molecules";
import { ReportTable } from "@repo/ui/organisms";

import { saveTaxesAction } from "../../../../_actions/admin-settings";
import { settings, taxExample } from "../../../../_content/admin-settings";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "Taxes" };

type SearchParams = Promise<{ saved?: string }>;

/** /admin/settings/taxes (Paper "Jofak - Admin" → Settings → Taxes). Rates are editable; ended ones are kept for old orders. */
export default async function AdminTaxSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  const { taxes, savedAt } = settings();
  const example = taxExample();

  return (
    <SettingsForm key={saved} pageTitle="Taxes" savedAt={savedAt} backHref="/admin/settings" action={saveTaxesAction} nav={<SettingsSections active="/admin/settings/taxes" />}>
      <SettingsNotice tone="warning">Rates are set here, not in code. Confirm any change with your accountant — each order keeps a copy of the rates it was charged.</SettingsNotice>
      <ReportTable
        title="Tax components"
        description={`Added together on the price before tax · ${example.total}% in total today`}
        action={<span className="hidden md:inline">+ Add component</span>}
        columns={[
          { key: "name", label: "Name" },
          { key: "rate", label: "Rate", width: "w-28" },
          { key: "since", label: "In force", width: "w-40" },
          { key: "compounds", label: "Compounds", width: "w-24", wide: true },
          { key: "status", label: "", width: "w-20", align: "right" },
        ]}
        rows={taxes.components.map((component) => ({
          id: component.id,
          lead: { title: component.name, sub: component.full, muted: Boolean(component.ended) },
          cells: {
            rate: component.ended ? (
              { text: `${component.rate.toFixed(1)}%`, mono: true, strike: true, tone: "muted" as const }
            ) : (
              <label className="flex w-20 items-center gap-1 rounded-8 border border-border px-2 py-1 focus-within:border-primary">
                <span className="sr-only">{component.name} rate</span>
                <input name={`rate-${component.id}`} type="number" step="0.1" min="0" max="50" defaultValue={component.rate} className="w-full min-w-0 bg-transparent font-mono text-sm leading-4.5 font-semibold text-text outline-none" />
                <span className="font-mono text-sm text-text-muted">%</span>
              </label>
            ),
            since: component.since,
            compounds: component.compounds ? "Yes" : "No",
            status: { chip: component.ended ? { label: "Ended", tone: "neutral" as const } : { label: "Active", tone: "success" as const } },
          },
          mobile: { value: <span className={component.ended ? "font-mono text-text-muted line-through" : "font-mono"}>{component.rate.toFixed(1)}%</span>, meta: [{ text: component.since }] },
        }))}
      />
      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <SettingsCard title="How prices work" className="xl:flex-1">
          <SettingsToggle title="Prices include tax" description="The price on the shelf is what customers pay" name="inclusive" defaultChecked={taxes.inclusive} />
          <div className="flex flex-col gap-1.5">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">Checkout shows</p>
            <p className="rounded-sm bg-surface-subtle px-3 py-3 text-sm leading-4.5 text-text">
              {taxes.inclusive ? `Includes VAT & levies of GHS ${example.taxes}` : `Plus VAT & levies of GHS ${example.taxes}`}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">Tax groups</p>
            <SettingsField label={<span className="sr-only">Standard</span>} defaultValue={`Standard · ${example.total}%`} readOnly aside={<span className="font-regular text-text-muted">41 products</span>} />
            <SettingsField label={<span className="sr-only">Exempt</span>} defaultValue="Exempt · 0%" readOnly aside={<span className="font-regular text-text-muted">7 products</span>} />
            <p className="text-xs leading-xs text-text-muted">Set a product’s group in its Pricing section</p>
          </div>
        </SettingsCard>
        <SettingsCard tone="muted" eyebrow="Example" title="Greens Daily · GHS 70.00" className="xl:w-85 xl:shrink-0">
          <ReportList
            compact
            rows={[
              { id: "before", title: "Price before tax", value: example.before, mono: true },
              ...example.parts.map((part) => ({ ...part, mono: true })),
              { id: "pays", title: "Customer pays", value: example.pays, mono: true, total: true },
            ]}
          />
        </SettingsCard>
      </div>
    </SettingsForm>
  );
}
