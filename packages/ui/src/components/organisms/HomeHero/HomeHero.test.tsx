import { render, screen } from "@testing-library/react";

import { HomeHero } from "./HomeHero";

describe("HomeHero", () => {
  it("renders the hero landmark with its heading, rating and slots", () => {
    render(
      <HomeHero
        header={<header>nav</header>}
        rating={{ value: "4.9", count: "12,480" }}
        title={
          <>
            Feels <em>naturally</em> well.
          </>
        }
        lede={{ short: "Short lede", full: "Full lede" }}
        benefits={["Third-party tested"]}
        actions={<a href="/shop">Shop Bestsellers</a>}
        compactActions={<a href="/shop">Shop now</a>}
        showcase={<div>showcase</div>}
      />,
    );
    expect(screen.getByRole("region", { name: "Feels naturally well." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Feels naturally well.");
    expect(screen.getByText("12,480")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop Bestsellers" })).toBeInTheDocument();
  });
});
