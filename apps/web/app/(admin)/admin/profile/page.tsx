import type { Metadata } from "next";
import Link from "next/link";

import { Switch } from "@repo/ui/atoms";
import { ProfileIdentity, ReportList, SecurityRow, SettingsCard, SettingsField, SettingsNotice, ThemeSwitch } from "@repo/ui/molecules";

import { changePasswordAction, moveAuthenticatorAction, saveMyProfileAction } from "../../../_actions/admin-settings";
import { ME, PHOTO_LIMIT, roleLabel, ROLES, staffById, START_PAGES, team } from "../../../_content/admin-team";
import { ProfileDialogs } from "../_components/profile";
import { SettingsForm } from "../_components/settings";

export const metadata: Metadata = { title: "My profile" };

type SearchParams = Promise<{ done?: string; t?: string; email?: string; codes?: string; dialog?: string; step?: string; error?: string }>;

const NOTICE: Record<string, { text: string; tone?: "warning" }> = {
  saved: { text: "Profile saved." },
  "email-code": { text: "We sent a code to your new address. Your email changes once you enter it." },
  "photo-too-big": { text: `That photo is too big or not a PNG, JPEG or WebP. Use one under ${Math.round(PHOTO_LIMIT / 1000)} KB.`, tone: "warning" },
  "photo-removed": { text: "Photo removed." },
  "new-codes": { text: "New backup codes made. The old ones no longer work — keep these somewhere safe." },
  password: { text: "We emailed you a link to change your password. It expires in 1 hour." },
  "move-app": { text: "Next time you sign in, scan the new code with the authenticator app on your new phone." },
  "signed-out": { text: "Signed out of that device." },
  "password-changed": { text: "Password changed. We’ve emailed you to say so." },
  "app-moved": { text: "Your authenticator app is on your new phone. Codes from the old phone no longer work." },
};

const button = "flex h-9 items-center rounded-full border border-border px-3 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle md:h-9.5 md:px-3.5";

/** /admin/profile (Paper "Jofak - Admin" → My profile): the signed-in staff member's own details, sign-in and preferences. */
export default async function AdminProfilePage({ searchParams }: { searchParams: SearchParams }) {
  const { done, t, email: changeEmail, codes, dialog, step, error } = await searchParams;
  const me = staffById(ME)!;
  const { profile, audit } = team();
  const [first = "", ...rest] = me.name.split(" ");
  const role = ROLES.find((item) => item.id === me.role);
  const notice = done ? NOTICE[done] : undefined;
  const activity = audit.filter((entry) => entry.by === ME).slice(0, 3);
  const weekday = (day: number) => new Date(Date.now() - day * 86_400_000).toLocaleDateString("en-GB", { weekday: "short", timeZone: "Africa/Accra" });

  return (
    <>
    <ProfileDialogs
      key={`dialogs-${t}-${dialog}-${step}`}
      dialog={dialog}
      step={step === "2" ? 2 : step === "3" ? 3 : 1}
      error={error}
      lastChanged={me.passwordChanged}
      otherDevices={me.sessions.filter((session) => !session.current).map((session) => session.device).join(", ") || undefined}
      forbidden={[...me.name.split(" "), me.email.split("@")[0]!]}
      secret={profile.pendingSecret}
      codes={profile.backupCodes}
      codesNote={`${profile.codesMadeAt ? `Made at ${profile.codesMadeAt}` : "Made earlier"} · ${profile.backupLeft} of 10 left`}
      owner={`${me.name} · ${me.email}`}
      changePassword={changePasswordAction}
      moveAuthenticator={moveAuthenticatorAction}
    />
    <SettingsForm
      key={t}
      pageTitle="My profile"
      title="My profile"
      tabletTitle
      description="Only you can change these · changes are recorded in the audit log"
      savedAt={profile.savedAt}
      action={saveMyProfileAction}
    >
      {notice && (
        <SettingsNotice tone={notice.tone} icon={notice.tone ? undefined : "checkCircle"}>
          {notice.text}
        </SettingsNotice>
      )}

      <ProfileIdentity
        name={me.name}
        role={roleLabel(me.role)}
        photo={profile.photo}
        meta={`${me.email} · joined ${me.joined} · last signed in today 07:58 from Osu`}
        tabletMeta={`${me.email} · joined ${me.joined}`}
        compactMeta={`Joined ${me.joined}`}
      />

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start xl:gap-5">
        <div className="flex min-w-0 flex-col gap-3.5 md:gap-4 xl:flex-1 xl:gap-5">
          <SettingsCard title="Personal details" description="Your name appears on orders you handle and in the audit log">
            <div className="flex flex-col gap-3.5 md:flex-row md:gap-4">
              <SettingsField label="First name" name="firstName" defaultValue={first} />
              <SettingsField label="Last name" name="lastName" defaultValue={rest.join(" ")} />
            </div>
            <div className="flex flex-col gap-3.5 md:flex-row md:gap-4">
              {changeEmail || profile.pendingEmail ? (
                <SettingsField
                  label="New email"
                  name="email"
                  type="email"
                  defaultValue={profile.pendingEmail ?? ""}
                  placeholder={me.email}
                  hint={profile.pendingEmail ? <>Waiting for the code sent to {profile.pendingEmail} · <button type="submit" name="intent" value="cancel-email" className="font-semibold text-brand">Cancel</button></> : "We send a code to the new address before switching"}
                />
              ) : (
                <div className="flex min-w-0 flex-1 basis-0 flex-col gap-1.5">
                  <span className="flex justify-between text-sm leading-4.5 font-semibold text-text-secondary">
                    Email
                    <Link href="/admin/profile?email=1" className="text-brand hover:underline">
                      Change
                    </Link>
                  </span>
                  <span className="flex h-10.5 items-center gap-2 rounded-sm bg-surface-subtle px-3 text-14 leading-5 text-text md:h-11 md:px-3.5 dark:bg-surface">
                    <span className="min-w-0 flex-1 truncate">{me.email}</span>
                    <span className="rounded-full bg-sage-100 px-2 py-0.5 text-11 leading-4 font-semibold text-brand">Verified</span>
                  </span>
                  <span className="text-xs leading-xs text-text-muted">We send a code to the new address before switching</span>
                </div>
              )}
              <SettingsField label="Phone" name="phone" type="tel" prefix="+233" defaultValue={profile.phone} hint="For staff alerts by SMS · never shown to customers" />
            </div>
          </SettingsCard>

          <SettingsCard title="Sign-in & security" description="Everyone signs in with a password plus a code from an authenticator app">
            <div className="-mt-1 flex flex-col">
              <SecurityRow
                icon="lock"
                title="Password"
                description={me.passwordChanged.includes("today") ? me.passwordChanged : `${me.passwordChanged} · 41 days ago`}
                compactDescription={me.passwordChanged}
                actions={
                  <Link href="/admin/profile?dialog=password" scroll={false} className={button}>
                    <span className="md:hidden">Change</span>
                    <span className="hidden md:inline">Change password</span>
                  </Link>
                }
              />
              <SecurityRow
                divided
                icon="shieldCheck"
                iconTone={me.appCode ? "sage" : "muted"}
                title="Authenticator app"
                badge={me.appCode ? "● On" : undefined}
                description={me.appCode ? `Google Authenticator · ${me.appCodeSince.charAt(0).toLowerCase()}${me.appCodeSince.slice(1)}` : "Set up at your next sign-in"}
                compactDescription={me.appCode ? me.appCodeSince.replace("Moved to a new phone today", "Moved today") : "Next sign-in"}
                actions={
                  <Link href="/admin/profile?dialog=authenticator&step=1" scroll={false} className={button}>
                    <span className="md:hidden">New phone</span>
                    <span className="hidden md:inline">Move to a new phone</span>
                  </Link>
                }
              />
              <SecurityRow
                divided
                icon="key"
                title="Backup codes"
                description={`${profile.backupLeft} of 10 left · use one if your phone is lost`}
                compactDescription={`${profile.backupLeft} of 10 left`}
                actions={
                  <>
                    <Link href={codes ? "/admin/profile" : "/admin/profile?codes=1"} className="px-2 text-sm leading-4.5 font-semibold text-brand hover:underline md:px-3">
                      {codes ? "Hide codes" : "View codes"}
                    </Link>
                    <button type="submit" name="intent" value="new-codes" className={`hidden md:flex ${button}`}>
                      Make new codes
                    </button>
                  </>
                }
              />
              {codes && (
                <ul aria-label="Backup codes" className="mb-2 grid grid-cols-2 gap-2 rounded-sm bg-surface-subtle p-3 font-mono text-sm leading-5 text-text md:grid-cols-5 dark:bg-surface">
                  {profile.backupCodes.map((code, index) => (
                    <li key={code} className={index >= profile.backupLeft ? "text-text-muted line-through" : undefined}>
                      {code}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center justify-between border-t border-border-subtle pt-4.5 pb-1.5">
                <p className="text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase">
                  <span className="md:hidden">Signed in</span>
                  <span className="hidden md:inline">Where you’re signed in</span> · {me.sessions.length}
                </p>
                {me.sessions.some((session) => !session.current) && (
                  <button type="submit" name="intent" value="signout-others" className="text-sm leading-4.5 font-semibold text-error hover:underline">
                    <span className="md:hidden">Sign out others</span>
                    <span className="hidden md:inline">Sign out of other devices</span>
                  </button>
                )}
              </div>
              {me.sessions.map((session, index) => (
                <SecurityRow
                  key={session.id}
                  divided={index > 0}
                  icon={session.kind}
                  title={session.device}
                  description={session.where}
                  compactDescription={session.where.replace(", Accra", "").replace(/signed in |active .* · /, "")}
                  actions={
                    session.current ? (
                      <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs leading-xs font-semibold text-brand">This device</span>
                    ) : (
                      <button type="submit" name="intent" value={`signout:${session.id}`} className="text-sm leading-4.5 font-semibold text-text hover:underline">
                        Sign out
                      </button>
                    )
                  }
                />
              ))}
            </div>
          </SettingsCard>
        </div>

        <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:items-start md:gap-4 xl:flex xl:w-90 xl:shrink-0 xl:gap-5">
          <SettingsCard title="Preferences" description="Saved to your account, on every device">
            <ThemeSwitch tone="field" label="Appearance" />
            <div className="flex items-center gap-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-5 font-semibold text-text">Open on sign-in</span>
                <span className="text-xs leading-xs text-text-muted">The first page you see</span>
              </span>
              <SettingsField label={<span className="sr-only">Open on sign-in</span>} name="startPage" defaultValue={profile.startPage} trackEdits={false} options={START_PAGES} className="w-32 flex-none" />
            </div>
            <label className="flex items-center gap-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-14 leading-5 font-semibold text-text">24-hour time</span>
                <span className="text-xs leading-xs text-text-muted">14:32 instead of 2:32 pm</span>
              </span>
              <Switch name="clock24" defaultChecked={profile.clock24} className="data-[state=checked]:bg-primary" />
            </label>
          </SettingsCard>

          <SettingsCard title="Alerts you get" description={<>Set for the team in <Link href="/admin/settings/notifications" className="hover:text-text">Settings › Notifications</Link></>}>
            <div className="-mt-1 flex flex-col">
              <ReportList
                rows={[
                  { id: "payment", title: "Payment success below 70%", sub: "Right away", value: "SMS + email", valueTone: "muted" },
                  { id: "credit", title: "SMS credit below GHS 50", sub: "Right away", value: "Email", valueTone: "muted" },
                ]}
              />
              <label className="flex items-center gap-3 border-t border-border-subtle pt-3">
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-14 leading-5 font-semibold text-text">Morning summary</span>
                  <span className="text-xs leading-xs text-text-muted">
                    Yesterday’s sales at 08:00<span className="hidden md:inline"> · just for you</span>
                  </span>
                </span>
                <Switch name="morningSummary" defaultChecked={profile.morningSummary} className="data-[state=checked]:bg-primary" />
              </label>
            </div>
          </SettingsCard>

          <SettingsCard
            tone="muted"
            eyebrow="Your role"
            title={roleLabel(me.role)}
            action={
              <Link href="/admin/settings/staff?tab=roles">
                <span className="md:hidden">Roles ›</span>
                <span className="hidden md:inline">What each role can do ›</span>
              </Link>
            }
          >
            <p className="-mt-2 text-sm leading-4.5 text-text-secondary">
              {role?.summary}. {me.role === "owner" ? "Only another owner can change your role." : "Ask an owner to change your role."}
            </p>
          </SettingsCard>

          <SettingsCard title="Your recent activity" action={<Link href={`/admin/settings/audit?who=${ME}`}>Audit log ›</Link>}>
            {activity.length ? (
              <ul className="flex flex-col gap-2.5">
                {activity.map((entry) => (
                  <li key={entry.id} className="flex gap-3 text-sm leading-4.5">
                    <span className="w-11 shrink-0 font-mono text-xs leading-4.5 text-text-muted">{entry.day === 0 ? entry.time : weekday(entry.day)}</span>
                    <Link href={`/admin/settings/audit/${entry.id}`} className="min-w-0 text-text hover:underline">
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-4.5 text-text-muted">Nothing yet.</p>
            )}
          </SettingsCard>
        </div>
      </div>
    </SettingsForm>
    </>
  );
}
