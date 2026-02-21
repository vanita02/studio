
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar } from "./progress-bar";
import { Step1GoalDefinition } from "./step-1-goal-definition";
import { Step2Skills } from "./step-2-skills";
import { Step3Projects } from "./step-3-projects";
import { Step4Jobs } from "./step-4-jobs";
import { Step5Summary } from "./step-5-summary";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2, RotateCcw } from "lucide-react";
import type { AllData, GoalDefinitionData } from "@/types/career-compass";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";
import { suggestSkillPathways } from "@/ai/flows/suggest-skill-pathways";
import { suggestPortfolioProjects } from "@/ai/flows/suggest-portfolio-projects";
import { suggestJobOpportunities } from "@/ai/flows/suggest-job-opportunities";

export function CareerCompassWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AllData>({
    goalDefinition: null,
    skillPathways: null,
    portfolioProjects: null,
    jobOpportunities: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoalSubmit = async (formData: GoalDefinitionData) => {
    setIsLoading(true);
    setData({
      goalDefinition: formData,
      skillPathways: null,
      portfolioProjects: null,
      jobOpportunities: null,
    });
    try {
      const skillPathwaysData = await suggestSkillPathways({
        careerGoal: formData.careerGoal,
        educationalBackground: formData.educationalBackground,
      });

      const suggestedSkills =
        skillPathwaysData.skillPathways.map((p) => p.skill) || [];

      const portfolioProjectsData = await suggestPortfolioProjects({
        targetCareer: formData.careerGoal,
        desiredSkills: suggestedSkills.length > 0 ? suggestedSkills : [formData.careerGoal],
      });

      const userSkills = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const allSkills = [...new Set([...userSkills, ...suggestedSkills])];

      const jobOpportunitiesData = await suggestJobOpportunities({
        skills: allSkills,
        careerGoals: formData.careerGoal,
        educationalBackground: formData.educationalBackground,
      });

      setData({
        goalDefinition: formData,
        skillPathways: skillPathwaysData,
        portfolioProjects: portfolioProjectsData,
        jobOpportunities: jobOpportunitiesData,
      });

      setCurrentStep(2);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description:
          "An error occurred while generating your roadmap. Please check your inputs and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setData({
      goalDefinition: null,
      skillPathways: null,
      portfolioProjects: null,
      jobOpportunities: null,
    });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    if (isLoading) {
      return (
        <Card className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium text-foreground">Crafting Your Career Path...</p>
            <p className="text-sm text-muted-foreground">This may take a moment. We're analyzing the best routes for you.</p>
        </Card>
      );
    }
    
    switch (currentStep) {
      case 1:
        return (
          <Step1GoalDefinition
            onFormSubmit={handleGoalSubmit}
            isLoading={isLoading}
          />
        );
      case 2:
        return <Step2Skills data={data} />;
      case 3:
        return <Step3Projects data={data} />;
      case 4:
        return <Step4Jobs data={data} />;
      case 5:
        return <Step5Summary data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {currentStep > 1 && !isLoading && (
        <ProgressBar currentStep={currentStep} />
      )}
      <div className="relative">
        {renderStep()}
      </div>
      {currentStep > 1 && !isLoading && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 2}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === 5 ? (
            <Button onClick={resetWizard}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
