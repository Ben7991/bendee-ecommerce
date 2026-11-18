import Link from "next/link";
import type { ReactNode } from "react";

import { Text, TextLink } from "@repo/ui/atoms";

/** "By continuing you agree to our Terms and Privacy policy." line at the foot of auth forms. */
export function LegalNote({ lead, tail, className }: { lead: string; tail?: ReactNode; className?: string }) {
  return (
    <Text size="xs" tone="muted" align="center" className={className}>
      {lead}{" "}
      <TextLink asChild tone="muted">
        <Link href="/pages/terms">Terms</Link>
      </TextLink>{" "}
      and{" "}
      <TextLink asChild tone="muted">
        <Link href="/pages/privacy">Privacy policy</Link>
      </TextLink>
      .{tail}
    </Text>
  );
}
