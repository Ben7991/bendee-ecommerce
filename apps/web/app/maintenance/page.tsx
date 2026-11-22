import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { StatusPill } from "@repo/ui/atoms";
import { NotifyForm, StatusCard } from "@repo/ui/molecules";
import { StatusHero } from "@repo/ui/organisms";
import { MinimalShell } from "@repo/ui/templates";

import { maintenanceWindow } from "../_content/maintenance";
import { copyright, helpHref, tagline } from "../_content/site";

export const metadata: Metadata = {
  title: "Back soon",
  robots: { index: false, follow: false },
};

const TIME_ZONE = "Africa/Accra";
const time = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIME_ZONE });
const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: TIME_ZONE });
const clock = (date: Date) => time.format(date).toUpperCase().replace(/\s/g, " ");

function remaining(ms: number) {
  const minutes = Math.max(0, Math.round(ms / 60_000));
  const label = `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  return minutes === 0 ? { full: "any minute now", short: "soon" } : { full: `about ${label} left`, short: `~${label}` };
}

/**
 * Maintenance (Paper: Errors → Maintenance). Shown for every page while MAINTENANCE_MODE is
 * on (proxy.ts rewrites to it with a 503), and reachable at /maintenance to preview it.
 */
export default async function MaintenancePage() {
  await connection(); // Times are relative to now, so render per request.
  const now = Date.now();
  const started = new Date(maintenanceWindow.startedAt);
  const updated = new Date(maintenanceWindow.updatedAt);
  const expected = new Date(maintenanceWindow.expectedAt);
  const total = expected.getTime() - started.getTime();
  const progress = total > 0 ? ((now - started.getTime()) / total) * 100 : 100;

  return (
    <MinimalShell linkAs={Link} helpHref={helpHref} copyright={copyright} tagline={tagline}>
      <StatusHero
        measure="wide"
        emblem={{ icon: "wrench", tone: "accent" }}
        label={<StatusPill label="Scheduled maintenance · in progress" compactLabel="Maintenance in progress" />}
        title={
          <>
            Taking a short <em>breather</em>
          </>
        }
        description={{
          short: "We're upgrading the store. Shopping, checkout and accounts are paused until we're done.",
          full: "We're upgrading the store to make shopping faster and smoother. The shop, checkout and accounts are paused until we're done.",
        }}
        notes={[
          {
            icon: "truck",
            title: "Orders still arrive on time",
            text: "Anything you've already ordered is packed and delivered as normal.",
            compactTitle: "Already ordered?",
            compactText: "It's delivered as normal.",
          },
          {
            icon: "chat",
            title: "We're still on WhatsApp",
            text: "Questions about an order? Our team is replying as usual.",
            compactTitle: "Questions?",
            compactText: "We're still replying on WhatsApp.",
          },
        ]}
      >
        <StatusCard
          value={`${clock(expected)} GMT · ${day.format(expected)}`}
          remaining={remaining(expected.getTime() - now)}
          progress={progress}
          started={`Started ${clock(started)}`}
          updated={{ full: `Last updated ${clock(updated)}`, short: `updated ${clock(updated)}` }}
          className="self-stretch md:w-130 md:self-auto"
        />
        {/* Not wired yet: needs an SMS opt-in endpoint. Without an action it doesn't submit. */}
        <NotifyForm className="self-stretch md:self-auto" />
      </StatusHero>
    </MinimalShell>
  );
}
