import { render, screen } from "@testing-library/react";

import { AccountLayout } from "./AccountLayout";

describe("AccountLayout", () => {
  it("places the header, tabs, sidebar and page", () => {
    render(
      <AccountLayout
        data-testid="layout"
        className="mt-4"
        header={<header>Site</header>}
        mobileHeader={<p>App bar</p>}
        tabs={<nav aria-label="Tabs" />}
        sidebar={<p>Ama Mensah</p>}
        sidebarFooter={<button type="button">Sign out</button>}
      >
        <h1>Your orders</h1>
      </AccountLayout>,
    );
    expect(screen.getByTestId("layout")).toHaveClass("mt-4");
    expect(screen.getByText("Site").parentElement).toHaveClass("hidden", "md:block");
    expect(screen.getByText("App bar").parentElement).toHaveClass("md:hidden");
    expect(screen.getByRole("complementary")).toHaveTextContent("Ama Mensah");
    expect(screen.getByRole("heading", { name: "Your orders" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });
});
