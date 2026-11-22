import type { Metadata } from "next";
import Link from "next/link";

import { Button, Text } from "@repo/ui/atoms";
import { ContentSection, HelpCallout, NumberedPoints, StatCard } from "@repo/ui/molecules";

import { ContentPage } from "../../_components/content-page";
import { aboutStats, promises } from "../../_content/pages";

export const metadata: Metadata = {
  title: "About Jofak",
  description: "A small Accra team making it easier to look after yourself, one honest supplement at a time.",
};

/** /pages/about (Paper: Content page — About Jofak). */
export default function AboutPage() {
  return (
    <ContentPage
      slug="about"
      title="About Jofak"
      description="A small Accra team making it easier to look after yourself, one honest supplement at a time."
    >
      <Text size="lead" tone="default">
        We started Jofak in 2021 because buying supplements in Ghana meant guessing. Was it genuine? Had it sat in the sun for months?
        Would it even arrive? We wanted a shop that answers those questions{" "}
        <em>before</em> you pay.
      </Text>
      <div className="flex flex-col gap-2.5 md:flex-row md:gap-4">
        {aboutStats.map((stat) => (
          <StatCard key={stat.value} tone={stat.tone} value={stat.value} label={stat.label} className="md:flex-1" />
        ))}
      </div>
      <ContentSection title="What we promise" className="gap-5">
        <NumberedPoints items={promises} />
      </ContentSection>
      <HelpCallout
        tone="feature"
        title="Not sure where to start?"
        description="Take the 60-second quiz and we'll suggest a routine."
        action={
          <Button asChild size="sm" variant="accent">
            <Link href="/quiz">Take the quiz</Link>
          </Button>
        }
      />
    </ContentPage>
  );
}
