
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AllData } from "@/types/career-compass";
import { Lightbulb, BookOpen, Star } from "lucide-react";

type Step2Props = {
  data: AllData;
};

export function Step2Skills({ data }: Step2Props) {
  const { goalDefinition, skillPathways } = data;

  if (!goalDefinition || !skillPathways) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Skill Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Skill pathway information is not available.</p>
        </CardContent>
      </Card>
    );
  }

  const userSkills = new Set(
    goalDefinition.skills
      .toLowerCase()
      .split(",")
      .map((s) => s.trim())
  );
  const suggestedSkills = skillPathways.skillPathways.map((p) => p.skill);
  const skillGap = suggestedSkills.filter(
    (skill) => !userSkills.has(skill.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary" />
            Your Skill Development Pathway
          </CardTitle>
          <CardDescription>
            Based on your goal to become a {goalDefinition.careerGoal}, here are
            the recommended skills to focus on.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Your Current Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(userSkills).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Recommended Skills to Build</h3>
            <div className="flex flex-wrap gap-2">
              {skillGap.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillPathways.skillPathways.map((pathway) => (
          <Card
            key={pathway.skill}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {pathway.skill}
              </CardTitle>
              <CardDescription>{pathway.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Resources
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {pathway.resources.map((resource) => (
                  <li key={resource}>{resource}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {skillPathways.considerations &&
        skillPathways.considerations.length > 0 && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="text-primary" />
                Additional Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm">
                {skillPathways.considerations.map((consideration, index) => (
                  <li key={index}>{consideration}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
