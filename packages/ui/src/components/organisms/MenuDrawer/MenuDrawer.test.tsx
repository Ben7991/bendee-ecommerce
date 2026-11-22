import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuDrawer, type MenuDrawerProps } from "./MenuDrawer";

const props: MenuDrawerProps = {
  activeHref: "/shop",
  primaryLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections", badge: "Sale" },
  ],
  needs: [{ label: "Immunity", href: "/collections/immunity" }],
  promo: { href: "/collections/reset", eyebrow: "Ends Sat 31 Jan", title: "The Harmattan reset", description: "Up to 20% off" },
  secondaryLinks: [{ label: "Favourites", href: "/wishlist", icon: "heart", meta: "6 saved" }],
  help: { prompt: "Need help?", label: "Chat on WhatsApp", href: "https://wa.me/0" },
};

describe("MenuDrawer", () => {
  beforeAll(() => {
    // jsdom has no matchMedia.
    window.matchMedia ??= ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
  });

  it("is closed until the menu button is pressed", async () => {
    const user = userEvent.setup();
    render(<MenuDrawer {...props} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(within(dialog).getByRole("link", { name: "Shop" })).toHaveAttribute("aria-current", "page");
    expect(within(dialog).getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
    expect(within(dialog).getByText("Sale")).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "Shop by need" })).toBeInTheDocument();
  });

  it("closes from the close button and when a link is followed", async () => {
    const user = userEvent.setup();
    render(<MenuDrawer {...props} defaultOpen />);

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "Immunity" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows sign in and create account when signed out", () => {
    render(<MenuDrawer {...props} defaultOpen signInHref="/sign-in" />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
    expect(screen.getByRole("link", { name: "Create account" })).toBeInTheDocument();
  });

  it("shows the account row when signed in", () => {
    render(
      <MenuDrawer
        {...props}
        defaultOpen
        account={{ name: "Ama Mensah", initials: "AM", summary: "My account", href: "/account" }}
      />,
    );
    expect(screen.getByRole("link", { name: /Ama Mensah/ })).toHaveAttribute("href", "/account");
    expect(screen.queryByRole("link", { name: "Sign in" })).not.toBeInTheDocument();
  });

  it("reports open changes when controlled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<MenuDrawer {...props} open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the window reaches the desktop layout", () => {
    const listeners = new Set<() => void>();
    const media = { matches: false, addEventListener: (_: string, fn: () => void) => listeners.add(fn), removeEventListener: (_: string, fn: () => void) => listeners.delete(fn) };
    const original = window.matchMedia;
    window.matchMedia = (() => media) as unknown as typeof window.matchMedia;
    try {
      render(<MenuDrawer {...props} defaultOpen />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      media.matches = true;
      act(() => listeners.forEach((fn) => fn()));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("applies a consumer className to the panel", () => {
    render(<MenuDrawer {...props} defaultOpen className="mt-4" />);
    expect(screen.getByRole("dialog")).toHaveClass("mt-4");
  });
});
