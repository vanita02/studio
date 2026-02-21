'use server';
/**
 * @fileOverview A Genkit flow for suggesting relevant portfolio projects based on target career and desired skills.
 *
 * - suggestPortfolioProjects - A function that handles the portfolio project suggestion process.
 * - SuggestPortfolioProjectsInput - The input type for the suggestPortfolioProjects function.
 * - SuggestPortfolioProjectsOutput - The return type for the suggestPortfolioProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const SuggestPortfolioProjectsInputSchema = z.object({
  targetCareer: z
    .string()
    .describe('The target career path the user is aiming for.'),
  desiredSkills: z
    .array(z.string())
    .describe('A list of skills the user wants to develop or showcase.'),
});
export type SuggestPortfolioProjectsInput = z.infer<
  typeof SuggestPortfolioProjectsInputSchema
>;

// Output Schema
const SuggestPortfolioProjectsOutputSchema = z.object({
  projects: z
    .array(
      z.object({
        name: z.string().describe('The name of the suggested project.'),
        description: z
          .string()
          .describe('A brief description of the project idea.'),
        skillsDeveloped: z
          .array(z.string())
          .describe(
            'A list of skills that would be developed or showcased by completing this project.'
          ),
      })
    )
    .describe('A list of suggested portfolio projects.'),
});
export type SuggestPortfolioProjectsOutput = z.infer<
  typeof SuggestPortfolioProjectsOutputSchema
>;

export async function suggestPortfolioProjects(
  input: SuggestPortfolioProjectsInput
): Promise<SuggestPortfolioProjectsOutput> {
  return suggestPortfolioProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPortfolioProjectsPrompt',
  input: {schema: SuggestPortfolioProjectsInputSchema},
  output: {schema: SuggestPortfolioProjectsOutputSchema},
  prompt: `You are an expert career coach specializing in helping post-graduates build strong portfolios.
Based on the user's target career and desired skills, suggest 3-5 relevant portfolio projects that would help them gain practical experience and demonstrate their capabilities to potential employers.
Each project should have a clear name, a brief description, and a list of key skills that would be developed by completing it.

Target Career: {{{targetCareer}}}
Desired Skills: {{#each desiredSkills}}- {{{this}}}
{{/each}}
`,
});

const suggestPortfolioProjectsFlow = ai.defineFlow(
  {
    name: 'suggestPortfolioProjectsFlow',
    inputSchema: SuggestPortfolioProjectsInputSchema,
    outputSchema: SuggestPortfolioProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
