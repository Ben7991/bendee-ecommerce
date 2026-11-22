import { render, screen } from "@testing-library/react";

import { AdminCard } from "./AdminCard";

describe("AdminCard", () => {
  it("is a region named by its title", () => {
    render(
      <AdminCard title="Status" variant="eyebrow" meta={<a href="#">Schedule</a>} className="mt-4">
        <p>Visible on the store.</p>
      </AdminCard>,
    );
    const region = screen.getByRole("region", { name: "Status" });
    expect(region).toHaveClass("mt-4");
    expect(screen.getByRole("heading", { name: "Status" })).toHaveClass("uppercase");
    expect(screen.getByRole("link", { name: "Schedule" })).toBeInTheDocument();
  });
});
