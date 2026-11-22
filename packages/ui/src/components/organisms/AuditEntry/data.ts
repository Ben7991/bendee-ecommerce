import type { AuditEntryProps } from "./AuditEntry";

export const ENTRY: AuditEntryProps = {
  eyebrow: "Settings · Delivery zone",
  title: "Updated Accra Central",
  open: { label: "Open zone", href: "/delivery?zone=accra-central" },
  meta: [
    { label: "By", value: "Abena Mensah · Owner" },
    { label: "When", value: "16 Nov 2026, 10:42:18" },
    { label: "IP address", value: "154.160.12.48", mono: true },
  ],
  changes: [
    { label: "Express · order before", before: "11:00", after: "12:00" },
    { label: "Express · fee", before: "GHS 40", after: "GHS 45" },
  ],
};
