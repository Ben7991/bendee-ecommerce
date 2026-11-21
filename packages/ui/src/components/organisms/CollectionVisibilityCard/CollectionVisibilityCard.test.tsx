import { render, screen } from "@testing-library/react";

import { CollectionVisibilityCard } from "./CollectionVisibilityCard";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

describe("CollectionVisibilityCard", () => {
  it("shows the switches and the mobile rows", () => {
    render(
      <form>
        <CollectionVisibilityCard
          className="mt-4"
          toggles={[{ name: "listed", label: "List on Offers hub", description: "Off: link only", defaultChecked: true }]}
          rows={[{ label: "Schedule", value: "1 Nov – 15 Dec", href: "#schedule" }]}
        />
      </form>,
    );
    expect(screen.getByRole("region", { name: "Visibility" })).toHaveClass("mt-4");
    expect(screen.getByRole("switch", { name: /List on Offers hub/ })).toBeChecked();
    expect(screen.getByRole("link", { name: /Schedule/ })).toHaveAttribute("href", "#schedule");
  });
});
