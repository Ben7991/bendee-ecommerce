/*
 * Admin team: staff, roles and the audit log (Paper "Jofak - Admin" → Settings → Staff & roles,
 * Audit log). Kept in server memory (globalThis) so actions change what the pages show; it resets
 * when the server restarts. Settings saves write audit entries too (see recordAudit).
 * TODO: read and write the staff and audit services once they exist.
 */

export type Tone = "sage" | "lavender" | "amber" | "info" | "citrus" | "neutral";
export type AreaTone = "neutral" | "sage" | "sun" | "citrus";

export interface Session {
  id: string;
  device: string;
  kind: "tablet" | "phone" | "monitor";
  where: string;
  /** The device this page is open on (can't be signed out from here). */
  current?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  tone: Tone;
  role: RoleId;
  appCode: boolean;
  appCodeSince: string;
  passwordChanged: string;
  lastActive: string;
  joined: string;
  invitedBy: string;
  status: "active" | "invited" | "deactivated";
  invited?: string;
  sessions: Session[];
}

export interface AuditEntry {
  id: string;
  /** Day offset from today when seeded; new entries use 0. */
  day: number;
  time: string;
  seconds: string;
  by: string;
  /** "updated delivery zone *Accra Central*" — *bold*, `mono`. */
  action: string;
  area: string;
  areaTone: AreaTone;
  detail: string;
  eyebrow: string;
  title: string;
  open?: { label: string; href: string };
  device: string;
  ip: string;
  changes: { label: string; before: string; after: string }[];
  note?: string;
}

export type RoleId = "owner" | "admin" | "catalog" | "fulfilment" | "support" | "marketing";

export const ROLES: { id: RoleId; label: string; short?: string; summary: string; description: string }[] = [
  { id: "owner", label: "Owner", summary: "Everything, including staff and ownership", description: "Use “Transfer ownership” — needs your app code" },
  { id: "admin", label: "Admin", summary: "Everything except managing staff", description: "Everything except managing staff" },
  { id: "catalog", label: "Catalog manager", short: "Catalog", summary: "Products, prices, categories, content", description: "Products, prices, categories and content" },
  { id: "fulfilment", label: "Fulfilment", summary: "Pack, hand to courier, adjust stock", description: "Pack orders, hand them to the courier, adjust stock" },
  { id: "support", label: "Support", summary: "Customers, returns, refunds up to a limit", description: "Customers and returns · refunds up to a limit you set" },
  { id: "marketing", label: "Marketing", summary: "Discounts, campaigns, content, reports", description: "Discounts, campaigns, content and reports" },
];

export const ROLE_AREAS = [
  { label: "Products & pricing", access: ["edit", "edit", "edit", "view", "view", "view"] },
  { label: "Adjust stock", access: ["edit", "edit", "view", "edit", "view", "none"] },
  { label: "Pack & hand to courier", access: ["edit", "edit", "none", "edit", "view", "view"] },
  { label: "Cancel & refund orders", access: ["edit", "edit", "none", "none", "≤ GHS 200", "none"] },
  { label: "Customers", access: ["edit", "edit", "none", "view", "edit", "view"] },
  { label: "Discounts & marketing", access: ["edit", "edit", "none", "none", "view", "edit"] },
  { label: "Content & SEO", access: ["edit", "edit", "edit", "none", "none", "edit"] },
  { label: "Reports", access: ["All", "All", "Catalog", "Inventory", "none", "All"] },
  { label: "Settings · payments, tax, delivery", access: ["edit", "edit", "none", "none", "none", "none"] },
  { label: "Staff & audit log", access: ["edit", "view", "none", "none", "none", "none"] },
];

export const roleLabel = (id: RoleId) => ROLES.find((role) => role.id === id)?.label ?? id;

/** The signed-in staff member (sample: the owner). */
export const ME = "abena";

export interface MyProfile {
  phone: string;
  photo?: string;
  pendingEmail?: string;
  startPage: string;
  clock24: boolean;
  morningSummary: boolean;
  backupLeft: number;
  backupCodes: string[];
  codesMadeAt?: string;
  savedAt: string;
  /** Sample only: the real service stores a salted hash, never the password. */
  password: string;
  usedPasswords: string[];
  /** The key for the new phone while "Move to a new phone" is in progress. */
  pendingSecret?: string;
  /** Step 1 of moving the app passed. */
  moveConfirmed?: boolean;
}

interface Team {
  staff: Staff[];
  audit: AuditEntry[];
  seq: number;
  profile: MyProfile;
}

const newCodes = () => Array.from({ length: 10 }, () => `${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase());

const member = (id: string, name: string, tone: Tone, role: RoleId, lastActive: string, extra: Partial<Staff> = {}): Staff => ({
  id,
  name,
  email: `${name.split(" ")[0]!.toLowerCase()}@jofak.com`,
  tone,
  role,
  appCode: true,
  appCodeSince: "Set up 3 Sep",
  passwordChanged: "Changed 12 Oct",
  lastActive,
  joined: "3 Sep 2026",
  invitedBy: "Abena Mensah",
  status: "active",
  sessions: [{ id: "s1", device: "Chrome on Mac", kind: "monitor", where: `Osu · active ${lastActive === "Now" ? "now" : lastActive}` }],
  ...extra,
});

const seed = (): Team => ({
  seq: 100,
  profile: { phone: "24 412 7781", startPage: "/admin", clock24: true, morningSummary: true, backupLeft: 8, backupCodes: newCodes(), savedAt: "07:58", password: "Jofak-Admin-Demo-2026", usedPasswords: ["Jofak-Admin-Demo-2025"] },
  staff: [
    member("abena", "Abena Mensah", "sage", "owner", "Now", {
      joined: "2 Sep 2026",
      invitedBy: "",
      sessions: [
        { id: "s1", device: "Chrome on Mac", kind: "monitor", where: "Osu, Accra · signed in today 07:58", current: true },
        { id: "s2", device: "iPhone · Safari", kind: "phone", where: "Osu, Accra · active 2 h ago · ends in 9 h" },
      ],
    }),
    member("kojo", "Kojo Ansah", "lavender", "admin", "2 h ago"),
    member("yaw", "Yaw Boateng", "amber", "catalog", "Yesterday"),
    member("akosua", "Akosua Owusu", "citrus", "fulfilment", "12 min ago", {
      sessions: [
        { id: "s1", device: "Stockroom tablet · Chrome", kind: "tablet", where: "Osu · active 12 min ago" },
        { id: "s2", device: "Android phone · Chrome", kind: "phone", where: "Madina · ends in 4 h" },
      ],
    }),
    member("ama", "Ama Serwaa", "neutral", "support", "Today 09:14"),
    member("nana", "Nana Adjei", "neutral", "marketing", "", { status: "invited", invited: "invite sent 2 days ago", appCode: false, sessions: [] }),
  ],
  audit: [
    { id: "a1", day: 0, time: "10:42", seconds: "10:42:18", by: "abena", action: "updated delivery zone *Accra Central*", area: "Settings", areaTone: "neutral", detail: "2 fields changed", eyebrow: "Settings · Delivery zone", title: "Updated Accra Central", open: { label: "Open zone", href: "/admin/settings/delivery?zone=accra-central" }, device: "Chrome on Mac · Osu", ip: "154.160.12.48", changes: [{ label: "Express · order before", before: "11:00", after: "12:00" }, { label: "Express · fee", before: "GHS 40", after: "GHS 45" }] },
    { id: "a2", day: 0, time: "10:31", seconds: "10:31:04", by: "akosua", action: "marked *JFK-251530* as Handed to courier", area: "Orders", areaTone: "sage", detail: "Packed → Handed to courier", eyebrow: "Orders · Status", title: "Handed JFK-251530 to courier", open: { label: "Open order", href: "/admin/orders" }, device: "Stockroom tablet · Osu", ip: "154.160.12.51", changes: [{ label: "Status", before: "Packed", after: "Handed to courier" }] },
    { id: "a3", day: 0, time: "09:58", seconds: "09:58:40", by: "akosua", action: "received stock for *Greens Daily · 30 servings*", area: "Inventory", areaTone: "sage", detail: "On hand 18 → 42 (+24)", eyebrow: "Inventory · Stock received", title: "Received Greens Daily", open: { label: "Open product", href: "/admin/inventory" }, device: "Stockroom tablet · Osu", ip: "154.160.12.51", changes: [{ label: "On hand", before: "18", after: "42" }] },
    { id: "a4", day: 0, time: "09:14", seconds: "09:14:22", by: "ama", action: "refunded *RTN-0418* to MTN MoMo", area: "Refund", areaTone: "sun", detail: "GHS 80 · within GHS 200 limit", eyebrow: "Returns · Refund", title: "Refunded RTN-0418", open: { label: "Open return", href: "/admin/returns" }, device: "Chrome on Windows · Osu", ip: "154.160.12.60", changes: [{ label: "Refund", before: "GHS 0", after: "GHS 80" }] },
    { id: "a5", day: 0, time: "08:50", seconds: "08:50:09", by: "yaw", action: "changed the price of *Collagen Glow*", area: "Products", areaTone: "sage", detail: "GHS 95 → GHS 90", eyebrow: "Products · Price", title: "Changed Collagen Glow price", open: { label: "Open product", href: "/admin/products" }, device: "Chrome on Mac · Tema", ip: "41.66.200.17", changes: [{ label: "Price", before: "GHS 95", after: "GHS 90" }] },
    { id: "a6", day: 0, time: "08:05", seconds: "08:05:51", by: "kojo", action: "paused discount `GREENS20`", area: "Discounts", areaTone: "sage", detail: "Active → Paused", eyebrow: "Discounts · Status", title: "Paused GREENS20", open: { label: "Open discount", href: "/admin/discounts" }, device: "Safari on iPhone · Labone", ip: "41.66.213.4", changes: [{ label: "Status", before: "Active", after: "Paused" }] },
    { id: "a7", day: 1, time: "18:22", seconds: "18:22:37", by: "abena", action: "invited *Nana Adjei* as Marketing", area: "Staff", areaTone: "citrus", detail: "Invite sent to nana@jofak.com", eyebrow: "Staff · Invite", title: "Invited Nana Adjei", open: { label: "Open staff", href: "/admin/settings/staff" }, device: "Chrome on Mac · Osu", ip: "154.160.12.48", changes: [], note: "Invite sent to nana@jofak.com as Marketing." },
    { id: "a8", day: 1, time: "17:40", seconds: "17:40:02", by: "kojo", action: "published the *Home page*", area: "Content", areaTone: "sage", detail: "2 blocks changed", eyebrow: "Content · Home page", title: "Published the Home page", open: { label: "Open home page", href: "/admin/content" }, device: "Safari on iPhone · Labone", ip: "41.66.213.4", changes: [{ label: "Hero slide 1 · headline", before: "Harmattan glow", after: "Everyday wellness" }, { label: "Featured collection", before: "New arrivals", after: "Independence Day sale" }] },
  ],
});

const memory = globalThis as typeof globalThis & { __jofakTeam?: Team };
export const team = (): Team => {
  const kept = (memory.__jofakTeam ??= seed());
  kept.profile ??= seed().profile;
  kept.profile.password ??= seed().profile.password;
  kept.profile.usedPasswords ??= [];
  // Sessions kept from before `current` existed (dev reloads).
  for (const session of kept.staff.find((item) => item.id === ME)?.sessions ?? []) if (session.where.includes("this device")) Object.assign(session, { current: true, where: "Osu, Accra · signed in today 07:58" });
  return kept;
};

export const staffById = (id: string) => team().staff.find((item) => item.id === id);

const clock = (seconds = false) =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", ...(seconds && { second: "2-digit" }), timeZone: "Africa/Accra" });

/** Adds an audit entry by the signed-in staff member. */
export function recordAudit(entry: Pick<AuditEntry, "action" | "area" | "areaTone" | "detail" | "eyebrow" | "title"> & Partial<Pick<AuditEntry, "open" | "changes" | "note">>) {
  const store = team();
  store.seq += 1;
  store.audit.unshift({ id: `a${store.seq}`, day: 0, time: clock(), seconds: clock(true), by: ME, device: "Chrome on Mac · Osu", ip: "154.160.12.48", changes: [], ...entry });
}

export const dayLabel = (offset: number) => {
  const date = new Date(Date.now() - offset * 86_400_000);
  const text = date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Africa/Accra" }).replace(",", "").replace("Sept", "Sep");
  return `${offset === 0 ? "Today" : offset === 1 ? "Yesterday" : ""}${offset < 2 ? " · " : ""}${text}`;
};

export const AREAS = ["Settings", "Orders", "Inventory", "Refund", "Products", "Discounts", "Staff", "Content"];

export function auditEntries(filters: { q?: string; who?: string; area?: string; days?: string }) {
  const q = filters.q?.trim().toLowerCase();
  const maxDay = filters.days === "1" ? 0 : filters.days === "30" ? 29 : filters.days === "all" ? Infinity : 6;
  return team().audit.filter(
    (entry) =>
      entry.day <= maxDay &&
      (!filters.who || entry.by === filters.who) &&
      (!filters.area || entry.area === filters.area) &&
      (!q || `${staffById(entry.by)?.name} ${entry.action} ${entry.detail} ${entry.title}`.toLowerCase().includes(q)),
  );
}

export function changeRole(id: string, role: string) {
  const person = staffById(id);
  const next = ROLES.find((item) => item.id === role);
  if (!person || !next || next.id === "owner" || person.role === "owner" || person.role === next.id) return;
  const before = roleLabel(person.role);
  person.role = next.id;
  recordAudit({ action: `changed *${person.name}*’s role`, area: "Staff", areaTone: "citrus", detail: `${before} → ${next.label}`, eyebrow: "Staff · Role", title: `Changed ${person.name.split(" ")[0]}’s role`, open: { label: "Open staff member", href: `/admin/settings/staff/${id}` }, changes: [{ label: "Role", before, after: next.label }] });
}

export function staffIntent(id: string, intent: string): string | undefined {
  const person = staffById(id);
  if (!person) return;
  const first = person.name.split(" ")[0];
  const open = { label: "Open staff member", href: `/admin/settings/staff/${id}` };
  if (intent === "deactivate" && person.role !== "owner") {
    person.status = "deactivated";
    person.sessions = [];
    recordAudit({ action: `deactivated *${person.name}*`, area: "Staff", areaTone: "citrus", detail: "Signed out everywhere", eyebrow: "Staff · Access", title: `Deactivated ${first}`, open, changes: [{ label: "Status", before: "Active", after: "Deactivated" }] });
    return "deactivated";
  }
  if (intent === "activate") {
    person.status = "active";
    recordAudit({ action: `reactivated *${person.name}*`, area: "Staff", areaTone: "citrus", detail: "Can sign in again", eyebrow: "Staff · Access", title: `Reactivated ${first}`, open, changes: [{ label: "Status", before: "Deactivated", after: "Active" }] });
    return "activated";
  }
  if (intent === "signout-all") {
    person.sessions = person.sessions.filter((session) => session.current);
    recordAudit({ action: `signed *${person.name}* out everywhere`, area: "Staff", areaTone: "citrus", detail: "All sessions ended", eyebrow: "Staff · Sessions", title: `Signed ${first} out everywhere`, open });
    return "signed-out";
  }
  if (intent.startsWith("signout:")) {
    const session = person.sessions.find((item) => item.id === intent.slice(8));
    if (!session) return;
    person.sessions = person.sessions.filter((item) => item !== session);
    recordAudit({ action: `signed *${person.name}* out of ${session.device}`, area: "Staff", areaTone: "citrus", detail: session.where.split(" · ")[0] ?? "", eyebrow: "Staff · Sessions", title: `Signed ${first} out`, open });
    return "signed-out";
  }
  if (intent === "reset-link") {
    recordAudit({ action: `sent *${person.name}* a password reset link`, area: "Staff", areaTone: "citrus", detail: `To ${person.email}`, eyebrow: "Staff · Password", title: `Sent ${first} a reset link`, open, note: `Reset link sent to ${person.email}. It expires in 1 hour.` });
    return "reset-link";
  }
  if (intent === "reset-code") {
    person.appCode = false;
    person.appCodeSince = "Reset · set up at next sign-in";
    recordAudit({ action: `reset *${person.name}*’s app code`, area: "Staff", areaTone: "citrus", detail: "Set up again at next sign-in", eyebrow: "Staff · Sign-in", title: `Reset ${first}’s app code`, open, changes: [{ label: "Authenticator app", before: "On", after: "Not set up" }] });
    return "reset-code";
  }
}

export function resendInvite(id: string) {
  const person = staffById(id);
  if (!person || person.status !== "invited") return;
  person.invited = "invite sent just now";
  recordAudit({ action: `resent *${person.name}*’s invite`, area: "Staff", areaTone: "citrus", detail: `Invite sent to ${person.email}`, eyebrow: "Staff · Invite", title: `Resent ${person.name.split(" ")[0]}’s invite`, open: { label: "Open staff", href: "/admin/settings/staff" }, note: `Invite sent to ${person.email} as ${roleLabel(person.role)}.` });
}

export function invite(email: string, role: string): boolean {
  const clean = email.trim().toLowerCase().slice(0, 120);
  const next = ROLES.find((item) => item.id === role && item.id !== "owner");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || !next || team().staff.some((item) => item.email === clean)) return false;
  const store = team();
  store.seq += 1;
  const local = clean.split("@")[0]!;
  const name = local.charAt(0).toUpperCase() + local.slice(1);
  store.staff.push({ ...member(`staff-${store.seq}`, name, "neutral", next.id, ""), email: clean, status: "invited", invited: "invite sent just now", appCode: false, sessions: [] });
  recordAudit({ action: `invited *${clean}* as ${next.label}`, area: "Staff", areaTone: "citrus", detail: `Invite sent to ${clean}`, eyebrow: "Staff · Invite", title: `Invited ${clean}`, open: { label: "Open staff", href: "/admin/settings/staff" }, note: `Invite sent to ${clean} as ${next.label}.` });
  return true;
}

/** CSV of the filtered entries. */
export function auditCsv(entries: AuditEntry[]) {
  const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const rows = entries.map((entry) => [dayLabel(entry.day), entry.seconds, staffById(entry.by)?.name ?? entry.by, entry.action.replace(/[*`]/g, ""), entry.area, entry.detail, entry.ip].map(quote).join(","));
  return ["Day,Time,Who,What,Area,Detail,IP address", ...rows].join("\n");
}

export const START_PAGES = [
  { value: "/admin", label: "Dashboard" },
  { value: "/admin/orders", label: "Orders" },
  { value: "/admin/products", label: "Products" },
  { value: "/admin/inventory", label: "Inventory" },
  { value: "/admin/reports", label: "Reports" },
];

/** Server actions accept about 1 MB, so photos must be smaller. */
export const PHOTO_LIMIT = 900_000;

/** Saves My profile: names, phone, email change request, photo and preferences. */
export async function saveMyProfile(form: FormData): Promise<string> {
  const store = team();
  const me = staffById(ME)!;
  const profile = store.profile;
  const field = (key: string) => (typeof form.get(key) === "string" ? String(form.get(key)).trim().slice(0, 80) : undefined);
  const changes: { label: string; before: string; after: string }[] = [];

  const first = field("firstName") || me.name.split(" ")[0]!;
  const last = field("lastName") ?? me.name.split(" ").slice(1).join(" ");
  const name = `${first} ${last}`.trim();
  if (name !== me.name) changes.push({ label: "Name", before: me.name, after: name });
  me.name = name;

  const phone = (field("phone") ?? profile.phone).replace(/[^\d ]/g, "").replace(/\s+/g, " ").trim();
  if (phone && phone !== profile.phone) changes.push({ label: "Phone", before: profile.phone, after: phone });
  if (phone) profile.phone = phone;

  let result = "saved";
  const email = field("email")?.toLowerCase();
  if (email && email !== me.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    profile.pendingEmail = email;
    result = "email-code";
  }

  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > PHOTO_LIMIT || !/^image\/(png|jpeg|webp)$/.test(photo.type)) result = "photo-too-big";
    else {
      profile.photo = `data:${photo.type};base64,${Buffer.from(await photo.arrayBuffer()).toString("base64")}`;
      changes.push({ label: "Photo", before: "—", after: "New photo" });
    }
  }

  const start = String(form.get("startPage") ?? profile.startPage);
  if (START_PAGES.some((page) => page.value === start)) profile.startPage = start;
  profile.clock24 = form.get("clock24") === "on";
  profile.morningSummary = form.get("morningSummary") === "on";
  profile.savedAt = clock();

  if (changes.length) recordAudit({ action: "updated their profile", area: "Staff", areaTone: "citrus", detail: changes.map((change) => change.label).join(", "), eyebrow: "Staff · My profile", title: "Updated their profile", open: { label: "Open staff member", href: `/admin/settings/staff/${ME}` }, changes: changes.filter((change) => change.label !== "Photo") });
  return result;
}

/** A button on My profile (sign out a device, backup codes, password, photo). */
export function myProfileIntent(intent: string): string {
  const store = team();
  const me = staffById(ME)!;
  if (intent === "remove-photo") {
    store.profile.photo = undefined;
    return "photo-removed";
  }
  if (intent === "new-codes") {
    store.profile.backupCodes = newCodes();
    store.profile.backupLeft = 10;
    store.profile.codesMadeAt = clock();
    recordAudit({ action: "made new backup codes", area: "Staff", areaTone: "citrus", detail: "Old codes stop working", eyebrow: "Staff · Sign-in", title: "Made new backup codes", open: { label: "Open my profile", href: "/admin/profile" } });
    return "new-codes";
  }
  if (intent === "password") {
    recordAudit({ action: "asked for a password change link", area: "Staff", areaTone: "citrus", detail: `To ${me.email}`, eyebrow: "Staff · Password", title: "Asked to change password", open: { label: "Open my profile", href: "/admin/profile" } });
    return "password";
  }
  if (intent === "move-app") {
    recordAudit({ action: "started moving their authenticator app", area: "Staff", areaTone: "citrus", detail: "New phone set up on next sign-in", eyebrow: "Staff · Sign-in", title: "Moved authenticator app", open: { label: "Open my profile", href: "/admin/profile" } });
    return "move-app";
  }
  if (intent === "cancel-email") {
    store.profile.pendingEmail = undefined;
    return "saved";
  }
  if (intent === "signout-others") return staffIntent(ME, "signout-all") ?? "none";
  if (intent.startsWith("signout:")) return staffIntent(ME, intent) ?? "none";
  return "none";
}

const SIX_DIGITS = /^\d{6}$/;

/** Change password. Returns "" on success, or what went wrong (shown in the dialog). */
export function changeMyPassword(form: FormData): string {
  const store = team();
  const me = staffById(ME)!;
  const profile = store.profile;
  const value = (key: string) => String(form.get(key) ?? "");
  const current = value("current");
  const password = value("password");
  if (current !== profile.password) return "That isn’t your current password.";
  if (password.length < 12) return "The new password needs at least 12 characters.";
  if (password !== value("confirm")) return "The two new passwords don’t match.";
  if (password === profile.password || profile.usedPasswords.includes(password)) return "You’ve used that password on Jofak before. Choose a new one.";
  const lower = password.toLowerCase();
  if ([...me.name.toLowerCase().split(" "), me.email.split("@")[0]!.toLowerCase()].some((word) => word.length > 2 && lower.includes(word))) return "The new password can’t contain your name or email.";
  // TODO: check the code against the authenticator secret (TOTP) once the auth service exists.
  if (!SIX_DIGITS.test(value("code"))) return "Enter the 6-digit code from your authenticator app.";
  profile.usedPasswords.push(profile.password);
  profile.password = password;
  me.passwordChanged = "Changed today";
  const signOut = form.get("signOutOthers") === "on";
  if (signOut) me.sessions = me.sessions.filter((session) => session.current);
  recordAudit({ action: "changed their password", area: "Staff", areaTone: "citrus", detail: signOut ? "Other devices signed out" : "Stayed signed in elsewhere", eyebrow: "Staff · Password", title: "Changed password", open: { label: "Open my profile", href: "/admin/profile" } });
  return "";
}

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const newSecret = () => Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => BASE32[Math.floor(Math.random() * 32)]).join("")).join(" ");

/** One step of moving the authenticator app. Returns the next step, "done", or an error. */
export function moveAuthenticator(step: number, form: FormData): { next?: number; done?: boolean; error?: string } {
  const store = team();
  const profile = store.profile;
  const code = String(form.get("code") ?? "");
  // TODO: verify codes against the current and new secrets (TOTP).
  if (step === 1) {
    if (!SIX_DIGITS.test(code)) return { next: 1, error: "Enter the 6-digit code from your current phone." };
    profile.moveConfirmed = true;
    profile.pendingSecret = newSecret();
    return { next: 2 };
  }
  if (!profile.moveConfirmed || !profile.pendingSecret) return { next: 1, error: "Start again: confirm it’s you first." };
  if (step === 2) return { next: 3 };
  if (!SIX_DIGITS.test(code)) return { next: 3, error: "Enter the 6-digit code your new phone shows." };
  const me = staffById(ME)!;
  me.appCode = true;
  me.appCodeSince = "Moved to a new phone today";
  profile.pendingSecret = undefined;
  profile.moveConfirmed = false;
  recordAudit({ action: "moved their authenticator app to a new phone", area: "Staff", areaTone: "citrus", detail: "Old phone’s codes stopped working", eyebrow: "Staff · Sign-in", title: "Moved authenticator app", open: { label: "Open my profile", href: "/admin/profile" } });
  return { done: true };
}
