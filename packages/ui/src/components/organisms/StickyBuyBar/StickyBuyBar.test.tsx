import { render, screen } from "@testing-library/react";

import { StickyBuyBar } from "./StickyBuyBar";

describe("StickyBuyBar", () => {
  it("shows the price and the actions", () => {
    render(<StickyBuyBar price={450} compareAt={520} actions={<button type="button">Buy now</button>} className="mt-4" />);
    const bar = screen.getByRole("button", { name: "Buy now" }).closest("[data-slot=sticky-buy-bar]");
    expect(bar).toHaveClass("mt-4");
    expect(bar).toHaveTextContent("Now GHS 450was GHS 520");
  });
});
