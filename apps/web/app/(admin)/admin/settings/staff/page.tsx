import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@repo/ui/atoms";
import { SettingsCard, SettingsField, SettingsNotice } from "@repo/ui/molecules";
import { RolePermissions, SectionTabs, StaffTable } from "@repo/ui/organisms";

import { signOutMyDeviceAction, staffListAction } from "../../../../_actions/admin-settings";
import { ME, ROLE_AREAS, roleLabel, ROLES, staffById, team } from "../../../../_content/admin-team";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";
import { SessionList } from "./_sessions";

export const metadata: Metadata = { title: "Staff & roles" };

type SearchParams = Promise<{ tab?: string; invite?: string; invited?: string; resent?: string; error?: string; done?: string }>;

const inviteButton = (className: string) => (
  <Link href="/admin/settings/staff?invite=1" className={`flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-on-primary hover:bg-primary-hover ${className}`}>
    <Icon name="plus" size={14} strokeWidth={2} />
    Invite staff
  </Link>
);

/** /admin/settings/staff (Paper "Jofak - Admin" → Settings → Staff list). Tabs: staff, roles, sessions. */
export default async function AdminStaffPage({ searchParams }: { searchParams: SearchParams }) {
  const { tab = "staff", invite, invited, resent, error, done } = await searchParams;
  const { staff } = team();
  const visible = staff.filter((person) => person.status !== "deactivated");
  const active = visible.filter((person) => person.status === "active").length;
  const pending = visible.length - active;
  const me = staffById(ME);
  const roleNote = (role: string) => (role === "support" ? "Refunds up to GHS 200" : undefined);

  const tabs = (
    <SectionTabs
      linkAs={Link}
      activeHref={`/admin/settings/staff${tab === "staff" ? "" : `?tab=${tab}`}`}
      tabs={[
        { href: "/admin/settings/staff", label: "Staff", count: staff.length },
        { href: "/admin/settings/staff?tab=roles", label: "Roles", count: ROLES.length },
        { href: "/admin/settings/staff?tab=sessions", label: "My sessions", count: me?.sessions.length ?? 0 },
      ]}
      className="hidden xl:flex"
    />
  );

  return (
    <SettingsForm
      pageTitle="Staff & roles"
      tabletTitle
      readOnly
      summary={`${active} active${pending ? ` · ${pending} invite${pending > 1 ? "s" : ""} pending` : ""}`}
      backHref="/admin/settings"
      action={tab === "sessions" ? signOutMyDeviceAction : staffListAction}
      nav={<SettingsSections active="/admin/settings/staff" />}
      headerAction={inviteButton("h-11 px-5 text-base leading-5")}
      mobileBar={inviteButton("h-12 w-full text-base leading-5")}
    >
      {tabs}

      {invited && <SettingsNotice icon="checkCircle">Invite sent. They’ll set a password and an app code when they first sign in.</SettingsNotice>}
      {resent && <SettingsNotice icon="checkCircle">Invite sent again to {staffById(resent)?.email}.</SettingsNotice>}
      {done === "signed-out" && <SettingsNotice icon="checkCircle">Signed out of that device.</SettingsNotice>}

      {invite && (
        <SettingsCard title="Invite staff" description="They get an email to set a password and an authenticator app" action={<Link href="/admin/settings/staff">Cancel</Link>}>
          <div className="flex flex-col gap-3.5 md:flex-row md:items-end md:gap-4">
            <SettingsField label="Email" name="email" type="email" placeholder="name@jofak.com" trackEdits={false} className="md:flex-2" />
            <SettingsField label="Role" name="role" defaultValue="fulfilment" trackEdits={false} options={ROLES.filter((role) => role.id !== "owner").map((role) => ({ value: role.id, label: role.label }))} />
            <button type="submit" className="flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-14 leading-4.5 font-semibold text-on-primary hover:bg-primary-hover">
              Send invite
            </button>
          </div>
          {error && <p className="text-sm leading-4.5 text-error">Enter a new staff member’s email address.</p>}
        </SettingsCard>
      )}

      {tab === "sessions" ? (
        <SettingsCard title="My sessions" description="Where you’re signed in · sessions end after 12 hours">
          <SessionList sessions={me?.sessions ?? []} keep={(session) => session.current === true} />
        </SettingsCard>
      ) : tab === "roles" ? (
        <RolePermissions linkAs={Link} roles={ROLES} areas={ROLE_AREAS} full />
      ) : (
        <>
          <p className="flex items-center gap-3 rounded-14 border border-sage-200 bg-sage-50 px-4 py-3 text-sm leading-5 text-text md:px-5 dark:border-border-subtle">
            <Icon name="shieldCheck" size={16} strokeWidth={1.5} className="shrink-0 text-brand" />
            <span>
              <span className="md:hidden">Everyone signs in with a password plus an authenticator app code. Sessions end after 12 h, or 60 min idle.</span>
              <span className="hidden md:inline">Everyone signs in with a password plus a code from an authenticator app. Sessions end after 12 hours, or 60 minutes without activity.</span>
            </span>
          </p>
          <StaffTable
            linkAs={Link}
            selectedId="akosua"
            members={visible.map((person) => ({
              id: person.id,
              name: person.name,
              tone: person.tone,
              email: person.email,
              role: roleLabel(person.role),
              roleNote: roleNote(person.role),
              owner: person.role === "owner",
              you: person.id === ME,
              appCode: person.appCode,
              lastActive: person.lastActive,
              invited: person.status === "invited" ? person.invited : undefined,
              href: `/admin/settings/staff/${person.id}`,
            }))}
          />
          <RolePermissions linkAs={Link} roles={ROLES} areas={ROLE_AREAS} tableHref="/admin/settings/staff?tab=roles" />
        </>
      )}
    </SettingsForm>
  );
}
