import { render, screen } from "@testing-library/react";

import { CartLayout } from "./CartLayout";

describe("CartLayout", () => {
  it("renders its slots in order", () => {
    const { container } = render(<CartLayout notices={<p>Notices</p>} lines={<p>Lines</p>} summary={<p>Summary</p>} className="mt-4" />);
    const text = container.textContent;
    expect(text?.indexOf("Notices")).toBeLessThan(text!.indexOf("Lines"));
    expect(text?.indexOf("Lines")).toBeLessThan(text!.indexOf("Summary"));
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
