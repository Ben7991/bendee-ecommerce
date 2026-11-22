import { render, screen } from "@testing-library/react";

import { PromoStrip } from "./PromoStrip";

describe("PromoStrip", () => {
  it("renders a labelled banner with its action", () => {
    render(
      <PromoStrip
        eyebrow="Subscribe & save"
        title={
          <>
            Build a routine, <em>save 20%</em>
          </>
        }
        action={<a href="/bundles">Build my bundle</a>}
        className="mt-4"
      />,
    );
    const region = screen.getByRole("region", { name: "Subscribe & save" });
    expect(region).toHaveClass("mt-4");
    expect(region).toHaveTextContent("Build a routine, save 20%");
    expect(screen.getByRole("link", { name: "Build my bundle" })).toBeInTheDocument();
  });
});
