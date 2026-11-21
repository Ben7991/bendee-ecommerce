import { fireEvent, render, screen } from "@testing-library/react";

import { sampleFlow } from "./fixtures";
import { FlowEditor } from "./FlowEditor";

const field = (container: HTMLElement, name: string) => container.querySelector<HTMLInputElement>(`input[name="${name}"]`)!;

describe("FlowEditor", () => {
  it("fills the preview from the sample and keeps values in hidden inputs", () => {
    const { container } = render(<FlowEditor {...sampleFlow} />);
    expect(screen.getAllByText(/Hi Akua, you left Greens Daily and Ashwagandha Calm/).length).toBeGreaterThan(0);
    expect(screen.getByText("A cart goes quiet for 60 min")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Cart value at least" }), { target: { value: "30" } });
    expect(JSON.parse(field(container, "conditions").value).minCart).toBe("30");
    expect(screen.getByText(/Cart ≥ GHS 30/)).toBeInTheDocument();
  });

  it("edits the message and toggles channels", () => {
    const { container } = render(<FlowEditor {...sampleFlow} />);
    fireEvent.click(screen.getAllByRole("button", { name: "Edit message" })[0]!);
    fireEvent.change(screen.getByRole("textbox", { name: "Headline" }), { target: { value: "Still thinking?" } });
    expect(field(container, "headline")).toHaveValue("Still thinking?");
    fireEvent.click(screen.getByRole("button", { name: /SMS/ }));
    expect(JSON.parse(field(container, "channels").value)).toEqual(["whatsapp", "email"]);
  });

  it("switches the preview channel and has a Send test intent", () => {
    render(<FlowEditor {...sampleFlow} />);
    fireEvent.click(screen.getByRole("tab", { name: "Email" }));
    expect(screen.getByText("You left something behind", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send test" })).toHaveAttribute("value", "test");
  });
});
