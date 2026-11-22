import { render, screen } from "@testing-library/react";

import { MinimalShell } from "./MinimalShell";

describe("MinimalShell", () => {
  it("frames the content with logo, help link and footer", () => {
    render(
      <MinimalShell helpHref="https://wa.me/233000000000" copyright="© 2026 Jofak" tagline="Accra" className="mt-4">
        <h1>Oops</h1>
      </MinimalShell>,
    );
    expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "Oops" }));
    expect(screen.getByRole("link", { name: "Jofak home" })).toHaveAttribute("href", "/");
    const help = screen.getAllByRole("link", { name: "Chat on WhatsApp" });
    expect(help).toHaveLength(2);
    expect(help[0]).toHaveAttribute("target", "_blank");
    expect(screen.getByText("© 2026 Jofak")).toBeInTheDocument();
  });
});
