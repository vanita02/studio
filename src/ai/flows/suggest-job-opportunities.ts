'use server';
/**
 * @fileOverview A Genkit flow for suggesting relevant job opportunities based on user skills and career goals.
 *
 * - suggestJobOpportunities - A function that handles the job opportunity suggestion process.
 * - SuggestJobOpportunitiesInput - The input type for the suggestJobOpportunities function.
 * - SuggestJobOpportunitiesOutput - The return type for the suggestJobOpportunities function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JobOpportunitySchema = z.object({
  title: z.string().describe('The title of the job opportunity.'),
  company: z.string().describe('The company offering the job.'),
  description: z.string().describe('A brief description of the job.'),
  link: z.string().url().optional().describe('An optional link to the job posting.'),
  relevanceScore: z.number().min(0).max(100).describe('A score (0-100) indicating how relevant the job is to the user profile.'),
  reasonForMatch: z.string().describe('A brief explanation of why this job is a good match.'),
});

const SuggestJobOpportunitiesInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of the user\'s developed skills.'),
  careerGoals: z.string().describe('A description of the user\'s career goals.'),
  educationalBackground: z.string().describe('A description of the user\'s educational background (e.g., "Master\'s in Computer Science from Stanford").'),
});
export type SuggestJobOpportunitiesInput = z.infer<typeof SuggestJobOpportunitiesInputSchema>;

const SuggestJobOpportunitiesOutputSchema = z.object({
  jobOpportunities: z.array(JobOpportunitySchema).describe('A list of suggested job opportunities.'),
});
export type SuggestJobOpportunitiesOutput = z.infer<typeof SuggestJobOpportunitiesOutputSchema>;

export async function suggestJobOpportunities(input: SuggestJobOpportunitiesInput): Promise<SuggestJobOpportunitiesOutput> {
  return suggestJobOpportunitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestJobOpportunitiesPrompt',
  input: { schema: SuggestJobOpportunitiesInputSchema },
  output: { schema: SuggestJobOpportunitiesOutputSchema },
  prompt: `As a career advisor, your task is to suggest relevant job opportunities for a post-graduate.
Consider their skills, career goals, and educational background to provide tailored suggestions.
Each suggested job should include a title, company, a brief description, an optional link to the job posting, a relevance score (0-100), and a concise reason for why it's a good match.
Focus on opportunities that align well with the provided information.

User Skills: {{#each skills}}- {{{this}}}
{{/each}}
Career Goals: {{{careerGoals}}}
Educational Background: {{{educationalBackground}}}

Suggest 3-5 job opportunities that are highly relevant.`,
});

const suggestJobOpportunitiesFlow = ai.defineFlow(
  {
    name: 'suggestJobOpportunitiesFlow',
    inputSchema: SuggestJobOpportunitiesInputSchema,
    outputSchema: SuggestJobOpportunitiesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
