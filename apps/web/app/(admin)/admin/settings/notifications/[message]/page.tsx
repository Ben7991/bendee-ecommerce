import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SettingsNotice } from "@repo/ui/molecules";

import { saveTemplateAction } from "../../../../../_actions/admin-settings";
import { CUSTOMER_MESSAGES, defaultTemplate, settings, template, TEMPLATE_SAMPLE, TEMPLATE_TOKENS } from "../../../../../_content/admin-settings";
import { MessageTemplate, SettingsForm } from "../../../_components/settings";
import { SettingsSections } from "../../_nav";

type Params = Promise<{ message: string }>;
type SearchParams = Promise<{ channel?: string; saved?: string; test?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { message } = await params;
  return { title: `${CUSTOMER_MESSAGES.find((item) => item.id === message)?.title ?? "Template"} · Notifications` };
}

/** /admin/settings/notifications/[message] (Paper "Jofak - Admin" → Settings → Notifications — Edit template). */
export default async function AdminTemplatePage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { message: id } = await params;
  const { channel: requested, saved, test } = await searchParams;
  const message = CUSTOMER_MESSAGES.find((item) => item.id === id);
  if (!message) notFound();
  const store = settings();
  const channel = requested === "email" && message.email !== null ? "email" : "sms";
  const current = template(id, channel);
  const sent = test ? store.notifications.tests.find((item) => item.message === id && item.channel === channel) : undefined;
  const base = `/admin/settings/notifications/${id}`;

  return (
    <SettingsForm
      key={`${saved}-${channel}`}
      pageTitle={message.title}
      savedAt={store.savedAt}
      backHref="/admin/settings/notifications"
      backLabel="Notifications"
      action={saveTemplateAction.bind(null, id, channel)}
      nav={<SettingsSections active="/admin/settings/notifications" />}
      mobileBar={
        <button type="submit" className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-base leading-5 font-semibold text-on-primary">
          Save template
        </button>
      }
    >
      {sent && (
        <SettingsNotice icon="checkCircle">
          Test {channel === "sms" ? "SMS" : "email"} sent to {sent.to || "you"} at {sent.at}, filled from the sample order.
        </SettingsNotice>
      )}
      <MessageTemplate
        breadcrumb={
          <>
            <Link href="/admin/settings/notifications" className="hover:text-text">
              Notifications
            </Link>{" "}
            › Messages to customers
          </>
        }
        title={message.title}
        channel={channel}
        channels={[
          { label: "SMS", href: `${base}?channel=sms`, active: channel === "sms" },
          ...(message.email !== null ? [{ label: "Email", href: `${base}?channel=email`, active: channel === "email" }] : []),
          { label: "WhatsApp · soon", href: base, soon: true },
        ]}
        defaultValue={current}
        defaultBody={defaultTemplate(id, channel).body}
        tokens={TEMPLATE_TOKENS}
        sample={TEMPLATE_SAMPLE}
        sender={channel === "sms" ? store.profile.smsSender : "hello@jofak.com"}
        lastEdited={`Last edited by ${current.editedBy} · ${current.editedOn}`}
        testTo={channel === "sms" ? "024 412 7781" : "abena@jofak.com"}
        cancelHref="/admin/settings/notifications"
      />
    </SettingsForm>
  );
}
