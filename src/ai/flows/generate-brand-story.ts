'use server';

/**
 * @fileOverview Generates a compelling brand story for Samir Pro using AI.
 *
 * - generateBrandStory - A function that generates the brand story.
 * - GenerateBrandStoryInput - The input type for the generateBrandStory function.
 * - GenerateBrandStoryOutput - The return type for the generateBrandStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBrandStoryInputSchema = z.object({
  companyName: z
    .string()
    .describe('The name of the company for which to generate a brand story.'),
  missionStatement: z
    .string()
    .optional()
    .describe('The mission statement of the company.'),
  values: z
    .string()
    .optional()
    .describe('The core values of the company, comma separated.'),
  uniqueSellingProposition: z
    .string()
    .optional()
    .describe('The unique selling proposition of the company.'),
});

export type GenerateBrandStoryInput = z.infer<
  typeof GenerateBrandStoryInputSchema
>;

const GenerateBrandStoryOutputSchema = z.object({
  brandStory: z.string().describe('The generated brand story for the company.'),
});

export type GenerateBrandStoryOutput = z.infer<
  typeof GenerateBrandStoryOutputSchema
>;

export async function generateBrandStory(
  input: GenerateBrandStoryInput
): Promise<GenerateBrandStoryOutput> {
  return generateBrandStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBrandStoryPrompt',
  input: {schema: GenerateBrandStoryInputSchema},
  output: {schema: GenerateBrandStoryOutputSchema},
  prompt: `You are a branding expert tasked with crafting a compelling brand story for {{companyName}}.\n\nConsider the following information to create an engaging and memorable narrative:\n\n{% if missionStatement %}Mission Statement: {{missionStatement}}{% endif %}\n{% if values %}Core Values: {{values}}{% endif %}\n{% if uniqueSellingProposition %}Unique Selling Proposition: {{uniqueSellingProposition}}{% endif %}\n\nDevelop a brand story that captures the essence of {{companyName}}, its aspirations, and its connection with its audience. The story should be concise, inspiring, and reflective of the company's identity. Focus on building a narrative that resonates with potential customers and clearly communicates the brand's purpose and values. Do not include disclaimers that you are an AI. Do not include details about the input.
\nBrand Story:`,
});

const generateBrandStoryFlow = ai.defineFlow(
  {
    name: 'generateBrandStoryFlow',
    inputSchema: GenerateBrandStoryInputSchema,
    outputSchema: GenerateBrandStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
