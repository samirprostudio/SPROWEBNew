
'use server';
/**
 * @fileOverview A chat flow for the AI assistant.
 *
 * - chat - A function that handles the main chat logic.
 */

import { ai } from '@/ai/genkit';

type GenkitMessage = {
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: { text: string }[];
};

export async function chat(history: GenkitMessage[]) {
  const { stream } = await ai.generate({
    prompt: history.map(msg => ({ role: msg.role, content: msg.content })),
    model: 'googleai/gemini-2.5-flash',
    stream: true,
  });
  return { stream };
}
