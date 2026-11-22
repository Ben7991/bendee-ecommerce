import { render, screen } from "@testing-library/react";

import { AdminShell } from "./AdminShell";

describe("AdminShell", () => {
  it("places the slots around the main content", () => {
    render(
      <AdminShell className="mt-4" sidebar={<aside>Sidebar</aside>} topBar={<header>Top bar</header>} tabBar={<nav>Tabs</nav>}>
        <p>Content</p>
      </AdminShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Content");
    expect(screen.getByRole("complementary")).toHaveTextContent("Sidebar");
    expect(screen.getByRole("banner")).toHaveTextContent("Top bar");
    expect(screen.getByRole("navigation")).toHaveTextContent("Tabs");
    expect(screen.getByRole("main").closest("[data-slot=admin-shell]")).toHaveClass("mt-4");
  });
});
