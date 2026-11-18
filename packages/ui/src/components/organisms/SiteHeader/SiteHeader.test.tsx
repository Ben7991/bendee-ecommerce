import { render, screen, within } from "@testing-library/react";

import { SiteHeader } from "./SiteHeader";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

describe("SiteHeader", () => {
  it("renders the menu slot in place of the plain menu button", () => {
    render(<SiteHeader navLinks={navLinks} menu={<button type="button">My menu</button>} />);
    expect(screen.getByRole("button", { name: "My menu" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Open menu" })).not.toBeInTheDocument();
  });

  it("marks the active section and labels icon links with counts", () => {
    render(<SiteHeader navLinks={navLinks} activeHref="/" favouritesCount={6} bagCount={3} />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Favourites, 6 items" })).toHaveAttribute("href", "/wishlist");
    expect(screen.getByRole("link", { name: "Bag, 3 items" })).toHaveAttribute("href", "/cart");
  });

  it("uses the app's link component", () => {
    function AppLink(props: { href: string; children?: React.ReactNode }) {
      return <a data-app-link {...props} />;
    }
    render(<SiteHeader navLinks={navLinks} linkAs={AppLink} />);
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("data-app-link");
  });

  it("has a menu button for smaller screens", () => {
    render(<SiteHeader navLinks={navLinks} />);
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("marks the favourites button on the favourites page", () => {
    render(<SiteHeader navLinks={[]} favouritesCount={6} favouritesActive />);
    expect(screen.getByRole("link", { name: "Favourites, 6 items" })).toHaveAttribute("aria-current", "page");
  });
});
