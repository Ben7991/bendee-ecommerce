import { render, screen } from "@testing-library/react";

import { QuizBanner } from "./QuizBanner";

describe("QuizBanner", () => {
  it("is a labelled region with both CTAs", () => {
    render(
      <QuizBanner
        eyebrow="Personalised for you"
        title={
          <>
            Not sure where to start? <em>Ask your body.</em>
          </>
        }
        lede={{ short: "12 quick questions.", full: "Answer 12 quick questions." }}
        action={<a href="/quiz">Start the Free Quiz</a>}
        compactAction={<a href="/quiz">Start the free quiz</a>}
        note="Takes about 2 minutes"
      />,
    );
    expect(screen.getByRole("region", { name: "Not sure where to start? Ask your body." })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
