import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Switch } from "@repo/ui/atoms";
import { ReportList, SettingsCard, SettingsField } from "@repo/ui/molecules";

import { rebuildSitemapAction, saveSeoAction } from "../../../../_actions/admin-settings";
import { SEO_TABS, settings, type SeoTab } from "../../../../_content/admin-settings";
import { SeoTemplate, SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "SEO defaults" };

type SearchParams = Promise<{ tab?: string; saved?: string }>;

const LABEL: Record<SeoTab, string> = { products: "Products", categories: "Categories", brands: "Brands", collections: "Collections", pages: "Pages" };

function ToggleRow({ title, description, name, defaultChecked }: { title: string; description: string; name: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm leading-4.5 font-semibold text-text">{title}</span>
        <span className="text-xs leading-xs text-text-muted">{description}</span>
      </span>
      <Switch name={name} defaultChecked={defaultChecked} className="data-[state=checked]:bg-primary" />
    </label>
  );
}

/** What each tab's template shows: its details, choices, sample page and small print. */
function tabContent(tab: SeoTab, hidden: string[], toggle: boolean | undefined) {
  const content: Record<SeoTab, { tokens: string[]; description: { value: string; label: string }[]; image: { value: string; label: string }[]; sample: Parameters<typeof SeoTemplate>[0]["sample"]; note: string; hint?: string; extra?: ReactNode }> = {
    products: {
      tokens: ["name", "brand", "category", "price", "size"],
      description: [
        { value: "description", label: "First 155 characters of the product description" },
        { value: "summary", label: "Product summary line" },
      ],
      image: [
        { value: "photo", label: "First product photo, cropped to 1200 × 630" },
        { value: "card", label: "Jofak share card (logo on evergreen)" },
      ],
      sample: {
        values: { name: "Greens Daily · 30 servings", brand: "Asaase Botanicals", category: "Greens", price: "GHS 70", size: "30 servings" },
        path: "products › greens-daily",
        description: "A daily blend of moringa, spirulina and baobab to top up your greens. Mix one scoop into water or a smoothie. Delivered across Ghana…",
        image: "Product photo · 1200 × 630",
        price: "GHS 70",
      },
      note: "41 of 48 products use this template. 7 have their own title, set in the product editor’s SEO panel.",
    },
    categories: {
      tokens: ["name", "parent", "product_count"],
      description: [
        { value: "intro", label: "Category intro text, first 155 characters" },
        { value: "list", label: "Names of the top products" },
      ],
      image: [
        { value: "banner", label: "Category banner, or photo of its best seller" },
        { value: "card", label: "Jofak share card (logo on evergreen)" },
      ],
      hint: "If there’s no intro: “Shop {product_count} {name} products at Jofak…”",
      sample: {
        values: { name: "Sleep & stress", parent: "Wellness", product_count: "14" },
        path: "sleep-and-stress",
        description: "Ashwagandha, magnesium and calming blends for better sleep and calmer days. Pay with MoMo or card, delivered across Ghana…",
        image: "Category banner · 1200 × 630",
        imageTone: "lavender",
        shareTitle: "Sleep & stress supplements in Ghana",
      },
      note: "17 of 19 categories use this template. Collagen and Electrolytes have their own title, set in the category editor.",
      extra: <ToggleRow title="Hide filtered and sorted lists from Google" description="e.g. /sleep-and-stress?brand=… points to the main category page" name="toggle" defaultChecked={toggle ?? true} />,
    },
    brands: {
      tokens: ["name", "product_count", "top_category"],
      description: [
        { value: "story", label: "Brand story, first 155 characters" },
        { value: "list", label: "Names of the top products" },
      ],
      image: [
        { value: "logo", label: "Brand logo, centred on the brand colour" },
        { value: "card", label: "Jofak share card (logo on evergreen)" },
      ],
      sample: {
        values: { name: "Asaase Botanicals", product_count: "6", top_category: "Greens" },
        path: "brands › asaase-botanicals",
        description: "Plant-based greens and superfood blends, made with Ghanaian moringa and baobab. 6 products at Jofak…",
        image: <span className="flex size-11 items-center justify-center rounded-sm bg-primary text-base font-bold text-on-primary">AB</span>,
        shareTitle: "Shop Asaase Botanicals in Ghana",
      },
      note: "All 12 brands use this template. Brands with no story fall back to “Shop {product_count} {name} products at Jofak.”",
    },
    collections: {
      tokens: ["name", "offer", "product_count", "ends"],
      description: [
        { value: "intro", label: "Collection intro text, first 155 characters" },
        { value: "list", label: "Names of the top products" },
      ],
      image: [
        { value: "cover", label: "Collection cover image" },
        { value: "card", label: "Jofak share card (logo on evergreen)" },
      ],
      hint: "{offer} becomes e.g. “– up to 15% off” while a discount runs, and disappears when it ends.",
      sample: {
        values: { name: "Independence Day sale", offer: "– up to 15% off", product_count: "8", ends: "6 Mar" },
        path: "collections › independence-day-sale",
        description: "Savings on everyday vitamins and greens. 8 products, while stocks last…",
        image: "Collection cover · 1200 × 630",
        imageTone: "sun",
        shareTitle: "Independence Day sale – up to 15% off",
      },
      note: "5 of 6 collections use this template. Harmattan glow has its own title, set in the collection editor.",
      extra: <ToggleRow title="Keep ended sales in Google" description="Off: hidden collections point visitors to Offers & collections" name="toggle" defaultChecked={toggle ?? false} />,
    },
    pages: {
      tokens: ["title"],
      description: [
        { value: "text", label: "First 155 characters of the page text" },
        { value: "none", label: "Let Google choose" },
      ],
      image: [
        { value: "card", label: "Jofak share card (logo on evergreen)" },
        { value: "first", label: "First image on the page" },
      ],
      sample: {
        values: { title: "Delivery" },
        path: "pages › delivery",
        description: "We deliver across Ghana. Accra Central in 1–2 days for GHS 25, and free on orders over GHS 300…",
        image: <span className="text-xl font-bold">Jofak</span>,
        imageTone: "brand",
        shareTitle: "Delivery | Jofak",
      },
      note: "All 11 pages use this template. The FAQ page also shows its questions and answers directly in Google results.",
      extra: (
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-4.5 font-semibold text-text">Hidden from Google</p>
          <div className="flex flex-wrap gap-2">
            {hidden.map((page) => (
              <label key={page} className="flex cursor-pointer items-center gap-1.5 rounded-full bg-surface-subtle px-2.5 py-1 text-xs leading-xs font-semibold text-text-secondary has-checked:line-through">
                <input type="checkbox" name="hidden" value={page} defaultChecked className="sr-only" />
                {page} <span aria-hidden>×</span>
              </label>
            ))}
            <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs leading-xs font-semibold text-brand">+ Add page</span>
          </div>
        </div>
      ),
    },
  };
  return content[tab];
}

/** /admin/settings/seo (Paper "Jofak - Admin" → Settings → SEO defaults, with template tabs). */
export default async function AdminSeoSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { tab: requested, saved } = await searchParams;
  const tab: SeoTab = SEO_TABS.includes(requested as SeoTab) ? (requested as SeoTab) : "products";
  const { seo, savedAt } = settings();
  const current = seo.templates[tab];
  const content = tabContent(tab, current.hidden ?? [], current.toggle);

  return (
    <SettingsForm key={`${saved}-${tab}`} pageTitle="SEO defaults" savedAt={savedAt} backHref="/admin/settings" action={saveSeoAction.bind(null, tab)} nav={<SettingsSections active="/admin/settings/seo" />}>
      <SeoTemplate
        tabs={SEO_TABS.map((item) => ({ label: LABEL[item], href: `/admin/settings/seo?tab=${item}`, active: item === tab }))}
        defaultValue={current}
        tokens={content.tokens}
        descriptionOptions={content.description}
        imageOptions={content.image}
        sample={content.sample}
        descriptionHint={content.hint}
        extra={content.extra}
        note={content.note}
      />

      <SettingsCard title="Home page" description={<span className="hidden xl:inline">What people see when they search for Jofak</span>}>
        <SettingsField label="Title" name="homeTitle" defaultValue={seo.home.title} counter={60} rows={1} trackEdits={false} />
        <SettingsField label="Description" name="homeDescription" defaultValue={seo.home.description} counter={160} rows={2} trackEdits={false} />
      </SettingsCard>

      <SettingsCard tone="muted" title={<span className="sr-only">Search</span>} className="md:hidden">
        <ReportList
          rows={[
            { id: "sitemap", title: "Sitemap", sub: `96 links · rebuilt ${seo.rebuiltAt.toLowerCase()}`, value: "Up to date" },
            { id: "console", title: "Google Search Console", sub: "Verified 2 Oct", value: "Connected", valueTone: "brand" },
            { id: "kept", title: "Kept out of search", sub: "Cart, checkout, accounts, admin", value: "Automatic", valueTone: "muted" },
          ]}
        />
      </SettingsCard>

      <div className="hidden gap-4 md:flex md:items-stretch">
        <SettingsCard
          title="Sitemap"
          description={
            <>
              <span className="xl:hidden">96 links · rebuilt {seo.rebuiltAt.toLowerCase()}. Updates by itself when you publish.</span>
              <span className="hidden xl:inline">Updates by itself when you publish</span>
            </>
          }
          action={
            <span className="flex items-center gap-1.5 text-xs leading-xs text-text">
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              Up to date
            </span>
          }
          className="flex-1"
        >
          <ReportList
            compact
            className="hidden xl:flex"
            rows={[
              { id: "links", title: "Links listed", value: "96 · 48 are products" },
              { id: "rebuilt", title: "Last rebuilt", value: seo.rebuiltAt },
            ]}
          />
          <div className="flex items-center gap-6">
            <button type="submit" formAction={rebuildSitemapAction} formNoValidate className="h-10 rounded-full border border-border px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle">
              Rebuild now
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hidden text-sm leading-4.5 font-semibold text-brand hover:underline xl:inline">
              Open jofak.com/sitemap.xml ↗
            </a>
          </div>
        </SettingsCard>
        <SettingsCard tone="muted" title="Kept out of search" className="flex-1 xl:max-w-90">
          <p className="text-sm leading-5 text-text-secondary">
            <span className="xl:hidden">Cart, checkout, accounts, admin and filtered lists.</span>
            <span className="hidden xl:inline">Cart, checkout, customer accounts, admin and filtered product lists are never shown in Google.</span>
          </p>
          <ReportList
            className="hidden border-t border-border-subtle pt-3 xl:flex"
            rows={[
              { id: "console", title: "Google Search Console", sub: "Ownership verified 2 Oct", value: "Connected", valueTone: "brand" },
              { id: "renamed", title: "Renamed links", sub: "14 old links forward to new ones", value: "Automatic", valueTone: "muted" },
            ]}
          />
          <p className="flex justify-between text-sm leading-4.5 font-semibold text-text xl:hidden">
            Search Console <span className="text-brand">Connected</span>
          </p>
        </SettingsCard>
      </div>
    </SettingsForm>
  );
}
