import { render, screen } from "@testing-library/react";

import { AuthShell } from "./AuthShell";

describe("AuthShell", () => {
  it("renders the form in main and the brand copy", () => {
    render(
      <AuthShell headline="Your wellness, one tap away" benefits={["Track every order"]}>
        <h1>Sign in</h1>
      </AuthShell>,
    );
    expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "Sign in" }));
    expect(screen.getAllByText("Your wellness, one tap away")).toHaveLength(2);
    expect(screen.getByText("Track every order")).toBeInTheDocument();
  });

  it("links the logo home and the close button out, through linkAs", () => {
    function AppLink(props: { href: string; children?: React.ReactNode }) {
      return <a data-app-link {...props} />;
    }
    render(
      <AuthShell headline="x" linkAs={AppLink} closeHref="/shop" className="mt-4">
        form
      </AuthShell>,
    );
    expect(screen.getByRole("link", { name: "Close" })).toHaveAttribute("href", "/shop");
    expect(screen.getAllByRole("link", { name: "Jofak home" })[0]).toHaveAttribute("data-app-link");
  });

  it("can hide the mobile logo bar", () => {
    render(
      <AuthShell headline="x" mobileHeader={false}>
        form
      </AuthShell>,
    );
    expect(screen.queryByRole("link", { name: "Close" })).not.toBeInTheDocument();
  });
});
