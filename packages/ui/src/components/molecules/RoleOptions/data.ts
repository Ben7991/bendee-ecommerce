import type { RoleOptionsProps } from "./RoleOptions";

export const OPTIONS: RoleOptionsProps["options"] = [
  { value: "owner", label: "Owner", description: "Use “Transfer ownership” — needs your app code", disabled: true },
  { value: "admin", label: "Admin", description: "Everything except managing staff" },
  { value: "fulfilment", label: "Fulfilment", description: "Pack orders, hand them to the courier, adjust stock" },
];
