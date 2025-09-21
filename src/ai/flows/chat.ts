'use server';
/**
 * @fileOverview A chat flow for the AI assistant.
 *
 * - chat - A function that handles the main chat logic.
 */

import { ai } from '@/ai/genkit';
import type { Message } from '@/lib/types';
import { part } from 'genkit';


export async function chat(history: Message[]) {
  const lastMessage = history.pop();
  const prompt = lastMessage ? [part(lastMessage.content)] : [];

  const { stream } = await ai.generate({
    history: history.map(msg => ({ role: msg.role, content: [part(msg.content)]})),
    prompt: prompt,
    model: 'googleai/gemini-2.5-flash',
    stream: true,
  });
  return stream;
}
