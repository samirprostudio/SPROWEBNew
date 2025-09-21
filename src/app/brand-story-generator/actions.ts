'use server';

import { generateBrandStory } from '@/ai/flows/generate-brand-story';
import { z } from 'zod';

const FormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required.'),
  missionStatement: z.string().optional(),
  values: z.string().optional(),
  uniqueSellingProposition: z.string().optional(),
});

export type FormState = {
  message: string;
  story?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = FormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
    };
  }
  
  try {
    const result = await generateBrandStory({
      companyName: parsed.data.companyName,
      missionStatement: parsed.data.missionStatement,
      values: parsed.data.values,
      uniqueSellingProposition: parsed.data.uniqueSellingProposition,
    });
    
    if (result.brandStory) {
      return { message: 'success', story: result.brandStory };
    } else {
      return { message: 'Failed to generate brand story. The result was empty.' };
    }
  } catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
