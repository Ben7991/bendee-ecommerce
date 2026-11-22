import { render, screen } from "@testing-library/react";

import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("renders the named fields and a submit button", () => {
    render(
      <ContactForm
        className="mt-4"
        topics={[
          { value: "order", label: "An existing order" },
          { value: "other", label: "Something else" },
        ]}
        note={<a href="/pages/privacy">Privacy policy</a>}
      />,
    );
    const form = screen.getByRole("form", { name: "Send us a message" });
    expect(form).toHaveClass("mt-4");
    expect(screen.getByLabelText("Your name")).toHaveAttribute("name", "name");
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("name", "phone");
    expect(screen.getByLabelText("What's it about?")).toHaveValue("order");
    expect(screen.getByLabelText(/Order number/)).toHaveAttribute("name", "order");
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(screen.getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("link", { name: "Privacy policy" })).toBeInTheDocument();
  });
});
