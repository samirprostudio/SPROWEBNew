'use server';
import { createApiHandler } from '@genkit-ai/next';
import '@/ai/genkit'; // Import ai object first
import '@/ai/dev'; // Then import flows

export const { GET, POST } = createApiHandler();
