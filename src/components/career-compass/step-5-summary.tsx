
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
import {
  Briefcase,
  GraduationCap,
  Wrench,
  Lightbulb,
  FolderGit2,
  Rocket,
  ChevronRight,
} from "lucide-react";

type Step5Props = {
  data: AllData;
};

const TimelineNode = ({
  icon,
  title,
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  isLast?: boolean;
}) => (
  <div className="relative flex items-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
      {icon}
    </div>
    <p className="ml-4 text-lg font-semibold">{title}</p>
    {!isLast && (
      <div className="absolute left-6 top-12 -bottom-4 w-px bg-border" />
    )}
  </div>
);

export function Step5Summary({ data }: Step5Props) {
  const {
    goalDefinition,
    skillPathways,
    portfolioProjects,
    jobOpportunities,
  } = data;

  if (!goalDefinition) {
    return <Card><CardContent><p>No summary data available.</p></CardContent></Card>;
  }

  return (
    <div className="space-y-8">
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="text-primary" />
            Your Personalized Career Roadmap
          </CardTitle>
          <CardDescription>
            This is your journey from where you are to becoming a {goalDefinition.careerGoal}.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="flex flex-col gap-8">
        {/* Current Profile */}
        <div>
          <TimelineNode icon={<GraduationCap />} title="Your Starting Point" />
          <Card className="ml-10 mt-4">
            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-muted-foreground">Education</h4>
                <p>{goalDefinition.educationalBackground}</p>
              </div>
              <div>
                <h4 className="font-semibold text-muted-foreground">Current Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {goalDefinition.skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Pathway */}
        <div>
          <TimelineNode icon={<Lightbulb />} title="Your Learning Pathway" />
          <Card className="ml-10 mt-4">
            <CardHeader>
              <CardTitle className="text-xl">Skills to Acquire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillPathways?.skillPathways.map(skill => (
                <div key={skill.skill} className="flex items-center gap-3 text-sm">
                  <Wrench className="h-4 w-4 text-primary shrink-0"/>
                  <span>{skill.skill}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div>
          <TimelineNode icon={<FolderGit2 />} title="Build Your Portfolio" />
          <Card className="ml-10 mt-4">
            <CardHeader>
              <CardTitle className="text-xl">Suggested Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolioProjects?.projects.map(project => (
                 <div key={project.name} className="flex items-start gap-3 text-sm">
                 <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-1"/>
                 <div>
                   <p className="font-semibold">{project.name}</p>
                   <p className="text-muted-foreground">{project.description}</p>
                 </div>
               </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Job Opportunities */}
        <div>
          <TimelineNode icon={<Briefcase />} title="Land Your Dream Job" isLast={true} />
          <Card className="ml-10 mt-4">
            <CardHeader>
              <CardTitle className="text-xl">Potential Job Titles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {jobOpportunities?.jobOpportunities.slice(0, 5).map(job => (
                <div key={job.title} className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-primary shrink-0"/>
                  <span>{job.title} at {job.company}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
