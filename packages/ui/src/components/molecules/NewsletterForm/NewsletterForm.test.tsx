import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  it("has a labelled email field and submits it", async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    render(<NewsletterForm hint="Get 15% off your first order." onSubmit={(e) => onSubmit(e.nativeEvent as SubmitEvent)} />);
    const field = screen.getByRole("textbox", { name: "Email address" });
    expect(field).toHaveAccessibleDescription("Get 15% off your first order.");
    await userEvent.type(field, "ama@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("does not submit an empty email", async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    render(<NewsletterForm onSubmit={(e) => onSubmit(e.nativeEvent as SubmitEvent)} />);
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
