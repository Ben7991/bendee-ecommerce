import { render, screen } from "@testing-library/react";

import { NotFoundHero } from "./NotFoundHero";

const props = {
  eyebrow: "Page not found",
  title: "This page has wandered off",
  description: { short: "Short.", full: "Full." },
  primaryAction: { label: "Back to homepage", href: "/" },
  secondaryAction: { label: "Shop all supplements", href: "/shop" },
  quickLinks: [{ label: "Bestsellers", href: "/collections/bestsellers" }],
};

describe("NotFoundHero", () => {
  it("names the page and offers ways out", () => {
    render(<NotFoundHero {...props} className="mt-4" />);
    expect(screen.getByRole("heading", { level: 1, name: "This page has wandered off" })).toBeInTheDocument();
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Shop all supplements" })).toHaveAttribute("href", "/shop");
    expect(screen.getByRole("navigation", { name: "Popular pages" })).toContainElement(
      screen.getByRole("link", { name: "Bestsellers" }),
    );
    expect(screen.getByRole("region", { name: "This page has wandered off" })).toHaveClass("mt-4");
  });

  it("uses the app's link component", () => {
    function AppLink(p: { href: string; children?: React.ReactNode }) {
      return <a data-app-link {...p} />;
    }
    render(<NotFoundHero {...props} linkAs={AppLink} />);
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("data-app-link");
  });
});
