import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@repo/ui/atoms";
import { ListSearch, SelectPill } from "@repo/ui/molecules";
import { AuditEntry, AuditLog } from "@repo/ui/organisms";

import { AREAS, auditEntries, dayLabel, roleLabel, staffById, team, type AuditEntry as Entry } from "../../../../_content/admin-team";
import { SettingsForm } from "../../_components/settings";
import { SettingsSections } from "../_nav";

export type AuditFilters = { q?: string; who?: string; area?: string; days?: string; filters?: string };

const DAYS = [
  { value: "1", label: "Today" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "all", label: "Everything" },
];

/** "updated delivery zone *Accra Central*" → names in bold, `codes` in mono. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*|`[^`]+`)/).map((part, index) =>
    part.startsWith("*") ? (
      <strong key={index} className="font-semibold">
        {part.slice(1, -1)}
      </strong>
    ) : part.startsWith("`") ? (
      <code key={index} className="font-mono font-semibold">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

/** "Open zone" → "Open Accra Central zone", naming the thing changed. */
function openLabel(entry: Entry) {
  const label = entry.open?.label ?? "";
  const what = label.replace(/^Open /, "");
  const subject = entry.action.match(/\*([^*]+)\*|`([^`]+)`/);
  const name = subject?.[1] ?? subject?.[2];
  if (!name || what.includes(" ") || what === "staff") return label;
  return name.toLowerCase() === what ? `Open ${name}` : `Open ${name} ${what}`;
}

export const query = (filters: AuditFilters, extra: Record<string, string> = {}) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...filters, ...extra })) if (value && key !== "filters") params.set(key, value);
  const text = params.toString();
  return text ? `?${text}` : "";
};

export function entryDetail(entry: Entry, compactHeader = false) {
  const person = staffById(entry.by);
  const date = new Date(Date.now() - entry.day * 86_400_000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Accra" }).replace("Sept", "Sep");
  return (
    <AuditEntry
      linkAs={Link}
      compactHeader={compactHeader}
      eyebrow={entry.eyebrow}
      title={entry.title}
      open={entry.open}
      meta={[
        { label: "By", value: `${person?.name ?? entry.by} · ${person ? roleLabel(person.role) : ""}` },
        { label: "When", value: `${date}, ${entry.seconds}` },
        { label: "Device", value: entry.device },
        { label: "IP address", value: entry.ip, mono: true },
      ]}
      changes={entry.changes}
      note={entry.note}
    />
  );
}

/**
 * The audit log (Paper "Jofak - Admin" → Settings → Audit log / Audit entry). From 1280px it is
 * the list with the selected entry beside it; below that the log page is the list and an entry
 * page is just the entry.
 */
export function AuditView({ filters, selectedId, entryPage = false }: { filters: AuditFilters; selectedId?: string; entryPage?: boolean }) {
  const entries = auditEntries(filters);
  const selected = team().audit.find((entry) => entry.id === selectedId) ?? entries[0];
  const groups = [...new Set(entries.map((entry) => entry.day))].map((day) => ({
    label: dayLabel(day),
    entries: entries
      .filter((entry) => entry.day === day)
      .map((entry) => {
        const person = staffById(entry.by);
        return {
          id: entry.id,
          time: entry.time,
          who: person?.name ?? entry.by,
          tone: person?.tone ?? ("neutral" as const),
          text: (
            <>
              <strong className="font-semibold">{person?.name}</strong> {rich(entry.action)}
            </>
          ),
          area: entry.area,
          areaTone: entry.areaTone,
          detail: entry.detail,
          href: `/admin/settings/audit/${entry.id}${query(filters)}`,
          selected: entry.id === selected?.id,
        };
      }),
  }));
  const daysLabel = DAYS.find((day) => day.value === (filters.days ?? "7"))?.label ?? "Last 7 days";
  const exportHref = `/admin/settings/audit/export.csv${query(filters)}`;
  const exportButton = (
    <a href={exportHref} download className="flex h-11 items-center gap-2 rounded-full border border-border px-4.5 text-base leading-5 font-semibold text-text hover:bg-surface-subtle">
      <Icon name="download" size={14} strokeWidth={1.8} />
      Export CSV
    </a>
  );
  const staff = team().staff.filter((person) => person.status !== "invited");

  const top = (
    <div className={entryPage ? "hidden flex-col gap-3.5 xl:flex" : "flex flex-col gap-3.5 md:gap-4"}>
      <div className="hidden items-end justify-between gap-4 xl:flex">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-22 leading-7 font-semibold tracking-tight text-text">Audit log</h2>
          <p className="text-sm leading-4.5 text-text-muted">Every change made by staff · read-only · kept for 2 years</p>
        </div>
        <p className="text-sm leading-4.5 text-text-muted">1,284 entries this month</p>
      </div>
      <ListSearch
        linkAs={Link}
        action="/admin/settings/audit"
        label="Search the audit log"
        placeholder="Search order, product, code…"
        defaultQuery={filters.q}
        fieldClassName="border-transparent bg-surface-subtle md:h-10 xl:h-10 xl:flex-1"
        className="flex-wrap md:flex-nowrap"
      >
        <span className={filters.filters ? "flex w-full gap-2 md:contents" : "hidden gap-2 md:contents"}>
          <SelectPill label="Who" name="who" autoSubmit defaultValue={filters.who ?? ""} options={[{ value: "", label: "Anyone" }, ...staff.map((person) => ({ value: person.id, label: person.name }))]} />
          <SelectPill label="Area" name="area" autoSubmit defaultValue={filters.area ?? ""} options={[{ value: "", label: "All areas" }, ...AREAS.map((area) => ({ value: area, label: area }))]} />
          <SelectPill label="Period" name="days" autoSubmit defaultValue={filters.days ?? "7"} options={DAYS} />
        </span>
      </ListSearch>
    </div>
  );
  const detail = selected ? entryDetail(selected, entryPage) : <p className="text-sm leading-4.5 text-text-muted">This entry doesn’t exist.</p>;

  return (
    <SettingsForm
      asForm={false}
      pageTitle={entryPage && selected ? selected.title : "Audit log"}
      tabletTitle
      readOnly
      detail={entryPage}
      summary={
        entryPage && selected ? (
          `${selected.eyebrow.replace(/· (\w)/g, (match, letter: string) => `· ${letter.toLowerCase()}`)} · ${selected.time}`
        ) : (
          <>
            Read-only · kept for 2 years<span className="hidden md:inline"> · 1,284 entries this month</span>
          </>
        )
      }
      summaryTone="muted"
      backHref={entryPage ? `/admin/settings/audit${query(filters)}` : "/admin/settings"}
      backLabel={entryPage ? "Audit log" : "Settings"}
      nav={<SettingsSections active="/admin/settings/audit" />}
      headerAction={exportButton}
      mobileBar={
        entryPage ? (
          selected?.open ? (
            <Link href={selected.open.href} className="flex h-12 w-full items-center justify-center rounded-full border border-border text-base leading-5 font-semibold text-text">
              {openLabel(selected)}
            </Link>
          ) : undefined
        ) : (
          <>
            <Link
              href={`/admin/settings/audit${query(filters)}${filters.filters ? "" : `${query(filters) ? "&" : "?"}filters=1`}`}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-base leading-5 font-semibold text-on-primary"
            >
              <Icon name="filter" size={15} strokeWidth={1.6} />
              Filters · {daysLabel}
            </Link>
            <a href={exportHref} download aria-label="Export CSV" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-text">
              <Icon name="download" size={16} strokeWidth={1.8} />
            </a>
          </>
        )
      }
    >
      {entryPage && selected && (
        <div className="-mt-2 flex flex-col gap-1.5 md:hidden">
          <h2 className="text-28 leading-3xl font-semibold tracking-tight text-text">{selected.title}</h2>
          <p className="flex items-center gap-1.5 text-sm leading-4.5 font-medium text-text-secondary">
            <span aria-hidden className="size-2 rounded-full bg-text-muted" />
            {selected.eyebrow.replace(/· (\w)/g, (match, letter: string) => `· ${letter.toLowerCase()}`)} · {selected.time}
          </p>
        </div>
      )}
      {top}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <AuditLog linkAs={Link} groups={groups} className={entryPage ? "hidden xl:flex xl:flex-1" : "xl:flex-1"} />
        {(entryPage || selected) && <div className={entryPage ? "xl:w-85 xl:shrink-0" : "hidden xl:block xl:w-85 xl:shrink-0"}>{detail}</div>}
      </div>
    </SettingsForm>
  );
}
