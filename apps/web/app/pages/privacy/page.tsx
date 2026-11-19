import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@repo/ui/atoms";
import { ContentSection, DefinitionTable, HelpCallout, KeyPoints } from "@repo/ui/molecules";

import { ContentPage } from "../../_components/content-page";
import { collectedData, contact, lastUpdated, privacySummary } from "../../_content/pages";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Jofak collects, why, who sees it, and how to get it changed or deleted under Ghana's Data Protection Act.",
};

/** /pages/privacy (Paper: Content page — Privacy policy). */
export default function PrivacyPage() {
  return (
    <ContentPage
      slug="privacy"
      title="Privacy policy"
      description={`What we collect, why, who sees it, and how to get it changed or deleted. Last updated ${lastUpdated}.`}
      compactDescription={`What we collect, who sees it, and how to change or delete it. Updated ${lastUpdated}.`}
      articleClassName="md:gap-9"
    >
      <KeyPoints title="The short version" items={privacySummary} />
      <ContentSection size="md" title="1. Who we are">
        <p>
          Jofak Wellness Ltd, Osu, Accra, runs jofak.com and is responsible for your personal data. We follow the Data Protection Act,
          2012 (Act 843) and are registered with the Data Protection Commission of Ghana.
        </p>
      </ContentSection>
      <ContentSection size="md" title="2. What we collect">
        <DefinitionTable items={collectedData} />
      </ContentSection>
      <ContentSection size="md" title="3. Who we share it with">
        <p>
          Only the partners that make your order work: Paystack for payments, our delivery partners, and our SMS, WhatsApp and email
          providers for order updates. Each one may only use your data for that job. With your consent, Meta, TikTok and Google receive
          ad measurement data. Change that any time in <a href="#cookie-settings">Cookie settings</a>.
        </p>
      </ContentSection>
      <ContentSection size="md" title="4. Your rights">
        <p>
          Under Act 843 you can ask to see, correct or delete your data, and you can withdraw consent for marketing at any time. Most of
          this you can do yourself from <Link href="/account/privacy">Account › Privacy &amp; data</Link>. If you&apos;re unhappy with how
          we&apos;ve handled a request, you can complain to the Data Protection Commission.
        </p>
      </ContentSection>
      <ContentSection size="md" title="5. How long we keep it">
        <p>
          Order and payment records are kept for 6 years because tax law requires it. If you delete your account, everything else is
          removed within 30 days and old orders are kept without your name or contact details.
        </p>
      </ContentSection>
      <HelpCallout
        title="Questions about your data?"
        description={`Write to our data protection lead at ${contact.privacyEmail.label}. We reply within 5 working days.`}
        action={
          <Button asChild size="sm">
            <a href={contact.privacyEmail.href}>Email privacy team</a>
          </Button>
        }
      />
    </ContentPage>
  );
}
