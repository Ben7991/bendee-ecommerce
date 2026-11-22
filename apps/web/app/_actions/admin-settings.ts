"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addZone,
  rebuildSitemap,
  recordTest,
  saveNotifications,
  savePayments,
  saveProfile,
  saveSeo,
  saveTaxes,
  saveTemplate,
  saveTracking,
  saveZone,
  SEO_TABS,
  type SeoTab,
} from "../_content/admin-settings";
import { changeMyPassword, changeRole, invite, ME, moveAuthenticator, myProfileIntent, recordAudit, resendInvite, saveMyProfile, staffIntent } from "../_content/admin-team";

/*
 * Admin settings actions. They change the in-memory sample settings (see _content/admin-settings)
 * and reload the page (`saved` remounts the form so it counts changes from the saved values).
 * TODO: call the settings service once it exists, and write each change to the audit log.
 */

/** Writes a settings save to the audit log. */
const audit = (page: string, href: string, detail = "Saved from Settings") =>
  recordAudit({ action: `updated *${page}*`, area: "Settings", areaTone: "neutral", detail, eyebrow: `Settings · ${page}`, title: `Updated ${page}`, open: { label: `Open ${page.toLowerCase()}`, href } });

const done = (path: string) => {
  revalidatePath("/admin/settings", "layout");
  redirect(`${path}${path.includes("?") ? "&" : "?"}saved=${Date.now()}`);
};

export async function saveProfileAction(formData: FormData): Promise<void> {
  saveProfile(formData);
  audit("Store profile", "/admin/settings/store");
  done("/admin/settings/store");
}

export async function savePaymentsAction(formData: FormData): Promise<void> {
  savePayments(formData);
  audit("Payments & checkout", "/admin/settings/payments");
  done("/admin/settings/payments");
}

export async function saveZoneAction(id: string, formData: FormData): Promise<void> {
  saveZone(id, formData);
  audit("Delivery zone", `/admin/settings/delivery?zone=${id}`);
  done(`/admin/settings/delivery?zone=${id}`);
}

export async function addZoneAction(): Promise<void> {
  const id = addZone();
  done(`/admin/settings/delivery?zone=${id}`);
}

export async function saveTaxesAction(formData: FormData): Promise<void> {
  saveTaxes(formData);
  audit("Taxes", "/admin/settings/taxes");
  done("/admin/settings/taxes");
}

export async function saveNotificationsAction(formData: FormData): Promise<void> {
  saveNotifications(formData);
  audit("Notifications", "/admin/settings/notifications");
  done("/admin/settings/notifications");
}

/** Save template, or (intent=test) record a test send without saving. */
export async function saveTemplateAction(id: string, channel: "sms" | "email", formData: FormData): Promise<void> {
  const path = `/admin/settings/notifications/${id}?channel=${channel}`;
  if (formData.get("intent") === "test") {
    recordTest(id, channel, formData);
    revalidatePath("/admin/settings", "layout");
    redirect(`${path}&test=${Date.now()}`);
  }
  saveTemplate(id, channel, formData);
  audit("Message template", `/admin/settings/notifications/${id}?channel=${channel}`, `${channel === "sms" ? "SMS" : "Email"} · ${id.replace(/-/g, " ")}`);
  done(path);
}

export async function saveSeoAction(tab: string, formData: FormData): Promise<void> {
  const safe: SeoTab = SEO_TABS.includes(tab as SeoTab) ? (tab as SeoTab) : "products";
  saveSeo(safe, formData);
  audit("SEO defaults", `/admin/settings/seo?tab=${safe}`, `${safe} template`);
  done(`/admin/settings/seo?tab=${safe}`);
}

export async function rebuildSitemapAction(): Promise<void> {
  rebuildSitemap();
  done("/admin/settings/seo");
}

export async function saveTrackingAction(formData: FormData): Promise<void> {
  saveTracking(formData);
  audit("Tracking pixels", "/admin/settings/tracking");
  done("/admin/settings/tracking");
}

/** Staff list: resend an invite, or invite someone new. */
export async function staffListAction(formData: FormData): Promise<void> {
  const resend = formData.get("resend");
  if (typeof resend === "string" && resend) {
    resendInvite(resend);
    revalidatePath("/admin/settings", "layout");
    redirect(`/admin/settings/staff?resent=${encodeURIComponent(resend)}`);
  }
  const ok = invite(String(formData.get("email") ?? ""), String(formData.get("role") ?? ""));
  revalidatePath("/admin/settings", "layout");
  redirect(ok ? "/admin/settings/staff?invited=1" : "/admin/settings/staff?invite=1&error=1");
}

/** Staff member: a button's `intent` (sign out, reset, deactivate), or a role change. */
export async function staffMemberAction(id: string, back: string, formData: FormData): Promise<void> {
  const intent = formData.get("intent");
  const result = typeof intent === "string" && intent ? staffIntent(id, intent) : (changeRole(id, String(formData.get("role") ?? "")), "role");
  revalidatePath("/admin/settings", "layout");
  redirect(`${back}${back.includes("?") ? "&" : "?"}done=${result ?? "none"}&t=${Date.now()}`);
}

export async function signOutMyDeviceAction(formData: FormData): Promise<void> {
  return staffMemberAction(ME, "/admin/settings/staff?tab=sessions", formData);
}

/** My profile: a button's `intent`, or Save changes. */
export async function saveMyProfileAction(formData: FormData): Promise<void> {
  const intent = formData.get("intent");
  const result = typeof intent === "string" && intent ? myProfileIntent(intent) : await saveMyProfile(formData);
  revalidatePath("/admin", "layout");
  // New codes open straight away in the "save these now" dialog.
  if (result === "new-codes") redirect(`/admin/profile?dialog=codes&t=${Date.now()}`);
  redirect(`/admin/profile?done=${result}&t=${Date.now()}`);
}

/** My profile → Change password dialog. */
export async function changePasswordAction(formData: FormData): Promise<void> {
  const error = changeMyPassword(formData);
  revalidatePath("/admin", "layout");
  redirect(error ? `/admin/profile?dialog=password&error=${encodeURIComponent(error)}&t=${Date.now()}` : `/admin/profile?done=password-changed&t=${Date.now()}`);
}

/** My profile → Move to a new phone, one step at a time. */
export async function moveAuthenticatorAction(formData: FormData): Promise<void> {
  const step = Number(formData.get("step")) || 1;
  const result = moveAuthenticator(step, formData);
  revalidatePath("/admin", "layout");
  if (result.done) redirect(`/admin/profile?done=app-moved&t=${Date.now()}`);
  redirect(`/admin/profile?dialog=authenticator&step=${result.next}${result.error ? `&error=${encodeURIComponent(result.error)}` : ""}&t=${Date.now()}`);
}
