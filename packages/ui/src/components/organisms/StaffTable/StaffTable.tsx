import type { ComponentProps, ReactNode } from "react";

import { cn, type LinkComponent } from "../../../lib";
import { Icon, Initials } from "../../atoms";

export interface StaffMember {
  id: string;
  name: string;
  tone: "sage" | "lavender" | "amber" | "info" | "citrus" | "neutral";
  email: string;
  role: string;
  /** Small print under the role ("Refunds up to GHS 200"). */
  roleNote?: string;
  owner?: boolean;
  you?: boolean;
  appCode: boolean;
  lastActive: string;
  /** Pending invite: "invite sent 2 days ago". */
  invited?: string;
  href: string;
}

/**
 * StaffTable (organism): who can sign in to the back office (Paper Jofak - Admin → Settings →
 * Staff & roles): person, role, whether their authenticator app is set up and when they were
 * last active; each row opens the member. Pending invites show "Not set up" and a Resend button
 * (submits `resend=<id>`). Below 1280px rows collapse to name, a status line and the role.
 */
export interface StaffTableProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  members: StaffMember[];
  selectedId?: string;
}

function RoleChip({ member }: { member: StaffMember }): ReactNode {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs leading-xs font-semibold whitespace-nowrap", member.owner ? "bg-primary text-on-primary" : "bg-sage-100 text-primary dark:text-brand")}>{member.role}</span>
  );
}

export function StaffTable({ linkAs: LinkAs = "a", members, selectedId, className, ...props }: StaffTableProps) {
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  const avatar = (member: StaffMember) => (
    <Initials name={member.name} size="row" tone={member.invited ? "neutral" : member.tone} className={cn(member.invited && "border border-dashed border-border bg-transparent text-text-secondary")} />
  );
  const resend = (member: StaffMember, label: string) => (
    <button type="submit" name="resend" value={member.id} className="shrink-0 text-sm leading-4.5 font-semibold text-brand hover:underline">
      {label}
    </button>
  );

  return (
    <section data-slot="staff-table" aria-label="Staff" className={cn("flex flex-col rounded-18 border border-border-subtle px-4 py-1 font-sans md:rounded-lg md:px-5 xl:px-6 xl:pt-4 xl:pb-2", className)} {...props}>
      <ul className="flex flex-col xl:hidden">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-3 border-t border-border-subtle py-3 first:border-t-0">
            {avatar(member)}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-14 leading-5 font-semibold text-text md:text-base">
                {member.name}
                {member.you && " · you"}
              </span>
              <span className={cn("truncate text-xs leading-xs", member.invited ? "text-warning-text" : "text-text-muted")}>
                {member.invited ? (
                  <>
                    Invite pending<span className="hidden md:inline"> · {member.invited.replace(/^invite /, "")}</span>
                  </>
                ) : (
                  <>
                    {member.you ? "Active now" : member.lastActive}
                    <span className="hidden md:inline"> · {member.roleNote ? member.roleNote.charAt(0).toLowerCase() + member.roleNote.slice(1) : member.appCode ? "app code on" : "app code not set up"}</span>
                  </>
                )}
              </span>
            </span>
            <RoleChip member={member} />
            {member.invited ? (
              <span className="hidden md:inline">{resend(member, "Resend")}</span>
            ) : (
              <LinkAs href={member.href} aria-label={`Open ${member.name}`} className="text-text-muted hover:text-text">
                <Icon name="chevronRight" size={14} strokeWidth={1.6} />
              </LinkAs>
            )}
          </li>
        ))}
      </ul>

      <table className="hidden w-full border-collapse xl:table">
        <thead>
          <tr className="border-b border-border-subtle">
            {["Person", "Role", "App code", "Last active"].map((label) => (
              <th key={label} scope="col" className={cn(head, "py-2.5 text-left", label === "Person" ? "w-2/5" : "pl-3")}>
                {label}
              </th>
            ))}
            <th scope="col" className="w-6">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const selected = member.id === selectedId;
            return (
              <tr key={member.id} className={cn("border-b border-border-subtle last:border-b-0", selected && "bg-sage-50 dark:bg-surface-subtle")}>
                <td className={cn("py-3", selected && "rounded-l-sm pl-2.5")}>
                  <span className="flex items-center gap-3">
                    {avatar(member)}
                    <span className="flex min-w-0 flex-col">
                      <span className="text-14 leading-5 font-semibold text-text">
                        {member.invited ? (
                          member.name
                        ) : (
                          <LinkAs href={member.href} className="hover:underline">
                            {member.name}
                          </LinkAs>
                        )}
                        {member.you && <span className="font-regular text-text-muted"> · you</span>}
                      </span>
                      <span className="text-xs leading-xs text-text-muted">
                        {member.email}
                        {member.invited && ` · ${member.invited}`}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="py-3 pl-3">
                  <span className="flex flex-col items-start gap-1">
                    <RoleChip member={member} />
                    {member.roleNote && <span className="text-11 leading-3.5 text-text-muted">{member.roleNote}</span>}
                  </span>
                </td>
                <td className={cn("py-3 pl-3 text-sm leading-4.5 font-semibold", member.appCode ? "text-brand" : "text-warning-text")}>{member.appCode ? "On" : "Not set up"}</td>
                <td className="py-3 pl-3 text-sm leading-4.5 text-text-secondary">{member.invited ? resend(member, "Resend invite") : member.lastActive}</td>
                <td className={cn("py-3 text-right", selected && "rounded-r-sm pr-2.5")}>
                  {!member.invited && (
                    <LinkAs href={member.href} aria-label={`Open ${member.name}`} className={cn("inline-flex", selected ? "text-text" : "text-text-muted hover:text-text")}>
                      <Icon name="chevronRight" size={14} strokeWidth={1.6} />
                    </LinkAs>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
