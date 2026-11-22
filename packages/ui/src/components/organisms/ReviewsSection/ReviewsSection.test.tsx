import { render, screen } from "@testing-library/react";

import { ReviewsSection } from "./ReviewsSection";

describe("ReviewsSection", () => {
  it("pairs each stat with its label", () => {
    render(
      <ReviewsSection
        eyebrow="Real results"
        title="Small rituals"
        stats={[{ value: "93%", label: "sleep better within 3 weeks" }]}
        reviews={[
          { quote: "A", author: "Amara O.", detail: "Buyer" },
          { quote: "B", author: "Daniel K.", detail: "Subscriber" },
        ]}
      />,
    );
    expect(screen.getByRole("term")).toHaveTextContent("sleep better within 3 weeks");
    expect(screen.getByRole("definition")).toHaveTextContent("93%");
    expect(screen.getAllByRole("figure")).toHaveLength(2);
  });
});
