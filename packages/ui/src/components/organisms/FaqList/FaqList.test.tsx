import { fireEvent, render, screen } from "@testing-library/react";

import { FaqList, type FaqGroup } from "./FaqList";

const groups: FaqGroup[] = [
  {
    title: "Orders & delivery",
    items: [
      { id: "arrive", question: "When will my order arrive?", answer: "Kumasi takes 2–3 days.", searchText: "kumasi" },
      { id: "cancel", question: "Can I cancel my order?", answer: "Until it's packed." },
    ],
  },
  { title: "Payments", items: [{ id: "methods", question: "Which payment methods do you accept?", answer: "MoMo and cards." }] },
];

describe("FaqList", () => {
  it("opens the default question and toggles others", () => {
    render(<FaqList groups={groups} defaultOpen={["arrive"]} className="mt-4" />);
    expect(screen.getByRole("region", { name: "Frequently asked questions" })).toHaveClass("mt-4");
    expect(screen.getByRole("button", { name: "When will my order arrive?" })).toHaveAttribute("aria-expanded", "true");
    const cancel = screen.getByRole("button", { name: "Can I cancel my order?" });
    expect(cancel).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(cancel);
    expect(cancel).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Until it's packed.")).toBeVisible();
  });

  it("filters questions and hides empty groups", () => {
    render(<FaqList groups={groups} />);
    const search = screen.getByRole("searchbox", { name: "Search questions" });
    fireEvent.change(search, { target: { value: "Kumasi" } });
    expect(screen.getByRole("button", { name: "When will my order arrive?" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Can I cancel my order?" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Payments" })).not.toBeInTheDocument();
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(screen.getByRole("status")).toHaveTextContent("No questions match");
  });
});
