
"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  Goal,
  Lightbulb,
  Briefcase,
  FolderGit2,
  Rocket,
} from "lucide-react";

const steps = [
  { name: "Define Goals", icon: Goal },
  { name: "Skill Pathways", icon: Lightbulb },
  { name: "Portfolio Projects", icon: FolderGit2 },
  { name: "Job Opportunities", icon: Briefcase },
  { name: "Your Roadmap", icon: Rocket },
];

type ProgressBarProps = {
  currentStep: number;
};

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-x-8 md:space-y-0"
      >
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = currentStep > stepIndex;
          const isCurrent = currentStep === stepIndex;

          return (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4",
                  isCompleted
                    ? "border-primary"
                    : isCurrent
                    ? "border-primary"
                    : "border-border"
                )}
              >
                <span
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    isCompleted
                      ? "text-primary"
                      : isCurrent
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      isCompleted
                        ? "bg-primary"
                        : isCurrent
                        ? "border-2 border-primary bg-background"
                        : "border-2 border-border bg-background"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <span
                        className={cn(
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {stepIndex}
                      </span>
                    )}
                  </span>
                  <step.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{step.name}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
