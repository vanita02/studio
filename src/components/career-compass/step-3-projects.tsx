
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AllData } from "@/types/career-compass";
import { FolderGit2, Wrench } from "lucide-react";

type Step3Props = {
  data: AllData;
};

export function Step3Projects({ data }: Step3Props) {
  const { goalDefinition, portfolioProjects } = data;

  if (!goalDefinition || !portfolioProjects) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Project Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Portfolio project suggestions are not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderGit2 className="text-primary" />
            Portfolio Project Suggestions
          </CardTitle>
          <CardDescription>
            Build these projects to showcase your skills and strengthen your
            profile for a career as a {goalDefinition.careerGoal}.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioProjects.projects.map((project) => (
          <Card
            key={project.name}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Skills Developed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.skillsDeveloped.map((skill) => (
                    <Badge key={skill} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
