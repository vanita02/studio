
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AllData } from "@/types/career-compass";
import { Briefcase, Target, Building } from "lucide-react";

type Step4Props = {
  data: AllData;
};

export function Step4Jobs({ data }: Step4Props) {
  const { goalDefinition, jobOpportunities } = data;

  if (!goalDefinition || !jobOpportunities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Job Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Job opportunity suggestions are not available.</p>
        </CardContent>
      </Card>
    );
  }

  const sortedJobs = [...jobOpportunities.jobOpportunities].sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="text-primary" />
            Job Opportunity Matches
          </CardTitle>
          <CardDescription>
            Based on your profile, here are some job opportunities that could be
            a great fit for you.
          </CardDescription>
        </CardHeader>
      </Card>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {sortedJobs.map((job, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={job.title + job.company}
            className="border-b-0"
          >
            <Card className="overflow-hidden">
              <AccordionTrigger className="p-6 hover:no-underline hover:bg-muted/50">
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4" /> {job.company}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={job.relevanceScore} className="w-32" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {job.relevanceScore}% Match
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <p className="mb-4 text-sm">{job.description}</p>
                <div className="rounded-lg border bg-background p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Why it's a good match
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {job.reasonForMatch}
                  </p>
                </div>
                {job.link && (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline mt-4 inline-block"
                  >
                    View Job Posting &rarr;
                  </a>
                )}
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
