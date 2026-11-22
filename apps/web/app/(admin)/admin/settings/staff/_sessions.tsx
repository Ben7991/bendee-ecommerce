import { Icon } from "@repo/ui/atoms";

import type { Session } from "../../../../_content/admin-team";

/** Signed-in devices, each with a Sign out button (submits `intent=signout:<id>`). */
export function SessionList({ sessions, keep }: { sessions: Session[]; keep?: (session: Session) => boolean }) {
  if (sessions.length === 0) return <p className="text-sm leading-4.5 text-text-muted">Not signed in anywhere.</p>;
  return (
    <ul className="flex flex-col">
      {sessions.map((session) => (
        <li key={session.id} className="flex items-center gap-3 border-t border-border-subtle py-2.5 first:border-t-0 first:pt-0 last:pb-0">
          <span className="flex size-8.5 shrink-0 items-center justify-center rounded-10 bg-surface-subtle text-text-secondary">
            <Icon name={session.kind} size={15} strokeWidth={1.5} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm leading-4.5 font-semibold text-text">{session.device}</span>
            <span className="truncate text-xs leading-xs text-text-muted">{session.where}</span>
          </span>
          {keep?.(session) ? (
            <span className="shrink-0 text-xs leading-xs text-text-muted">This device</span>
          ) : (
            <button type="submit" name="intent" value={`signout:${session.id}`} className="shrink-0 text-sm leading-4.5 font-semibold text-text hover:underline">
              Sign out
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
