import { render, screen } from "@testing-library/react";

import { AuditLog } from "./AuditLog";
import { GROUPS } from "./data";

describe("AuditLog", () => {
  it("groups entries by day and marks the selected one", () => {
    render(<AuditLog groups={GROUPS} />);
    expect(screen.getByRole("heading", { name: "Yesterday · Sun 15 Nov" })).toBeInTheDocument();
    expect(screen.getByRole("link", { current: "page" })).toHaveAttribute("href", "/audit/a1");
    expect(screen.getByText("Refund")).toBeInTheDocument();
  });

  it("says when nothing matches", () => {
    render(<AuditLog groups={[]} />);
    expect(screen.getByText("No changes match these filters.")).toBeInTheDocument();
  });
});
