import type { Metadata } from "next";

import { Heading, StatusBadge, TextLink } from "@repo/ui/atoms";
import { DetailRows, PillRadioGroup, PreferenceToggle, SectionCard } from "@repo/ui/molecules";
import { ThemePicker } from "@repo/ui/organisms";

import { customer } from "../../_content/account";
import { AccountAppBar, AccountPage } from "../_components/account-page";

export const metadata: Metadata = { title: "Profile & preferences", robots: { index: false } };

/**
 * /account/profile (Paper: Account — Profile & preferences; mobile: Preferences). The theme
 * picker works (it's the site-wide setting); the other controls don't save yet. Marketing
 * consent stays off until the customer says yes (docs/03 §3.9).
 */
export default function ProfilePage() {
  return (
    <AccountPage section="profile" appBar={<AccountAppBar title="Preferences" backHref="/account" backLabel="Back to your account" />}>
      <Heading as="h1" size="account" className="hidden md:block">
        Profile &amp; <em>preferences</em>
      </Heading>

      <SectionCard flush title="Your details" action={<TextLink href="/account/profile?edit=details">Edit</TextLink>}>
        <DetailRows
          size="lg"
          rows={[
            { label: "Full name", value: customer.name },
            {
              label: "Phone",
              value: customer.phone,
              badge: <StatusBadge size="sm" tone="success" marker="check" label="Verified" className="md:bg-sage-50" />,
              action: (
                <TextLink href="/account/profile?change=phone" tone="muted" className="hidden md:inline">
                  Change number
                </TextLink>
              ),
            },
            {
              label: "Email",
              value: "ama.mensah@example.com",
              badge: <StatusBadge size="sm" tone="warning" marker="none" label="Not verified" />,
              action: (
                <TextLink href="/account/profile?verify=email">
                  <span className="md:hidden">Verify</span>
                  <span className="hidden md:inline">Send link</span>
                </TextLink>
              ),
            },
            {
              label: (
                <>
                  Gender<span className="hidden md:inline"> (optional)</span>
                </>
              ),
              value: "Prefer not to say",
              muted: true,
            },
          ]}
        />
      </SectionCard>

      <SectionCard flush title="Order updates" description="Always on — we'll send them where you prefer." className="[&>div:first-child]:border-0">
        <div className="border-b border-border-subtle px-4.5 pb-5 md:px-6">
          <PillRadioGroup
            aria-label="Send order updates by"
            name="orderUpdates"
            defaultValue="sms"
            options={[
              { value: "sms", label: "SMS" },
              { value: "whatsapp", label: "WhatsApp", tag: "Soon", disabled: true },
              { value: "email", label: "Email" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-0.5 px-4.5 pt-5 pb-2 font-sans md:px-6">
          <h3 className="text-lg leading-base font-semibold text-text">Offers &amp; wellness tips</h3>
          <p className="text-sm leading-sm text-text-muted">Only if you say yes. Change your mind anytime.</p>
        </div>
        <PreferenceToggle title="Email newsletter" description="Opted in 13 Nov 2026 at checkout" defaultChecked name="newsletter" />
        <PreferenceToggle title="SMS offers" description="Reply STOP to any message to opt out" name="smsOffers" />
        <PreferenceToggle title="WhatsApp offers" description="Coming soon" disabled name="whatsappOffers" />
      </SectionCard>

      <ThemePicker note="System matches your phone or computer, and switches at night if your device does. You can also change this from the footer on any page." />
    </AccountPage>
  );
}
