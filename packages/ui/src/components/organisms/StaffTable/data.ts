import type { StaffMember } from "./StaffTable";

export const MEMBERS: StaffMember[] = [
  { id: "abena", name: "Abena Mensah", tone: "sage", email: "abena@jofak.com", role: "Owner", owner: true, you: true, appCode: true, lastActive: "Now", href: "/staff/abena" },
  { id: "akosua", name: "Akosua Owusu", tone: "citrus", email: "akosua@jofak.com", role: "Fulfilment", appCode: true, lastActive: "12 min ago", href: "/staff/akosua" },
  { id: "ama", name: "Ama Serwaa", tone: "neutral", email: "ama@jofak.com", role: "Support", roleNote: "Refunds up to GHS 200", appCode: true, lastActive: "Today 09:14", href: "/staff/ama" },
  { id: "nana", name: "Nana Adjei", tone: "neutral", email: "nana@jofak.com", role: "Marketing", appCode: false, lastActive: "", invited: "invite sent 2 days ago", href: "/staff/nana" },
];
