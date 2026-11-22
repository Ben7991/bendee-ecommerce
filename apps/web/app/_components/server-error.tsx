"use client";

import Link from "next/link";

import { Button, Eyebrow, Icon } from "@repo/ui/atoms";
import { StatusHero } from "@repo/ui/organisms";
import { MinimalShell } from "@repo/ui/templates";

import { copyright, helpHref, tagline } from "../_content/site";

/** "7f3a21c9…" → "7F3A-21C9": short enough to read out on WhatsApp. */
function referenceFrom(digest?: string) {
  const code = digest?.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase();
  return code && code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : undefined;
}

/**
 * The 500 page (Paper: Errors → 500), shared by app/error.tsx and app/global-error.tsx.
 * The reference is the error digest Next.js logs on the server, so support can find it.
 */
export function ServerError({ digest, retry }: { digest?: string; retry: () => void }) {
  const ref = referenceFrom(digest);

  return (
    <MinimalShell linkAs={Link} helpHref={helpHref} copyright={copyright} tagline={tagline}>
      <StatusHero
        emblem={{ icon: "refreshLeaf", tone: "sage" }}
        label={
          <Eyebrow size="sm">
            <span className="md:hidden">Error 500</span>
            <span className="hidden md:inline">Error 500 · Something went wrong</span>
          </Eyebrow>
        }
        title={
          <>
            We&apos;re having a <em>moment</em>
          </>
        }
        description={{
          short: "Something broke on our side, not yours. Your cart and account are safe. Please try again in a minute.",
          full: "Something broke on our side, not yours. Your cart and account are safe. Please try again in a minute.",
        }}
        actions={
          <>
            <Button size="md" onClick={retry} className="w-full py-4 md:w-auto md:px-7">
              <Icon name="refresh" size={16} />
              Try again
            </Button>
            <Button asChild size="md" variant="outline" className="w-full py-4 md:w-auto md:px-7">
              <Link href="/">Go to homepage</Link>
            </Button>
          </>
        }
        notes={[
          {
            icon: "truck",
            title: "Already placed an order?",
            text: "It's safe and on its way. We'll keep texting you updates.",
            compactTitle: "Already ordered?",
            compactText: "It's safe and on its way.",
          },
          {
            icon: "receipt",
            title: "Still not working?",
            text: ref ? (
              <>
                WhatsApp us and quote ref <strong>{ref}</strong>.
              </>
            ) : (
              "WhatsApp us and we'll sort it out."
            ),
            compactTitle: "Still stuck?",
            compactText: ref ? (
              <>
                WhatsApp us with ref <strong>{ref}</strong>.
              </>
            ) : (
              "WhatsApp us."
            ),
          },
        ]}
      />
    </MinimalShell>
  );
}
