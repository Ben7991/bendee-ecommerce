import type { AuditLogProps } from "./AuditLog";

export const GROUPS: AuditLogProps["groups"] = [
  {
    label: "Today · Mon 16 Nov",
    entries: [
      { id: "a1", time: "10:42", who: "Abena Mensah", tone: "sage", text: "Abena Mensah updated delivery zone Accra Central", area: "Settings", areaTone: "neutral", detail: "2 fields changed", href: "/audit/a1", selected: true },
      { id: "a2", time: "09:14", who: "Ama Serwaa", tone: "neutral", text: "Ama Serwaa refunded RTN-0418 to MTN MoMo", area: "Refund", areaTone: "sun", detail: "GHS 80 · within GHS 200 limit", href: "/audit/a2" },
    ],
  },
  { label: "Yesterday · Sun 15 Nov", entries: [{ id: "a3", time: "18:22", who: "Abena Mensah", tone: "sage", text: "Abena Mensah invited Nana Adjei as Marketing", area: "Staff", areaTone: "citrus", detail: "Invite sent to nana@jofak.com", href: "/audit/a3" }] },
];
