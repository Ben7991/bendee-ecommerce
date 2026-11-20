import { render, screen } from "@testing-library/react";

import { AdminPageHeader } from "./AdminPageHeader";

describe("AdminPageHeader", () => {
  it("renders the context line, title with its serif word and actions", () => {
    render(
      <AdminPageHeader
        eyebrow="Sunday, 15 November · Accra"
        title="Good morning,"
        highlight="Abena"
        actions={<button type="button">Add product</button>}
        className="mt-4"
      />,
    );
    const heading = screen.getByRole("heading", { level: 1, name: "Good morning, Abena" });
    expect(heading.closest("[data-slot=admin-page-header]")).toHaveClass("mt-4");
    expect(screen.getByText("Abena").tagName).toBe("EM");
    expect(screen.getByText("Sunday, 15 November · Accra")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add product" })).toBeInTheDocument();
  });
});
