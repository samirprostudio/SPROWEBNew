'use server';
import { createNextApiHandler } from '@genkit-ai/next';
import { ai } from '@/ai/genkit'; // Import ai object first
import '@/ai/dev'; // Then import flows

export const { GET, POST } = createNextApiHandler({
  ai,
});
