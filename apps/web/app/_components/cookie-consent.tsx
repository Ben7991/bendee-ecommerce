"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { CookieBanner, CookieSettings } from "@repo/ui/organisms";

import { cookieCategories } from "../_content/cookies";
import { CONSENT_EVENT, COOKIE_SETTINGS_HASH, parseConsent, saveConsent } from "../_lib/consent";

const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
};
// The server can't know; render nothing there so the banner never flashes for returning visitors.
const getServerSnapshot = () => undefined;

/**
 * The cookie banner (first visit) and the Cookie settings dialog (Paper: Cookie consent).
 * Mounted once in the root layout. Links to #cookie-settings (footer) open the settings.
 */
export function CookieConsent() {
  const cookie = useSyncExternalStore(subscribe, () => document.cookie, getServerSnapshot);
  const consent = cookie === undefined ? undefined : parseConsent(cookie);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openFromLink = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest(`a[href="${COOKIE_SETTINGS_HASH}"]`);
      if (!link) return;
      event.preventDefault();
      setSettingsOpen(true);
    };
    // Capture, so it runs before next/link tries to navigate.
    document.addEventListener("click", openFromLink, true);
    if (window.location.hash === COOKIE_SETTINGS_HASH) setSettingsOpen(true);
    return () => document.removeEventListener("click", openFromLink, true);
  }, []);

  const choose = (choices: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choices);
    setSettingsOpen(false);
  };
  const privacy = <Link href="/pages/privacy">Privacy policy</Link>;

  return (
    <>
      {consent === null && !settingsOpen && (
        <CookieBanner
          text={
            <>
              Some keep the shop working, like your cart and sign-in. With your OK we&apos;d also use analytics and ad cookies to see
              what&apos;s working and show you relevant offers. You can change this any time from &quot;Cookie settings&quot; in the
              footer. {privacy}
            </>
          }
          compactText={
            <>
              Some keep the shop working, like your cart. With your OK we&apos;d also use analytics and ad cookies. Change this any
              time in &quot;Cookie settings&quot;. {privacy}
            </>
          }
          onAcceptAll={() => choose({ analytics: true, marketing: true })}
          onNecessaryOnly={() => choose({ analytics: false, marketing: false })}
          onCustomise={() => setSettingsOpen(true)}
        />
      )}
      <CookieSettings
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        categories={cookieCategories}
        // Nothing chosen yet: optional categories start off (opt-in).
        value={{ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false }}
        onSave={(choices) => choose({ analytics: Boolean(choices.analytics), marketing: Boolean(choices.marketing) })}
        onAcceptAll={() => choose({ analytics: true, marketing: true })}
        description="Choose which cookies Jofak can use. Necessary cookies are always on because the shop doesn't work without them."
        privacyLink={privacy}
      />
    </>
  );
}
