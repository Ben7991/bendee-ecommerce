import type { ComponentProps } from "react";

import { cn, type LinkComponent } from "../../../lib";

export interface StaffRole {
  id: string;
  label: string;
  /** Column heading ("Catalog"). */
  short?: string;
  summary: string;
}

/** One area's access per role, in role order: "edit", "view", "none" or a limit ("≤ GHS 200"). */
export interface RoleArea {
  label: string;
  access: string[];
}

/**
 * RolePermissions (organism): what each staff role can do (Paper Jofak - Admin → Settings →
 * Staff & roles): an area × role table of Edit / View / — from 1280px, and below that a short
 * line per role with a link to the full table. `full` shows the table at every width (Roles tab).
 */
export interface RolePermissionsProps extends Omit<ComponentProps<"section">, "children"> {
  linkAs?: LinkComponent;
  roles: StaffRole[];
  areas: RoleArea[];
  /** Where "Full permission table ›" goes below 1280px. */
  tableHref?: string;
  full?: boolean;
}

export function RolePermissions({ linkAs: LinkAs = "a", roles, areas, tableHref, full = false, className, ...props }: RolePermissionsProps) {
  const head = "text-11 leading-3.5 font-semibold tracking-eyebrow text-text-muted uppercase";
  const cell = (value: string) => {
    if (value === "edit") return <span className="font-semibold text-text">Edit</span>;
    if (value === "view") return <span className="text-text-secondary">View</span>;
    if (value === "none") return <span className="text-text-muted">—</span>;
    if (value.startsWith("≤")) return <span className="font-semibold text-warning-text">{value}</span>;
    return <span className="text-text-secondary">{value}</span>;
  };

  return (
    <section data-slot="role-permissions" className={cn("flex min-w-0 flex-col gap-3 rounded-18 border border-border-subtle p-4 font-sans md:rounded-lg md:px-5 md:py-5 xl:px-6 xl:pt-5.5 xl:pb-3", className)} {...props}>
      <div className={cn("flex items-end justify-between gap-3", !full && "max-xl:items-center")}>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base leading-5 font-semibold tracking-compact text-text md:text-17 md:leading-6">
            {full ? (
              "What each role can do"
            ) : (
              <>
                <span className="xl:hidden">Roles</span>
                <span className="hidden xl:inline">What each role can do</span>
              </>
            )}
          </h2>
          <p className={cn("text-sm leading-4.5 text-text-muted", !full && "hidden xl:block")}>Fixed roles for now · custom roles come later</p>
        </div>
        {!full && tableHref && (
          <LinkAs href={tableHref} className="text-sm leading-4.5 font-semibold text-brand xl:hidden">
            <span className="md:hidden">Permissions ›</span>
            <span className="hidden md:inline">Full permission table ›</span>
          </LinkAs>
        )}
        <p className={cn("items-center gap-3 text-xs leading-xs", full ? "hidden md:flex" : "hidden xl:flex")}>
          <span className="font-semibold text-text">Edit</span>
          <span className="text-text-secondary">View</span>
          <span className="text-text-muted">— No access</span>
        </p>
      </div>

      {!full && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4 xl:hidden">
          {roles.map((role) => (
            <div key={role.id} className="contents">
              <dt className="text-sm leading-4.5 font-semibold text-text">{role.label}</dt>
              <dd className="text-sm leading-4.5 text-text-secondary md:col-span-3">{role.summary}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={cn("overflow-x-auto", !full && "hidden xl:block")}>
        <table className="w-full min-w-170 border-collapse">
          <thead>
            <tr className="border-b border-border-subtle">
              <th scope="col" className={cn(head, "py-2 text-left")}>
                Area
              </th>
              {roles.map((role) => (
                <th key={role.id} scope="col" className="w-21 py-2 text-center text-11 leading-3.5 font-semibold text-text-secondary">
                  {role.short ?? role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.label} className="border-b border-border-subtle last:border-b-0">
                <th scope="row" className="py-2.5 text-left text-sm leading-4.5 font-regular text-text">
                  {area.label}
                </th>
                {area.access.map((value, index) => (
                  <td key={roles[index]?.id ?? index} className="py-2.5 text-center text-sm leading-4.5">
                    {cell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
