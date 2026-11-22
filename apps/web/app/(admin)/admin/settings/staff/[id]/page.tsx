import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon, Initials } from "@repo/ui/atoms";
import { ReportList, RoleOptions, SettingsCard, SettingsNotice } from "@repo/ui/molecules";

import { staffMemberAction } from "../../../../../_actions/admin-settings";
import { ME, ROLES, staffById, team } from "../../../../../_content/admin-team";
import { SettingsForm } from "../../../_components/settings";
import { SettingsSections } from "../../_nav";
import { SessionList } from "../_sessions";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ done?: string; t?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  return { title: `${staffById(id)?.name ?? "Staff member"} · Staff` };
}

const NOTICE: Record<string, string> = {
  role: "Role saved. It takes effect on their next page load.",
  "signed-out": "Signed out.",
  "reset-link": "Password reset link sent. It expires in 1 hour.",
  "reset-code": "App code reset. They’ll set it up again when they next sign in.",
  deactivated: "Deactivated. They’ve been signed out and can’t sign in.",
  activated: "Reactivated. They can sign in again.",
};

/** /admin/settings/staff/[id] (Paper "Jofak - Admin" → Settings → Staff member). */
export default async function AdminStaffMemberPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const { done, t } = await searchParams;
  const person = staffById(id);
  if (!person) notFound();
  const first = person.name.split(" ")[0];
  const owner = person.role === "owner";
  const deactivated = person.status === "deactivated";
  const invited = person.status === "invited";
  const activity = team()
    .audit.filter((entry) => entry.by === id)
    .slice(0, 3);

  const toggleAccess = (className: string, label: string) =>
    owner ? null : deactivated ? (
      <button type="submit" name="intent" value="activate" className={`flex items-center justify-center rounded-full border border-border font-semibold text-text hover:bg-surface-subtle ${className}`}>
        Reactivate{label}
      </button>
    ) : (
      <button type="submit" name="intent" value="deactivate" className={`flex items-center justify-center rounded-full border border-error font-semibold text-error hover:bg-tint-citrus ${className}`}>
        Deactivate{label}
      </button>
    );

  const status = deactivated ? { label: "Deactivated", dot: "bg-text-muted", chip: "bg-surface-subtle text-text-secondary" } : invited ? { label: "Invite pending", dot: "bg-warning", chip: "bg-tint-sun text-warning-text" } : { label: "Active", dot: "bg-success", chip: "bg-sage-100 text-primary dark:text-brand" };

  return (
    <SettingsForm
      key={t}
      pageTitle={person.name}
      readOnly
      detail
      backHref="/admin/settings/staff"
      backLabel="Staff"
      action={staffMemberAction.bind(null, id, `/admin/settings/staff/${id}`)}
      nav={<SettingsSections active="/admin/settings/staff" />}
      mobileBar={toggleAccess("h-12 w-full text-base leading-5", ` ${first}`) ?? undefined}
    >
      <Link href="/admin/settings/staff" className="hidden w-fit items-center gap-1 text-sm leading-4.5 font-semibold text-brand xl:flex">
        <Icon name="chevronLeft" size={14} strokeWidth={1.8} />
        Staff
      </Link>

      <header className="flex items-center gap-3.5 md:gap-4">
        <Initials name={person.name} size="profile" tone={person.tone} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="flex flex-wrap items-center gap-2.5 text-22 leading-7 font-semibold tracking-tight text-text md:text-28 md:leading-8.5">
            {person.name}
            <span className={`hidden items-center gap-1.5 rounded-full px-2 py-0.5 text-xs leading-xs font-semibold tracking-normal md:flex ${status.chip}`}>
              <span aria-hidden className={`size-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </h2>
          <p className="flex items-center gap-1.5 truncate text-sm leading-4.5 text-text-secondary">
            <span aria-hidden className={`size-2 shrink-0 rounded-full md:hidden ${status.dot}`} />
            <span className="md:hidden">
              {status.label} · {person.email}
            </span>
            <span className="hidden md:inline">
              {person.email} · joined {person.joined}
              <span className="hidden xl:inline">{person.invitedBy && ` · invited by ${person.invitedBy}`}</span>
            </span>
          </p>
        </div>
        <span className="hidden md:block">{toggleAccess("h-11 px-4.5 text-14 leading-4.5", "")}</span>
      </header>

      {done && NOTICE[done] && <SettingsNotice icon="checkCircle">{NOTICE[done]}</SettingsNotice>}

      <div className="flex flex-col gap-3.5 md:gap-4 xl:flex-row xl:items-start">
        <SettingsCard title="Role" description={owner ? "The owner keeps every permission · transfer ownership to change it" : "Takes effect on their next page load"} className="xl:flex-1">
          <RoleOptions
            name="role"
            autoSubmit
            defaultValue={person.role}
            options={ROLES.map((role) => ({ value: role.id, label: role.label, description: role.description, disabled: role.id === "owner" || owner || deactivated }))}
          />
        </SettingsCard>

        <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-4 xl:flex xl:w-95 xl:shrink-0">
          <SettingsCard title="Sign-in" className="md:self-start xl:self-auto">
            <ReportList
              compact
              rows={[
                { id: "app", title: <SignInRow title="Authenticator app" sub={person.appCodeSince} />, value: person.appCode ? "On" : "Not set up", valueTone: person.appCode ? "brand" : "warning" },
                {
                  id: "password",
                  title: <SignInRow title="Password" sub={person.passwordChanged} />,
                  value: (
                    <button type="submit" name="intent" value="reset-link" className="text-brand hover:underline">
                      Send reset link
                    </button>
                  ),
                },
              ]}
              className="gap-3"
            />
            <button type="submit" name="intent" value="reset-code" disabled={!person.appCode} className="h-10 w-fit rounded-full border border-border px-3.5 text-sm leading-4.5 font-semibold text-text hover:bg-surface-subtle disabled:opacity-muted">
              Reset app code
            </button>
          </SettingsCard>

          <SettingsCard
            title="Signed in on"
            action={
              person.sessions.length > 0 && id !== ME ? (
                <button type="submit" name="intent" value="signout-all" className="text-error hover:underline">
                  <span className="xl:hidden">Sign out all</span>
                  <span className="hidden xl:inline">Sign out everywhere</span>
                </button>
              ) : undefined
            }
            className="md:self-start xl:self-auto"
          >
            <SessionList sessions={person.sessions} keep={id === ME ? (session) => session.current === true : undefined} />
          </SettingsCard>

          <SettingsCard
            title="Recent activity"
            action={<Link href={`/admin/settings/audit?who=${id}`}>Audit log ›</Link>}
            className="md:col-span-2"
          >
            {activity.length ? (
              <ReportList compact rows={activity.map((entry) => ({ id: entry.id, title: entry.title, value: entry.day === 0 ? entry.time : `${entry.day}d`, valueTone: "muted" }))} />
            ) : (
              <p className="text-sm leading-4.5 text-text-muted">Nothing yet.</p>
            )}
          </SettingsCard>
        </div>
      </div>
    </SettingsForm>
  );
}

function SignInRow({ title, sub }: { title: string; sub: string }) {
  return (
    <span className="flex flex-col">
      <span className="font-semibold text-text">{title}</span>
      <span className="text-xs leading-xs text-text-muted">{sub}</span>
    </span>
  );
}
