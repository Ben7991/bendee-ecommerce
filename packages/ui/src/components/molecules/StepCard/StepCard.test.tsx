import { render, screen } from "@testing-library/react";

import { StepCard } from "./StepCard";

describe("StepCard", () => {
  it("shows a done step with its details and edit link", () => {
    const { container } = render(
      <StepCard status="done" number={1} title="Contact" detail="Ama Mensah" editHref="/checkout/contact" className="mt-4" />,
    );
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByText("Ama Mensah")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edit contact" })).toHaveAttribute("href", "/checkout/contact");
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("shows a pending step", () => {
    render(<StepCard status="pending" number={3} title="Payment" hint="MoMo or card" />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("MoMo or card")).toBeInTheDocument();
  });
});
