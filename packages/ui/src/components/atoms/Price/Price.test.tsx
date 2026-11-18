import { render, screen } from "@testing-library/react";

import { formatPrice, Price } from "./Price";

describe("Price", () => {
  it("formats cedis", () => {
    expect(formatPrice(450)).toBe("GHS 450");
    expect(formatPrice(1250.5)).toBe("GHS 1,250.5");
  });

  it("shows the compare-at price only when it is higher", () => {
    const { rerender } = render(<Price amount={450} compareAt={520} />);
    expect(screen.getByText("GHS 520", { exact: false }).tagName).toBe("S");
    rerender(<Price amount={450} compareAt={400} />);
    expect(screen.queryByText("GHS 400", { exact: false })).toBeNull();
  });
});
