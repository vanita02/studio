
import type { SuggestJobOpportunitiesOutput } from '@/ai/flows/suggest-job-opportunities';
import type { SuggestPortfolioProjectsOutput } from '@/ai/flows/suggest-portfolio-projects';
import type { SuggestSkillPathwaysOutput } from '@/ai/flows/suggest-skill-pathways';
import type { z } from 'zod';
import type { goalDefinitionSchema } from '@/components/career-compass/step-1-goal-definition';

export type GoalDefinitionData = z.infer<typeof goalDefinitionSchema>;

export type AllData = {
    goalDefinition: GoalDefinitionData | null;
    skillPathways: SuggestSkillPathwaysOutput | null;
    portfolioProjects: SuggestPortfolioProjectsOutput | null;
    jobOpportunities: SuggestJobOpportunitiesOutput | null;
}
