import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@repo/ui/atoms";
import { ContentSection, HelpCallout, KeyPoints } from "@repo/ui/molecules";

import { ContentPage } from "../../_components/content-page";
import { contact, lastUpdated, termsClauses, termsSummary } from "../../_content/pages";

export const metadata: Metadata = {
  title: "Terms of sale",
  description: "The agreement between you and Jofak when you place an order: prices, payment, delivery, returns and refunds.",
};

/** /pages/terms (Paper: Content page — Terms of sale). */
export default function TermsPage() {
  return (
    <ContentPage
      slug="terms"
      title="Terms of sale"
      description={`The agreement between you and Jofak when you place an order. Plain English where we can manage it. Last updated ${lastUpdated}.`}
      compactDescription={`The agreement between you and Jofak when you order. Updated ${lastUpdated}.`}
      articleClassName="md:gap-9"
    >
      <KeyPoints title="Key points" items={termsSummary} />
      {termsClauses.map((clause) => (
        <ContentSection key={clause.title} size="md" title={clause.title}>
          <p>{clause.text}</p>
        </ContentSection>
      ))}
      <HelpCallout
        title="Questions about an order?"
        description={`Our support team can explain anything in these terms, ${contact.hours}.`}
        action={
          <Button asChild size="sm">
            <Link href="/pages/contact">Contact us</Link>
          </Button>
        }
      />
    </ContentPage>
  );
}
