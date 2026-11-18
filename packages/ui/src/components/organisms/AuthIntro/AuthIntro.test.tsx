import { render, screen } from "@testing-library/react";

import { AuthIntro } from "./AuthIntro";

describe("AuthIntro", () => {
  it("renders the title as the page heading with its lede", () => {
    render(
      <AuthIntro
        title={
          <>
            Sign in or <em>join</em>
          </>
        }
        description="Use your phone number."
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Sign in or join" })).toBeInTheDocument();
    expect(screen.getByText("Use your phone number.")).toBeInTheDocument();
  });

  it("renders the back link through linkAs, the status and the icon", () => {
    function AppLink(props: { href: string; children?: React.ReactNode }) {
      return <a data-app-link {...props} />;
    }
    const { container } = render(
      <AuthIntro
        title="Verify your email"
        description="We sent a link."
        back={{ href: "/auth/sign-in", label: "Back to sign in" }}
        status="Account created"
        icon="mailCheck"
        linkAs={AppLink}
        titleClassName="mt-4"
      />,
    );
    const back = screen.getByRole("link", { name: "Back to sign in" });
    expect(back).toHaveAttribute("data-app-link");
    expect(screen.getByRole("status")).toHaveTextContent("Account created");
    expect(container.querySelector('[data-icon="mailCheck"]')).not.toBeNull();
    expect(screen.getByRole("heading")).toHaveClass("mt-4");
  });
});
