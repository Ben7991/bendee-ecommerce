import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { SegmentedControl, SettingsCard, SettingsField, SettingsToggle } from "@repo/ui/molecules";

import { savePaymentsAction } from "../../../../_actions/admin-settings";
import { settings } from "../../../../_content/admin-settings";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "Payments & checkout" };

type SearchParams = Promise<{ saved?: string }>;

/** /admin/settings/payments (Paper "Jofak - Admin" → Settings → Payments & checkout). */
export default async function AdminPaymentsSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  const { payments, savedAt } = settings();
  const methods = [
    { key: "momo", title: "MTN MoMo", description: "Customer approves the prompt on their phone", compact: "Approve on phone", stat: "91% success", compactStat: "91%", leading: "MTN", tone: "sun" as const },
    { key: "telecel", title: "Telecel Cash", description: "Customer approves the prompt on their phone", compact: "Approve on phone", stat: "84% success", compactStat: "84%", leading: "T", tone: "citrus" as const },
    { key: "at", title: "AT Money", description: "Below the 70% alert level since 9 Nov · check Reports", compact: "Below 70% alert level", stat: "68% success", compactStat: "68%", leading: "AT", tone: "lavender" as const, error: true },
    { key: "card", title: "Visa & Mastercard", description: "3-D Secure handled by Paystack · used by diaspora buyers", compact: "3-D Secure by Paystack", stat: "89% success", compactStat: "89%", leading: <Icon name="card" size={18} strokeWidth={1.4} />, tone: "sage" as const },
    { key: "cod", title: "Pay on delivery", description: "Cash or MoMo to the delivery partner · eligible zones only", compact: "Eligible zones only", stat: "18% of orders", compactStat: "18%", leading: <Icon name="cash" size={18} strokeWidth={1.4} />, tone: "amber" as const, muted: true },
  ] as const;

  return (
    <SettingsForm key={saved} pageTitle="Payments & checkout" savedAt={savedAt} backHref="/admin/settings" action={savePaymentsAction} nav={<SettingsSections active="/admin/settings/payments" />}>
      <SettingsCard
        title={
          <span className="flex items-center gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-tint-lavender text-md font-bold text-lavender-text">P</span>
            <span className="flex flex-col gap-0.5">
              <span className="flex flex-wrap items-center gap-2">
                Paystack
                <span className="flex items-center gap-1.25 rounded-full bg-sage-100 px-2 py-0.5 text-xs leading-xs font-semibold text-primary dark:text-brand">
                  <span aria-hidden className="size-1.5 rounded-full bg-success" />
                  Connected<span className="md:hidden"> · {payments.mode === "live" ? "Live" : "Test"}</span>
                </span>
              </span>
              <span className="hidden text-sm leading-4.5 font-regular tracking-normal text-text-muted md:block">Handles MoMo and card payments · card details never touch Jofak</span>
            </span>
          </span>
        }
        action={
          <SegmentedControl
            aria-label="Paystack mode"
            name="mode"
            tone="primary"
            defaultValue={payments.mode}
            options={[
              { value: "test", label: "Test mode" },
              { value: "live", label: "Live" },
            ]}
            className="hidden md:flex"
          />
        }
      >
        <div className="hidden gap-4 md:flex">
          <SettingsField label="Public key" defaultValue="pk_live_••••••••••8f2c" mono readOnly />
          <SettingsField label="Secret key" defaultValue="Encrypted · set 2 Sep" mono readOnly locked aside={<Link href="/admin/settings/payments" className="text-sm text-brand">Replace</Link>} />
        </div>
        <p className="flex items-center gap-3 rounded-sm bg-surface-subtle px-3.5 py-3">
          <Icon name="checkCircle" size={16} className="shrink-0 text-brand" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm leading-4.5 font-semibold text-text md:inline">
              Webhooks healthy<span className="font-regular text-text-secondary md:hidden"> · last event 2 min ago</span>
            </span>
            <span className="hidden truncate font-mono text-xs leading-xs text-text-muted md:block">api.jofak.com/webhooks/paystack · last event 2 min ago · signature verified</span>
          </span>
          <span className="hidden shrink-0 text-sm leading-4.5 font-semibold text-brand md:inline">Copy URL</span>
        </p>
      </SettingsCard>

      <SettingsCard title="Payment methods" description={<><span className="md:hidden">Success rate · last 30 days</span><span className="hidden md:inline">Shown at checkout in this order · success rate is the last 30 days</span></>}>
        <div className="flex flex-col">
          {methods.map((method) => (
            <SettingsToggle
              key={method.key}
              divided
              title={method.title}
              description={method.description}
              compactDescription={method.compact}
              descriptionTone={"error" in method ? "error" : undefined}
              leading={method.leading}
              leadingTone={method.tone}
              stat={method.stat}
              compactStat={method.compactStat}
              statTone={"error" in method ? "error" : "muted" in method ? "muted" : undefined}
              name={method.key}
              defaultChecked={payments.methods[method.key]}
            />
          ))}
          <SettingsToggle divided title="Bank transfer" description="Coming in a later release" compactDescription="Later release" leading={<Icon name="bank" size={18} />} badge="Coming soon" disabled />
        </div>
      </SettingsCard>

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-stretch">
        <SettingsCard title="Pay on delivery rules" description="Cuts down fake orders without blocking real buyers" className="xl:flex-1">
          <SettingsField label="Largest order allowed" name="codLimit" type="number" prefix="GHS" defaultValue={String(payments.codLimit)} hint="Bigger orders must be paid by MoMo or card" />
          <SettingsToggle title="Confirm phone with SMS code" description="Customer enters a 6-digit code before the order is confirmed" name="codOtp" defaultChecked={payments.codOtp} />
          <div className="flex flex-col gap-2">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">Available in</p>
            <div className="flex flex-wrap gap-2">
              {settings()
                .delivery.zones.filter((zone) => zone.cod)
                .map((zone) => (
                  <span key={zone.id} className="rounded-full bg-sage-100 px-2.5 py-1.25 text-xs leading-xs font-semibold text-primary dark:text-brand">
                    {zone.name}
                  </span>
                ))}
              <Link href="/admin/settings/delivery" className="rounded-full border border-dashed border-border px-2.5 py-1.25 text-xs leading-xs font-semibold text-text-muted hover:text-text">
                Set per zone in Delivery ›
              </Link>
            </div>
          </div>
        </SettingsCard>
        <SettingsCard title="Checkout" description="How customers get from cart to paid" className="xl:flex-1">
          <SettingsToggle title="Guest checkout" description="Buy with just a phone number, no account" name="guest" defaultChecked={payments.guest} />
          <SettingsToggle title="Offer an account after payment" description="One tap on the thank-you page, no password" name="offerAccount" defaultChecked={payments.offerAccount} />
          <div className="flex items-center gap-3">
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-14 leading-5 font-semibold text-text">Unpaid orders expire after</span>
              <span className="text-xs leading-xs text-text-muted">Held stock goes back on sale; customer can retry until then</span>
            </span>
            <SettingsField
              label={<span className="sr-only">Unpaid orders expire after</span>}
              name="expireMins"
              defaultValue={payments.expireMins}
              trackEdits={false}
              options={[
                { value: "30", label: "30 min" },
                { value: "60", label: "60 min" },
                { value: "120", label: "2 hours" },
              ]}
              className="w-25 flex-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-14 leading-5 font-semibold text-text">Currency</span>
              <span className="text-xs leading-xs text-text-muted">Prices include VAT &amp; levies · set in Taxes</span>
            </span>
            <span className="shrink-0 text-sm leading-4.5 font-semibold text-text">
              <span className="md:hidden">GHS</span>
              <span className="hidden md:inline">GHS · GH₵ 1,234.50</span>
            </span>
          </div>
        </SettingsCard>
      </div>
    </SettingsForm>
  );
}
