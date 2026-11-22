import { Logo } from "@repo/ui/atoms";
import { ReportList, SettingsCard, SettingsField } from "@repo/ui/molecules";

import { saveProfileAction } from "../../../_actions/admin-settings";
import { settings } from "../../../_content/admin-settings";
import { SettingsForm } from "../_components/settings";
import { SettingsSections } from "./_nav";

/** Store profile (Paper "Jofak - Admin" → Settings → Store profile). */
export function StoreProfile({ formKey }: { formKey?: string }) {
  const { profile, savedAt } = settings();
  return (
    <SettingsForm key={formKey} pageTitle="Store profile" savedAt={savedAt} backHref="/admin/settings" action={saveProfileAction} nav={<SettingsSections active="/admin/settings/store" />}>
      <SettingsCard title="Brand" description="Shown on the storefront, receipts, emails and SMS">
        <div className="flex flex-col gap-3.5 md:flex-row md:items-start md:gap-5">
          <div className="flex shrink-0 flex-col gap-2 md:w-45">
            <p className="text-sm leading-4.5 font-semibold text-text-secondary">Logo</p>
            <div className="flex h-24 items-center justify-center rounded-14 border border-dashed border-border bg-surface-subtle">
              <Logo />
            </div>
            <p className="flex gap-3 text-xs leading-xs">
              <span className="font-semibold text-brand">Replace</span>
              <span className="text-text-muted">SVG or PNG · 512 px</span>
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3.5">
            <div className="flex flex-col gap-3.5 md:flex-row md:gap-3">
              <SettingsField label="Store name" name="storeName" defaultValue={profile.storeName} />
              <SettingsField label="SMS sender name" defaultValue={profile.smsSender} mono readOnly aside={<span className="text-success">Approved</span>} />
            </div>
            <SettingsField label="Tagline" name="tagline" defaultValue={profile.tagline} />
          </div>
        </div>
      </SettingsCard>
      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <SettingsCard title="How customers reach you" description="Used in the footer, order emails and the WhatsApp button" className="xl:flex-1">
          <SettingsField label="Support email" name="email" type="email" defaultValue={profile.email} />
          <div className="flex flex-col gap-3.5 md:flex-row md:gap-3">
            <SettingsField label="Phone" name="phone" type="tel" prefix="+233" defaultValue={profile.phone} />
            <SettingsField label="WhatsApp" name="whatsapp" type="tel" prefix="+233" defaultValue={profile.whatsapp} />
          </div>
          <SettingsField
            label="Shop address"
            name="address"
            defaultValue={profile.address}
            extra={{ name: "gps", defaultValue: profile.gps, label: "GhanaPost GPS" }}
            hint="Also used as the Jofak Osu pickup point"
          />
        </SettingsCard>
        <SettingsCard title="Business details" description="Printed on receipts and invoices" className="xl:flex-1">
          <SettingsField label="Registered name" name="registeredName" defaultValue={profile.registeredName} />
          <SettingsField label="Taxpayer ID (TIN)" defaultValue={profile.tin} mono readOnly />
          <ReportList
            compact
            className="pt-1"
            rows={[
              { id: "currency", title: "Currency", value: "Ghana cedi · GH₵ 1,234.50" },
              { id: "zone", title: "Time zone", value: "Accra (GMT)" },
              { id: "numbers", title: "Order numbers", value: "JFK-251531 next", mono: true },
            ]}
          />
        </SettingsCard>
      </div>
    </SettingsForm>
  );
}
