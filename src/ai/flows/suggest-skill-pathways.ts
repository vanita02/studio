'use server';
/**
 * @fileOverview A Genkit flow for suggesting optimal skill development pathways.
 *
 * - suggestSkillPathways - A function that suggests skill development pathways.
 * - SuggestSkillPathwaysInput - The input type for the suggestSkillPathways function.
 * - SuggestSkillPathwaysOutput - The return type for the suggestSkillPathways function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillPathwaysInputSchema = z.object({
  careerGoal: z.string().describe('The desired career goal of the post-graduate.'),
  educationalBackground: z.string().describe('The current educational background of the post-graduate.'),
});
export type SuggestSkillPathwaysInput = z.infer<typeof SuggestSkillPathwaysInputSchema>;

const SuggestSkillPathwaysOutputSchema = z.object({
  skillPathways: z.array(
    z.object({
      skill: z.string().describe('The name of the skill.'),
      description: z.string().describe('A brief description of the skill and why it is relevant.'),
      resources: z.array(z.string()).describe('Suggested resources for learning this skill (e.g., course names, certifications, books).'),
    })
  ).describe('An array of recommended skill development pathways.'),
  considerations: z.array(z.string()).optional().describe('Any additional considerations or alternative career paths the advisor suggests, especially if the `getSimilarCareers` tool was used.'),
});
export type SuggestSkillPathwaysOutput = z.infer<typeof SuggestSkillPathwaysOutputSchema>;

/**
 * A mock tool to retrieve careers similar to a given career goal.
 * In a real application, this would typically integrate with a database
 * or an external API for career data.
 */
const getSimilarCareers = ai.defineTool(
  {
    name: 'getSimilarCareers',
    description: 'Retrieves a list of careers similar to a given career goal to provide broader career pathway suggestions.',
    inputSchema: z.object({
      careerGoal: z.string().describe('The primary career goal for which to find similar careers.'),
    }),
    outputSchema: z.array(z.string()),
  },
  async (input) => {
    // Placeholder implementation: returns predefined similar careers based on keyword matches.
    const { careerGoal } = input;
    if (careerGoal.toLowerCase().includes('software engineer') || careerGoal.toLowerCase().includes('developer')) {
      return ['Full-stack Developer', 'DevOps Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Technical Architect'];
    } else if (careerGoal.toLowerCase().includes('marketing')) {
      return ['Digital Marketing Specialist', 'Brand Manager', 'Content Strategist', 'Marketing Analyst'];
    } else if (careerGoal.toLowerCase().includes('data analyst') || careerGoal.toLowerCase().includes('statistician')) {
      return ['Business Intelligence Analyst', 'Data Scientist', 'Financial Analyst', 'Research Analyst'];
    }
    return [];
  }
);

const suggestSkillPathwaysPrompt = ai.definePrompt({
  name: 'suggestSkillPathwaysPrompt',
  input: {schema: SuggestSkillPathwaysInputSchema},
  output: {schema: SuggestSkillPathwaysOutputSchema},
  tools: [getSimilarCareers],
  prompt: `You are an expert career advisor for post-graduates. Your goal is to help users understand optimal skill development pathways based on their current educational background and desired career goal.

Educational Background: {{{educationalBackground}}}
Desired Career Goal: {{{careerGoal}}}

Based on this information, provide a detailed and actionable skill development pathway. For each skill, include a brief description and suggest potential resources (e.g., online courses, certifications, books).

If the career goal is very specific or could benefit from exploring related fields, consider using the 'getSimilarCareers' tool to identify alternative career paths. If you use the tool or have other important advice, include it in the 'considerations' field as an array of strings. Each item in the 'considerations' array should be a distinct piece of advice or an alternative career suggestion.`,
});

const suggestSkillPathwaysFlow = ai.defineFlow(
  {
    name: 'suggestSkillPathwaysFlow',
    inputSchema: SuggestSkillPathwaysInputSchema,
    outputSchema: SuggestSkillPathwaysOutputSchema,
  },
  async (input) => {
    const {output} = await suggestSkillPathwaysPrompt(input);
    return output!;
  }
);

export async function suggestSkillPathways(input: SuggestSkillPathwaysInput): Promise<SuggestSkillPathwaysOutput> {
  return suggestSkillPathwaysFlow(input);
}
