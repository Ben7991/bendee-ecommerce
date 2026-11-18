import type { ComponentProps } from "react";

import { cn } from "../../../lib";
import { ProgressBar } from "../../atoms";
import { ChoiceGroup, type Choice } from "../../molecules";

/**
 * QuizCard (organism): one wellness-quiz question with its answers. On Home it previews the
 * quiz; the answer is local state only.
 */
export interface QuizCardProps extends ComponentProps<"div"> {
  step: number;
  totalSteps: number;
  question: string;
  choices: Choice[];
  defaultValue?: string;
}

export function QuizCard({ step, totalSteps, question, choices, defaultValue, className, ...props }: QuizCardProps) {
  const progress = Math.round((step / totalSteps) * 100);
  const questionId = `quiz-question-${step}`;
  return (
    <div
      data-slot="quiz-card"
      className={cn("flex flex-col gap-5.5 rounded-xl bg-bg p-7 shadow-overlay", className)}
      {...props}
    >
      <div className="flex items-center justify-between font-sans text-sm leading-xs font-semibold">
        <p className="text-text-muted">
          Question {step} of {totalSteps}
        </p>
        <p className="text-brand" aria-hidden>
          {progress}%
        </p>
      </div>
      <ProgressBar label="Quiz progress" value={progress} />
      <p id={questionId} className="font-sans text-24 leading-2xl font-medium tracking-compact text-text">
        {question}
      </p>
      <ChoiceGroup aria-labelledby={questionId} choices={choices} defaultValue={defaultValue} />
    </div>
  );
}
