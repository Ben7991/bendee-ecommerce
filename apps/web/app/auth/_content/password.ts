import type { PasswordCheck } from "@repo/ui/molecules";

/** Password rules from docs/03-customer-account.md (ACC-FR-03), unmet until someone types. */
export const PASSWORD_RULES: PasswordCheck[] = [
  { label: "8+ characters", met: false },
  { label: "Not found in known data leaks", met: false },
];
