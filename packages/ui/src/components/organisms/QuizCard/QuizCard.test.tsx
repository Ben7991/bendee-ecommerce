import { render, screen } from "@testing-library/react";

import { QuizCard } from "./QuizCard";

describe("QuizCard", () => {
  it("shows progress and a labelled answer group", () => {
    render(
      <QuizCard
        step={4}
        totalSteps={12}
        question="How do you usually feel when you wake up?"
        choices={[{ value: "rested", label: "Rested and ready to go" }]}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "Quiz progress" })).toHaveAttribute("aria-valuenow", "33");
    expect(screen.getByRole("radiogroup", { name: "How do you usually feel when you wake up?" })).toBeInTheDocument();
  });
});
