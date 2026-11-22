import { fireEvent, render, screen } from "@testing-library/react";

import { TEMPLATE_ARGS } from "./data";
import { TemplateEditor } from "./TemplateEditor";

describe("TemplateEditor", () => {
  it("fills the preview from the sample and counts SMS parts", () => {
    render(<TemplateEditor {...TEMPLATE_ARGS} />);
    expect(screen.getByText(/Hi Efua, your Jofak order JFK-251496/)).toBeInTheDocument();
    expect(screen.getByText("1 SMS · GHS 0.03")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Message text"), { target: { value: "x".repeat(200) } });
    expect(screen.getByText("2 SMS · GHS 0.06")).toBeInTheDocument();
  });

  it("inserts a detail and restores the default", () => {
    render(<TemplateEditor {...TEMPLATE_ARGS} />);
    const area = screen.getByLabelText<HTMLTextAreaElement>("Message text");
    fireEvent.change(area, { target: { value: "Hi " } });
    area.setSelectionRange(3, 3);
    fireEvent.click(screen.getByRole("button", { name: "{first_name}" }));
    expect(area.value).toBe("Hi {first_name}");
    fireEvent.click(screen.getByRole("button", { name: "Restore default" }));
    expect(area.value).toBe(TEMPLATE_ARGS.defaultBody);
  });

  it("sends a test with intent=test", () => {
    render(<TemplateEditor {...TEMPLATE_ARGS} />);
    expect(screen.getByRole("button", { name: "Send test" })).toHaveAttribute("value", "test");
    expect(screen.getByRole("link", { name: "SMS" })).toHaveAttribute("aria-current", "page");
  });
});
