import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "../../../lib";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it("renders link columns, newsletter forms and theme switches", () => {
    render(
      <ThemeProvider>
        <SiteFooter
          newsletterTitle="Wellness notes"
          newsletterHint="Get 15% off."
          tagline="Clean supplements."
          columns={[{ title: "Shop", links: [{ label: "Bundles", href: "/bundles" }] }]}
          copyright="© 2026 Jofak. All rights reserved."
          shortCopyright="© 2026 Jofak"
          disclaimer="*Not evaluated by the FDA."
        />
      </ThemeProvider>,
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Bundles" })).toHaveAttribute("href", "/bundles");
    expect(screen.getAllByRole("radiogroup", { name: "Theme" })).toHaveLength(2);
    expect(screen.getAllByRole("form", { name: "Newsletter sign-up" })).toHaveLength(2);
  });
});
