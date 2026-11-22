import type { Metadata } from "next";
import Link from "next/link";

import { ReportList, SettingsCard } from "@repo/ui/molecules";
import { MessageMatrix, NotificationChannels } from "@repo/ui/organisms";

import { saveNotificationsAction } from "../../../../_actions/admin-settings";
import { CUSTOMER_MESSAGES, settings } from "../../../../_content/admin-settings";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export const metadata: Metadata = { title: "Notifications" };

type SearchParams = Promise<{ saved?: string }>;

const SUMMARY: Record<string, string> = {
  "payment-failed": "Link to try again · 97.2% delivered",
  "ready-for-pickup": "Jofak Osu · 99.1% delivered",
  delivered: "With review link · 98.0% delivered",
};

const ALERTS = [
  { id: "payment", title: "Payment success below 70%", when: "Right away · SMS + email", who: "Abena, Kojo" },
  { id: "stock", title: "Low stock", when: "Daily summary at 08:00 · email", who: "Akosua, Yaw" },
  { id: "return", title: "New return request", when: "Right away · email", who: "Ama" },
  { id: "credit", title: "SMS credit below GHS 50", when: "Right away · email", who: "Abena" },
];

/** /admin/settings/notifications (Paper "Jofak - Admin" → Settings → Notifications). */
export default async function AdminNotificationsSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const { saved } = await searchParams;
  const { notifications, savedAt } = settings();

  return (
    <SettingsForm key={saved} pageTitle="Notifications" savedAt={savedAt} backHref="/admin/settings" action={saveNotificationsAction} nav={<SettingsSections active="/admin/settings/notifications" />}>
      <NotificationChannels
        channels={[
          {
            id: "sms",
            name: "SMS",
            compactName: "SMS · Arkesel",
            icon: "chat",
            detail: (
              <>
                Arkesel · sender <span className="font-mono font-semibold text-text">JOFAK</span>
              </>
            ),
            compactDetail: "JOFAK · GHS 412.60 credit",
            tabletDetail: "Sender JOFAK · GHS 412.60 credit (~13,700 SMS)",
            row: { label: "Credit left", value: "GHS 412.60 · ~13,700 SMS" },
          },
          {
            id: "email",
            name: "Email",
            compactName: "Email · Resend",
            icon: "mail",
            detail: "Resend · from hello@jofak.com",
            compactDetail: "hello@jofak.com · verified",
            tabletDetail: "From hello@jofak.com · domain verified",
            row: { label: "Domain", value: "jofak.com verified", tone: "brand" },
          },
          {
            id: "whatsapp",
            name: "WhatsApp",
            compactName: "WhatsApp",
            icon: "chat",
            detail: "Order updates on WhatsApp, with SMS as backup if a message isn’t delivered in 5 min",
            compactDetail: "SMS backup after 5 min",
            tabletDetail: "SMS as backup if not delivered in 5 min",
            soon: true,
          },
        ]}
      />

      <MessageMatrix
        linkAs={Link}
        description={
          <>
            Sent automatically · cart reminders live in{" "}
            <Link href="/admin/marketing" className="hover:text-text">
              Marketing ›
            </Link>
          </>
        }
        messages={CUSTOMER_MESSAGES.map((message) => ({
          ...message,
          sms: notifications.messages[message.id]?.sms ?? message.sms,
          email: notifications.messages[message.id]?.email ?? message.email,
          summary: SUMMARY[message.id],
          href: `/admin/settings/notifications/${message.id}`,
          selected: message.id === "handed-to-courier",
        }))}
      />

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <SettingsCard title="Alerts to staff" description={<span className="hidden md:inline">Who hears about problems, and how</span>} className="xl:flex-1">
          <ReportList
            className="md:hidden"
            rows={ALERTS.map((alert) => ({ id: alert.id, title: alert.title, sub: `${alert.who} · ${alert.when.charAt(0).toLowerCase()}${alert.when.slice(1)}` }))}
          />
          <ReportList className="hidden md:flex" rows={ALERTS.map((alert) => ({ id: alert.id, title: alert.title, sub: alert.when, value: alert.who, valueTone: "muted" }))} />
        </SettingsCard>

        <SettingsCard tone="muted" title="This month" action={<Link href="/admin/settings/notifications">Message log ›</Link>} className="hidden xl:flex xl:w-80">
          <ReportList
            compact
            rows={[
              { id: "sms", title: "SMS sent", value: "6,480 · 98.1% delivered" },
              { id: "email", title: "Emails sent", value: "3,210 · 99.4% delivered" },
              { id: "failed", title: "Failed, then retried", value: "41" },
              { id: "spend", title: "SMS spend", value: "GHS 194.40", total: true },
            ]}
          />
        </SettingsCard>

        <section aria-label="This month" className="flex items-center gap-4 rounded-18 bg-surface-subtle px-4 py-3.5 md:rounded-lg md:px-5 md:py-4 xl:hidden">
          <p className="flex min-w-0 flex-1 flex-col md:flex-none md:basis-63">
            <span className="text-xs leading-xs text-text-muted">
              <span className="md:hidden">This month</span>
              <span className="hidden md:inline">SMS this month</span>
            </span>
            <span className="text-base leading-5.5 font-semibold text-text">6,480 SMS · GHS 194.40</span>
          </p>
          <p className="hidden flex-1 flex-col md:flex">
            <span className="text-xs leading-xs text-text-muted">Emails</span>
            <span className="text-base leading-5.5 font-semibold text-text">3,210</span>
          </p>
          <Link href="/admin/settings/notifications" className="shrink-0 text-sm leading-4.5 font-semibold text-brand">
            Message log ›
          </Link>
        </section>
      </div>
    </SettingsForm>
  );
}
