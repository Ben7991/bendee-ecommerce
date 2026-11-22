import { render, screen } from "@testing-library/react";

import { AREAS, ROLES } from "./data";
import { RolePermissions } from "./RolePermissions";

describe("RolePermissions", () => {
  it("shows access per area and role, and a summary per role", () => {
    render(<RolePermissions roles={ROLES} areas={AREAS} tableHref="?tab=roles" />);
    expect(screen.getByRole("columnheader", { name: "Catalog" })).toBeInTheDocument();
    expect(screen.getByText("≤ GHS 200")).toBeInTheDocument();
    expect(screen.getByText("Customers, returns, refunds up to a limit")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Full permission table/ })).toHaveAttribute("href", "?tab=roles");
  });

  it("drops the summary when full", () => {
    render(<RolePermissions roles={ROLES} areas={AREAS} full />);
    expect(screen.queryByText("Customers, returns, refunds up to a limit")).not.toBeInTheDocument();
  });
});
