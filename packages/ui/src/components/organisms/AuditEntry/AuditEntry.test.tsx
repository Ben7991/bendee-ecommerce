import { render, screen } from "@testing-library/react";

import { AuditEntry } from "./AuditEntry";
import { ENTRY } from "./data";

describe("AuditEntry", () => {
  it("shows who, when and each change before → after", () => {
    render(<AuditEntry {...ENTRY} />);
    expect(screen.getByRole("link", { name: "Open zone ›" })).toHaveAttribute("href", "/delivery?zone=accra-central");
    expect(screen.getByText("154.160.12.48")).toBeInTheDocument();
    expect(screen.getByText("11:00").tagName).toBe("DEL");
    expect(screen.getByText("12:00").tagName).toBe("INS");
    expect(screen.getByText("Entries can’t be edited or deleted")).toBeInTheDocument();
  });
});
