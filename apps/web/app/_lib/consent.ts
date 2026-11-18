/*
 * Cookie consent, kept in a first-party cookie so the server can read it too (e.g. to leave
 * pixel domains out of the CSP, docs/07 PLT-SEC-04). Necessary cookies need no consent; analytics
 * and marketing scripts must check `hasConsent()` (or listen for CONSENT_EVENT) before loading.
 * Ghana Data Protection Act (Act 843): consent is opt-in, recorded with a version and time, and
 * changeable any time from "Cookie settings" in the footer.
 */

export const CONSENT_COOKIE = "jofak_consent";
/** Bump when the categories or the policy change, to ask again. */
export const CONSENT_VERSION = 1;
/** Fired on window with the new Consent as `detail`. */
export const CONSENT_EVENT = "jofak:consent";
/** Links with this href open the cookie settings (footer). */
export const COOKIE_SETTINGS_HASH = "#cookie-settings";

const MAX_AGE = 60 * 60 * 24 * 180; // 6 months, then ask again.

export interface Consent {
  v: number;
  analytics: boolean;
  marketing: boolean;
  /** ISO time it was given. */
  at: string;
}

export function parseConsent(cookieHeader: string | undefined): Consent | null {
  const raw = cookieHeader
    ?.split(/;\s*/)
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const consent = JSON.parse(decodeURIComponent(raw)) as Consent;
    return consent.v === CONSENT_VERSION ? consent : null;
  } catch {
    return null;
  }
}

/** Saves the choice in the browser and tells listeners. Client only. */
export function saveConsent(choices: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = { v: CONSENT_VERSION, analytics: choices.analytics, marketing: choices.marketing, at: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Whether a category may run right now. Client only. */
export function hasConsent(category: "analytics" | "marketing"): boolean {
  return parseConsent(document.cookie)?.[category] ?? false;
}
