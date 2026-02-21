
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, GraduationCap, Wrench } from "lucide-react";
import type { GoalDefinitionData } from "@/types/career-compass";

export const goalDefinitionSchema = z.object({
  careerGoal: z
    .string()
    .min(5, "Please describe your career goal in more detail."),
  educationalBackground: z
    .string()
    .min(10, "Please describe your educational background."),
  skills: z.string().min(3, "Please list at least one skill."),
});

type Step1Props = {
  onFormSubmit: (data: GoalDefinitionData) => void;
  isLoading: boolean;
};

export function Step1GoalDefinition({ onFormSubmit, isLoading }: Step1Props) {
  const form = useForm<GoalDefinitionData>({
    resolver: zodResolver(goalDefinitionSchema),
    defaultValues: {
      careerGoal: "",
      educationalBackground: "",
      skills: "",
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Let's Start with Your Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="careerGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    What is your target career or dream job?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Senior Software Engineer at a FAANG company"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be as specific as you can. This will help us tailor your
                    roadmap.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationalBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    What is your educational background?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Master's in Computer Science from MIT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    What are your current skills?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., React, Python, UI/UX Design, Public Speaking"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter a comma-separated list of your skills.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating Roadmap..." : "Generate My Roadmap"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
