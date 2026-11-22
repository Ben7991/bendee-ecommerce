import { fireEvent, render, screen } from "@testing-library/react";

import { DiscountEditor } from "./DiscountEditor";
import { editorProps } from "./fixtures";

const field = (container: HTMLElement, name: string) => container.querySelector<HTMLInputElement>(`input[name="${name}"]`)!;

describe("DiscountEditor", () => {
  it("describes the discount in plain words and previews checkout", () => {
    render(<DiscountEditor {...editorProps} />);
    expect(screen.getByText(/20% off Greens Daily, up to GHS 60, for anyone with code/)).toBeInTheDocument();
    expect(screen.getByText("− GHS 52")).toBeInTheDocument();
    expect(screen.getByText("GHS 233")).toBeInTheDocument();
    expect(screen.getByText("136 left")).toBeInTheDocument();
  });

  it("rewrites the summary and hidden values as you edit", () => {
    const { container } = render(<DiscountEditor {...editorProps} />);
    fireEvent.change(screen.getByRole("spinbutton", { name: /Percentage off/ }), { target: { value: "15" } });
    expect(field(container, "value")).toHaveValue("15");
    expect(screen.getAllByText(/15% off Greens Daily/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("radio", { name: "Fixed amount" }));
    expect(field(container, "type")).toHaveValue("fixed");
    fireEvent.click(screen.getByRole("button", { name: "Remove Greens Daily" }));
    expect(field(container, "targets")).toHaveValue("[]");
  });

  it("switches to an automatic offer with a name", () => {
    const { container } = render(<DiscountEditor {...editorProps} />);
    fireEvent.click(screen.getByRole("radio", { name: "Automatic" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Offer name" }), { target: { value: "Greens week" } });
    expect(field(container, "method")).toHaveValue("automatic");
    expect(field(container, "name")).toHaveValue("Greens week");
  });

  it("has Pause and Duplicate submit intents", () => {
    render(<DiscountEditor {...editorProps} />);
    expect(screen.getByRole("button", { name: "Pause" })).toHaveAttribute("value", "pause");
    expect(screen.getByRole("button", { name: "Duplicate" })).toHaveAttribute("value", "duplicate");
  });
});
