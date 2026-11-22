import { render, screen } from "@testing-library/react";

import { ContactCard } from "./ContactCard";

describe("ContactCard", () => {
  it("shows the channel, detail and note", () => {
    render(<ContactCard data-testid="card" icon="mail" title="Email" detail="hello@jofak.com" note="One working day." className="mt-4" />);
    expect(screen.getByRole("heading", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByText("hello@jofak.com")).toBeInTheDocument();
    expect(screen.getByText("One working day.")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toHaveClass("mt-4");
  });

  it("renders the feature card with its badge and action", () => {
    render(
      <ContactCard data-testid="card" tone="feature" icon="whatsapp" title="WhatsApp" detail="+233" badge="Replies in ~1 hour" action={<a href="/wa">Start a chat</a>} />,
    );
    expect(screen.getByTestId("card")).toHaveClass("bg-feature");
    expect(screen.getByText("Replies in ~1 hour")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a chat" })).toBeInTheDocument();
  });
});
