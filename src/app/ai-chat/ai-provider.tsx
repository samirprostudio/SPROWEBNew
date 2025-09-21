'use server';

import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { chat } from '@/ai/flows/chat';
import type { Message } from '@/lib/types';
import { AssistantMessage, UserMessage } from './message';
import React from 'react';

// This is the primary server action that the client calls.
async function continueConversation(
  prompt: string
): Promise<{ id:string; display: React.ReactNode }> {
  'use server';

  const history = getMutableAIState<typeof AI>();
  const fullHistory: Message[] = [...history.get(), { role: 'user', content: prompt }];
  history.update(fullHistory);

  const result = await streamUI({
    text: ({ content, done }) => {
      if (done) {
        history.done((prev: Message[]) => [
          ...prev,
          { role: 'assistant', content },
        ]);
      }
      return <AssistantMessage>{content}</AssistantMessage>;
    },
    run: async function*() {
      const stream = await chat(fullHistory);
      for await (const chunk of stream) {
        yield chunk.text;
      }
    }
  });

  return {
    id: Date.now().toString(),
    display: result.value,
  };
}


const initialAIState: Message[] = [];
const initialUIState: {
  id: string;
  display: React.ReactNode;
}[] = [];


export const AI = createAI({
  actions: {
    continueConversation,
  },
  initialAIState,
  initialUIState,
  onGetUIState: async (aiState: AIState) => {
    'use server';
    if (!aiState || aiState.length === 0) {
      return [];
    }
    // Map the AI state to the UI state
    return aiState.map((message, index) => ({
      id: `${message.id ?? index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <AssistantMessage>{message.content}</AssistantMessage>
        ),
    }));
  }
});

export type AIState = typeof initialAIState;
export type UIState = typeof initialUIState;
